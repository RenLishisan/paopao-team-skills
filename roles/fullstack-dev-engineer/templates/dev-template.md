# {{project_name}} — 技术方案与开发计划

> 版本: v1.0
> 作者: Dev (paopao-team-skills)
> 基于 PRD: paopao-task/{{project_name}}/prd.md
> 基于设计规范: paopao-task/{{project_name}}/design.md

---

## 一、 技术栈选型

### 1.1 技术选型总览

| 技术领域 | 选型 | 版本 | 选择理由 |
|----------|------|------|----------|
| 统一语言 | TypeScript | 5.x | 严格模式，端到端类型安全 |
| 前端框架 | {{frontend_framework}} | {{version}} | {{reason}} |
| UI/样式 | {{ui_framework}} | {{version}} | {{reason}} |
| 状态管理 | {{state_mgmt}} | {{version}} | {{reason}} |
| 后端框架 | {{backend_framework}} | {{version}} | {{reason}} |
| API 层 | {{api_layer}} | {{version}} | {{reason}} |
| 数据库 | {{database}} | {{version}} | {{reason}} |
| ORM | {{orm}} | {{version}} | {{reason}} |
| 验证库 | {{validation}} | {{version}} | {{reason}} |
| 认证方案 | {{auth}} | {{version}} | {{reason}} |
| Monorepo | {{monorepo_tool}} | {{version}} | {{reason}} |
| 构建工具 | {{build_tool}} | {{version}} | {{reason}} |
| 测试框架 | {{test_framework}} | {{version}} | {{reason}} |
| 容器化 | Docker | {{version}} | {{reason}} |
| 部署平台 | {{deployment}} | - | {{reason}} |
| 边缘/Serverless | {{edge_platform}} | - | {{reason}} |
| 实时通信 | {{realtime}} | {{version}} | {{reason}} |
| AI 集成 | {{ai_sdk}} | {{version}} | {{reason}} |
| 向量数据库 | {{vector_db}} | {{version}} | {{reason}} |
| 缓存 | {{cache}} | {{version}} | {{reason}} |
| 监控/追踪 | {{observability}} | {{version}} | {{reason}} |
| CI/CD | {{cicd}} | - | {{reason}} |
| 代码质量 | {{code_quality}} | {{version}} | {{reason}} |

### 1.2 附加依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| {{package}} | {{version}} | {{usage}} |
| {{package}} | {{version}} | {{usage}} |

### 1.3 开发工具链

| 工具 | 用途 |
|------|------|
| {{tool}} | {{usage}} |
| {{tool}} | {{usage}} |

### 1.4 选型对比矩阵 (关键决策)

| 备选方案 | 优势 | 劣势 | 评分 (1-5) | 最终决策 |
|----------|------|------|------------|----------|
| {{alt_a}} | {{pros_a}} | {{cons_a}} | {{score_a}} | {{decision}} |
| {{alt_b}} | {{pros_b}} | {{cons_b}} | {{score_b}} | - |

---

## 二、 项目结构

### 2.1 Monorepo 结构 (适用时)

```
{{project_name}}/
├── apps/
│   ├── web/                    # Next.js 前端应用
│   │   ├── src/
│   │   │   ├── app/            # App Router 页面
│   │   │   ├── components/     # 业务组件
│   │   │   ├── lib/            # 工具函数、客户端
│   │   │   ├── hooks/          # 自定义 Hooks
│   │   │   ├── types/          # 前端专用类型
│   │   │   └── styles/         # 全局样式
│   │   ├── public/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── server/                 # 后端 API 服务 (可选)
│   │   ├── src/
│   │   │   ├── modules/        # 业务模块
│   │   │   ├── trpc/           # tRPC 路由
│   │   │   ├── prisma/         # Prisma Client
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── admin/                  # 管理后台 (可选)
├── packages/
│   ├── shared/                 # 共享类型、工具、常量
│   │   ├── src/
│   │   │   ├── types/          # 共享类型定义
│   │   │   ├── utils/          # 共享工具函数
│   │   │   ├── constants/      # 共享常量
│   │   │   └── validation/     # 共享 Zod Schema
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui/                     # 共享 UI 组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config/                 # 共享配置
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   └── database/               # 数据库包
│       ├── prisma/
│       │   └── schema.prisma
│       ├── src/
│       │   └── client.ts
│       ├── package.json
│       └── tsconfig.json
├── turbo.json                  # Turborepo 配置
├── pnpm-workspace.yaml         # pnpm Workspace 配置
├── package.json                # 根 package.json
├── tsconfig.json               # 基础 TS 配置 (Project References)
├── .env.example                # 环境变量模板
├── .github/workflows/          # CI/CD
└── README.md
```

### 2.2 单应用结构 (非 Monorepo 时)

```
{{project_name}}/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 认证相关路由组
│   │   ├── (dashboard)/        # 仪表盘路由组
│   │   ├── api/                # API Routes
│   │   │   └── trpc/           # tRPC 端点
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # 业务组件 (按功能分组)
│   │   ├── ui/                 # 基础 UI 组件 (shadcn/ui 风格)
│   │   ├── forms/              # 表单组件
│   │   └── {{feature}}/        # 功能组件
│   ├── lib/
│   ├── trpc/                   # tRPC 客户端/服务端
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── routers/
│   ├── db/                     # 数据库客户端
│   │   ├── prisma.ts           # Prisma Client 单例
│   │   └── schema.prisma       # Prisma Schema
│ ├── auth/                     # 认证配置
│   │   ├── config.ts
│   │   └── options.ts
│ ├── hooks/                    # 自定义 Hooks
│ ├── types/                    # 类型定义
│ ├── utils/                    # 工具函数
│ ├── constants/                # 常量
│ ├── styles/                   # 全局样式
│ └── middleware.ts             # Next.js Middleware
├── public/
├── tests/                      # 测试文件
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/workflows/          # CI/CD
├── docker-compose.yml          # 本地开发栈
├── Dockerfile                  # 生产构建
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── eslint.config.js
├── .env.example
└── README.md
```

---

## 三、 架构设计

### 3.1 分层架构

```
┌─────────────────────────────────────────────────────────────┐
│  表现层                                                      │
│  - Next.js Pages / React Components                         │
│  - shadcn/ui / Radix UI 组件                                 │
│  - Tailwind CSS + CSS Variables (Design Token)              │
│  - TanStack Query / tRPC Client / Zustand                   │
├─────────────────────────────────────────────────────────────┤
│  业务逻辑层                                                   │
│  - tRPC Procedures / Server Actions                         │
│  - Service Classes (Use Cases)                              │
│  - Domain Entities / Value Objects                          │
│  - Zod Schemas (输入验证 + 类型推导)                         │
├─────────────────────────────────────────────────────────────┤
│  数据访问层                                                   │
│  - Prisma Client / Drizzle ORM                              │
│  - Repository Pattern (可选)                                │
│  - Database Migrations                                      │
│  - Connection Pool (PgBouncer / Prisma Data Proxy)         │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 模块结构 (Feature-based)

```
<Root>
  ├── <Authentication Module>
  │   ├── <Login / Register>
  │   ├── <Password Reset>
  │   └── <Session Management>
  ├── <User Module>
  │   ├── <Profile Management>
  │   ├── <Preferences>
  │   └── <Notifications>
  ├── <Core Business Module A>
  │   ├── <Sub-module A1>
  │   │   ├── <List / Search>
  │   │   ├── <Create / Edit>
  │   │   └── <Detail View>
  │   └── <Sub-module A2>
  └── <Core Business Module B>
      └── ...
