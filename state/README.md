# 📊 状态管理说明

## 概述

`state/` 目录用于存储 paopao-team-skills 框架的运行时
状态。状态以纯文本 JSON 文件存储，不依赖数据库。

## 状态区位置（三区隔离之三）

`state/` 与 `paopao-task/` 同级，位于**用户工作目录的
上一级**，并按项目名子目录隔离：

```
{workspace_path 的上一级}/
├── paopao-task/{project_name}/   ← 记忆区
├── state/
│   ├── {project_name}/state.json ← 状态区（本项目）
│   └── patterns/                 ← 跨项目模式库
└── {workspace_path}/             ← 施工区（用户项目）
```

- 下文记号：`$STATE` = `{上级}/state/{project_name}`
- 主状态文件 = `$STATE/state.json`
- 每个项目独立目录，多项目并行互不影响
- `paopao-patterns`/`patterns/` 归所有项目共享

## state.json 结构

```json
{
  "project_name": "开发一个潮汐查询 Web 应用",
  "project_size": "large",
  "methodology": "hybrid",
  "current_phase": "planning",
  "completed_steps": ["pm_prd"],
  "pending_steps": ["ui_ux_design", "dev_plan", "qa_plan"],
  "workspace_path": "/Users/xxx/projects/my-app",
  "task_path": "/Users/xxx/projects/paopao-task/my-app",
  "state_path": "/Users/xxx/projects/state/my-app",
  "agent_md_path": "/Users/xxx/projects/my-app/agent.md",
  "started_at": "2026-06-14T00:00:00.000Z",
  "updated_at": "2026-06-14T00:00:00.000Z",
  "agent_config": {
    "dev_tech_stack": "Next.js + TypeScript",
    "design_style": "极简专业风",
    "qa_strictness": "标准"
  }
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `project_name` | string | 归一化项目名（`file_ops.js slugify` 产出） |
| `project_size` | string | 判级：`small` / `medium` / `large` |
| `methodology` | string | `agile` / `waterfall` / `hybrid`（默认 hybrid） |
| `current_phase` | string | `planning` / `planning_complete` / `building` / `complete` / `paused` / `cancelled` |
| `completed_steps` | string[] | 已完成步骤（枚举见下表） |
| `pending_steps` | string[] | 待完成步骤，按 project_size 生成 |
| `workspace_path` | string | 用户项目目录（施工区） |
| `task_path` | string | `$TASK`（记忆区） |
| `state_path` | string | `$STATE`，必须等于 `state/{project_name}` |
| `agent_md_path` | string | `agent.md` 绝对路径，各角色按需读取 |
| `agent_config` | object | 从 `agent.md` 提取的关键配置 |
| `started_at` / `updated_at` | string | ISO 8601 时间戳 |

### 步骤枚举

| 步骤 ID | 说明 | 所属角色 |
|---------|------|----------|
| `pm_prd` | 产品需求文档 | PM |
| `ui_ux_design` | UI/UX 设计规范 | UI/UX |
| `dev_plan` | 技术方案与开发计划 | Dev |
| `qa_plan` | 测试计划 | QA |
| `dev_code` | 代码开发 | Dev |
| `qa_review` | Code Review 与测试 | QA |

### 阶段状态转移

```
[planning] ──规划完成──→ [planning_complete]
    ──paopao-build──→ [building] ──完成──→ [complete]

附加终态：paused（可恢复）/ cancelled（终止）
```

## 使用方式

状态文件由 Director 角色通过 `tools/file_ops.js`
读写，LLM 不直接修改文件，而是通过指示 Director
来更新状态：

### 读取状态
```bash
node tools/file_ops.js read "$STATE/state.json"
```

### 写入状态（先校验 JSON 合法）
```bash
node tools/file_ops.js writeJson "$STATE/state.json" \
  '{"project_name":"...","current_phase":"planning",...}'
```

### PM 子状态
PM 的独立工作状态（pm-state.json）由
`PAOPAO_STATE_DIR="$STATE"` 环境变量引导，
存放于 `$STATE/pm-state.json`，
与主状态文件分离但同属本项目状态区。

## 注意事项

- 状态区属于运行时产物，**不提交到版本控制**
  （skill 仓库的 `.gitignore` 已覆盖兜底）
- 丢失 `state.json` 需从 `paopao /` 重新开始规划，
  已产出的记忆区文档仍可人工参考
- 不建议手工编辑 state.json，易导致状态不一致；
  确需修复时先备份为 `state.json.bak`
