#!/usr/bin/env node

/**
 * generate_handover_prompt.js - 生成阶段一→阶段二的交接提示词
 *
 * 零依赖，仅使用 Node.js 原生 fs / path 模块
 *
 * 行为:
 *   - 校验 state.json 必填字段，缺失即报错并给出修复提示
 *     （不再输出 undefined）
 *   - task_path 未传参时回读 state.task_path，仍缺则报错
 *   - 按 state.completed_steps 判定本项目的必备文档
 *     （small/medium 不要求 design.md / qa-plan.md），
 *     缺失即拒绝交接
 *   - 交付清单含 governance-log.md / README 骨架 / 中间报告
 *   - 风险按 `|R\d+|` 编号 + `| 高 |` / `| 中 |` 等级列
 *     精确解析，high 全列 + 汇总 medium 数量
 *   - 输出 agent_config 摘要与 agent.md 提醒
 *
 * 使用方式:
 *   node generate_handover_prompt.js <state_json_path> [task_path]
 * 示例:
 *   node generate_handover_prompt.js \
 *     "$STATE/state.json" "$STATE/../paopao-task/my-app"
 *   （task_path 与 state_path 建议直接自 state.json 读取）
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_STATE_FIELDS = [
  'project_name',
  'workspace_path',
  'task_path',
  'current_phase'
];

// completed_steps → 文档名（用于判定必需交付物）
const STEP_TO_DOC = [
  { step: 'pm_prd', doc: 'prd.md', role: 'PM', label: '产品需求文档' },
  { step: 'ui_ux_design', doc: 'design.md', role: 'UI/UX', label: '设计规范' },
  { step: 'dev_plan', doc: 'dev-plan.md', role: 'Dev', label: '技术方案' },
  { step: 'qa_plan', doc: 'qa-plan.md', role: 'QA', label: '测试计划' }
];

const OPTIONAL_DOCS = [
  { label: '愿景文档', name: 'vision.md' },
  { label: '风险登记表', name: 'risk-log.md' },
  { label: '决策日志', name: 'decision-log.md' },
  { label: '质量治理日志', name: 'governance-log.md' },
  { label: 'README 骨架', name: 'README.md' },
  { label: '市场调研报告', name: 'market-report.md' },
  { label: '竞品分析报告', name: 'competitive-report.md' }
];

function fail(message) {
  console.error(`❌ ${message}`);
  console.error('   修复提示: 检查 $STATE/state.json 字段，');
  console.error('   或重新执行 paopao / {task} 初始化。');
  process.exit(1);
}

/**
 * 按表格行精确解析风险登记表：
 * 列序 | ID | 描述 | 概率 | 影响 | 等级 | 应对 |
 * 仅当第 5 列（等级）严格等于 高/中 时计入
 */
function parseRiskRows(riskLogPath) {
  const EMPTY = { high: [], mediumCount: 0 };
  if (!fs.existsSync(riskLogPath)) return EMPTY;
  try {
    const content = fs.readFileSync(riskLogPath, 'utf-8');
    const rows = content.split('\n').filter(
      l => /^\s*\|\s*R\d+\s*\|/.test(l)
    );
    const cells = row => row.trim()
      .replace(/^\|/, '').replace(/\|$/, '')
      .split('|').map(c => c.trim());
    return {
      high: rows.filter(row => cells(row)[4] === '高'),
      mediumCount: rows.filter(row => cells(row)[4] === '中').length
    };
  } catch (_) {
    return EMPTY;
  }
}

function agentConfigLines(state) {
  const cfg = state.agent_config || {};
  const parts = [];
  if (cfg.dev_tech_stack) parts.push(`技术栈: ${cfg.dev_tech_stack}`);
  if (cfg.design_style) parts.push(`设计风格: ${cfg.design_style}`);
  if (cfg.qa_strictness) parts.push(`QA 严格度: ${cfg.qa_strictness}`);
  return parts;
}