```

### 3.3 数据流

```
用户交互 (UI Event)
    │
    ▼
表现层 Event Handler (onClick, onSubmit)
    │
    ▼
tRPC Mutation / Server Action / API Call
    │
    ├──→ 乐观更新 → 本地状态 (Zustand/TanStack Query)
    │
    └──→ 业务逻辑层
             │
             ├──→ Zod 验证输入
             ├──→ 权限检查 (RBAC/ABAC)
             ├──→ 业务规则执行
             │       │
             │       ├──→ 读操作 → Prisma/Drizzle Query → 返回数据
             │       │
             │       └──→ 写操作 → Prisma/Drizzle Mutation
             │               │
             │               ├──→ 事务处理
             │               ├──→ 事件发布 (Domain Events)
             │               └──→ 缓存失效
             │
             ▼
        响应返回 (类型安全)
             │
             ▼
        表现层更新 (自动类型推导)
```

### 3.4 跨领域关注点

| 关注点 | 实现方案 |
|--------|----------|
| 认证授权 | NextAuth.js (JWT/Session) + tRPC Middleware + CASL RBAC |
| 错误处理 | 统一错误类层级 + tRPC Error Formatter + Sentry 捕获 |
| 日志追踪 | Pino 结构化日志 + OpenTelemetry Trace ID 关联 |
| 缓存策略 | Next.js Cache (fetch/unstable_cache) + Redis (会话/热点) |
| 实时推送 | Socket.io / PartyKit / SSE (按需选择) |
| 文件上传 | 预签名 URL (S3/R2) + 服务端验证 + 病毒扫描 |
| 国际化 | next-intl / i18next (路由级 / 组件级) |

---

## 四、 API 设计

### 4.1 API 规范选择

- **首选**: tRPC (端到端类型安全，无代码生成)
- **备选**: GraphQL (CodeGen 生成类型) / REST + OpenAPI 3.1

### 4.2 tRPC 路由设计 (示例)

```typescript
// apps/server/src/trpc/routers/app.router.ts
export const appRouter = createTRPCRouter({
  user: createTRPCRouter({
    list: protectedProcedure
      .input(z.object({ cursor: z.string().optional(), limit: z.number().max(50).default(20) }))
      .query(async ({ ctx, input }) => { /* ... */ }),

    byId: protectedProcedure
      .input(z.object({ id: z.string().cuid() }))
      .query(async ({ ctx, input }) => { /* ... */ }),

    create: protectedProcedure
      .input(UserCreateSchema)
      .mutation(async ({ ctx, input }) => { /* ... */ }),

    update: protectedProcedure
      .input(UserUpdateSchema)
      .mutation(async ({ ctx, input }) => { /* ... */ }),

    delete: protectedProcedure
      .input(z.object({ id: z.string().cuid() }))
      .mutation(async ({ ctx, input }) => { /* ... */ }),
  }),

  // 其他路由...
});
```

### 4.3 RESTful 接口列表 (若采用 REST)

| 方法 | 路径 | 说明 | 请求体 | 响应体 | 认证 |
|------|------|------|--------|--------|------|
| GET | /api/v1/{{resource}} | 列表/搜索 | - | {{response}} | Bearer |
| POST | /api/v1/{{resource}} | 创建 | {{body}} | {{response}} | Bearer |
| GET | /api/v1/{{resource}}/:id | 详情 | - | {{response}} | Bearer |
| PATCH | /api/v1/{{resource}}/:id | 部分更新 | {{body}} | {{response}} | Bearer |
| DELETE | /api/v1/{{resource}}/:id | 删除 | - | 204 | Bearer |

### 4.4 错误码规范

| HTTP Status | Error Code | 说明 |
|-------------|------------|------|
| 400 | VALIDATION_ERROR | 请求参数验证失败 |
| 401 | UNAUTHENTICATED | 未登录或 Token 失效 |
| 403 | FORBIDDEN | 权限不足 |
| 404 | NOT_FOUND | 资源不存在 |
| 409 | CONFLICT | 资源冲突 (如唯一键冲突) |
| 422 | UNPROCESSABLE | 业务规则校验失败 |
| 429 | RATE_LIMITED | 请求频率超限 |
| 500 | INTERNAL_ERROR | 服务器内部错误 |
| 503 | UNAVAILABLE | 服务暂不可用 |

---

## 五、 数据模型

### 5.1 Prisma Schema 核心实体

```prisma
// packages/database/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["typedSql"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 用户模型
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String    @map("password_hash")
  role          Role      @default(USER)
  emailVerified DateTime? @map("email_verified")
  image         String?
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  accounts      Account[]
  sessions      Session[]
  posts         Post[]    @relation("UserPosts")

  @@index([email])
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

// 业务模型示例
model {{Entity}} {
  id          String   @id @default(cuid())
  name        String
  description String?  @db.Text
  status      Status   @default(DRAFT)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  createdById String   @map("created_by_id")
  createdBy   User     @relation(fields: [createdById], references: [id])

  @@index([createdById])
  @@index([status])
  @@map("{{entities}}")
}

