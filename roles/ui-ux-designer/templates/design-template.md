# {{project_name}} — 设计规范

> 版本: v1.0
> 作者: UI/UX (paopao-team-skills)
> 基于 PRD: paopao-task/{{project_name}}/prd.md

---

## 一、 设计原则

1. {{原则一：简洁明了}}
2. {{原则二：一致性}}
3. {{原则三：可访问性}}
4. {{原则四：高效}}
5. {{原则五：容错性}}

---

## 二、 Design Token

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
    }
  }
}
```

### 2.2 排版体系

```json
{
  "typography": {
    "font-family": {
      "value": "Inter, system-ui, sans-serif"
    },
    "h1": {
      "size": "2rem",
      "weight": 700,
      "line-height": "2.5rem"
    },
    "h2": {
      "size": "1.5rem",
      "weight": 600,
      "line-height": "2rem"
    },
    "h3": {
      "size": "1.25rem",
      "weight": 600,
      "line-height": "1.75rem"
    },
    "body": {
      "size": "1rem",
      "weight": 400,
      "line-height": "1.5rem"
    },
    "body-small": {
      "size": "0.875rem",
      "weight": 400,
      "line-height": "1.25rem"
    },
    "caption": {
      "size": "0.75rem",
      "weight": 400,
      "line-height": "1rem"
    }
  }
}
```

### 2.3 间距体系

```json
{
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem"
  }
}
```

### 2.4 圆角

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

### 2.5 阴影

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

---

## 三、 CSS 变量映射

```css
:root {
  --color-primary: #3B82F6;
  --color-primary-hover: #2563EB;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --color-error: #EF4444;
  --color-success: #10B981;
  --color-warning: #F59E0B;

  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-size-h1: 2rem;
  --font-size-h2: 1.5rem;
  --font-size-body: 1rem;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### 框架样式配置参考

```css
/* Design Token 在 CSS 变量中的实现 */
:root {
  --color-primary: #3B82F6;
  --color-bg-primary: #FFFFFF;
  --font-family-base: system-ui, sans-serif;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}
```

Dev 可根据所选 CSS 方案按对应方式集成。

---

## 四、 核心组件

### 4.1 {{组件一：Button}}

**用途**: {{组件的用途}}

**状态机**:
```mermaid
stateDiagram-v2
    [*] --> Default
    Default --> Hover: mouseenter
    Hover --> Default: mouseleave
    Default --> Focus: focus
    Focus --> Blur: blur
    Default --> Active: mousedown
    Active --> Default: mouseup
    Default --> Disabled: disabled=true
    Disabled --> Default: disabled=false
    Default --> Loading: loading=true
    Loading --> Default: loading=false
```

**变体**:
| 变体 | 用途 | 背景色 | 文字色 |
|------|------|--------|--------|
| Primary | 主要操作 | primary | white |
| Secondary | 次要操作 | transparent | primary |
| Ghost | 第三级操作 | transparent | text-primary |
| Danger | 危险操作 | error | white |

**尺寸**:
| 尺寸 | 高度 | 内边距 | 字号 |
|------|------|--------|------|
| sm | 32px | 8px 16px | body-small |
| md | 40px | 10px 20px | body |
| lg | 48px | 12px 24px | body |

### 4.2 {{组件二：Input}}

...（同上结构）

### 4.3 {{组件三：Card}}

...（同上结构）

---

## 五、 页面布局

### 5.1 布局结构

```
┌─────────────────────────────────────┐
│  Header (导航栏)                      │
├──────────┬──────────────────────────┤
│  Sidebar  │  Main Content Area       │
│  (可选)   │                          │
│           │                          │
├──────────┴──────────────────────────┤
│  Footer (可选)                       │
└─────────────────────────────────────┘
```

### 5.2 响应式断点

| 断点 | 宽度 | 说明 |
|------|------|------|
| xs | < 640px | 手机 |
| sm | 640px - 767px | 大屏手机 |
| md | 768px - 1023px | 平板 |
| lg | 1024px - 1279px | 桌面 |
| xl | >= 1280px | 大屏桌面 |

### 5.3 响应式适配策略
- {{不同断点下的布局变化}}
- {{导航转为汉堡菜单的断点}}
- {{侧边栏折叠/隐藏的断点}}

---

## 六、 交互规范

### 6.1 过渡动画
- {{过渡持续时间和缓动函数}}
- {{页面切换动画}}

### 6.2 反馈机制
- {{加载状态的展示方式}}
- {{错误状态的展示方式}}
- {{成功/完成状态的展示方式}}

### 6.3 手势操作 (移动端)
- {{滑动操作}}
- {{长按操作}}

---

## 七、 视觉验收标准

### 7.1 颜色验收
- 所有颜色必须与 Design Token 一致
- 对比度满足 WCAG AA 标准

### 7.2 排版验收
- 字号、行高、字重与 Typography Token 一致
- 文本溢出处理方式

### 7.3 间距验收
- 元素间距使用 spacing token 的倍数
- 内边距和外边距规则

---

## 附录

### A. 设计决策记录

| 决策 ID | 问题 | 选择 | 理由 |
|---------|------|------|------|
| DC-001 | {{问题}} | {{选择}} | {{理由}} |

### B. 图标资源
- {{图标集来源和使用方式}}
