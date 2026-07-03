# 🫧 PaopaoTeamSkills 泡泡团队

> **多智能体原生 AI Skill** — 从想法雏形到生产代码，一支 AI 团队为你而战

```text
paopao / 帮我开发一个...  →  产品经理 → 设计师 → 工程师 → QA  →  高质量项目落地
```

---

## 📦 这是什么？

**泡泡团队**是一个 **AI Agent Skill** —— 专为 OpenCode 等 AI 编程助手设计的
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
AI 编程助手 (OpenCode)
  ├── 🔧 通用能力             ← 写代码、读文件、联网搜索
  └── 🧩 加载 Skill            ← 激活泡泡团队多智能体框架
        ├── main.md            ← 主入口指令（告诉 AI 如何工作）
        ├── roles/             ← 5 个角色定义
        └── tools/             ← 文件操作、环境检测等工具
```

加载 Skill 后，AI 获得完整的多智能体协作能力。

---

## 🚀 一键接入（AI Agent 安装）

### 方式一：自动安装

将以下提示词发送到你的 AI 编程助手对话窗口：

> 请阅读 https://github.com/RenLishisan/paopao-team-skills 文档，
> 按照步骤为我安装并配置 PaopaoTeamSkills Skill。

AI 将自动完成安装流程。

### 方式二：手动安装

<details>
<summary>点击展开手动步骤</summary>

**1. 克隆项目到本地**

```bash
git clone git@github.com:RenLishisan/paopao-team-skills.git
```

**2. 检查环境**

```bash
bash paopao-team-skills/tools/env_check.sh
```

**3. 在 AI 编程助手中配置 Skill 路径**

将 `paopao-team-skills/` 目录路径配置到你的 AI 工具中。
以 OpenCode 为例：

```json
{
  "skills": [
    {
      "name": "paopao-team-skills",
      "location": "/path/to/paopao-team-skills"
    }
  ]
}
```

> **要求**：Node.js v16+（推荐 v18+），零 npm 依赖。

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
├── main.md              # 主入口指令（AI 路由器）
├── roles/               # 5 大角色定义
│   ├── project-director/    # 🎯 项目总监
│   ├── product-manager/     # 📋 产品经理
│   ├── ui-ux-designer/      # 🖌️ UI/UX 设计师
│   ├── fullstack-dev-engineer/ # 🛠️ 全栈工程师
│   └── quality-assurance/   # 🧪 质量保障
├── tools/               # 公共工具（零依赖）
│   ├── file_ops.js
│   ├── context_loader.js
│   └── env_check.sh
└── state/               # 状态管理
```

运行时产生三类隔离区域：

```
工作目录上级/
├── paopao-task/{项目}/    ← 记忆区（规划文档）
│   ├── prd.md
│   ├── design.md
│   ├── dev-plan.md
│   └── qa-plan.md
│
└── 你的项目目录/          ← 施工区（代码）
    ├── agent.md          ← 项目级配置
    └── src/
```

---

## ⚙️ Agent.md 项目配置

在项目根目录创建 `agent.md`，告诉`泡泡团队`你的技术偏好。

```markdown
# MyProject — Agent 配置

## 开发规范
- 框架: Next.js 14
- 语言: TypeScript
- 包管理: pnpm
- 测试: Vitest + Playwright

## 设计规范
- 设计风格: 极简专业风
- 组件库: shadcn/ui
- 深色模式: 支持

## Dev 偏好
- 脚手架: create-t3-app
- 数据库: PostgreSQL
- ORM: Prisma
```

> 💡 首次运行 `paopao / {任务}` 时，AI 会自动检测
> 并协助生成 `agent.md` 模板。

---

## 🛠️ 内置工具

| 工具 | 用途 |
|------|------|
| `file_ops.js` | 文件/目录 CRUD 操作 |
| `context_loader.js` | 大文件分块读取（防上下文溢出） |
| `env_check.sh` | 环境检测（Node.js 版本） |

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