enum Status {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

### 5.2 Zod 验证 Schema (共享包)

```typescript
// packages/shared/src/validation/{{entity}}.ts
import { z } from 'zod';

export const {{Entity}}CreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
});

export const {{Entity}}UpdateSchema = {{Entity}}CreateSchema.partial();

export const {{Entity}}ListQuerySchema = z.object({
  cursor: z.string().cuid().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  search: z.string().optional(),
});

export type {{Entity}}CreateInput = z.infer<typeof {{Entity}}CreateSchema>;
export type {{Entity}}UpdateInput = z.infer<typeof {{Entity}}UpdateSchema>;
export type {{Entity}}ListQuery = z.infer<typeof {{Entity}}ListQuerySchema>;
```

### 5.3 类型导出 (共享包)

```typescript
// packages/shared/src/types/index.ts
export type { User, {{Entity}}, Role, Status } from '@prisma/client';
export type { {{Entity}}CreateInput, {{Entity}}UpdateInput, {{Entity}}ListQuery } from '../validation/{{entity}}';
```

---

## 六、 开发计划

### 6.1 步骤分解

| 步骤 | 描述 | 预估工时 | 产出 | 验收标准 |
|------|------|----------|------|----------|
| 1 | 项目初始化 (脚手架/Monorepo) | {{time}} | 可运行的空项目 | `pnpm dev` 启动成功 |
| 2 | 工程化配置 | {{time}} | TS/ESLint/Prettier/Husky/CI | Lint/TypeCheck 全绿 |
| 3 | 数据库 Schema + 迁移 | {{time}} | Prisma Schema + Migration | `pnpm db:migrate` 成功 |
| 4 | 认证体系搭建 | {{time}} | NextAuth.js/Clerk 集成 | 登录/注册/会话流程通 |
| 5 | tRPC/API 基础设施 | {{time}} | 路由结构 + 中间件 | 健康检查端点通 |
| 6 | 共享包建立 | {{time}} | types/validation/ui/config | 跨包类型引用正常 |
| 7 | 核心业务模块 A | {{time}} | CRUD + 列表/详情/表单 | 单测覆盖 ≥ 80% |
| 8 | 核心业务模块 B | {{time}} | ... | ... |
| 9 | 前端页面实现 | {{time}} | 页面组件 + 状态管理 | 视觉还原度 ≥ 95% |
| 10 | 实时/异步功能 | {{time}} | WebSocket/SSE/Queue | 压力测试通过 |
| 11 | AI/向量搜索功能 | {{time}} | RAG/Embedding/搜索 | 召回率指标达标 |
| 12 | 集成联调 + E2E | {{time}} | 完整业务流程 | Playwright 全绿 |
| 13 | 性能优化 + 安全加固 | {{time}} | Lighthouse/负载测试 | Core Web Vitals 绿 |
| 14 | CI/CD + 部署上线 | {{time}} | 流水线 + 环境配置 | 生产环境可访问 |

### 6.2 文件写入顺序

```
Step 1: 根配置 (package.json, tsconfig.json, turbo.json, pnpm-workspace.yaml)
Step 2: 共享包
  - packages/config (ESLint, TS, Tailwind 预设)
  - packages/shared (types, validation, utils, constants)
  - packages/ui (基础组件库)
  - packages/database (Prisma Schema + Client)
Step 3: 应用包基础设施
  - apps/web: Next.js 配置、中间件、认证、tRPC Client、Providers
  - apps/server (可选): NestJS/Fastify + tRPC Server
Step 4: 数据库迁移 + Seed 脚本
Step 5: 核心业务模块 (按 Feature 顺序)
  - Zod Schema → tRPC Procedure → Service → Repository → UI 组件 → 页面
Step 6: 跨领域功能
  - 文件上传、实时通信、AI 集成、邮件/通知
Step 7: 测试文件
  - 单元测试 → 集成测试 → E2E 测试
Step 8: CI/CD + Docker + 部署配置
Step 9: 文档 (README, API Docs, ADR)
```

---

## 七、 关键实现细节

### 7.1 {{复杂功能一}}

**实现思路**:
{{实现思路描述}}

**关键代码结构**:
```typescript
// 伪代码或接口定义
```

**注意事项**:
- {{注意点一}}
- {{注意点二}}

### 7.2 认证与授权实现

**方案**: NextAuth.js (Credentials + OAuth) + tRPC 中间件 + CASL RBAC

**关键点**:
- `authOptions` 配置在 `packages/shared/src/auth/config.ts`
- tRPC `protectedProcedure` 自动注入 `ctx.session.user`
- CASL `Ability` 定义在 `packages/shared/src/access-control/abilities.ts`
- 服务端权限检查: `ctx.ability.can(Action.Read, 'Post')`
- 客户端权限同步: `useAbility()` Hook

### 7.3 数据库迁移与种子数据

```bash
# 开发环境
pnpm db:push          # 推送 Schema 变更 (开发期)
pnpm db:migrate dev   # 创建迁移文件

# 生产环境
pnpm db:migrate deploy # 应用迁移

# 种子数据
pnpm db:seed          # 运行 prisma/seed.ts
```

### 7.4 缓存策略

| 场景 | 方案 | TTL | 失效策略 |
|------|------|-----|----------|
| 静态页面 | Next.js Static Generation | 构建时 | 重新部署 |
| 半静态数据 | `unstable_cache` / `fetch(cache: 'force-cache')` | 1h-24h | `revalidateTag` |
| 用户会话 | Redis (Upstash) | 30d | 登出/Token 刷新 |
| 热点查询 | Redis + SWR | 5min-max 缓存 | 变更时主动失效 |

---

## 八、 性能与安全考虑

### 8.1 性能优化

| 维度 | 目标 | 手段 |
|------|------|------|
| **首屏加载 (LCP)** | < 2.5s | RSC + 流式渲染 + 图片优化 + 字体子集化 |
| **交互响应 (INP)** | < 200ms | 代码分割 + 懒加载 + Web Workers + 乐观更新 |
| **视觉稳定 (CLS)** | < 0.1 | 显式尺寸 + 字体 fallback + 预留空间 |
| **API 响应 (p95)** | < 200ms | 数据库索引 + 连接池 + Redis 缓存 + 查询优化 |
| **数据库查询** | < 50ms | `EXPLAIN ANALYZE` + 复合索引 + 避免 N+1 |

### 8.2 安全措施

| 威胁 | 防护措施 |
|------|----------|
| **SQL 注入** | Prisma/Drizzle 参数化查询，禁止原始 SQL 拼接 |
| **XSS** | React 自动转义 + CSP Header + DOMPurify (富文本) |
| **CSRF** | NextAuth.js 内置 CSRF Token + SameSite Cookie |
| **认证绕过** | 所有 tRPC Procedure / API Route 强制 `protectedProcedure` |
| **权限提升** | CASL RBAC 服务端强制检查 + 字段级权限 |
| **敏感数据泄露** | 环境变量管理 + 密钥轮换 + 审计日志 + 加密存储 |
| **依赖漏洞** | `pnpm audit` + GitHub Dependabot + Snyk CI 集成 |
| **速率滥用** | Arcjet / Upstash Ratelimit + tRPC Middleware |
| **文件上传** | 类型/大小验证 + 预签名 URL + 病毒扫描 + 隔离存储 |

---

## 九、 测试策略

### 9.1 测试金字塔

```
        ████████████
       █  E2E (10%)  █  ← Playwright: 关键用户旅程 (登录、支付、核心流程)
      ████████████████
     █  集成测试 (20%) █  ← Vitest + Supertest: API 契约、数据库交互、认证流程
    ██████████████████
   █  单元测试 (70%)  █  ← Vitest: 纯函数、Hook、Service、Zod Schema、Utils
  ████████████████████
```

### 9.2 覆盖率要求

| 类型 | 目标覆盖率 | 重点覆盖 |
|------|------------|----------|
| 单元测试 | ≥ 80% | 业务逻辑、工具函数、验证 Schema、状态管理 |
| 集成测试 | ≥ 60% | API 端点、数据库操作、认证授权、外部服务集成 |
| E2E 测试 | 核心路径 100% | 用户注册登录、核心业务流程、支付、权限边界 |

### 9.3 测试工具配置

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
});

// playwright.config.ts
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

---

## 十、 可观测性方案

### 10.1 错误追踪 - Sentry

```typescript
// apps/web/src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  integrations: [
    Sentry.nextjsIntegration(),
    Sentry.prismaIntegration(),
  ],
});
```

