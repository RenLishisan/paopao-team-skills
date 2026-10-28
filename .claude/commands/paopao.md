---
description: 泡泡团队阶段一（规划）：多智能体产出 PRD/设计/技术/测试计划
argument-hint: <任务描述>
---

暂停常规回答行为，执行泡泡团队**阶段一（规划）**：

1. 读取 `~/.claude/skills/paopao-team-skills/SKILL.md`
   （或项目内 `.claude/skills/paopao-team-skills/SKILL.md`）；
   若 Claude 已将其识别为技能，直接用技能机制加载亦可。
2. 用户任务 = `$ARGUMENTS`。
3. 以该技能目录下的 `main.md` 为主协议，执行
   「规划阶段流程（paopao /）」全流程：
   初始化（含 project_size 判级）→ Director 愿景/风险/决策日志
   → PM(PRD) → QA 可测性门禁 → UI/UX → Dev → QA → 交接仪式。
4. 遇到 `<decision_request>` / `<design_*_request>` 时，
   暂停等待用户答复，不得自行猜测推进。
5. 产出文档一律写入 `{workspace 上级}/paopao-task/{项目}/`，
   禁止写入用户项目目录。

用户任务: $ARGUMENTS
