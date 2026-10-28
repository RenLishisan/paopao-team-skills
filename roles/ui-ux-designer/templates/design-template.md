# {{project_name}} — 设计规范

> 版本: v1.0
> 作者: UI/UX (paopao-team-skills)
> 基于 PRD: paopao-task/{{project_name}}/prd.md

---

## 适用模式与章节裁剪（先读再填）

| project_size | 输出章节 | 说明 |
|--------------|----------|------|
| small | 本模板整体不使用 | UI 由 PM 在 PRD 中直接描述 |
| medium（精简版） | 零~四、九、十一 | 方向/原则/Token/CSS 变量/页面清单/开发标记/验收 |
| large（完整版） | 零~十二 + 附录 | 含组件目录/表单/导航/交互/附录规范 |

> 读取协议：先用 context_loader 只读本节
> （顶部 60 行），确认本模式章节清单后跳读
> 对应段落，禁止全量读取。

---

## 零、 设计方向

### 0.1 设计风格声明

```
风格定位:
  {{简约专业 / 温暖友好 / 科技前卫 / 自定义}}
色彩基调: {{冷色 / 暖色 / 中性}}
核心气质: {{简洁 / 活力 / 信任 / 温暖 / 创新}}
```

### 0.2 设计决策依据

- 品牌指南/设计主题来源:
  {{已有 / 沟通确认 / 无}}
- 用户偏好（来自 design_brief_request）:
  {{记录用户的关键反馈}}
- 竞品设计参考: {{参考产品链接}}

### 0.3 设计方向确认记录

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 色彩方向 | {{深色/浅色/彩色}} | {{理由}} |
| 圆角风格 | {{统一/混合/直角}} | {{理由}} |
| 字体风格 | {{衬线/无衬线}} | {{理由}} |

---

## 一、 设计原则

1. {{原则一：简洁明了}}
2. {{原则二：一致性}}
3. {{原则三：可访问性}}
4. {{原则四：高效}}
5. {{原则五：容错性}}

---

## 二、 Design Token

> 开发者通过 CSS 变量直接使用。
> 所有 Token 已在 CSS 变量映射
> （第三章）中定义。

### 2.1 色彩体系

```json
{
  "color": {
    "primary": {
      "value": "#3B82F6",
      "description": "主色/品牌色"
    },
    "primary-hover": {
      "value": "#2563EB",
      "description": "主色悬停态"
    },
    "primary-light": {
      "value": "#DBEAFE",
      "description": "主色浅色背景"
    },
    "bg-primary": {
      "value": "#FFFFFF",
      "description": "页面主背景"
    },
    "bg-secondary": {
      "value": "#F9FAFB",
      "description": "页面次背景"
    },
    "text-primary": {
      "value": "#111827",
      "description": "主要文字"
    },
    "text-secondary": {
      "value": "#6B7280",
      "description": "次要文字"
    },
    "text-tertiary": {
      "value": "#9CA3AF",
      "description": "辅助文字/占位符"
    },
    "border": {
      "value": "#E5E7EB",
      "description": "边框色"
    },
    "error": {
      "value": "#EF4444",
      "description": "错误/危险"
    },
    "success": {
      "value": "#10B981",
      "description": "成功"
    },
    "warning": {
      "value": "#F59E0B",
      "description": "警告"
    },
    "info": {
      "value": "#3B82F6",
      "description": "信息提示"
    }
  }
}
```

### 2.2 透明度

```json
{
  "opacity": {
    "disabled": 0.38,
    "hint": 0.6,
    "overlay": 0.8
  }
}
```

### 2.3 排版体系

> 使用说明: h1/h2 用于页面标题和区域标题，
> body 用于正文，caption 用于辅助文字。

```json
{
  "typography": {
    "font-family": {
      "value": "Inter, system-ui, sans-serif"
    },
    "h1": {
      "size": "2rem",
      "weight": 700,
      "line-height": "2.5rem",
      "usage": "页面主标题"
    },
    "h2": {
      "size": "1.5rem",
      "weight": 600,
      "line-height": "2rem",
      "usage": "区域标题"
    },
    "h3": {
      "size": "1.25rem",
      "weight": 600,
      "line-height": "1.75rem",
      "usage": "卡片/区块标题"
    },
    "body": {
      "size": "1rem",
      "weight": 400,
      "line-height": "1.5rem",
      "usage": "正文"
    },
    "body-small": {
      "size": "0.875rem",
      "weight": 400,
      "line-height": "1.25rem",
      "usage": "辅助正文/表单项"
    },
    "caption": {
      "size": "0.75rem",
      "weight": 400,
      "line-height": "1rem",
      "usage": "辅助文字/时间戳"
    }
  }
}
```