### 10.2 结构化日志 - Pino

```typescript
// packages/shared/src/utils/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: process.env.SERVICE_NAME || 'app',
    env: process.env.NODE_ENV,
  },
});
```

### 10.3 分布式追踪 - OpenTelemetry

```typescript
// instrumentation.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-app',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

### 10.4 关键指标 Dashboard

| 指标 | 来源 | 告警阈值 |
|------|------|----------|
| 错误率 | Sentry | > 1% (5min) |
| P95 延迟 | OpenTelemetry | > 500ms |
| 数据库连接池使用率 | Prisma/PgBouncer | > 80% |
| 内存/CPU | 容器监控 | > 85% |
| 业务转化率 | 自定义事件 | < 基线 - 20% |

---

## 十一、 部署与运维

### 11.1 环境变量

```env
# .env.example
# 应用
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
SERVICE_NAME=web

# 数据库
DATABASE_URL=postgresql://user:pass@localhost:5432/db?schema=public
DATABASE_POOL_SIZE=10

# 认证
NEXTAUTH_SECRET=your-secret-min-32-chars
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# 缓存
REDIS_URL=redis://localhost:6379

# 邮件
RESEND_API_KEY=
EMAIL_FROM=noreply@example.com

# 文件存储
AWS_S3_BUCKET=
AWS_S3_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# AI
OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=

# 监控
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
OTEL_EXPORTER_OTLP_ENDPOINT=

# 特性开关
FEATURE_FLAG_AI_ENABLED=true
FEATURE_FLAG_REALTIME_ENABLED=false
```

### 11.2 Docker 多阶段构建

```dockerfile
# Dockerfile
# Base
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
RUN pnpm install --frozen-lockfile --prod=false

# Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/packages/database/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]
```

### 11.3 GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        ports: [5432:5432]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm db:migrate deploy
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v4

  build:
    needs: [lint-typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: docker/build-push-action@v5
        if: github.ref == 'refs/heads/main'
        with:
          push: true
          tags: ghcr.io/{{owner}}/{{repo}}:latest

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 十二、 架构决策记录 (ADR)

### ADR-001: 选择 tRPC 作为 API 层

- **状态**: 接受
- **背景**: 需要前后端类型共享，减少 API 契约维护成本
- **决策**: 采用 tRPC v11，配合 Zod 验证
- **后果**: 
  - ✅ 端到端类型安全，重构信心强
  - ✅ 无代码生成步骤，开发体验佳
  - ⚠️ 仅限 TypeScript 生态，非 TS 客户端需额外适配
  - ⚠️ 复杂查询场景不如 GraphQL 灵活

### ADR-002: 采用 Monorepo (Turborepo + pnpm)

- **状态**: 接受
- **背景**: 共享类型、组件、配置；统一工具链
- **决策**: Turborepo 管理构建缓存与任务编排，pnpm Workspace 管理依赖
- **后果**:
  - ✅ 代码复用率高，版本同步简单
  - ✅ CI 缓存加速显著 (3-10x)
  - ⚠️ 初期配置复杂度较高
  - ⚠️ 需要团队理解 Workspace 协议

### ADR-003: PostgreSQL + Prisma 作为数据层

- **状态**: 接受
- **背景**: 类型安全 ORM，迁移管理，生态成熟
- **决策**: Prisma ORM + PostgreSQL 16，启用 `typedSql` 预览特性
- **后果**:
  - ✅ 类型安全查询，自动迁移，Prisma Studio 可视化
  - ✅ 中间件支持 (软删除、审计日志)
  - ⚠️ 冷启动较慢，Edge 运行时需 Data Proxy
  - ⚠️ 复杂 SQL 场景需 `$queryRaw` 逃逸

---

## 附录

### A. 环境变量完整清单

```env
# 见 11.1 节
```

### B. 常用命令速查

```bash
# 开发
pnpm dev                    # 启动所有应用 (Turborepo)
pnpm dev --filter=web       # 仅启动 web
pnpm db:studio              # Prisma Studio
pnpm db:push                # 推送 Schema (开发)
pnpm db:migrate dev         # 创建迁移
pnpm db:seed                # 种子数据

# 质量检查
pnpm lint                   # ESLint
pnpm typecheck              # TypeScript
pnpm format                 # Prettier
pnpm test                   # 单元+集成测试
pnpm test:e2e               # E2E 测试
pnpm test:coverage          # 覆盖率报告

# 构建部署
pnpm build                  # 生产构建
pnpm docker:build           # Docker 镜像
pnpm docker:up              # Docker Compose 启动
```

### C. 参考文档

- [Next.js 14 文档](https://nextjs.org/docs)
- [tRPC v11 文档](https://trpc.io/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [NextAuth.js v5 文档](https://authjs.dev)
- [Turborepo 文档](https://turbo.build/repo/docs)
- [Vitest 文档](https://vitest.dev)
- [Playwright 文档](https://playwright.dev)
- [Zod 文档](https://zod.dev)
- [CASL 文档](https://casl.js.org)
- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)
- [Sentry Next.js 文档](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [OpenTelemetry JS 文档](https://opentelemetry.io/docs/instrumentation/js/)

---

## 十三、 QA 交付规范 (供质量保障角色使用)

### 13.1 测试需求规格 (Test Requirement Specification)

| 功能模块 | 用户故事 ID | 验收标准 (AC) | 测试类型 | 优先级 | 测试数据需求 |
|----------|-------------|---------------|----------|--------|--------------|
| {{Feature}} | US-{{id}} | {{AC描述}} | 单元/集成/E2E | P0/P1/P2 | {{测试数据描述}} |
| {{Feature}} | US-{{id}} | {{AC描述}} | 单元/集成/E2E | P0/P1/P2 | {{测试数据描述}} |

### 13.2 测试环境规格

| 环境 | 用途 | 数据库 | 外部依赖 | 访问方式 | 维护窗口 |
|------|------|--------|----------|----------|----------|
| Local | 开发自测 | SQLite/PostgreSQL 本地 | Mock/MSW | `pnpm dev` | 随时 |
| CI | 自动化测试 | PostgreSQL Testcontainers | Mock/MSW | GitHub Actions | 每次 PR |
| Staging | QA 验收/UAT | PostgreSQL Staging | 真实/沙箱 | `staging.example.com` | 每日同步 |
| Production | 生产监控 | PostgreSQL Primary + Replica | 真实 | `app.example.com` | 变更窗口 |

### 13.3 测试数据管理

```typescript
// packages/database/prisma/seed.test.ts
// QA 可直接使用的种子数据工厂