function generateHandoverPrompt(state, taskPath) {
  const completed = state.completed_steps || [];

  const requiredDocs = STEP_TO_DOC.filter(
    entry => completed.includes(entry.step)
  );
  if (requiredDocs.length === 0) {
    fail('state.completed_steps 为空，尚无任一规划产出，不能交接。');
  }

  const docLines = requiredDocs.map(entry => {
    const fullPath = path.join(taskPath, entry.doc);
    const missing = !fs.existsSync(fullPath);
    if (missing) {
      fail(`必备文档缺失: ${entry.label} (${fullPath})。`
        + `补齐 ${entry.step} 产出后再执行交接。`);
    }
    return `  ✅ ${entry.role} - ${entry.label}: ${fullPath}`;
  }).join('\n');

  const optionalLines = OPTIONAL_DOCS.filter(
    entry => fs.existsSync(path.join(taskPath, entry.name))
  ).map(entry =>
    `  📄 ${entry.label}: ${path.join(taskPath, entry.name)}`
  ).join('\n');

  const { high, mediumCount } = parseRiskRows(
    path.join(taskPath, 'risk-log.md')
  );
  let riskSummary = '\n待处理风险:\n';
  if (high.length > 0) {
    riskSummary += high.slice(0, 3).map(
      l => `  ⚠️ 高风险 ${l.trim()}`
    ).join('\n') + '\n';
  }
  if (mediumCount > 0) {
    riskSummary += `  ℹ️ 中风险 ${mediumCount} 项`
      + `（详细内容见 risk-log.md）\n`;
  }
  if (high.length === 0 && mediumCount === 0) {
    riskSummary += '  ✅ 暂无未处理的高/中风险\n';
  }

  const cfgLines = agentConfigLines(state);

  const handover = `
========================================
🔄 阶段一规划完成 — 交接仪式
========================================

项目: ${state.project_name}
状态: ${state.current_phase} → planning_complete
规模: ${state.project_size || '(未判级)'} / 方法论: ${state.methodology || 'hybrid'}

已完成产出:
${docLines}

关键交付物:
${optionalLines || '  (无额外交付物)'}
${riskSummary}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 复制以下内容到新窗口启动阶段二：
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

paopao-build / ${state.project_name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

项目背景:
  项目目标: ${state.project_name}
  工作目录: ${state.workspace_path}
${cfgLines.length > 0 ? `  ${cfgLines.join(' | ')}\n` : ''}
关键文档索引:
${requiredDocs.map(e =>
  `  - ${e.label}: ${path.join(taskPath, e.doc)}`
).join('\n')}

注意:
  - 所有代码将写入用户工作目录: ${state.workspace_path}
  - 记忆区文档在: ${taskPath}
${state.agent_md_path
    ? `  - 项目配置 agent.md: ${state.agent_md_path}（各角色按需读取自身章节）\n`
    : '  - 尚未配置 agent.md，使用各角色内置默认值\n'}
  - 先读取 PRD 了解全貌（用 context_loader 分块读取）
  - 查阅 risk-log.md 关注已知风险项
========================================`.trim();

  return handover;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('用法: node generate_handover_prompt.js '
      + '<state_json_path> [task_path]');
    process.exit(1);
  }

  const statePath = path.resolve(args[0]);
  if (!fs.existsSync(statePath)) {
    fail(`状态文件不存在: ${statePath}`);
  }

  let state;
  try {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
  } catch (err) {
    fail(`状态文件解析失败: ${err.message}（先运行 `
      + `node tools/file_ops.js json ${statePath} 验证）`);
  }

  const missing = REQUIRED_STATE_FIELDS.filter(
    key => !state[key]
  );
  if (missing.length > 0) {
    fail(`state.json 缺少必填字段: ${missing.join(', ')}`);
  }

  // task_path 优先取命令行参数，其次回读 state.task_path
  const taskPath = args[1]
    ? path.resolve(args[1])
    : path.resolve(state.task_path);

  const handover = generateHandoverPrompt(state, taskPath);
  console.log(handover);
}

main();