**字体使用指南:**
| Token | 使用场景 |
|-------|----------|
| h1 | 页面级标题，每页仅一个 |
| h2 | 功能区域标题，如"最近项目""团队动态" |
| h3 | 卡片标题、区块标题 |
| body | 正文内容、表格内容、列表内容 |
| body-small | 表单标签、输入框内容、侧边栏文字 |
| caption | 辅助信息、时间戳、版权信息、占位符 |

### 2.4 间距体系

> 所有间距按 4px 基准的倍数递增。
> 布局中优先使用 spacing token，避免
> 任意数值。

```json
{
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  }
}
```

**间距使用指南:**
| Token | 值 | 使用场景 |
|-------|-----|----------|
| xs | 4px | 图标与文字间、紧凑布局 |
| sm | 8px | 相邻元素间距、组件内间距 |
| md | 16px | 卡片内容边距、表单字段间距 |
| lg | 24px | 区块间距、表单分组间距 |
| xl | 32px | 页面区域间距 |
| 2xl | 48px | 大区块间距 |
| 3xl | 64px | 页面级边距 |

### 2.5 圆角

```json
{
  "border-radius": {
    "none": "0",
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "full": "9999px"
  }
}
```

**圆角使用指南:**
| Token | 使用场景 |
|-------|----------|
| none | 表格、列表、导航栏 |
| sm | 输入框、按钮、卡片 |
| md | 对话框、下拉菜单、大卡片 |
| lg | 弹窗、大图展示 |
| full | 头像、标签、开关 |

### 2.6 阴影

```json
{
  "shadow": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  }
}
```

**阴影使用指南:**
| Token | 使用场景 |
|-------|----------|
| sm | 卡片默认态、小元素浮起 |
| md | 下拉菜单、弹出面板 |
| lg | 对话框、模态框 |
| xl | Toast、通知、顶层浮层 |

### 2.7 响应式断点

```json
{
  "breakpoint": {
    "xs": "0px",
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px"
  }
}
```

### 2.8 动效 Token

```json
{
  "motion": {
    "duration-fast": {
      "value": "150ms",
      "description": "微交互/悬停"
    },
    "duration-normal": {
      "value": "300ms",
      "description": "组件过渡"
    },
    "duration-slow": {
      "value": "500ms",
      "description": "页面转场"
    },
    "easing-default": {
      "value": "cubic-bezier(0.4, 0, 0.2, 1)",
      "description": "标准缓动"
    },
    "easing-enter": {
      "value": "cubic-bezier(0.0, 0, 0.2, 1)",
      "description": "入场缓动"
    },
    "easing-exit": {
      "value": "cubic-bezier(0.4, 0, 1, 1)",
      "description": "出场缓动"
    }
  }
}
```

---

## 三、 CSS 变量映射

> 开发者直接将此 CSS 复制到全局样式入口文件。

```css
:root {
  --color-primary: #3B82F6;
  --color-primary-hover: #2563EB;
  --color-primary-light: #DBEAFE;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-border: #E5E7EB;
  --color-error: #EF4444;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;

  --opacity-disabled: 0.38;
  --opacity-hint: 0.6;

  --font-family-base: 'Inter', system-ui,
    sans-serif;
  --font-size-h1: 2rem;
  --font-weight-h1: 700;
  --font-lineheight-h1: 2.5rem;
  --font-size-h2: 1.5rem;
  --font-weight-h2: 600;
  --font-lineheight-h2: 2rem;
  --font-size-h3: 1.25rem;
  --font-weight-h3: 600;
  --font-lineheight-h3: 1.75rem;
  --font-size-body: 1rem;
  --font-weight-body: 400;
  --font-lineheight-body: 1.5rem;
  --font-size-body-small: 0.875rem;
  --font-weight-body-small: 400;
  --font-lineheight-body-small: 1.25rem;
  --font-size-caption: 0.75rem;
  --font-weight-caption: 400;
  --font-lineheight-caption: 1rem;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px 0
    rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px
    rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px
    rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px
    rgba(0, 0, 0, 0.1);

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  --motion-duration-fast: 150ms;
  --motion-duration-normal: 300ms;
  --motion-duration-slow: 500ms;
  --motion-easing-default:
    cubic-bezier(0.4, 0, 0.2, 1);
  --motion-easing-enter:
    cubic-bezier(0.0, 0, 0.2, 1);
  --motion-easing-exit:
    cubic-bezier(0.4, 0, 1, 1);
}
```