export const testFactories = {
  user: (overrides = {}) => ({
    email: `test-${Date.now()}@example.com`,
    name: 'Test User',
    role: 'USER',
    emailVerified: new Date(),
    ...overrides,
  }),

  {{entity}}: (overrides = {}) => ({
    name: `Test {{Entity}} ${Date.now()}`,
    description: 'Test description',
    status: 'PUBLISHED',
    ...overrides,
  }),

  // 关联数据工厂
  userWith{{Entity}}: async (prisma, count = 3) => {
    const user = await prisma.user.create({ data: testFactories.user() });
    const entities = await Promise.all(
      Array.from({ length: count }).map(() =>
        prisma.{{entity}}.create({ data: { ...testFactories.{{entity}}(), createdById: user.id } })
      )
    );
    return { user, entities };
  },
};
```

### 13.4 API 契约测试规范 (供 QA 编写契约测试)

```yaml
# tests/contracts/{{feature}}.contract.yaml
# Pact / Schemathesis 兼容格式

provider: "{{project_name}}-api"
consumer: "{{project_name}}-web"

interactions:
  - description: "获取 {{Entity}} 列表"
    request:
      method: GET
      path: /api/v1/{{entities}}
      query:
        cursor: string
        limit: integer
        status: enum[DRAFT, PUBLISHED, ARCHIVED]
      headers:
        Authorization: "Bearer {{token}}"
    response:
      status: 200
      headers:
        Content-Type: application/json
      body:
        items:
          - type: array
            items:
              id: string (cuid)
              name: string
              status: enum
              createdAt: iso8601
        nextCursor: string?
      matchingRules:
        "$.items[*].id": "regex:^[a-z0-9]{25}$"
```

### 13.5 E2E 测试场景清单 (Playwright)

| 场景 ID | 场景名称 | 前置条件 | 测试步骤 | 预期结果 | 标签 |
|---------|----------|----------|----------|----------|------|
| E2E-001 | 用户注册登录流程 | 无账号 | 1. 访问 /register 2. 填写表单 3. 提交 4. 验证邮箱 5. 登录 | 重定向到仪表盘，显示用户名 | @auth @smoke |
| E2E-002 | 创建 {{Entity}} | 已登录用户 | 1. 进入列表页 2. 点击新建 3. 填写必填项 4. 提交 | 列表显示新记录，Toast 成功提示 | @{{feature}} @crud |
| E2E-003 | 权限边界测试 | 普通用户 + 管理员 | 1. 普通用户访问管理页 2. 管理员访问管理页 | 普通用户 403，管理员 200 | @auth @rbac |

### 13.6 性能基准测试指标

| API 端点 | 并发用户数 | 目标 p95 延迟 | 目标吞吐量 | 错误率阈值 | 测试工具 |
|----------|------------|---------------|------------|------------|----------|
| GET /api/v1/{{entities}} | 100 | < 200ms | > 500 req/s | < 0.1% | k6 / Artillery |
| POST /api/v1/{{entities}} | 50 | < 500ms | > 200 req/s | < 0.1% | k6 / Artillery |
| 登录 /auth/callback | 200 | < 1s | > 300 req/s | < 0.1% | k6 |

### 13.7 安全测试清单 (供 QA 安全测试)

| 检查项 | 测试方法 | 通过标准 | 责任人 |
|--------|----------|----------|--------|
| SQL 注入 | 所有输入字段尝试注入 payload | 无报错回显，参数化查询生效 | QA |
| XSS | 富文本/输入框注入 `<script>alert(1)</script>` | 前端转义/CSP 拦截 | QA |
| CSRF | 伪造跨站请求 | SameSite=Lax + CSRF Token 验证 | QA |
| 认证绕过 | 无 Token 访问受保护端点 | 返回 401 | QA |
| 权限提升 | 低权限用户调用高权限 API | 返回 403 | QA |
| 敏感信息泄露 | 检查响应头、错误堆栈、日志 | 无密钥/Token/堆栈泄露 | QA |
| 依赖漏洞 | `pnpm audit` + Snyk 扫描 | 无 high/critical 漏洞 | Dev/QA |
| 速率限制 | 短时间大量请求同一端点 | 返回 429，限流生效 | QA |

### 13.8 无障碍测试清单 (a11y)

| WCAG 标准 | 检查点 | 测试方法 | 通过标准 |
|-----------|--------|----------|----------|
| 1.1.1 非文本内容 | 所有图片有 alt | axe-core 自动化 + 人工 | 100% 通过 |
| 1.3.1 信息与关系 | 语义化 HTML、表单 label | axe-core + 键盘导航 | 无违规 |
| 2.1.1 键盘可达 | 所有交互可键盘操作 | Tab 键遍历全页面 | 无焦点陷阱 |
| 2.4.3 焦点顺序 | 焦点顺序符合逻辑 | 键盘导航验证 | 符合视觉顺序 |
| 2.4.7 焦点可见 | 焦点样式清晰可见 | 键盘导航验证 | 所有焦点态可见 |
| 3.1.1 页面语言 | html lang 属性正确 | 自动化检查 | zh-CN |
| 4.1.2 名称、角色、值 | ARIA 属性正确 | axe-core + 屏幕阅读器 | 无违规 |

### 13.9 缺陷报告模板

```markdown
## 🐛 缺陷报告: [BUG-{{id}}]

**严重级别**: [Critical/High/Medium/Low]
**模块**: {{模块名}}
**环境**: [Local/CI/Staging/Production]
**复现率**: [100%/间歇性/不可复现]

### 复现步骤
1. {{步骤1}}
2. {{步骤2}}
3. {{步骤3}}

### 实际结果
{{实际行为描述、截图、报错堆栈}}

### 预期结果
{{基于 AC 的预期行为}}

### 影响范围
- 用户影响: {{受影响用户群体/比例}}
- 业务影响: {{业务流程阻塞程度}}
- 数据影响: {{是否有数据损坏风险}}

### 相关链接
- PRD: {{PRD 链接}}
- 设计稿: {{Figma 链接}}
- API 文档: {{API 文档链接}}
- 日志追踪: {{Sentry/Trace ID}}

