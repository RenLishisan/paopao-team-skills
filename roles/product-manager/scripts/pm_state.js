#!/usr/bin/env node

/**
 * pm_state.js - PM 工作状态管理工具
 * @author: RenLishisan
 * @description: 管理 PM 角色的工作状态、进度、
 *   决策记录和上下文预算。状态文件定位优先级:
 *   1) PAOPAO_STATE_FILE 精确文件路径
 *   2) PAOPAO_STATE_DIR  目录 + /pm-state.json
 *      （Director 编排 PM 时导出 $STATE 目录）
 *   3) 兜底 ./state/pm-state.json（仅本地试验用）
 *   与 Director 的主状态 state.json 分离，
 *   但同属项目状态区，严禁写回 skill 仓库目录。
 * @time: 2026/6/14
 *
 * 使用方式:
 *   node pm_state.js init <project_name>
 *   node pm_state.js set <key> <value>
 *   node pm_state.js get <key>
 *   node pm_state.js addDecision <id> <question>
 *   node pm_state.js resolveDecision <id> <summary>
 *   node pm_state.js completeStep <step_name>
 *   node pm_state.js addLines <n>        累计上下文消耗
 *   node pm_state.js status
 *   node pm_state.js budget
 *
 * 零依赖，仅使用 Node.js 原生模块
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 配置
// ---------------------------------------------------------------------------

/**
 * @author: RenLishisan
 * @description: 解析 PM 状态文件路径（环境变量优先，
 *   兜底 ./state/pm-state.json 并标记回退）
 **/
function resolveStateFile() {
  if (process.env.PAOPAO_STATE_FILE) {
    return {
      file: path.resolve(process.env.PAOPAO_STATE_FILE),
      fallback: false
    };
  }
  if (process.env.PAOPAO_STATE_DIR) {
    return {
      file: path.join(
        path.resolve(process.env.PAOPAO_STATE_DIR),
        'pm-state.json'
      ),
      fallback: false
    };
  }
  return { file: path.resolve('state', 'pm-state.json'), fallback: true };
}

const STATE_RESOLVE = resolveStateFile();
const STATE_FILE = STATE_RESOLVE.file;

const DEFAULT_STATE = {
  project: '',
  status: 'idle',
  current_step: '',
  completed_steps: [],
  decisions: [],
  context_budget: {
    used_lines: 0,
    max_lines: 200,
    warnings: []
  },
  created_at: null,
  updated_at: null
};

// ---------------------------------------------------------------------------
// 状态读写
// ---------------------------------------------------------------------------