### 深色模式 CSS 变量

```css
[data-theme="dark"] {
  --color-bg-primary: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary: #64748B;
  --color-border: #334155;
  --color-primary: #60A5FA;
  --color-primary-hover: #93C5FD;
  --color-primary-light: #1E3A5F;
  --shadow-sm: 0 1px 2px 0
    rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px
    rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px
    rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 20px 25px -5px
    rgba(0, 0, 0, 0.5);
}
```

---

## 四、 页面清单

> 此章节列出项目的所有页面/视图，
> 每页包含：路由、布局、使用组件清单。

| 页面 | 路由 | 布局模板 | 包含组件 |
|------|------|----------|----------|
| {{登录页}} | {{/login}} | 居中布局 | Input, Button, Checkbox |
| {{首页}} | {{/}} | 侧边栏布局 | Header, Sidebar, Card, Table |
| {{详情页}} | {{/:id}} | 侧边栏布局 | Header, Detail, Tabs, Table |
| {{设置页}} | {{/settings}} | 侧边栏布局 | Header, Form, Input, Select |
| ... | ... | ... | ... |

### 4.1 {{页面一：登录页}}

**路由**: {{/login}}

**布局**: 居中卡片式，背景为
  `--color-bg-secondary`

**内容区域**:
```
┌────────────────────────────────┐
│          品牌 Logo             │
│                                │
│  ┌────────────────────────┐   │
│  │ 欢迎回来                  │   │
│  │ 请输入账号密码登录        │   │
│  │                         │   │
│  │ [ 邮箱/手机号 ]         │   │
│  │ [ 密码     ] [忘记?]    │   │
│  │ □ 记住我                 │   │
│  │ [    登 录    ]          │   │
│  │                         │   │
│  │ 还没有账号？去注册 →      │   │
│  └────────────────────────┘   │
│                                │
│           Footer               │
└────────────────────────────────┘
```

**组件使用清单**:
| 组件 | 数量 | 用途 |
|------|------|------|
| Logo | 1 | 品牌展示 |
| Input | 2 | 邮箱/密码输入 |
| Button | 1 | 登录提交 |
| Checkbox | 1 | 记住我 |
| Link | 2 | 忘记密码/去注册 |

**页面状态**:
| 状态 | 表现 |
|------|------|
| 默认 | 空表单，邮箱输入框聚焦 |
| 输入中 | 密码显隐切换可用 |
| 验证错误 | 字段下方红色提示文字 |
| 提交中 | Button 显示 loading 状态 |
| 提交失败 | Toast 提示错误详情 |
| 提交成功 | 跳转至首页 |

### 4.2 {{页面二：首页}}

**路由**: {{/}}

**布局**: 侧边栏布局

```
┌──────────┬──────────────────────────┐
│ Sidebar  │ Header (搜索/通知/头像)    │
│  (固定)  ├──────────────────────────┤
│ 菜单项1  │  欢迎语 + 快捷操作         │
│ 菜单项2  │  ┌─────┐ ┌─────┐ ┌─────┐ │
│ 菜单项3  │  │统计卡│ │统计卡│ │统计卡│ │
│ 菜单项4  │  └─────┘ └─────┘ └─────┘ │
│          │  ┌────────────────────┐  │
│ 用户信息  │  │ 最近动态列表        │  │
│ 退出登录  │  │ item 1            │  │
│          │  │ item 2            │  │
│          │  │ item 3            │  │
│          │  └────────────────────┘  │
└──────────┴──────────────────────────┘
```

