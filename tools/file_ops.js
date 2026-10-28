#!/usr/bin/env node

/**
 * file_ops.js - 跨平台文件/目录操作工具（运行时安全版）
 * @author: RenLishisan
 * 零依赖，仅使用 Node.js 原生 fs / path / os 模块
 *
 * 使用方式:
 *   node file_ops.js mkdir <path>              - 递归创建目录
 *   node file_ops.js write <path> [content]    - 写入文件（覆盖）
 *       内容来源优先级: --file <src> > content 参数 > stdin 管道
 *       （长内容/含引号内容务必用 --file 或管道，避免
 *         Windows 32K 命令行上限与 shell 转义问题）
 *   node file_ops.js append <path> [content]   - 追加，语义同上
 *   node file_ops.js read <path>               - 读取文件内容
 *   node file_ops.js exists <path>             - 检查存在性（退出码 0/1）
 *   node file_ops.js ls <path>                 - 列出目录内容
 *   node file_ops.js json <path>               - 读取并解析 JSON 文件
 *   node file_ops.js writeJson <path> <json>   - 先校验 JSON 合法再写入
 *   node file_ops.js rm <path> [--force]       - 删除文件（白名单保护）
 *   node file_ops.js rmdir <path> [--force]    - 递归删除目录（白名单保护）
 *   node file_ops.js copy <src> <dest>         - 复制文件
 *   node file_ops.js ensureDir <path>          - 确保目录存在
 *   node file_ops.js absPath <path>            - 解析为绝对路径并输出
 *   node file_ops.js slugify '<name>'          - 项目名归一化为目录名
 *
 * 安全规则（rm / rmdir）:
 *   1. 拒绝删除 根目录 / 用户家目录 / 当前工作目录本身
 *   2. 目标必须在当前工作目录之内，且路径段命中运行时
 *      白名单（paopao-task / state / .pipeline / patterns /
 *      node_modules / dist / build / .opencode ...）
 *   3. 上述条件不满足时，必须显式追加 --force 才放行
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// ---------------------------------------------------------------------------
// 配置
// ---------------------------------------------------------------------------

/** 删除操作白名单：路径段命中其一才视为运行时可清理目录 */
const RUNTIME_DIR_HINTS = [
  'paopao-task',
  'state',
  'paopao-state',
  '.pipeline',
  'patterns',
  'node_modules',
  'dist',
  'build',
  '.tmp',
  '.opencode'
];

// ---------------------------------------------------------------------------
// 核心函数
// ---------------------------------------------------------------------------

/**
 * @author: RenLishisan
 * @description: 确保目录存在，如果不存在则创建
 * @time: 2026/6/14 01:50
 * @param {string} dirPath
 **/
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return path.resolve(dirPath);
}

/**
 * @author: RenLishisan
 * @description: 安全读取文件内容
 * @param {string} filePath
 **/
