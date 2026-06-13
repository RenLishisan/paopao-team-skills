#!/usr/bin/env node

/**
 * context_loader.js - 大文件分块读取工具
 *
 * 零依赖，仅使用 Node.js 原生 fs / path / readline 模块
 *
 * 功能:
 *   - 按行数限制读取文件（防上下文溢出）
 *   - 显示已读/总计行数
 *   - 提示剩余内容大小
 *
 * 使用方式:
 *   node context_loader.js <filepath> [max_lines] [start_line]
 *
 * 参数:
 *   filepath   - 文件路径（必填）
 *   max_lines  - 每次最大读取行数（可选，默认 100）
 *   start_line - 起始行号 1-indexed（可选，默认 1）
 *
 * 示例:
 *   node context_loader.js paopao-task/prd.md
 *   node context_loader.js paopao-task/prd.md 200
 *   node context_loader.js paopao-task/prd.md 100 51
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ---------------------------------------------------------------------------
// 核心函数
// ---------------------------------------------------------------------------

/**
 * @author: RenLishisan
 * @description: 获取文件行数
 * @time: 2026/6/14 02:16
 * @param filePath
 **/
function countLines(filePath) {
  return new Promise((resolve, reject) => {
    const resolved = path.resolve(filePath);
    if (!fs.existsSync(resolved)) {
      reject(new Error(`文件不存在: ${resolved}`));
      return;
    }

    let lineCount = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(resolved),
      crlfDelay: Infinity
    });

    rl.on('line', () => { lineCount++; });
    rl.on('close', () => resolve(lineCount));
    rl.on('error', reject);
  });
}

/**
 * @author: RenLishisan
 * @description: 按行数读取文件片段
 * @time: 2026/6/14 02:28
 * @param filePath
 * @param maxLines
 * @param startLine
 **/
function readChunk(filePath, maxLines = 100, startLine = 1) {
  return new Promise((resolve, reject) => {
    const resolved = path.resolve(filePath);
    if (!fs.existsSync(resolved)) {
      reject(new Error(`文件不存在: ${resolved}`));
      return;
    }

    const lines = [];
    let currentLine = 0;
    let foundStart = false;

    const rl = readline.createInterface({
      input: fs.createReadStream(resolved),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      currentLine++;

      if (currentLine < startLine) return;

      if (!foundStart) {
        foundStart = true;
      }

      lines.push(line);

      if (lines.length >= maxLines) {
        rl.close();
        rl.removeAllListeners();
      }
    });

    rl.on('close', () => resolve(lines));
    rl.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// CLI 入口
// ---------------------------------------------------------------------------

/**
 * @author: RenLishisan
 * @description:  CLI 主函数
 * @time: 2026/6/14 01:32
**/
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
用法: node context_loader.js <filepath> [max_lines] [start_line]

参数:
  filepath   - 文件路径（必填）
  max_lines  - 每次最大读取行数（可选，默认 100）
  start_line - 起始行号 1-indexed（可选，默认 1）

示例:
  node context_loader.js paopao-task/prd.md
  node context_loader.js paopao-task/prd.md 200
  node context_loader.js paopao-task/prd.md 100 51
`);
    process.exit(0);
  }

  const filePath = args[0];
  const maxLines = args[1] ? parseInt(args[1], 10) : 100;
  const startLine = args[2] ? parseInt(args[2], 10) : 1;

  if (isNaN(maxLines) || maxLines < 1) {
    console.error('❌ max_lines 必须是正整数');
    process.exit(1);
  }

  if (isNaN(startLine) || startLine < 1) {
    console.error('❌ start_line 必须是正整数');
    process.exit(1);
  }

  try {
    const resolved = path.resolve(filePath);
    const totalLines = await countLines(resolved);
    const chunk = await readChunk(resolved, maxLines, startLine);

    const endLine = Math.min(startLine + chunk.length - 1, totalLines);
    const remaining = totalLines - endLine;

    console.log(`📄 ${resolved}`);
    console.log(`📊 行数: ${startLine}-${endLine} / 共 ${totalLines} 行`);
    if (remaining > 0) {
      console.log(`⚠️  剩余 ${remaining} 行未读取。继续读取请使用: node context_loader.js "${filePath}" ${maxLines} ${endLine + 1}`);
    } else {
      console.log(`✅ 文件已完全读取。`);
    }
    console.log('---内容开始---');
    chunk.forEach((line, index) => {
      console.log(`${startLine + index}: ${line}`);
    });
    console.log('---内容结束---');

  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
}

main().then(r => {});