**组件使用清单**:
| 组件 | 数量 | 用途 |
|------|------|------|
| Sidebar | 1 | 主导航 |
| Header | 1 | 顶部操作栏 |
| StatCard | 3 | 数据统计卡片 |
| List | 1 | 最近动态 |

**页面状态**:
| 状态 | 表现 |
|------|------|
| 加载中 | StatCard 骨架屏，List 骨架行 |
| 空状态 | 无统计数据时显示 "--" 占位 |
| 错误 | 数据加载失败显示重试提示 |
| 正常 | 展示完整数据 |

### 4.3 {{页面三：设置页}}

...（篇幅原因省略类似结构，按 PRD 补充）

---

## 五、 布局系统

### 5.1 布局模板

项目使用以下布局模板：

**布局 A — 居中布局**（用于登录/注册）
```
┌──────────────────────────┐
│                          │
│      ┌──────────┐       │
│      │ 内容卡片  │       │
│      │ 最大 400px│       │
│      └──────────┘       │
│                          │
└──────────────────────────┘
```

**布局 B — 侧边栏布局**（用于主要功能页）
```
┌──────────┬───────────────────┐
│ 侧边栏    │  内容区            │
│ 240px    │  flex: 1          │
│ 固定     │  内边距            │
│ 深色背景  │  --spacing-xl     │
└──────────┴───────────────────┘
```

### 5.2 响应式适配规则

| 断点 | 侧边栏 | 导航 | 表格 | 卡片网格 |
|------|--------|------|------|----------|
| xs | 隐藏，浮层式 | 汉堡菜单 | 卡片列表 | 1 列 |
| sm | 隐藏，浮层式 | 汉堡菜单 | 卡片列表 | 2 列 |
| md | 可折叠图标栏 | 顶部导航 | 表格 | 3 列 |
| lg | 展开 240px | 顶部导航 | 表格 | 3 列 |
| xl | 展开 240px | 顶部导航 | 表格 | 4 列 |

### 5.3 网格系统

- 使用 CSS Grid 布局
- 列数: 12 列网格
- 列间距: `--spacing-md`
- 行间距: `--spacing-md`
- 容器最大宽度: 1280px，居中

---

## 六、 组件目录

> 以下列出项目所需的全部组件及其规范。
> Dev 根据此目录实现每个组件。

### 6.1 通用组件

#### 6.1.1 Button 按钮

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'primary' / 'secondary' / 'ghost' / 'danger' / 'link' | 'primary' | 按钮变体 |
| size | 'sm' / 'md' / 'lg' | 'md' | 按钮尺寸 |
| loading | boolean | false | 加载态 |
| disabled | boolean | false | 禁用态 |
| fullWidth | boolean | false | 是否撑满父容器 |
| icon | string (icon name) | - | 前置图标 |
| iconPosition | 'left' / 'right' | 'left' | 图标位置 |
| type | 'button' / 'submit' / 'reset' | 'button' | HTML type |
| onClick | () => void | - | 点击回调 |

**尺寸规格**:
| 尺寸 | 高度 | 水平内边距 | 字号 | 圆角 |
|------|------|-----------|------|------|
| sm | 32px | sm (8px) | body-small | sm |
| md | 40px | md (16px) | body | sm |
| lg | 48px | xl (16px) | body | sm |

**样式映射**:
| variant | 背景 | 文字色 | 边框 | 悬浮背景 | 悬浮边框 |
|---------|------|--------|------|----------|----------|
| primary | primary | white | none | primary-hover | - |
| secondary | transparent | primary | primary | primary-light | primary |
| ghost | transparent | text-primary | none | bg-secondary | - |
| danger | error | white | none | error-hover#DC2626 | - |
| link | transparent | primary | none | transparent | - |

**状态行为**:
| 状态 | 视觉效果 |
|------|----------|
| Default | 按 variant 定义 |
| Hover | 背景变深（primary-hover / 10% darken） |
| Active | transform: scale(0.97) |
| Focus | outline: 2px solid primary, outline-offset: 2px |
| Disabled | opacity: 0.38, cursor: not-allowed, 无悬停 |
| Loading | 显示 Spinner，文字保留，宽度不变 |