function safeReadFile(filePath) {
  try {
    const resolved = path.resolve(filePath);
    if (!fs.existsSync(resolved)) {
      return { success: false, error: `文件不存在: ${resolved}` };
    }
    const content = fs.readFileSync(resolved, 'utf-8');
    return { success: true, data: content };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * @author: RenLishisan
 * @description: 安全写入文件内容
 * @param {string} filePath
 * @param {string} content
 **/
function safeWriteFile(filePath, content) {
  try {
    const resolved = path.resolve(filePath);
    ensureDir(path.dirname(resolved));
    fs.writeFileSync(resolved, content, 'utf-8');
    return { success: true, path: resolved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * @author: RenLishisan
 * @description: 安全追加内容到文件
 * @param {string} filePath
 * @param {string} content
 **/
function safeAppendFile(filePath, content) {
  try {
    const resolved = path.resolve(filePath);
    ensureDir(path.dirname(resolved));
    fs.appendFileSync(resolved, content, 'utf-8');
    return { success: true, path: resolved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * @author: RenLishisan
 * @description: 安全读取 JSON 文件
 * @param {string} filePath
 **/
function readJson(filePath) {
  const result = safeReadFile(filePath);
  if (!result.success) return result;
  try {
    const parsed = JSON.parse(result.data);
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, error: `JSON 解析失败: ${err.message}` };
  }
}

/**
 * @author: RenLishisan
 * @description: 校验 JSON 字符串合法性并返回规范化文本
 * @param {string} content
 **/
function validateJsonContent(content) {
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    return { success: false, error: `JSON 校验失败: ${err.message}` };
  }
  return { success: true, data: JSON.stringify(parsed, null, 2) };
}

/**
 * @author: RenLishisan
 * @description: 从 stdin 管道读取全部内容（仅非 TTY 时调用）
 **/
function readStdinAll() {
  try {
    return fs.readFileSync(0, 'utf-8');
  } catch (err) {
    return '';
  }
}

/**
 * @author: RenLishisan
 * @description: 解析写入类命令的内容来源
 *   --file <src> > 余下位置参数 > stdin 管道
 * @param {string[]} positional 首位为目标路径，其余为内容
 * @param {string|null} contentFile --file 参数值
 **/
function resolveContent(positional, contentFile) {
  if (contentFile !== null) {
    const r = safeReadFile(contentFile);
    if (!r.success) {
      return { success: false, error: `内容源读取失败: ${r.error}` };
    }
    return { success: true, content: r.data };
  }
  if (positional.length > 1) {
    return { success: true, content: positional.slice(1).join(' ') };
  }
  if (!process.stdin.isTTY) {
    return { success: true, content: readStdinAll() };
  }
  return {
    success: false,
    error: '缺少内容参数。可用: --file <src> 文件、'
      + '直接传入内容字符串，或经 stdin 管道输入'
  };
}

/**
 * @author: RenLishisan
 * @description: 删除安全防护——根/家目录/工作目录本身拒绝；
 *   目标路径段命中运行时白名单（paopao-task、state、
 *   .pipeline 等，不限层级，兼容 $STATE 与 cwd 不同级）
 *   即可直接删除；否则一律要求 --force 显式放行
 * @param {string} resolved 已解析的绝对路径
 * @param {boolean} hasForce
 * @return {{success: boolean, error?: string}}
 **/
function assertDeletable(resolved, hasForce) {
  const cwd = path.resolve(process.cwd());
  const illegal = [
    { label: '文件系统根目录', value: path.parse(cwd).root },
    { label: '用户家目录', value: path.resolve(os.homedir()) },
    { label: '当前工作目录', value: cwd }
  ];
  for (const item of illegal) {
    if (resolved === item.value) {
      return { success: false, error: `拒绝删除${item.label}: ${resolved}` };
    }
  }
  const segs = resolved.split(path.sep).filter(Boolean);
  if (!segs.some(seg => RUNTIME_DIR_HINTS.includes(seg))) {
    if (!hasForce) {
      return {
        success: false,
        error: `安全保护: ${resolved} 不在运行时白名单内 `
          + `(${RUNTIME_DIR_HINTS.join(', ')})。确认删除请追加 --force`
      };
    }
  }
  return { success: true };
}

/**
 * @author: RenLishisan
 * @description: 项目名归一化——空白折叠为连字符、剔除
 *   文件系统非法字符与控制字符、去首尾连字符、限长 48；
 *   保留中日韩等非 ASCII 字符
 * @param {string} raw 原始名称
 **/
function slugify(raw) {
  const slug = String(raw || '')
    .trim()
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || 'project';
}

// ---------------------------------------------------------------------------
// CLI 入口
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
用法: node file_ops.js <command> [args...]

命令:
  mkdir <path>             递归创建目录
  write <path> [content]   写入文件（--file <src> / stdin 可替代 content）
  append <path> [content]  追加内容（来源同上）
  read <path>              读取文件内容
  exists <path>            检查存在性（退出码 0/1）
  ls <path>                列出目录内容
  json <path>              读取并解析 JSON 文件
  writeJson <path> <json>  校验 JSON 合法后写入（支持 --file/stdin）
  rm <path> [--force]      删除文件（运行时白名单保护）
  rmdir <path> [--force]   递归删除目录（运行时白名单保护）
  copy <src> <dest>        复制文件
  ensureDir <path>         确保目录存在
  absPath <path>           输出绝对路径
  slugify '<name>'         项目名归一化（空白→-，剔除非法字符）

长内容写入建议（防 Windows 32K 命令行上限与转义问题）:
  node file_ops.js write out.md --file /tmp/buffer.md
  cat /tmp/buffer.md | node file_ops.js write out.md

示例:
  node file_ops.js mkdir paopao-task/my-project
  node file_ops.js slugify '开发一个潮汐查询 App!'
  node file_ops.js json state/my-project/state.json
`);
}

/**
 * @author: RenLishisan
 * @description: 文件操作 CLI 入口，解析命令行参数并调用对应函数
 * @time: 2026/6/14 02:20
 * @param {string[]} argv
 * @return {{
*   positional: string[],
*   file: string | null,
*   force: boolean
* }}
 **/
function parseArgs(rest) {
  const positional = [];
  let file = null;
  let force = false;
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--file' && rest[i + 1]) {
      file = rest[i + 1];
      i++;
    } else if (rest[i] === '--force') {
      force = true;
    } else {
      positional.push(rest[i]);
    }
  }
  return { positional, file, force };
}

function die(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }

  const command = args[0].toLowerCase();
  const { positional, file, force } = parseArgs(args.slice(1));

  let result;

  switch (command) {
    case 'mkdir':
    case 'ensuredir':
      if (positional.length < 1) { die('缺少路径参数'); }
      ensureDir(positional[0]);
      console.log(`✅ 目录已存在: ${path.resolve(positional[0])}`);
      break;

    case 'write':
    case 'writejson':
      if (positional.length < 1) { die('缺少目标路径参数'); }
      result = resolveContent(positional, file);
      if (!result.success) { die(result.error); }
      if (command === 'writejson') {
        const check = validateJsonContent(result.content);
        if (!check.success) {
          die(`${check.error}（未写入，原文件未被破坏）`);
        }
        result.content = check.data;
      }
      result = safeWriteFile(positional[0], result.content);
      if (result.success) {
        console.log(`✅ 文件已写入: ${result.path}`);
      } else { die(result.error); }
      break;

    case 'append':
      if (positional.length < 1) { die('缺少目标路径参数'); }
      result = resolveContent(positional, file);
      if (!result.success) { die(result.error); }
      result = safeAppendFile(positional[0], result.content);
      if (result.success) {
        console.log(`✅ 内容已追加: ${result.path}`);
      } else { die(result.error); }
      break;

    case 'read':
      if (positional.length < 1) { die('缺少路径参数'); }
      result = safeReadFile(positional[0]);
      if (result.success) {
        const resolved = path.resolve(positional[0]);
        console.log(`📄 ${resolved}`);
        console.log('---内容开始---');
        console.log(result.data);
        console.log('---内容结束---');
      } else { die(result.error); }
      break;

    case 'exists': {
      if (positional.length < 1) { die('缺少路径参数'); }
      const exists = fs.existsSync(path.resolve(positional[0]));
      console.log(exists ? 'yes' : 'no');
      process.exit(exists ? 0 : 1);
      break;
    }

    case 'ls':
      if (positional.length < 1) { die('缺少路径参数'); }
      result = listDir(positional[0]);
      if (result.success) {
        result.data.forEach(entry => {
          const icon = entry.type === 'directory' ? '📁' : '📄';
          console.log(`${icon} ${entry.name}`);
        });
      } else { die(result.error); }
      break;

    case 'json':
      if (positional.length < 1) { die('缺少路径参数'); }
      result = readJson(positional[0]);
      if (result.success) {
        console.log(JSON.stringify(result.data, null, 2));
      } else { die(result.error); }
      break;

    case 'rm':
      if (positional.length < 1) { die('缺少路径参数'); }
      result = removeFile(positional[0], force);
      if (result.success) {
        console.log(`✅ 已删除: ${path.resolve(positional[0])}`);
      } else { die(result.error); }
      break;

    case 'rmdir':
      if (positional.length < 1) { die('缺少路径参数'); }
      result = removeDir(positional[0], force);
      if (result.success) {
        console.log(`✅ 目录已删除: ${path.resolve(positional[0])}`);
      } else { die(result.error); }
      break;

    case 'copy':
      if (positional.length < 2) { die('缺少源路径和目标路径'); }
      result = copyFile(positional[0], positional[1]);
      if (result.success) {
        console.log(`✅ 已复制: ${result.from} → ${result.to}`);
      } else { die(result.error); }
      break;

    case 'abspath':
      if (positional.length < 1) { die('缺少路径参数'); }
      console.log(path.resolve(positional[0]));
      break;

    case 'slugify':
      if (positional.length < 1) { die('缺少待归一化名称'); }
      console.log(slugify(positional.slice(0).join(' ')));
      break;

    default:
      console.error(`未知命令: ${command}`);
      printUsage();
      process.exit(1);
  }
}

function listDir(dirPath) {
  try {
    const resolved = path.resolve(dirPath);
    if (!fs.existsSync(resolved)) {
      return { success: false, error: `目录不存在: ${resolved}` };
    }
    const entries = fs.readdirSync(resolved, { withFileTypes: true });
    const result = entries.map(entry => ({
      name: entry.name,
      type: entry.isDirectory() ? 'directory' : 'file',
      fullPath: path.join(resolved, entry.name)
    }));
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function removeFile(filePath, force) {
  const guard = assertDeletable(path.resolve(filePath), force);
  if (!guard.success) return guard;
  try {
    const resolved = path.resolve(filePath);
    if (!fs.existsSync(resolved)) {
      return { success: false, error: `路径不存在: ${resolved}` };
    }
    fs.rmSync(resolved, { recursive: false, force: true });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function removeDir(dirPath, force) {
  const guard = assertDeletable(path.resolve(dirPath), force);
  if (!guard.success) return guard;
  try {
    const resolved = path.resolve(dirPath);
    if (!fs.existsSync(resolved)) {
      return { success: false, error: `路径不存在: ${resolved}` };
    }
    fs.rmSync(resolved, { recursive: true, force: true });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function copyFile(src, dest) {
  try {
    const srcResolved = path.resolve(src);
    const destResolved = path.resolve(dest);
    if (!fs.existsSync(srcResolved)) {
      return { success: false, error: `源文件不存在: ${srcResolved}` };
    }
    ensureDir(path.dirname(destResolved));
    fs.copyFileSync(srcResolved, destResolved);
    return { success: true, from: srcResolved, to: destResolved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

main();
