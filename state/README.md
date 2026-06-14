# 📊 狀態管理說明

## 概述

`state/` 目錄用於存儲 paopao-team-skills 框架的運行時狀態。狀態以純文本 JSON 文件形式存儲，無需數據庫依賴。

## 狀態文件

### `state.json` — 主狀態文件

每次執行 `paopao / {task}` 或 `paopao-build / {task}` 時，狀態機自動創建/更新此文件。

```json
{
  "project_name": "开发一个天气查询 Web 应用",
  "current_phase": "planning",
  "completed_steps": [],
  "pending_steps": [
    "pm_prd",
    "ui_ux_design",
    "dev_plan",
    "qa_plan"
  ],
  "workspace_path": "/Users/xxx/projects/my-app",
  "task_path": "/Users/xxx/paopao-task/my-app",
  "started_at": "2026-06-14T00:00:00.000Z",
  "updated_at": "2026-06-14T00:00:00.000Z"
}
```

### 字段說明

| 字段 | 類型 | 說明 |
|------|------|------|
| `project_name` | string | 項目名稱，從用戶任務描述中提取 |
| `current_phase` | string | 當前階段：`planning` | `building` | `planning_complete` | `complete` |
| `completed_steps` | string[] | 已完成步驟列表 |
| `pending_steps` | string[] | 待完成步驟列表 |
| `workspace_path` | string | 用戶當前工作目錄（代碼施工區） |
| `task_path` | string | `paopao-task/` 下的任務目錄路徑（文檔記憶區） |
| `started_at` | string (ISO 8601) | 開始時間 |
| `updated_at` | string (ISO 8601) | 最後更新時間 |

### 階段機狀態轉移

```
[planning] ──規劃階段──→ [planning_complete] ──paopao-build──→ [building] ──完成──→ [complete]
```

### 步驟枚舉

| 步驟 ID | 說明 | 所屬角色 |
|---------|------|----------|
| `pm_prd` | 產品需求文檔 | PM |
| `ui_ux_design` | UI/UX 設計規範 | UI/UX |
| `dev_plan` | 技術方案與開發計劃 | Dev |
| `qa_plan` | 測試計劃 | QA |
| `dev_code` | 代碼開發 | Dev |
| `qa_review` | Code Review 與測試 | QA |

## 使用方式

狀態文件由 Director 角色通過 `tools/file_ops.js` 讀寫，LLM 不直接修改文件，而是通過指示 Director 來更新狀態。

### 讀取狀態
```bash
node tools/file_ops.js read state/state.json
```

### 寫入狀態
```bash
node tools/file_ops.js write state/state.json '{"project_name":"...","current_phase":"planning",...}'
```

## 注意事項

- `state/` 目錄中的所有文件不提交到版本控制（已添加至 `.gitignore`）
- 如果 `state.json` 丟失，需要重新從 `paopao /` 開始
- 不建議手動編輯 `state.json`，可能導致狀態不一致