**代码参考**:
```tsx
// Dev 实现参考接口
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
    | 'danger' | 'link'
  size: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  children: React.ReactNode
}
```

---

#### 6.1.2 Input 输入框

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | - | 标签文字 |
| placeholder | string | - | 占位符 |
| type | 'text' / 'password' / 'email' / 'search' / 'number' | 'text' | 输入类型 |
| value | string | - | 受控值 |
| defaultValue | string | - | 非受控默认值 |
| onChange | (value: string) => void | - | 输入回调 |
| error | string | - | 错误提示文字 |
| hint | string | - | 辅助提示文字 |
| disabled | boolean | false | 禁用 |
| maxLength | number | - | 最大字符数 |
| showCount | boolean | false | 是否显示字符计数 |
| prefix | ReactNode | - | 前置图标 |
| suffix | ReactNode | - | 后置图标 |
| autoFocus | boolean | false | 自动聚焦 |
| clearable | boolean | false | 是否可一键清空 |

**尺寸**: 固定高度 40px，字号 body

**状态行为**:
| 状态 | 边框 | 背景 | 其他 |
|------|------|------|------|
| Default | border | bg-primary | - |
| Hover | border darker | bg-primary | - |
| Focus | primary 2px | bg-primary | 轻微上浮阴影 |
| Filled | border | bg-primary | - |
| Disabled | border | bg-secondary | opacity 0.38 |
| Error | error | bg-primary | 下方 error 文字 |
| Success | success | bg-primary | 后缀绿色勾选图标 |

**布局**:
```
┌─────────────────────────┐
│ 标签文字 (body-small)    │
│ ┌─────────────────────┐ │
│ │ 占位符 / 输入内容    │ │
│ └─────────────────────┘ │
│ 提示文字 / 错误文字      │
│ (caption, text-tertiary │
│  或 error 色)           │
└─────────────────────────┘
```

**表单布局**: label 在上，间距
  `--spacing-xs`

---

#### 6.1.3 Select 下拉选择器

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | - | 标签 |
| options | { label: string, value: string, disabled?: boolean }[] | [] | 选项列表 |
| value | string | - | 受控值 |
| placeholder | string | '请选择' | 占位符 |
| onChange | (value: string) => void | - | 选择回调 |
| error | string | - | 错误提示 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | false | 可清空 |

**行为**:
- 点击展开下拉面板
- 面板阴影 `--shadow-md`，圆角 `--radius-md`
- 选项悬停背景 `--color-bg-secondary`
- 选中项标记 primary 色勾选图标
- 点击外部关闭面板
- 键盘支持上下选择 + Enter 确认

---

#### 6.1.4 Modal 模态框

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | boolean | false | 是否显示 |
| onClose | () => void | - | 关闭回调 |
| title | string | - | 标题 |
| size | 'sm' / 'md' / 'lg' | 'md' | 尺寸 |
| footer | ReactNode | - | 底部操作区 |
| closable | boolean | true | 显示关闭按钮 |
| maskClosable | boolean | true | 点击遮罩关闭 |
| destroyOnClose | boolean | false | 关闭时销毁内容 |

**尺寸**:
| 尺寸 | 宽度 |
|------|------|
| sm | 400px |
| md | 560px |
| lg | 720px |

**结构**:
```
┌──遮罩层 (rgba(0,0,0,0.5))──────────┐
│  ┌─ Modal ──────────────────────┐  │
│  │ 标题         [关闭]           │  │
│  │──────────────────────────────│  │
│  │ 内容区                        │  │
│  │                              │  │
│  │──────────────────────────────│  │
│  │ [取消]              [确认]    │  │
│  └──────────────────────────────┘  │
└──────────────────────────────────────┘
```

**动效**:
- 入场: 遮罩淡入 150ms，Modal 向上滑入
  200ms + ease-out
- 出场: 遮罩淡出 150ms，Modal 向下滑出
  150ms + ease-in

---

#### 6.1.5 Table 表格

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | Column[] | - | 列定义 |
| data | Record[] | - | 数据 |
| loading | boolean | false | 加载中 |
| emptyText | string | '暂无数据' | 空态文字 |
| rowKey | string | 'id' | 行唯一键 |
| pagination | PaginationProps | false | 分页配置 |
| onRow | (record) => void | - | 行点击 |
| sortable | boolean | false | 列排序 |
| selectable | boolean | false | 行选择 |