### 建议修复方向
{{Dev 可参考的修复思路}}
```

---

## 十四、 PM 交付规范 (供产品经理角色使用)

### 14.1 功能拆解与验收清单

| Epic | Feature | User Story | 验收标准 (AC) | 优先级 | Story Points | 依赖 | 状态 |
|------|---------|------------|---------------|--------|--------------|------|------|
| {{Epic}} | {{Feature}} | US-{{id}}: 作为 {{角色}}，我希望 {{动作}}，以便 {{价值}} | 1. {{AC1}} 2. {{AC2}} | P0/P1/P2 | {{SP}} | {{依赖US}} | [ ] 待开发 [ ] 开发中 [ ] 待验收 [ ] 已完成 |

### 14.2 里程碑与发布计划

| 里程碑 | 目标日期 | 包含功能 | 发布环境 | 验收标准 | 发布负责人 |
|--------|----------|----------|----------|----------|------------|
| M1: 基础设施就绪 | {{date}} | 脚手架、CI/CD、认证、数据库 | Staging | 全绿构建、健康检查通过 | Dev Lead |
| M2: 核心模块 MVP | {{date}} | {{核心Feature列表}} | Staging | QA 验收通过、E2E 全绿 | PM + QA Lead |
| M3: Beta 版本 | {{date}} | MVP + {{增强Feature}} | Staging/Production Canary | 性能基准达标、安全扫描通过 | PM |
| M4: 正式发布 v1.0 | {{date}} | 全量功能 | Production | 监控指标正常、回滚预案就绪 | PM + Dev Lead |

### 14.3 功能开关与渐进发布

| Feature Flag | 默认值 | 发布策略 | 目标用户群 | 回滚条件 | 负责人 |
|--------------|--------|----------|------------|----------|--------|
| FEATURE_FLAG_AI_ENABLED | false | Canary 5% → 25% → 100% | 内部用户 → 种子用户 → 全量 | 错误率 > 5% 或延迟 > 2x | PM |
| FEATURE_FLAG_REALTIME_ENABLED | false | 按租户开启 | 付费企业客户 | 连接数异常或内存泄露 | Dev Lead |

### 14.4 数据字典 (业务术语对照表)

| 业务术语 | 技术字段 | 类型 | 说明 | 示例 | 约束 |
|----------|----------|------|------|------|------|
| {{术语}} | {{field}} | {{type}} | {{描述}} | {{示例}} | {{约束}} |

### 14.5 风险与依赖登记册

| 风险 ID | 风险描述 | 影响度 | 可能性 | 缓解措施 | 负责人 | 状态 |
|---------|----------|--------|--------|----------|--------|------|
| RISK-001 | {{风险描述}} | High/Medium/Low | High/Medium/Low | {{缓解措施}} | {{Owner}} | [ ] 识别 [ ] 监控 [ ] 已缓解 |

---

## 十五、 UI/UX 交付规范 (供设计师角色使用)

### 15.1 组件库映射表

| 设计系统组件 | 代码组件路径 | 变体 | 状态 | Design Token 映射 | 备注 |
|--------------|--------------|------|------|-------------------|------|
| Button | `packages/ui/src/components/button.tsx` | primary/secondary/ghost/destructive | default/hover/focus/disabled/loading | `color.primary`, `radius.md`, `spacing.4` | 使用 `class-variance-authority` |
| Input | `packages/ui/src/components/input.tsx` | default/error/success | default/focus/disabled/readonly | `color.border`, `color.focus` | 集成 `react-hook-form` |
| Card | `packages/ui/src/components/card.tsx` | default/outlined/elevated | default/hover | `color.surface`, `shadow.md` | 复合组件 |
| Table | `packages/ui/src/components/data-table.tsx` | default/striped/hoverable | default/loading/empty/error | `color.border`, `spacing.2` | 集成 TanStack Table |
| Modal | `packages/ui/src/components/dialog.tsx` | default/alert/confirm | open/closed | `color.overlay`, `shadow.xl` | 基于 Radix Dialog |

### 15.2 Design Token 代码映射 (Tailwind CSS Variables)

```css
/* apps/web/src/styles/globals.css */
:root {
  /* Color - Brand */
  --color-primary-50: {{value}};
  --color-primary-100: {{value}};
  --color-primary-500: {{value}};
  --color-primary-600: {{value}};
  --color-primary-700: {{value}};

  /* Color - Semantic */
  --color-success: {{value}};
  --color-warning: {{value}};
  --color-error: {{value}};
  --color-info: {{value}};

  /* Color - Neutral */
  --color-background: {{value}};
  --color-surface: {{value}};
  --color-border: {{value}};
  --color-text-primary: {{value}};
  --color-text-secondary: {{value}};
  --color-text-muted: {{value}};

  /* Spacing */
  --spacing-1: {{value}};  /* 4px */
  --spacing-2: {{value}};  /* 8px */
  --spacing-4: {{value}};  /* 16px */
  --spacing-6: {{value}};  /* 24px */
  --spacing-8: {{value}};  /* 32px */

  /* Radius */
  --radius-sm: {{value}};
  --radius-md: {{value}};
  --radius-lg: {{value}};
  --radius-full: {{value}};

  /* Shadow */
  --shadow-sm: {{value}};
  --shadow-md: {{value}};
  --shadow-lg: {{value}};
  --shadow-xl: {{value}};

  /* Typography */
  --font-sans: {{value}};
  --text-xs: {{value}};
  --text-sm: {{value}};
  --text-base: {{value}};
  --text-lg: {{value}};
  --text-xl: {{value}};
  --text-2xl: {{value}};

  /* Transition */
  --transition-fast: {{value}};
  --transition-normal: {{value}};
  --transition-slow: {{value}};

  /* Z-Index */
  --z-dropdown: {{value}};
  --z-modal: {{value}};
  --z-tooltip: {{value}};
  --z-toast: {{value}};
}

.dark {
  /* Dark mode overrides */
  --color-background: {{value}};
  --color-surface: {{value}};
  --color-text-primary: {{value}};
  /* ... */
}
```

### 15.3 响应式断点规范

| 断点 | Tailwind 前缀 | 适用场景 | 容器最大宽度 |
|------|---------------|----------|--------------|
| 320px | `sm:` | 手机竖屏 | 100% |
| 640px | `md:` | 手机横屏/小平板 | 100% |
| 768px | `lg:` | 平板竖屏 | 768px |
| 1024px | `xl:` | 平板横屏/笔记本 | 1024px |
| 1280px | `2xl:` | 桌面端 | 1280px |
| 1536px | - | 大屏显示器 | 1440px |

### 15.4 组件状态机定义 (供 Dev 实现)

```typescript
// packages/ui/src/components/{{component}}/states.ts
export type {{Component}}State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error; retry: () => void }
  | { status: 'disabled'; reason: string };

// 状态转换图:
// idle → loading → success
//           ↘ error → (retry) → loading
//           ↘ disabled
```

### 15.5 无障碍 (a11y) 实现清单

| 组件 | ARIA Roles | 键盘交互 | 屏幕阅读器支持 | 测试方法 |
|------|------------|----------|----------------|----------|
| Button | `button` | Enter/Space 触发 | `aria-label` / 子元素文本 | axe + 手动 |
| Input | `textbox` | Tab 进出、方向键 | `aria-label` / `aria-describedby` | axe + NVDA |
| Select/Combobox | `combobox` + `listbox` | 方向键选择、Enter 确认、Esc 关闭 | `aria-expanded`、选中项播报 | axe + NVDA |
| Modal/Dialog | `dialog` + `aria-modal="true"` | Tab 循环、Esc 关闭、焦点陷阱 | 标题 `aria-labelledby` | axe + 手动 |
| Table | `table` / `grid` | 方向键单元格导航 | 行/列头播报、排序状态 | axe + NVDA |
| Tabs | `tablist` + `tab` + `tabpanel` | 方向键切换、Home/End | 选中态 `aria-selected` | axe + 手动 |
| Tooltip | `tooltip` | Hover/Focus 显示、Esc 关闭 | `aria-describedby` 关联 | axe + 手动 |

### 15.6 图标与插画规范

| 类型 | 格式 | 命名规范 | 尺寸规格 | 使用方式 |
|------|------|----------|----------|----------|
| 系统图标 | SVG (Lucide/Phosphor) | `icon-[name].tsx` | 16/20/24px | `<IconName size={20} />` |
| 业务图标 | SVG | `icon-biz-[domain]-[name].tsx` | 24/32px | 同系统图标 |
| 插画 | SVG/PNG | `illustration-[scene]-[variant].svg` | 多尺寸导出 | `<img />` / CSS 背景 |

---

## 十六、 运维交付规范 (供 DevOps/SRE 角色使用)

### 16.1 部署架构拓扑

```mermaid
graph TB
    subgraph "CDN/Edge"
        CF[Cloudflare/Vercel Edge]
    end
    
    subgraph "Load Balancer"
        LB[ALB/Cloudflare LB]
    end
    
    subgraph "Application Tier"
        Web1[Next.js Pod 1]
        Web2[Next.js Pod 2]
        WebN[Next.js Pod N]
    end
    
    subgraph "Data Tier"
        PGPrimary[(PostgreSQL Primary)]
        PGReplica[(PostgreSQL Replica)]
        Redis[(Redis Cluster)]
    end
    
    subgraph "External Services"
        S3[S3/R2 Storage]
        Auth[Auth Provider]
        AI[AI API]
    end
    
    CF --> LB
    LB --> Web1
    LB --> Web2
    LB --> WebN
    Web1 --> PGPrimary
    Web1 --> PGReplica
    Web1 --> Redis
    Web1 --> S3
    Web1 --> Auth
    Web1 --> AI
