---
description: 泡泡团队：只读查看项目状态与产出索引，不推进工作流
---

执行泡泡团队**状态查询**（只读，不推进任何工作流）：

1. 读取 `{workspace 上级}/state/{项目}/state.json`
   （项目名来自 `$ARGUMENTS`；为空则读取该 state/ 下
   唯一的项目子目录）。
2. 输出状态摘要：
   - 项目名 / project_size / methodology / current_phase
   - completed_steps 与 pending_steps
   - `{workspace 上级}/paopao-task/{项目}/` 产出文档索引
     （ls 读取，不读内容）
   - risk-log.md 中未解决的高/中风险条数
3. 若 state.json 不存在：输出「尚无进行中的项目，
   可用 paopao / {task} 开始」，然后结束。
4. 严格不写任何文件、不更新状态。

项目名: $ARGUMENTS