**Column 定义**:
| 属性 | 类型 | 说明 |
|------|------|------|
| key | string | 字段名 |
| title | string | 列标题 |
| width | number/string | 列宽 |
| align | 'left'/'center'/'right' | 对齐 |
| render | (value, record) => ReactNode | 自定义渲染 |
| sorter | (a, b) => number | 排序函数 |

**样式**:
- 表头背景 `--color-bg-secondary`
- 行悬停背景 `--color-bg-secondary`
- 行高 48px（含 `--spacing-md` 上下内边距）
- 底部 border
- 分页在表格底部，居中

**状态**:
| 状态 | 表现 |
|------|------|
| 加载中 | 显示 3-5 行骨架屏 |
| 空 | 居中显示 emptyText + 插图 |
| 正常 | 展示数据行 |
| 错误 | 表格位置显示错误提示 + 重试 |

---

#### 6.1.6 Toast 消息提示

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'success' / 'error' / 'warning' / 'info' | 'info' | 类型 |
| content | string | - | 提示内容 |
| duration | number | 3000 | 自动关闭时间(ms) |
| onClose | () => void | - | 关闭回调 |

**样式映射**:
| type | 图标色 | 边框色 | 背景色 |
|------|--------|--------|--------|
| success | success | success | success + 10%透明度 |
| error | error | error | error + 10%透明度 |
| warning | warning | warning | warning + 10%透明度 |
| info | info | info | info + 10%透明度 |

**位置**: 页面右上角固定，距上 `--spacing-xl`
**动效**: 从右滑入 200ms，自动消失时淡出 200ms

---

#### 6.1.7 Tabs 标签页

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | { key, label, content }[] | - | 标签页列表 |
| activeKey | string | - | 当前激活 |
| onChange | (key) => void | - | 切换回调 |
| type | 'line' / 'card' | 'line' | 样式 |

**样式**:
- line 类型: 选中项底部 primary 色 2px 线条
- 标签间距 `--spacing-md`
- 悬停背景 `--color-bg-secondary`

---

#### 6.1.8 Avatar 头像

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | - | 图片地址 |
| alt | string | - | 替代文本 |
| size | 'sm' / 'md' / 'lg' | 'md' | 尺寸 |
| name | string | - | 无图时显示首字 |

**尺寸**:
| size | 宽高 |
|------|------|
| sm | 32px |
| md | 40px |
| lg | 48px |

**回退**: 无 src 时取 name 首字，
  背景 `--color-primary-light`，
  文字 `--color-primary`

---

#### 6.1.9 Tag 标签

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| color | 'default' / 'primary' / 'success' / 'warning' / 'error' | 'default' | 色彩 |
| closable | boolean | false | 可关闭 |
| onClose | () => void | - | 关闭回调 |

**样式**: 内边距 xs sm，圆角 md，字号 caption

---

#### 6.1.10 Skeleton 骨架屏

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'text' / 'card' / 'table' / 'avatar' | 'text' | 骨架类型 |
| rows | number | 3 | 文本行数 |
| width | string | '100%' | 宽度 |

**动画**: 从左到右扫光效果，1.5s 循环

---

#### 6.1.11 Empty 空状态

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| description | string | '暂无数据' | 说明文字 |
| actionText | string | - | 操作按钮文字 |
| onAction | () => void | - | 操作回调 |

**布局**: 居中显示插图 + description + 可选按钮

---

### 6.2 业务组件

#### 6.2.1 StatCard 统计卡片

**用途**: 首页展示关键数据指标

**Props**:
| Prop | 类型 | 说明 |
|------|------|------|
| title | string | 指标名称 |
| value | string / number | 指标数值 |
| trend | 'up' / 'down' / null | 趋势方向 |
| trendValue | string | 趋势百分比 |
| icon | ReactNode | 图标 |
| loading | boolean | 加载态 |

**尺寸**: 卡片圆角 md，内边距 lg，
  阴影 sm，最小高度 120px

**布局**:
```
┌────────────────────────┐
│ [图标]  指标名称       │
│                        │
│    42,000     ↑ 12.5%  │
│    (大号数值)  (趋势)   │
└────────────────────────┘
```