```

### 16.2 环境配置矩阵

| 配置项 | Development | Staging | Production |
|--------|-------------|---------|------------|
| `NODE_ENV` | development | staging | production |
| `LOG_LEVEL` | debug | info | warn |
| `DATABASE_URL` | 本地/共享开发库 | Staging 专用库 | Primary + Read Replica |
| `DATABASE_POOL_SIZE` | 5 | 10 | 20 (Primary) / 10 (Replica) |
| `REDIS_URL` | 本地/共享 | Staging 专用 | Cluster Mode |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://staging.app.com` | `https://app.com` |
| `SENTRY_DSN` | 开发 DSN | Staging DSN | 生产 DSN |
| `SENTRY_TRACES_SAMPLE_RATE` | 1.0 | 0.5 | 0.1 |
| `FEATURE_FLAG_*` | 全开 | 受控开启 | 渐进发布 |
| `RATE_LIMIT_REQUESTS` | 1000/min | 500/min | 100/min |
| `CACHE_TTL` | 0 (无缓存) | 60s | 300s |

### 16.3 健康检查与就绪探针

```yaml
# kubernetes/deployment.yaml 片段
livenessProbe:
  httpGet:
    path: /api/health/live
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /api/health/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3

# /api/health/ready 实现需检查:
# 1. 数据库连接池可用
# 2. Redis 连接可用
# 3. 关键外部服务可达 (可选)
# 4. 迁移已应用 (无 pending migration)
```

### 16.4 监控告警规则 (PrometheusRule)

```yaml
# monitoring/alerts.yaml
groups:
  - name: {{project_name}}.alerts
    rules:
      # 应用层
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) 
          / sum(rate(http_requests_total[5m])) > 0.01
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{project_name}}"
          
      - alert: HighLatencyP95
        expr: |
          histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "P95 latency > 500ms"

      - alert: HighMemoryUsage
        expr: |
          (container_memory_usage_bytes / container_spec_memory_limit_bytes) > 0.85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Memory usage > 85%"

      # 数据库层
      - alert: DatabaseConnectionsHigh
        expr: |
          pg_stat_database_numbackends / pg_settings_max_connections > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "DB connections > 80%"

      - alert: DatabaseReplicationLag
        expr: |
          pg_replication_lag_seconds > 30
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Replication lag > 30s"

      # 业务层
      - alert: BusinessMetricDrop
        expr: |
          rate(business_events_total{event="purchase_completed"}[10m]) < 0.5
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Purchase conversion dropped significantly"
```

### 16.5 运维运行手册

#### 16.5.1 部署发布流程

```bash
# 1. 标准发布 (GitHub Actions 自动化)
# main 分支合并 → CI 全绿 → 自动构建镜像 → 推送到 GHCR → Vercel/ArgoCD 自动部署

# 2. 热修复发布
git checkout main
git pull origin main
git checkout -b hotfix/{{issue-id}}
# 修复代码
git commit -m "fix: {{描述}}"
git push origin hotfix/{{issue-id}}
# 创建 PR → 审核合并 → 自动部署

# 3. 回滚操作
# Vercel: Dashboard → Deployments → 选择前一版本 → Promote to Production
# K8s: kubectl rollout undo deployment/{{app-name}} -n production
# Docker Compose: docker compose pull && docker compose up -d --force-recreate
```

#### 16.5.2 数据库迁移操作

```bash
# 开发环境
pnpm db:migrate dev --name {{migration_name}}

# Staging/Production (需在维护窗口)
# 1. 备份数据库
pg_dump -h {{host}} -U {{user}} -d {{db}} > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. 应用迁移 (蓝绿部署时在新版本启动前运行)
pnpm db:migrate deploy

# 3. 验证迁移
pnpm db:migrate status

# 4. 回滚方案 (如迁移失败)
# - 使用备份恢复
# - 或编写反向迁移脚本 (下线版本兼容旧 Schema)
```

#### 16.5.3 常见故障排查

| 故障现象 | 排查步骤 | 解决方案 | 预防措施 |
|----------|----------|----------|----------|
| API 502/504 | 1. 检查 Pod 状态 2. 查看应用日志 3. 检查数据库连接 4. 检查上游依赖 | 重启 Pod / 扩容 / 修复死锁 / 熔断上游 | 就绪探针 + 连接池监控 + 熔断器 |
| 页面白屏 | 1. 检查构建产物 2. 查看浏览器控制台 3. 检查 CDN 缓存 4. 检查 Edge 函数 | 清除 CDN 缓存 / 重新部署 / 回滚 | 构建验证 + 部署前冒烟测试 |
| 数据库连接耗尽 | 1. `SELECT * FROM pg_stat_activity` 2. 检查连接池配置 3. 查找长事务 | Kill 长事务 / 调整 pool size / 修复泄露 | 连接池监控 + 语句超时设置 |
| 定时任务未执行 | 1. 检查 CronJob 状态 2. 查看 Job 日志 3. 检查锁机制 | 重建 Job / 修复幂等性 / 调整并发 | 分布式锁 + 执行记录表 + 告警 |

### 16.6 容量规划

| 资源 | 当前规格 | 预估峰值 | 扩容触发阈值 | 扩容策略 |
|------|----------|----------|--------------|----------|
| Next.js Pod | 3x 2CPU/4GB | 10x | CPU > 70% 5min | HPA: min=3, max=20 |
| PostgreSQL Primary | 4CPU/16GB/500GB | 8CPU/32GB/1TB | 连接数 > 80% / 存储 > 70% | 垂直扩容 / 读写分离 |
| Redis Cluster | 3 Master + 3 Replica | 6 Master | 内存 > 80% / 命中率 < 90% | 增加分片 / 升级规格 |
| S3/R2 Storage | 100GB | 10TB | 存储 > 80% | 生命周期策略归档 |

