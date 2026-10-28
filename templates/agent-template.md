# {{project_name}} — agent.md（泡泡团队标准配置模板）

> **用法**：复制本模板到你的项目根目录，重命名为
> `agent.md`，按需填写。未出现的条目使用各角色
> Profile 的内置默认值。
>
> **格式要求**：每个配置章节必须是二级标题
> `## [章节名]`（方括号为章节名的一部分），
> 下方用要点列表或表格描述。五个角色按
> main.md「agent.md 读取协议」各自提取所需章节。

## [项目元数据]

由 Director 与 PM 共同消费。

- 项目名: {{name}}
- 一句话描述: {{one_line}}
- 目标用户: {{audience}}
- 交付期限: {{deadline}}（如 2026-12-31，可留空）
- 规模预期: small | medium | large
  （可留空，由 Director 按任务复杂度判级后写入 state.json）

## [PM 偏好]

- 调研深度: L0 | L1 | L2 | L3（默认 L1；
  L0=纯联网搜索，L3=含用户访谈）
- PRD 详细度: 极简 | 标准 | 详尽（默认标准）
- 北极星指标: {{north_star}}（可留空，由 PM 定义）
- 决策风格: 保守 | 均衡 | 激进（默认均衡）
- 竞品清单: {{known_competitors}}（可留空）

## [设计规范]

- 设计风格: {{style}}（如：极简专业风；可留空由
  UI/UX 发起 design_brief_request 沟通）
- 品牌色: {{brand_color}}（如 #3B82F6）
- 组件库: {{ui_kit}}（如 shadcn/ui；默认无，用原生组件）
- 深色模式: 支持 | 不支持（默认支持）
- 无障碍等级: WCAG AA | AAA（默认 AA）

## [开发规范]（Dev 最高优先级，覆盖模板默认值）

- 语言/框架: {{language_framework}}（如 TypeScript + Next.js）
- 包管理: npm | pnpm | yarn | cargo | uv …（按生态）
- 代码行宽: 默认 64 字符（LLM 输出友好，可放宽到 80）
- Lint / Format: {{lint_tool}}（如 ESLint + Prettier）
- 提交规范: 约定式提交（feat/fix/docs/chore…）

## [Dev 偏好]（Dev 最高优先级，覆盖模板默认值）

- 脚手架: {{scaffold}}（推荐所选生态官方 CLI）
- 数据库 / ORM: {{database_orm}}
- Monorepo: 是 | 否（默认否，单应用结构）
- 测试覆盖: 单元 / 集成 / E2E 覆盖率
  （默认 80% / 60% / 关键路径；small 项目自动放宽）
- 可观测性: Sentry | 结构化日志 | OpenTelemetry
  （默认结构化日志；small 项目可仅保留日志）
- CI/CD: GitHub Actions | GitLab CI | 关闭
  （默认关闭；small 项目强制关闭以保持轻量）

## [QA 偏好]

- 用例分布（金字塔数量占比）: 70/20/10（单/集/E2E）
- 覆盖率下限: 单元 80% / 集成 60%（与 [Dev 偏好] 一致时
  以 [Dev 偏好] 为准）
- 严格度: 宽松 | 标准 | 严格（默认标准）
  - 宽松 = 仅阻塞 P0 的问题必须修复
  - 标准 = Critical 必修 + Major ≤ 3 可放行
  - 严格 = 全部修复并通过复测后才放行
- Review 重点: 契约 | 安全 | 性能 | 一致性
  （默认全部；可精简为逗号分隔的子集）
