# 🫧 PaopaoTeamSkills 泡泡团队

> **多智能体原生 AI Skill** — 从想法雏形到生产代码，一支 AI 团队为你而战

```text
paopao / 帮我开发一个...  →  产品经理 → 设计师 → 工程师 → QA  →  高质量项目落地
```

---

## 📦 这是什么？

**泡泡团队**是一个 **AI Agent Skill** —— 专为 OpenCode 与
Claude Code 两款主流 AI 编程助手设计的
多智能体协作框架。

一句话概括：**向 AI 下达一个任务，泡泡团队的五位角色
（总监、产品经理、设计师、工程师、QA）自动协作，
先规划、再执行，最终交付完整项目。**

### 与普通 AI 编程助手的区别

| 普通 AI | 泡泡团队 |
|---------|----------|
| 单次对话，缺乏全局规划 | **两阶段工作流**：先规划再执行，避免返工 |
| 依赖用户持续引导 | **5 角色分工协作**，各司其职，自动编排 |
| 上下文易溢出，丢失历史 | **物理隔离**：规划文档 / 代码 / 状态严格分离 |
| 遇到模糊需求盲目猜测 | **HITL 决策**：不确定时主动请求用户确认 |

---

## 🔧 什么是 AI Skill？

**Skill** 是 AI 编程助手的「技能插件」—— 它为 AI 提供一套结构化指令、
角色定义和工具脚本，让 AI 不再是通用助手，而是具备特定领域能力的专家。

```
AI 编程助手 (OpenCode / Claude Code)
  ├── 🔧 通用能力             ← 写代码、读文件、联网搜索
  └── 🧩 加载 Skill            ← 激活泡泡团队多智能体框架
        ├── main.md            ← 主入口指令（告诉 AI 如何工作）
        ├── roles/             ← 5 个角色定义
        └── tools/             ← 文件操作、环境检测等工具
```

加载 Skill 后，AI 获得完整的多智能体协作能力。

---

## 🚀 一键接入（AI Agent 安装）

> **要求**：Node.js v16+（推荐 v18+），零 npm 依赖。
> 本 Skill 遵循开放的 Agent Skills 规范
> （`<skills 目录>/<name>/SKILL.md`），
> **技能本体一份，OpenCode 与 Claude Code 通用**；
> slash 启动器按 agent 各取所需（见步骤 3）。

### 方式一：自动安装

将以下提示词发送到你的 AI 编程助手对话窗口：

> 请阅读 https://github.com/RenLishisan/paopao-team-skills
> 文档中的「一键接入」章节，按其一给出的真实安装路径，
> 为我安装并配置 PaopaoTeamSkills Skill。

AI 将自动完成安装流程。

### 方式二：手动安装

<details>
<summary>点击展开手动步骤</summary>

**1. 克隆项目并检查环境**

```bash
git clone git@github.com:RenLishisan/paopao-team-skills.git
bash paopao-team-skills/tools/env_check.sh
```

**2. 放置到所用 Agent 的技能目录之一**
（目录名必须与 SKILL.md 的 name 一致）：

| Agent | 项目级（当前项目可用） | 全局（所有项目可用） |
|-------|------------------------|----------------------|
| OpenCode | `.opencode/skills/` | `~/.config/opencode/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |

```bash
# OpenCode 项目级示例
mkdir -p .opencode/skills
cp -r paopao-team-skills .opencode/skills/

# Claude Code 项目级示例
mkdir -p .claude/skills
cp -r paopao-team-skills .claude/skills/
```

**3.（可选）启用 slash 快捷指令**

启动器为各 agent 的薄适配文件，仅做路径指引与传参：

| Agent | 仓库内源文件 | 复制到 |
|-------|--------------|--------|
| OpenCode | `.opencode/command/paopao{,-build,-status}.md` | 项目 `.opencode/command/`（全局 `~/.config/opencode/command/`） |
| Claude Code | `.claude/commands/paopao{,-build,-status}.md` | 项目 `.claude/commands/`（全局 `~/.claude/commands/`） |

复制后即可使用 `/paopao 我的任务`、
`/paopao-build 项目名`、`/paopao-status`。
未安装启动器的 agent 仍可手动输入
`paopao / {task}` 触发（主协议识别优先）。

**4. 验证**

新会话中应能在 skill 列表看到 `paopao-team-skills`；
输入 `paopao / 我的任务` 或 `/paopao 我的任务` 触发。

</details>

---

## 🎭 五位角色

泡泡团队由 **1 位总监 + 4 位专家** 组成，自动协作完成你的项目。

```
                    ┌─────────────┐
                    │  🎯 项目总监  │  ← 状态机控制、质量门禁
                    │  (Director) │
                    └──────┬──────┘
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐    ┌──────▼──────┐    ┌─────▼─────┐
    │ 📋 PM   │    │ 🖌️ UI/UX   │    │ 🛠️ Dev    │
    │ 产品经理 │    │ 设计师      │    │ 全栈工程师  │
    └─────────┘    └─────────────┘    └─────┬──────┘
                                            │
                                       ┌────▼─────┐
                                       │ 🧪 QA    │
                                       │ 质量保障  │
                                       └──────────┘
