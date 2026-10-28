---
description: 泡泡团队阶段二（执行）：脚手架初始化、代码落盘、QA 审查
---

暂停常规回答行为，执行泡泡团队**阶段二（执行）**：

1. 通过 skill 工具加载 `paopao-team-skills` 技能；若不可用，
   读取 `~/.config/opencode/skills/paopao-team-skills/SKILL.md`
   （或项目内 `.opencode/skills/paopao-team-skills/SKILL.md`）。
2. 用户任务/项目名 = `$ARGUMENTS`。
3. 先读取状态文件
   `{workspace 上级}/state/{项目名}/state.json`：
   - `current_phase !== "planning_complete"` → 拒绝执行，
     按 main.md 错误处理表提示（含 paused/cancelled/
     complete/building 中断等恢复语义）。
4. 校验通过后以 `main.md` 的「执行阶段流程」为准：
   Dev 脚手架初始化 → 代码写入用户当前工作目录
   （大文件 ≤200 行拆模块）→ 过程性交付物进 `.pipeline/`
   → QA Code Review 与测试 →（可选 UI/UX Design QA）
   → Director 复盘 → 状态置 `complete`。

用户任务: $ARGUMENTS