**状态**:
| 状态 | 表现 |
|------|------|
| 加载中 | 骨架屏矩形 |
| 空 | 数值显示 "--" |
| 正常 | 展示数据 |
| 错误 | 数值显示 "—"，趋势隐藏 |

---

#### 6.2.2 Sidebar 侧边栏

**Props**:
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | MenuItem[] | - | 菜单项 |
| collapsed | boolean | false | 折叠态 |
| onToggle | () => void | - | 折叠切换 |

**MenuItem**:
| 属性 | 类型 | 说明 |
|------|------|------|
| key | string | 唯一键 |
| label | string | 显示文字 |
| icon | ReactNode | 图标 |
| path | string | 路由 |
| children | MenuItem[] | 子菜单 |
| badge | number | 角标数 |

**样式**:
- 展开宽度 240px，折叠宽度 64px
- 背景 `--color-bg-secondary`
- 选中项背景 `--color-primary-light`，文字 primary
- 菜单项高度 44px，内边距 md
- 底部用户信息区域

**响应式**:
- xs/sm: 隐藏，从左侧滑出，遮罩背景
- md+: 固定显示

---

#### 6.2.3 Header 顶部导航

**结构**:
```
┌────────────────────────────────────┐
│ [汉堡]  Logo   搜索框   通知 头像 名│
└────────────────────────────────────┘
```

- 高度 56px
- 背景 `--color-bg-primary`
- 底部 1px `--color-border`
- 左 Logo 区域，右操作区域
- 内边距水平 `--spacing-lg`

---

## 七、 表单规范

### 7.1 表单布局

- 单个字段: label 在上，input 在下
- 标签间距底部 `--spacing-xs`
- 字段间距 `--spacing-md`
- 操作按钮在表单底部，对齐左侧

```
┌─────────────────────────┐
│ 用户名                   │
│ [____________________]  │
│                         │
│ 邮箱                     │
│ [____________________]  │
│                         │
│ 密码                     │
│ [____________________]  │
│                         │
│ [提 交]     [取 消]     │
└─────────────────────────┘
```

### 7.2 表单验证

- 实时验证: 输入框失去焦点时验证
- 提交验证: 全部字段验证，滚动到第一个错误
- 错误显示: 输入框下方红色 caption 文字
- 成功反馈: 输入框绿色边框 + 后缀勾选图标

### 7.3 验证规则示例

| 字段类型 | 规则 | 错误提示 |
|----------|------|----------|
| 必填 | 非空 | "请输入{{字段名}}" |
| 邮箱 | 正则 | "请输入有效的邮箱地址" |
| 密码 | 最少 8 位 | "密码至少 8 位" |
| 手机号 | 11 位数字 | "请输入有效的手机号" |
| 确认密码 | 与密码一致 | "两次输入的密码不一致" |

---

## 八、 导航与路由

### 8.1 路由结构

| 路径 | 页面 | 权限 |
|------|------|------|
| /login | 登录页 | 公开 |
| / | 首页 | 需登录 |
| /{{feature}} | {{功能页}} | 需登录 |
| /{{feature}}/:id | {{详情页}} | 需登录 |

### 8.2 导航规则

- 未登录 → 重定向到 `/login`
- 登录后 → 自动跳转首页
- 侧边栏菜单高亮当前路由
- 面包屑显示页面层级

### 8.3 面包屑

```
首页 > {{功能页}} > {{详情页}}
```

- 分隔符 "/" 灰色 `--color-text-tertiary`
- 最后一级为当前页，无链接

---

## 九、 开发标记

> 以下标记用于 Dev 理解设计意图。

### 9.1 组件命名映射

| 设计名称 | 推荐组件名 | 文件路径建议 |
|----------|-----------|-------------|
| Button | Button | components/ui/button |
| Input | Input | components/ui/input |
| Select | Select | components/ui/select |
| Modal | Modal | components/ui/modal |
| Table | Table | components/ui/table |
| Toast | Toast / useToast | components/ui/toast |
| StatCard | StatCard | components/biz/stat-card |
| Sidebar | Sidebar | components/layout/sidebar |
| Header | Header | components/layout/header |

