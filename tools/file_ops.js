#!/usr/bin/env node

/**
 * file_ops.js - 跨平台文件/目录操作工具
 * @author: RenLishisan
 * 零依赖，仅使用 Node.js 原生 fs / path 模块
 *
 * 使用方式:
 *   node file_ops.js mkdir <path>           - 递归创建目录
 *   node file_ops.js write <path> <content> - 写入文件（覆盖）
 *   node file_ops.js read <path>            - 读取文件内容
 *   node file_ops.js append <path> <content> - 追加到文件
 *   node file_ops.js exists <path>          - 检查路径是否存在
 *   node file_ops.js ls <path>              - 列出目录内容
 *   node file_ops.js json <path>            - 读取并解析 JSON 文件
 *   node file_ops.js writeJson <path> <json_string> - 写入 JSON 文件
 *   node file_ops.js rm <path>              - 删除文件或空目录
 *   node file_ops.js rmdir <path>           - 递归删除目录
 *   node file_ops.js copy <src> <dest>      - 复制文件
 *   node file_ops.js ensureDir <path>       - 确保目录存在
 *   node file_ops.js absPath <path>         - 解析为绝对路径并输出
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 核心函数
// ---------------------------------------------------------------------------

/**
 * @author: RenLishisan
 * @description: 确保目录存在，如果不存在则创建
 * @time: 2026/6/14 01:50
 * @param dirPath
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
 * @time: 2026/6/14 03:04
 * @param filePath
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
 * @time: 2026/6/14 02:57
 * @param filePath
 * @param content
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
 * @time: 2026/6/14 02:50
 * @param filePath
 * @param content
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
 * @time: 2026/6/14 02:39
 * @param filePath
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
 * @description: 安全写入 JSON 文件
 * @time: 2026/6/14 2:31
 * @param filePath
 * @param jsonData
 **/
function writeJson(filePath, jsonData) {
  try {
    const content = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData, null, 2);
    return safeWriteFile(filePath, content);
  } catch (err) {
    return { success: false, error: err.message };
  }
}
/**
 * @author: RenLishisan
 * @time: 2026/6/14 02:20
 * @param dirPath
 **/

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

function removeFile(filePath) {
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

function removeDir(dirPath) {
  try {
    const resolved = path.resolve(dirPath);
    if (!fs.existsSync(resolved)) {
      return { success: false, error: `目录不存在: ${resolved}` };
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

function pathExists(targetPath) {
  return fs.existsSync(path.resolve(targetPath));
}

function absolutePath(targetPath) {
  return path.resolve(targetPath);
}

// ---------------------------------------------------------------------------
// CLI 入口
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
用法: node file_ops.js <command> [args...]

命令:
  mkdir <path>             递归创建目录
  write <path> <content>   写入文件（覆盖）
  read <path>              读取文件内容
  append <path> <content>  追加内容到文件
  exists <path>            检查路径是否存在
  ls <path>                列出目录内容
  json <path>              读取并解析 JSON 文件
  writeJson <path> <json>  写入 JSON 文件
  rm <path>                删除文件或空目录
  rmdir <path>             递归删除目录
  copy <src> <dest>        复制文件
  ensureDir <path>         确保目录存在
  absPath <path>           输出绝对路径

示例:
  node file_ops.js mkdir paopao-task/my-project
  node file_ops.js write paopao-task/my-project/README.md '# Hello'
  node file_ops.js read paopao-task/my-project/README.md
  node file_ops.js ls paopao-task/
  node file_ops.js json state/state.json
`);
}

/**
 * @author: RenLishisan
 * @description: 文件操作 CLI 入口，解析命令行参数并调用对应函数
 * @time: 2026/6/14 02:20
**/
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }

  const command = args[0].toLowerCase();
  const rest = args.slice(1);

  let result;

  switch (command) {
    case 'mkdir':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      ensureDir(rest[0]);
      console.log(`✅ 目录已创建: ${path.resolve(rest[0])}`);
      break;

    case 'write':
      if (rest.length < 2) { console.error('缺少路径或内容参数'); process.exit(1); }
      result = safeWriteFile(rest[0], rest.slice(1).join(' '));
      if (result.success) console.log(`✅ 文件已写入: ${result.path}`);
      else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'append':
      if (rest.length < 2) { console.error('缺少路径或内容参数'); process.exit(1); }
      result = safeAppendFile(rest[0], rest.slice(1).join(' '));
      if (result.success) console.log(`✅ 内容已追加: ${result.path}`);
      else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'read':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      result = safeReadFile(rest[0]);
      if (result.success) {
        // 输出文件名和内容
        const resolved = path.resolve(rest[0]);
        console.log(`📄 ${resolved}`);
        console.log('---内容开始---');
        console.log(result.data);
        console.log('---内容结束---');
      } else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'exists':
      const exists = pathExists(rest[0]);
      console.log(exists ? 'yes' : 'no');
      break;

    case 'ls':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      result = listDir(rest[0]);
      if (result.success) {
        result.data.forEach(entry => {
          const icon = entry.type === 'directory' ? '📁' : '📄';
          console.log(`${icon} ${entry.name}`);
        });
      } else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'json':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      result = readJson(rest[0]);
      if (result.success) {
        console.log(JSON.stringify(result.data, null, 2));
      } else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'writejson':
      if (rest.length < 2) { console.error('缺少路径或 JSON 参数'); process.exit(1); }
      result = writeJson(rest[0], rest.slice(1).join(' '));
      if (result.success) console.log(`✅ JSON 已写入: ${result.path}`);
      else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'rm':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      result = removeFile(rest[0]);
      if (result.success) console.log(`✅ 已删除: ${path.resolve(rest[0])}`);
      else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'rmdir':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      result = removeDir(rest[0]);
      if (result.success) console.log(`✅ 目录已删除: ${path.resolve(rest[0])}`);
      else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'copy':
      if (rest.length < 2) { console.error('缺少源路径和目标路径'); process.exit(1); }
      result = copyFile(rest[0], rest[1]);
      if (result.success) console.log(`✅ 已复制: ${result.from} → ${result.to}`);
      else { console.error(`❌ ${result.error}`); process.exit(1); }
      break;

    case 'ensuredir':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      ensureDir(rest[0]);
      console.log(`✅ 目录已确保存在: ${path.resolve(rest[0])}`);
      break;

    case 'abspath':
      if (rest.length < 1) { console.error('缺少路径参数'); process.exit(1); }
      console.log(absolutePath(rest[0]));
      break;

    default:
      console.error(`未知命令: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main();