function ensureStateDir() {
  const dir = path.dirname(STATE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readState() {
  try {
    ensureStateDir();
    if (!fs.existsSync(STATE_FILE)) {
      return { success: true, data: { ...DEFAULT_STATE } };
    }
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: `读取状态失败: ${err.message}` };
  }
}

function writeState(state) {
  try {
    ensureStateDir();
    state.updated_at = new Date().toISOString();
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
    return { success: true, path: STATE_FILE };
  } catch (err) {
    return { success: false, error: `写入状态失败: ${err.message}` };
  }
}

// ---------------------------------------------------------------------------
// 命令处理
// ---------------------------------------------------------------------------

function cmdInit(projectName) {
  const state = {
    ...DEFAULT_STATE,
    project: projectName,
    status: 'researching',
    current_step: 'requirement_analysis',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const result = writeState(state);
  if (result.success) {
    console.log(`✅ PM 状态已初始化: 项目="${projectName}"`);
    console.log(JSON.stringify(state, null, 2));
  }
  return result;
}

function cmdSet(key, value) {
  const read = readState();
  if (!read.success) return read;

  read.data[key] = value;
  const result = writeState(read.data);
  if (result.success) {
    console.log(`✅ 已设置 ${key} = ${value}`);
  }
  return result;
}

function cmdGet(key) {
  const read = readState();
  if (!read.success) return read;

  if (key) {
    const val = read.data[key];
    if (val === undefined) {
      console.log(`❌ 键不存在: ${key}`);
      return { success: false, error: `键不存在: ${key}` };
    }
    console.log(typeof val === 'object' ? JSON.stringify(val, null, 2) : val);
  } else {
    console.log(JSON.stringify(read.data, null, 2));
  }
  return { success: true };
}

function cmdAddDecision(id, question) {
  const read = readState();
  if (!read.success) return read;

  // 检查重复
  const exists = read.data.decisions.find(d => d.id === id);
  if (exists) {
    return { success: false, error: `决策 ${id} 已存在` };
  }

  read.data.decisions.push({
    id,
    question,
    resolution: 'pending',
    summary: '',
    created_at: new Date().toISOString()
  });

  const result = writeState(read.data);
  if (result.success) {
    console.log(`✅ 决策已记录: ${id} - ${question}`);
  }
  return result;
}

function cmdResolveDecision(id, summary) {
  const read = readState();
  if (!read.success) return read;

  const decision = read.data.decisions.find(d => d.id === id);
  if (!decision) {
    return { success: false, error: `决策 ${id} 不存在` };
  }

  decision.resolution = 'resolved';
  decision.summary = summary || '(用户已决策)';
  decision.resolved_at = new Date().toISOString();

  const result = writeState(read.data);
  if (result.success) {
    console.log(`✅ 决策已解决: ${id} → ${summary}`);
  }
  return result;
}

function cmdCompleteStep(stepName) {
  const read = readState();
  if (!read.success) return read;

  if (!read.data.completed_steps.includes(stepName)) {
    read.data.completed_steps.push(stepName);
  }

  // 自动推进 current_step
  const stepOrder = [
    'requirement_analysis',
    'market_research',
    'competitive_analysis',
    'solution_recommend',
    'prd_writing',
    'prd_review'
  ];

  const currentIndex = stepOrder.indexOf(read.data.current_step);
  const completedIndex = stepOrder.indexOf(stepName);
  const nextIndex = Math.max(currentIndex, completedIndex + 1);

  if (nextIndex < stepOrder.length) {
    read.data.current_step = stepOrder[nextIndex];
  } else {
    read.data.current_step = 'done';
    read.data.status = 'done';
  }

  const result = writeState(read.data);
  if (result.success) {
    console.log(`✅ 步骤已完成: ${stepName}`);
    console.log(`📌 当前步骤: ${read.data.current_step}`);
  }
  return result;
}

function cmdStatus() {
  const read = readState();
  if (!read.success) return read;

  const s = read.data;
  const pendingDecisions = s.decisions.filter(d => d.resolution === 'pending');

  console.log(`📋 PM 工作状态`);
  console.log(`──────────────`);
  console.log(`项目:       ${s.project || '(未设置)'}`);
  console.log(`状态:       ${s.status}`);
  console.log(`当前步骤:   ${s.current_step || '(无)'}`);
  console.log(`已完成:     ${s.completed_steps.length} 步`);
  console.log(`待决决策:   ${pendingDecisions.length} 个`);
  console.log(`上下文预算: ${s.context_budget.used_lines}` +
    `/${s.context_budget.max_lines} 行`);
  console.log(`更新于:     ${s.updated_at || '(无)'}`);

  if (s.completed_steps.length > 0) {
    console.log(`\n已完成步骤列表:`);
    s.completed_steps.forEach((step, i) => {
      console.log(`  ${i + 1}. ${step}`);
    });
  }

  if (pendingDecisions.length > 0) {
    console.log(`\n⏳ 待决决策:`);
    pendingDecisions.forEach(d => {
      console.log(`  - ${d.id}: ${d.question}`);
    });
  }

  return { success: true };
}

function cmdBudget() {
  const read = readState();
  if (!read.success) return read;

  const budget = read.data.context_budget;
  const usage = Math.round((budget.used_lines / budget.max_lines) * 100);
  const barLen = 20;
  const filled = Math.round((usage / 100) * barLen);
  const bar = '█'.repeat(filled) + '░'.repeat(barLen - filled);

  console.log(`📊 上下文预算使用`);
  console.log(`──────────────`);
  console.log(`预算: ${budget.max_lines} 行`);
  console.log(`已用: ${budget.used_lines} 行 (${usage}%)`);
  console.log(`[${bar}]`);
  console.log(`警告: ${budget.warnings.length > 0 ? budget.warnings.join('; ') : '无'}`);

  if (usage > 80) {
    console.log(`⚠️  上下文预算即将耗尽，建议将中间产物写入文件后清空。`);
  }

  // 更新上下文使用行数（模拟，实际由 PM 按需调用）
  return { success: true };
}

/**
 * @author: RenLishisan
 * @description: 累计上下文消耗行数；超过 80% 写入警告
 * @param {string} rawLines
 **/
function cmdAddLines(rawLines) {
  const read = readState();
  if (!read.success) return read;

  const delta = Number(rawLines);
  if (!Number.isFinite(delta) || delta <= 0) {
    return { success: false, error: '行数必须为正数' };
  }

  const budget = read.data.context_budget;
  budget.used_lines = Math.max(
    0, (budget.used_lines || 0) + delta
  );

  if (budget.used_lines > budget.max_lines * 0.8) {
    const warn = `上下文预算消耗超 80%: `
      + `${budget.used_lines}/${budget.max_lines}，`
      + `建议将中间产物落盘后清空内存`;
    if (!budget.warnings.includes(warn)) {
      budget.warnings.push(warn);
    }
  }

  const result = writeState(read.data);
  if (result.success) {
    console.log(`✅ 已累计 ${delta} 行 → `
      + `${budget.used_lines}/${budget.max_lines}`);
  }
  return result;
}

function cmdReset() {
  const result = writeState({ ...DEFAULT_STATE });
  if (result.success) {
    console.log('✅ PM 状态已重置');
  }
  return result;
}

// ---------------------------------------------------------------------------
// CLI 入口
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
用法: node pm_state.js <command> [args...]

命令:
  init <project>         初始化 PM 状态
  set <key> <value>      设置状态字段
  get [key]              获取状态（指定 key 或全部）
  addDecision <id> <q>   添加决策记录（待决）
  resolveDecision <id>   解决决策
    [summary]
  completeStep <name>    标记步骤完成
  addLines <n>           累计上下文消耗行数
  status                 查看当前状态摘要
  budget                 查看上下文预算
  reset                  重置状态为默认

状态文件定位:
  PAOPAO_STATE_FILE > PAOPAO_STATE_DIR > ./state/
  （正式运行由 Director 导出 PAOPAO_STATE_DIR=$STATE）

示例:
  node pm_state.js init "my-app"
  node pm_state.js set current_step "market_research"
  node pm_state.js addDecision "DR-001" "选择首页布局方案"
  node pm_state.js resolveDecision "DR-001" "采用方案A"
  node pm_state.js completeStep "market_research"
  node pm_state.js status
  node pm_state.js budget
`);
}

function main() {
  const args = process.argv.slice(2);

  if (STATE_RESOLVE.fallback) {
    console.error(
      '⚠️ 未设置 PAOPAO_STATE_DIR/PAOPAO_STATE_FILE，'
      + 'PM 状态回退使用 ./state/pm-state.json'
      + '（正式运行请由 Director 先导出 PAOPAO_STATE_DIR=$STATE）'
    );
  }

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }

  const command = args[0].toLowerCase();
  const rest = args.slice(1);

  let result;

  switch (command) {
    case 'init':
      if (rest.length < 1) {
        console.error('❌ 缺少项目名称');
        process.exit(1);
      }
      result = cmdInit(rest[0]);
      break;

    case 'set':
      if (rest.length < 2) {
        console.error('❌ 缺少 key 或 value');
        process.exit(1);
      }
      result = cmdSet(rest[0], rest.slice(1).join(' '));
      break;

    case 'get':
      result = cmdGet(rest[0] || null);
      break;

    case 'adddecision':
      if (rest.length < 2) {
        console.error('❌ 缺少 id 或 question');
        process.exit(1);
      }
      result = cmdAddDecision(rest[0], rest.slice(1).join(' '));
      break;

    case 'resolvedecision':
      if (rest.length < 1) {
        console.error('❌ 缺少 id');
        process.exit(1);
      }
      result = cmdResolveDecision(rest[0], rest.slice(1).join(' '));
      break;

    case 'completestep':
      if (rest.length < 1) {
        console.error('❌ 缺少 step_name');
        process.exit(1);
      }
      result = cmdCompleteStep(rest[0].toLowerCase());
      break;

    case 'addlines':
      if (rest.length < 1) {
        console.error('❌ 缺少行数');
        process.exit(1);
      }
      result = cmdAddLines(rest[0]);
      break;

    case 'status':
      result = cmdStatus();
      break;

    case 'budget':
      result = cmdBudget();
      break;

    case 'reset':
      result = cmdReset();
      break;

    default:
      console.error(`❌ 未知命令: ${command}`);
      printUsage();
      process.exit(1);
  }

  if (!result || !result.success) {
    if (result && result.error) {
      console.error(`❌ ${result.error}`);
    }
    process.exit(1);
  }
}

main();
