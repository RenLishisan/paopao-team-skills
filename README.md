# 🫧 PaopaoTeamSkills 泡泡团队

> **多智能体原生框架** — 零依赖 · 纯文本状态机 · 物理边界隔离 · HITL 决策

`泡泡团队`是一个为 AI 编程助手设计的**多智能体协作框架**。它通过 5 个角色（总监 + 4 个专业角色）的两阶段工作流，将用户的模糊想法转化为生产级代码——**先规划、再执行**。

---

## 核心特性

| 特性 | 说明 |
|------|------|
| **纯文本状态机** | 通过 `state/state.json` 管理项目状态，无需数据库 |
| **物理边界隔离** | 文档进 `paopao-task/`（记忆区），代码进工作目录（施工区），永不跨界 |
| **两阶段工作流** | `paopao / {task}` 规划 → `paopao-build / {task}` 执行 |
| **HITL 决策** | 需求模糊时通过 `<decision_request>` 请求用户裁决 |
| **按需读取** | 大文件分块加载，防止上下文溢出 |

---

## 核心团队（5 大角色）

| 角色 | 文件 | 职责 |
|------|------|------|
| 🎯 **项目总监 (Director)** | `roles/project-director/` | 状态机控制、角色编排、交接仪式、质量守门 |
| 📋 **产品经理 (PM)** | `roles/product-manager/` | 需求分析、PRD 产出、HITL 决策请求 |
| 🖌️ **UI/UX 设计师** | `roles/ui-ux-designer/` | 设计规范、Design Token、组件状态机 |
| 🛠️ **全栈工程师 (Dev)** | `roles/fullstack-dev-engineer/` | 技术方案、脚手架初始化、代码落盘 |
| 🧪 **质量保障 (QA)** | `roles/quality-assurance/` | 可测性审查、测试计划、Code Review |

---

## 两阶段工作流

```
┌────────────────────────────────────────────────────────────┐
│  阶段一：规划 (paopao /)                                     │
│                                                            │
│  用户指令 ──→ Director 编排各角色产出文档                      │
│                ├── PM  → PRD                               │
│                ├── UI/UX → 设计规范 + Design Token          │
│                ├── Dev → 技术方案与开发计划                   │
│                └── QA → 测试计划                            │
│                                                            │
│  产出均存入 paopao-task/ 目录                                │
│  完成时输出交接提示词（复制到新窗口启动阶段二）                    │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│  阶段二：执行 (paopao-build /)                               │
│                                                            │
│  Director 读取规划文档 → 编排 Dev + QA                        │
│                ├── Dev → 脚手架初始化 → 代码落盘              │
│                └── QA → Code Review → 测试执行              │
│                                                            │
│  代码直接写入用户当前工作目录                                   │
└────────────────────────────────────────────────────────────┘
```

### 阶段一：规划模式

```bash
paopao / 开发一个潮汐查询 Web 应用
```

Director 接到指令后顺序调用 4 个角色：
1. **PM** → 输出 `paopao-task/{project}/prd.md`
2. **UI/UX** → 输出 `paopao-task/{project}/design.md` + Design Token
3. **Dev** → 输出 `paopao-task/{project}/dev-plan.md`
4. **QA** → 输出 `paopao-task/{project}/qa-plan.md`

所有文档存入 `paopao-task/`。完成后 Director 执行**交接仪式**，输出包含 `paopao-build` 指令的启动提示词。

### 阶段二：执行模式

```bash
paopao-build / 开发一个潮汐查询 Web 应用
```

在新对话窗口中粘贴交接提示词，Director 验证状态后：
1. **Dev** → 使用脚手架初始化项目，按模块分批将代码写入用户工作目录
2. **QA** → 审查代码、编写并执行测试用例
3. 完成后输出项目总结报告

---

## 工作流详解

### 状态机流转

```
[planning] ──规划完成──→ [planning_complete] ──paopao-build──→ [building] ──完成──→ [complete]
```

### 步骤依赖关系

```
pm_prd → ui_ux_design
    ↓         ↓
dev_plan ←────┘    (UI/UX 产出作为 Dev 参考)
    ↓
qa_plan ←───────── (Dev 计划产出后 QA 制定测试计划)
```

### 执行阶段步骤

```
dev_code → qa_review → complete
```

---

## 目录结构