```

| 角色 | 职责 |
|------|------|
| 🎯 **项目总监** | 战略对齐、角色编排、状态机控制、质量门禁 |
| 📋 **产品经理** | 需求分析、HITL 决策、PRD 产出 |
| 🖌️ **UI/UX 设计师** | 设计规范、Design Token、组件状态机 |
| 🛠️ **全栈工程师** | 技术方案、脚手架初始化、代码落盘 |
| 🧪 **质量保障** | 测试计划、Code Review、测试执行 |

---

## 🔄 两阶段工作流

### 阶段一：规划 — `paopao / {任务}`

```
用户指令 ──→ Director 编排 4 个角色依次产出
                ├── PM → 产品需求文档 (PRD)
                ├── UI/UX → 设计规范 + Design Token
                ├── Dev → 技术方案与开发计划
                └── QA → 测试计划

所有规划文档存入 paopao-task/{项目名}/ 目录（记忆区）
完成后 Director 输出交接提示词（含完整上下文）
```

```bash
paopao / 开发一个潮汐查询 Web 应用
```

### 阶段二：执行 — `paopao-build / {任务}`

```
在新对话窗口中粘贴交接提示词 ──→ Director 读取规划文档
                ├── Dev → 脚手架初始化 → 分批编写代码
                └── QA → Code Review → 测试执行

代码直接写入你的当前工作目录（施工区）
完成后输出项目总结报告
```

```bash
paopao-build / 开发一个潮汐查询 Web 应用
```

> **核心原则**：规划文档 → `paopao-task/`（记忆区），
> 代码 → 工作目录（施工区），状态 → `state/`（状态区），
> **三区严格隔离，永不跨界**。

---

## ✨ 核心特性

- **🧩 纯 Prompt 驱动** — 所有逻辑在 Prompt 中定义，
  无需安装任何依赖包
- **📁 物理边界隔离** — 文档、代码、状态三区严格分离，
  防止 AI 行为污染
- **🔄 两阶段工作流** — 先规划再执行，
  避免边写边改导致的上下文混乱
- **👤 HITL 决策** — 需求模糊时主动向用户请示，
  不盲目猜测
- **📐 零依赖** — 仅使用 Node.js 原生模块，
  `npm install` 都不需要
- **📄 agent.md 配置** — 项目级配置文件，
  一键设定技术栈、设计风格、QA 标准

---

## 📁 目录结构

```
paopao-team-skills/
├── SKILL.md              # Skill 入口（Agent Skills 规范，双端通用）
├── main.md               # 主协议（AI 路由器）
├── .opencode/command/    # OpenCode slash 启动器（薄适配）
│   ├── paopao.md
│   ├── paopao-build.md
│   └── paopao-status.md
├── .claude/commands/     # Claude Code slash 启动器（同款薄适配）
│   └── paopao{,-build,-status}.md
├── roles/                # 5 大角色定义
│   ├── project-director/     # 🎯 项目总监
│   │   ├── profile.md
│   │   ├── templates/README_blueprint.md
│   │   └── scripts/generate_handover_prompt.js
│   ├── product-manager/      # 📋 产品经理
│   │   ├── profile.md
│   │   ├── templates/prd-template.md
│   │   └── scripts/{pm_research,pm_state}.js
│   ├── ui-ux-designer/       # 🖌️ UI/UX 设计师
│   │   ├── profile.md
│   │   └── templates/design-template.md
│   ├── fullstack-dev-engineer/ # 🛠️ 全栈工程师
│   │   ├── profile.md
│   │   └── templates/dev-template.md
│   └── quality-assurance/    # 🧪 质量保障
│       ├── profile.md
│       └── templates/test-template.md
├── templates/
│   └── agent-template.md # agent.md 标准模板
├── tools/                # 公共工具（零依赖）
│   ├── file_ops.js
│   ├── context_loader.js
│   └── env_check.sh
└── state/                # 状态区说明与模式格式
    ├── README.md
    └── patterns/FORMAT.md