---

## 十七、 安全与合规交付规范

### 17.1 威胁建模 (STRIDE)

| 组件 | Spoofing | Tampering | Repudiation | Info Disclosure | DoS | Elevation of Privilege |
|------|----------|-----------|-------------|-----------------|-----|------------------------|
| 认证服务 | MFA 强制 | Token 签名验证 | 审计日志 | 密码哈希 + 加密传输 | 速率限制 | 角色分离 |
| API Gateway | JWT 验证 | 请求签名/完整性 | 访问日志 | 敏感字段脱敏 | 熔断/限流 | 最小权限原则 |
| 数据库 | SSL 连接 | 参数化查询 | 变更审计 | 列级加密 / 掩码 | 连接池 / 读写分离 | 列级权限 / RLS |
| 文件存储 | 预签名 URL 验证 | 校验和验证 | 上传日志 | 私有桶 / 加密存储 | 大小/类型限制 | 租户隔离 |

### 17.2 数据分类与保护

| 数据分类 | 示例字段 | 存储加密 | 传输加密 | 访问控制 | 保留期限 | 删除方式 |
|----------|----------|----------|----------|----------|----------|----------|
| 公开数据 | 博客文章、公开资料 | 无 | TLS 1.3 | 公开读 | 永久 | 软删除 |
| 内部数据 | 系统配置、日志 | AES-256 | TLS 1.3 | RBAC + 网络隔离 | 1 年 | 定期清理 |
| 机密数据 | PII (个人信息) | 姓名、邮箱、手机、身份证 | AES-256 + 字段级加密 | TLS 1.3 + 字段级加密 | 列级权限 + 审计 | 法律要求 | 加密擦除 |
| 敏感凭证 | API Key、密码、私钥 | KMS 托管 + 环境变量 | TLS 1.3 | 仅运行时注入 / Vault | 轮换周期 90 天 | 即时撤销 + 轮换 |

### 17.3 合规清单 (GDPR/个人信息保护法/等保 2.0)

| 要求 | 实现方案 | 验证方法 | 责任人 |
|------|----------|----------|--------|
| 数据最小化 | 仅收集必要字段，API 响应字段白名单 | 代码审查 + 数据流图 | Dev |
| 用户同意管理 | Cookie Banner + 同意记录表 + 撤回机制 | 功能测试 + 审计日志 | Dev + PM |
| 数据导出/删除权 | `/api/user/export` + `/api/user/delete` (GDPR Art.17/20) | E2E 测试 | Dev + QA |
| 数据泄露通知 | 72 小时内通知监管机构 + 用户 | 事件响应演练 | SecOps |
| 访问控制审计 | 所有敏感操作记录审计日志 (用户、时间、操作、结果) | 日志审计抽查 | DevOps |
| 漏洞管理 | Dependabot + Snyk + 定期渗透测试 | 扫描报告 + 整改记录 | DevOps |
| 等保三级 | 堡垒机、数据库审计、WAF、防篡改、多因子认证 | 第三方测评 | SecOps |

---

## 十八、 附录 D: 跨角色协作清单

### 18.1 阶段一交付清单 (规划阶段结束 → 移交执行)

| 交付物 | 产出角色 | 接收角色 | 验收标准 | 存放位置 |
|--------|----------|----------|----------|----------|
| PRD v1.0 | PM | Dev/UI/QA | 所有 P0 功能有明确 AC | `paopao-task/{{project}}/prd.md` |
| 设计规范 v1.0 | UI/UX | Dev/QA | 组件库、Token、状态机完整 | `paopao-task/{{project}}/design.md` |
| 技术方案 v1.0 (本文档) | Dev | PM/UI/QA/Ops | 13 个章节完整、ADR 记录关键决策 | `paopao-task/{{project}}/tech-design.md` |
| 测试计划 v1.0 | QA | Dev/PM | 覆盖所有 AC、环境就绪 | `paopao-task/{{project}}/test-plan.md` |
| 部署架构图 | DevOps | Dev/PM | 拓扑、配置、容量规划完整 | `paopao-task/{{project}}/deployment.md` |

### 18.2 阶段二里程碑验收清单

| 里程碑 | 验收会议参与者 | 验收内容 | 通过标准 | 交付物 |
|--------|----------------|----------|----------|--------|
| M1 基础设施 | Dev Lead, DevOps, QA | CI/CD 跑通、健康检查通过、监控告警生效 | 全绿构建、部署成功、指标采集正常 | 部署记录、监控 Dashboard 链接 |
| M2 核心 MVP | PM, Dev, QA, UI/UX | 核心流程 E2E 通过、视觉还原度 ≥ 95%、性能达标 | QA 签字、PM 确认、无 P0 Bug | 测试报告、性能报告、无障碍报告 |
| M3 Beta | PM, Dev, QA, Ops | 灰度发布稳定、错误率 < 0.1%、业务指标正常 | 监控无告警、用户反馈收集 | 发布说明、已知问题清单 |
| M4 正式发布 | All Roles | 生产环境稳定运行 48h、回滚预案演练通过 | SLA 达标、文档完善 | 运维手册、架构文档、ADR 归档 |

### 18.3 日常协作机制

| 会议 | 频率 | 参与者 | 产出 | 备注 |
|------|------|--------|------|------|
| 每日站会 | 每日 15min | Dev, QA, PM | 进度同步、阻塞项 | 看板驱动 |
| 技术设计评审 | 按需 | Dev Lead, Dev, QA, DevOps | ADR 记录、方案确认 | 重大变更前必须 |
| 代码评审 | 每 PR | Dev (Reviewer), Dev (Author) | 合并批准 / 变更请求 | 必须 1 Approve |
| 测试移交会 | 每 Sprint 末 | Dev, QA | 测试环境就绪、测试数据准备、已知问题清单 | QA 确认后开始测试 |
| Sprint 评审 | 每 2 周 | All Roles | Demo、回顾、下一 Sprint 规划 | PM 主持 |

---

## 十九、 附录 E: 文档版本控制与变更记录

| 版本 | 日期 | 变更作者 | 变更摘要 | 影响范围 | 审批人 |
|------|------|----------|----------|----------|--------|
| v1.0 | {{date}} | Dev | 初版：技术选型、架构、API、数据模型、开发计划、测试、部署 | 全文 | PM, Dev Lead |
| v1.1 | {{date}} | Dev | 增加 QA 交付规范、性能基准、安全测试清单 | 章节 13, 17 | QA Lead |
| v1.2 | {{date}} | PM | 增加 PM 交付规范、里程碑计划、功能开关 | 章节 14 | PM |
| v1.3 | {{date}} | UI/UX | 增加组件映射、Design Token、a11y 清单 | 章节 15 | UI/UX Lead |
| v1.4 | {{date}} | DevOps | 增加运维规范、监控告警、容量规划 | 章节 16 | DevOps Lead |

---

(End of file)