```
paopao-team-skills/
├── main.md                       # 入口路由 Prompt（Master Router）
├── roles/                        # 角色定义
│   ├── project-director/         # 项目总监
│   │   ├── profile.md            #   System Prompt
│   │   ├── scripts/              #   交接仪式生成脚本
│   │   └── templates/            #   README 蓝本模板
│   ├── product-manager/          # 产品经理
│   │   ├── profile.md            #   System Prompt
│   │   ├── scripts/              #   辅助脚本
│   │   └── templates/            #   PRD 模板
│   ├── ui-ux-designer/           # UI/UX 设计师
│   │   ├── profile.md
│   │   ├── scripts/
│   │   └── templates/
│   ├── fullstack-dev-engineer/   # 全栈工程师
│   │   ├── profile.md
│   │   ├── scripts/
│   │   └── templates/
│   └── quality-assurance/        # 质量保障
│       ├── profile.md
│       ├── scripts/
│       └── templates/
├── tools/                        # 公共工具（Node.js 原生）
│   ├── file_ops.js               #   文件/目录 CRUD 操作
│   ├── context_loader.js         #   大文件分块读取
│   └── env_check.sh              #   环境检测脚本
├── state/                        # 状态管理
│   └── README.md                 #   state.json 数据结构说明
├── LICENSE                       # MIT 许可
└── README.md                     # 本文件
```

---

## 快速开始

### 1. 环境检查

```bash
./tools/env_check.sh
```

确保已安装 Node.js v16+（推荐 v18+）。

### 2. 阶段一：规划

在新对话窗口中输入：

```bash
paopao / 开发一个潮汐查询 Web 应用
```

AI 将依次调用 PM → UI/UX → Dev → QA 四个角色，产出规划文档。

### 3. 阶段二：执行

复制阶段一结束时的交接提示词，在新对话窗口中粘贴执行：

```bash
paopao-build / 开发一个潮汐查询 Web 应用
```

AI 将初始化脚手架、编写代码、执行测试，所有产物直接写入你的工作目录。

---

## 核心原则

1. **按需读取** — 禁止一次性读取所有文档，使用 `context_loader.js` 分块加载
2. **绝对落盘** — 代码必须写入用户当前工作目录，严禁写入 `paopao-task/`
3. **脚手架优先** — Dev 必须使用官方脚手架/CLI 初始化，禁止从零手写配置
4. **HITL 决策** — PM 遇到模糊需求通过 `<decision_request>` 请求用户裁决
5. **物理边界** — 文档进 `paopao-task/`，代码进工作区，`state/` 只存状态

---

## 状态管理

项目状态存储在 `state/state.json` 中，由 Director 通过 `tools/file_ops.js` 读写。

```json
{
  "project_name": "潮汐查询 Web 应用",
  "current_phase": "planning",
  "completed_steps": [],
  "pending_steps": ["pm_prd", "ui_ux_design", "dev_plan", "qa_plan"],
  "workspace_path": "/Users/xxx/projects/weather-app",
  "task_path": "/Users/xxx/paopao-task/weather-app",
  "started_at": "2026-06-14T00:00:00.000Z",
  "updated_at": "2026-06-14T00:00:00.000Z"
}
```

| 步骤 ID | 说明 | 所属角色 |
|---------|------|----------|
| `pm_prd` | 产品需求文档 | PM |
| `ui_ux_design` | 设计规范 | UI/UX |
| `dev_plan` | 技术方案与开发计划 | Dev |
| `qa_plan` | 测试计划 | QA |
| `dev_code` | 代码开发 | Dev |
| `qa_review` | Code Review 与测试 | QA |

---

## 内置工具

| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `file_ops.js` | 文件/目录创建、读写、删除、复制 | `node tools/file_ops.js <cmd> <args>` |
| `context_loader.js` | 大文件分块读取（防上下文溢出） | `node tools/context_loader.js <path> [lines] [start]` |
| `env_check.sh` | 环境检测（Node.js 版本、目录完整性） | `bash tools/env_check.sh` |

---

## 设计理念

- **零依赖** — 所有工具仅使用 Node.js 原生模块，无需安装任何依赖
- **纯文本驱动** — 所有状态和文档均为纯文本/Markdown/JSON，人类可读、AI 可写
- **物理隔离** — 规划文档和代码产物严格分离，防止 AI 行为污染
- **对话即工作流** — 每个阶段一个对话窗口，上下文纯净，状态通过文件系统传递
- **Human-in-the-Loop** — AI 知道何时向人类求助，而不是盲目猜测

---

## 许可证

MIT License © 2026 荏狸十三