### 9.2 状态命名约定

| 设计状态 | CSS 类约定 |
|----------|-----------|
| 默认 | .btn / .input |
| 悬停 | &:hover |
| 聚焦 | &:focus-visible |
| 禁用 | .is-disabled |
| 加载 | .is-loading |
| 错误 | .has-error |
| 成功 | .is-success |
| 激活 | .is-active |

### 9.3 深色模式实现

- 使用 `data-theme="dark"` 属性切换
- CSS 变量自动响应主题变化
- 组件无需额外判断主题
- 切换时 transition 300ms

```tsx
// 主题切换示例
const toggleTheme = () => {
  const next = current === 'light'
    ? 'dark' : 'light'
  document.documentElement
    .setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
}
```

---

## 十、 交互规范

### 10.1 过渡动画

| 场景 | 属性 | 时长 | 缓动 |
|------|------|------|------|
| 悬停 | 背景色/文字色 | 150ms | ease-out |
| 模态框显隐 | opacity + translateY | 200ms | ease-out |
| Toast 显隐 | translateX | 200ms | ease-out |
| 页面切换 | opacity | 300ms | ease-out |
| 菜单展开 | max-height | 300ms | ease-in-out |
| 骨架屏扫光 | background-position | 1.5s | linear infinite |

### 10.2 反馈机制

| 反馈类型 | 表现方式 | 持续时间 | 触发条件 |
|----------|----------|----------|----------|
| 操作成功 | Toast 绿色提示 | 3s 自动消失 | 提交/保存成功 |
| 操作失败 | Toast 红色提示 | 手动关闭 | 请求失败 |
| 加载中 | Skeleton / Spinner | 数据到达 | 请求进行中 |
| 空状态 | 插图 + 引导文案 | 持续显示 | 无数据 |
| 表单验证 | 行内错误文字 | 用户修正 | 输入不合法 |

### 10.3 手势操作 (移动端)

- 左滑: 删除列表项（带确认）
- 右滑: 返回上一页
- 下拉: 刷新内容
- 长按: 唤起上下文菜单（移动端）

### 10.4 数据加载策略

| 场景 | 策略 | 说明 |
|------|------|------|
| 页面初始化 | Skeleton 骨架屏 | 全部内容区域 |
| 列表分页 | 无限滚动 + 加载更多 | 接近底部 200px 触发 |
| 下拉刷新 | 顶部加载指示器 | 移动端 |
| 静默更新 | 后台刷新，不阻塞操作 | 通知类数据 |
| 错误重试 | 错误占位 + 重试按钮 | 3 次自动重试后 |
| 乐观更新 | 立即更新 UI，失败回滚 | 点赞/收藏等 |

---

## 十一、 视觉验收标准

> 此章节在开发完成后由设计师执行 Design QA。

### 11.1 颜色验收

- 所有颜色与 Design Token 一致
- 对比度满足 WCAG AA 标准
- 深色模式颜色正确切换
- 悬停/激活色正确实现

### 11.2 排版验收

- 字号、行高、字重与 Typography Token 一致
- 文本溢出处理正确（省略号/换行）
- 多语言文本容器预留足够宽度
- 字体回退链正确

### 11.3 间距验收

- 元素间距使用 spacing token 的倍数
- 内边距和外边距符合规范
- 网格对齐检查
- 表单字段间距一致

### 11.4 组件验收

- 所有组件状态正确实现
- 动效时长和缓动符合 Motion Token
- 响应式适配在所有断点可用
- 无障碍焦点指示器可见

---

## 附录

### A. 设计决策记录

| 决策 ID | 问题 | 选择 | 理由 |
|---------|------|------|------|
| DC-001 | {{问题}} | {{选择}} | {{理由}} |

### B. 图标资源

- 图标库: {{lucide / heroicons / phosphor / 自定义}}
- 风格: {{线性 / 面性 / 双色}}
- 尺寸: 16px（内联）/ 20px（功能图标）/
  24px（导航图标）
- 颜色: 继承当前文字色

### C. Design QA 记录

| 检查项 | 状态 | 偏差说明 | 修复建议 |
|--------|------|----------|----------|
| {{主色}} | ✅/❌ | {{偏差值}} | {{建议}} |