```

运行时产生三类隔离区域（与用户项目目录平级）：

```
{用户项目目录的上一级}/
├── paopao-task/{项目}/   ← 记忆区（规划文档）
│   ├── prd.md
│   ├── design.md
│   ├── dev-plan.md
│   ├── qa-plan.md
│   ├── vision.md / risk-log.md / decision-log.md
│   └── ...
│
├── state/{项目}/         ← 状态区（运行时状态）
│   ├── state.json
│   └── pm-state.json（PM 子状态，可选）
│
└── 你的项目目录/          ← 施工区（代码）
    ├── agent.md           ← 项目级配置
    ├── .pipeline/         ← Dev 过程性交付物
    └── src/
```

---

## ⚙️ Agent.md 项目配置

在项目根目录创建 `agent.md`，告诉`泡泡团队`你的技术偏好。
**标准模板见 `templates/agent-template.md`**，覆盖 6 个
标准章节：`[项目元数据] / [PM 偏好] / [设计规范] /
[开发规范] / [Dev 偏好] / [QA 偏好]`。

```markdown
# MyProject — Agent 配置

## [项目元数据]
- 项目名: MyProject
- 规模预期: medium

## [开发规范]
- 语言/框架: TypeScript + Next.js 14
- 包管理: pnpm

## [设计规范]
- 设计风格: 极简专业风
- 组件库: shadcn/ui
- 深色模式: 支持

## [Dev 偏好]
- 脚手架: create-next-app
- 数据库/ORM: PostgreSQL + Prisma

## [QA 偏好]
- 严格度: 标准
```

> 💡 首次运行 `paopao / {任务}` 时，AI 会自动检测
> 并协助生成 `agent.md` 模板。

---

## 🛠️ 内置工具

| 工具 | 用途 |
|------|------|
| `tools/file_ops.js` | 文件/目录 CRUD（含 stdin/--file 写入、删除白名单、slugify） |
| `tools/context_loader.js` | 大文件分块读取（防上下文溢出） |
| `tools/env_check.sh` | 环境检测 + 文件完整性检查 |
| `roles/project-director/scripts/generate_handover_prompt.js` | 交接提示词生成 |
| `roles/product-manager/scripts/pm_research.js` | 搜索词生成 + 调研框架结构化 |
| `roles/product-manager/scripts/pm_state.js` | PM 工作状态持久化 |

---

## 🧪 真实使用示例

```bash
# 在 AI 对话窗口中输入：
paopao / 开发一个潮汐查询 Web 应用，支持显示全球主要港口的实时潮汐数据
```

AI 团队自动执行：

1. **PM** 分析需求 → 产出 PRD（含页面结构、用户流程）
2. **UI/UX** 设计界面 → 产出设计规范 + Design Token
3. **Dev** 规划技术 → 产出技术方案（框架、API、数据流）
4. **QA** 制定测试 → 产出测试计划（用例、覆盖率要求）

→ **规划完成，拿到交接提示词**

```
paopao-build / 潮汐查询 Web 应用
```

在新窗口粘贴执行：

5. **Dev** 初始化项目 → 编写所有代码
6. **QA** 审查代码 → 运行测试 → 产出报告

→ **项目交付完成 🎉**

---

## 📜 设计理念

- **零依赖** — 纯文本 + Node.js 原生模块，即拉即用
- **纯文本驱动** — 所有状态和文档均为纯文本 / Markdown，
  人类可读、AI 可写
- **对话即工作流** — 每个阶段一个对话窗口，上下文纯净
- **Human-in-the-Loop** — AI 知道何时向人类求助

---

## 🤝 贡献指南

欢迎贡献！为`PaopaoTeamSkills`贡献一份力。

- **勿添加 npm 依赖** — 零依赖是核心设计原则
- **勿引入构建工具** — 无需 webpack/tsc/babel
- **文档优先** — 修改行为时先更新 profile.md

---

## 📄 许可证

MIT License © 2026 [荏狸十三](https://github.com/RenLishisan)
