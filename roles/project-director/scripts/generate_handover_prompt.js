#!/usr/bin/env node

/**
 * generate_handover_prompt.js - 生成阶段一→阶段二的交接提示词
 *
 * 零依赖，仅使用 Node.js 原生 fs / path 模块
 *
 * 使用方式:
 *   node generate_handover_prompt.js <state_json_path> <task_path>
 *
 * 示例:
 *   node generate_handover_prompt.js state/state.json paopao-task/my-app
 */

const fs = require('fs');
const path = require('path');

function generateHandoverPrompt(state, taskPath) {
  const documents = [
    { role: 'PM', label: '产品需求文档', name: 'prd.md' },
    { role: 'UI/UX', label: '设计规范', name: 'design.md' },
    { role: 'Dev', label: '技术方案', name: 'dev-plan.md' },
    { role: 'QA', label: '测试计划', name: 'qa-plan.md' },
  ];

  const docLines = documents.map(d => {
    const fullPath = path.join(taskPath, d.name);
    const exists = fs.existsSync(fullPath);
    const status = exists ? '✅' : '❌';
    return `  ${status} ${d.role} - ${d.label}: ${fullPath}`;
  }).join('\n');

  const handover = `
========================================
🔄 阶段一规划完成 — 交接仪式
========================================

项目: ${state.project_name}
状态: ${state.current_phase} → planning_complete

已完成产出:
${docLines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 复制以下内容到新窗口启动阶段二：
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

paopao-build / ${state.project_name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

项目概要:
  项目目标: ${state.project_name}
  工作目录: ${state.workspace_path}

关键文档索引:
${documents.map(d => `  - ${d.label}: ${path.join(taskPath, d.name)}`).join('\n')}

注意:
  - 所有代码将写入用户工作目录: ${state.workspace_path}
  - 先读取 PRD 了解全貌，再逐步读取详细设计
========================================
  `.trim();

  return handover;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('用法: node generate_handover_prompt.js <state_json_path> [task_path]');
    process.exit(1);
  }

  const statePath = path.resolve(args[0]);
  const taskPath = args[1] ? path.resolve(args[1]) : path.join(process.cwd(), 'paopao-task', 'project');

  if (!fs.existsSync(statePath)) {
    console.error(`❌ 状态文件不存在: ${statePath}`);
    process.exit(1);
  }

  let state;
  try {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
  } catch (err) {
    console.error(`❌ 状态文件解析失败: ${err.message}`);
    process.exit(1);
  }

  const handover = generateHandoverPrompt(state, taskPath);
  console.log(handover);
}

main();
