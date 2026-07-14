# Notification Platform — Day 1 Foundation

## Overview

Build the project foundation for a production-grade notification platform. This is a NestJS monorepo serving as a portfolio project targeting senior backend engineering positions. Day 1 focuses exclusively on infrastructure scaffolding — no business logic, no notification sending.

## Architecture

- **Monorepo mode**: NestJS native monorepo with `nest-cli.json`
- **Apps**: All service applications under `apps/`
- **Libraries**: All shared modules under `libs/`, imported via `@app/<name>` path aliases
- **Package manager**: pnpm with workspace support
- **Language**: TypeScript (strict mode)

### Folder Structure

```
notification-system/
├── apps/
│   ├── api-gateway/               # Day 1 active — health check entry point
│   ├── notification-service/      # Placeholder
│   ├── email-service/             # Placeholder
│   ├── push-service/              # Placeholder
│   ├── sms-service/               # Placeholder
│   ├── websocket-service/         # Placeholder
│   ├── scheduler-service/         # Placeholder
│   ├── worker-service/            # Placeholder
│   ├── template-service/          # Placeholder
│   └── user-preference-service/   # Placeholder
├── libs/
│   ├── config/                    # Global ConfigModule (env validation via Zod)
│   ├── database/                  # PrismaModule + RedisModule
│   ├── logger/                    # Pino logger module
│   ├── events/                    # RabbitMQ event bus module
│   ├── dto/                       # Shared DTOs
│   ├── utils/                     # Shared utilities
│   ├── common/                    # Common decorators, guards, filters, interceptors
│   └── observability/             # OpenTelemetry + Prometheus + Terminus health
├── docker/
│   ├── docker-compose.yml         # All infrastructure services
│   └── Dockerfile.api-gateway     # API Gateway Dockerfile
├── docs/
│   ├── superpowers/specs/         # Design docs
│   ├── architecture.md            # Architecture documentation
│   ├── adr/                       # Architecture Decision Records
│   └── diagrams/                  # Mermaid diagrams
├── scripts/                       # Dev helper scripts
├── .github/workflows/             # CI pipeline
├── .husky/                        # Git hooks
├── prisma/                        # Prisma schema (root level)
│   └── schema.prisma             # Connection verification only (no tables)
├── nest-cli.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── .eslintrc.js
├── .prettierrc
├── .lintstagedrc.js
├── .env.example
├── .env.development
├── .env.production
├── ROADMAP.md
└── README.md
```

## Tech Stack

| Component          | Technology                      |
|--------------------|---------------------------------|
| Runtime            | Node.js 24 LTS                  |
| Framework          | NestJS                          |
| Language           | TypeScript (strict)             |
| Package Manager    | pnpm                            |
| Database ORM       | Prisma                          |
| Cache/Broker       | Redis                           |
| Message Broker     | RabbitMQ                        |
| Validation         | Zod                             |
| Logging            | Pino                            |
| Tracing            | OpenTelemetry + Jaeger exporter |
| Metrics            | Prometheus client               |
| Health Checks      | Terminus                        |
| API Docs           | Swagger (OpenAPI 3.0)           |

## Infrastructure (Docker Compose)

| Service     | Image                        | Purpose                     |
|-------------|------------------------------|-----------------------------|
| PostgreSQL  | postgres:16-alpine           | Primary database            |
| Redis       | redis:7-alpine               | Caching + pub/sub           |
| RabbitMQ    | rabbitmq:4-management        | Message broker              |
| LocalStack  | localstack/localstack        | AWS SNS/SQS emulation       |
| Prometheus  | prom/prometheus              | Metrics collection          |
| Grafana     | grafana/grafana              | Metrics visualization       |
| Jaeger      | jaegertracing/all-in-one     | Distributed tracing         |
| Mailhog     | mailhog/mailhog              | Email testing               |
| Adminer     | adminer                      | Database management UI      |

## Configuration

- **ConfigModule** from `@app/config` loaded globally
- Environment validation via Zod schema
- Three environments: `development`, `staging`, `production`
- `.env.example` documents all required variables
- `.env.development` / `.env.production` provide defaults

### Environment Variables

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/notification_platform
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://guest:guest@localhost:5672
AWS_ACCESS_KEY=localstack
AWS_SECRET_KEY=localstack
AWS_REGION=us-east-1
SNS_ENDPOINT=http://localhost:4566
SQS_ENDPOINT=http://localhost:4566
LOG_LEVEL=info
OTEL_EXPORTER_JAEGER_ENDPOINT=http://localhost:14250
```

## Day 1 — Active Components

### API Gateway
- NestJS application (`apps/api-gateway`)
- Bootstrap with `NestFactory.create`
- Swagger configuration at `/api/docs`
- Prometheus metrics at `/metrics`
- Terminus health at `/health`, `/live`, `/ready`
- Pino HTTP logger with request ID, path, method, response time, status code
- OpenTelemetry HTTP instrumentation

### Shared Libraries (all functional Day 1)

| Library        | Responsibility                        |
|----------------|----------------------------------------|
| `@app/config`  | Global ConfigModule with Zod env validation |
| `@app/database`| PrismaModule (connection verification), RedisModule |
| `@app/logger`  | Pino logger setup                      |
| `@app/events`  | RabbitMQ client module (connection only) |
| `@app/observability` | OpenTelemetry setup, Prometheus metrics, Terminus health |
| `@app/common`  | Shared decorators, guards, interceptors |
| `@app/utils`   | Shared utility functions               |
| `@app/dto`     | Shared DTOs and interfaces             |

### Placeholder Services (apps/*)
Each has: `README.md`, `src/`, `test/`, `Dockerfile`, `package.json`, NestJS bootstrap, AppModule, HealthController, HealthService. All are pre-generated but not wired into the API Gateway.

## Code Quality

- **Strict TypeScript**: `strict: true` in tsconfig
- **No `any`**: ESLint rule `@typescript-eslint/no-explicit-any: error`
- **SOLID**: Single-responsibility modules, dependency injection
- **Feature-first**: Each library owns its feature completely
- **Husky**: pre-commit hook runs lint, format, test
- **Lint-staged**: staged files only
- **ESLint + Prettier**: consistent code style
- **Conventional Commits**: commit message convention

## CI Pipeline (GitHub Actions)

```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm build
      - run: pnpm test
```

## Documentation

- `docs/architecture.md` — Full architecture explanation
- `docs/adr/ADR-001-nestjs.md` through `ADR-004-opentelemetry.md`
- `docs/diagrams/` — Mermaid diagrams (system context, container, deployment, notification flow)
- `ROADMAP.md` — 14-day build plan

## Future Services (Documented Only)

Each future service has a placeholder directory with architecture notes in its README:

- **notification-service**: Core orchestration, template rendering, de-duplication
- **email-service**: SES/SendGrid integration, HTML email rendering
- **push-service**: FCM/APNs integration
- **sms-service**: Twilio integration
- **websocket-service**: Socket.IO/WebSocket gateway
- **scheduler-service**: Cron-based notification scheduling
- **worker-service**: Retry workers, dead letter queue processing
- **template-service**: Notification template management
- **user-preference-service**: User opt-in/out, channel preferences
- **analytics-service**: Delivery tracking, open rates, click rates

## Acceptance Criteria

1. Repository builds successfully (`pnpm build`)
2. `docker compose up` starts all 10 infrastructure services
3. Swagger UI accessible at `http://localhost:3000/api/docs`
4. Health endpoint `GET /health` returns 200 with status
5. Metrics endpoint `GET /metrics` returns Prometheus metrics
6. OpenTelemetry traces exported to Jaeger
7. Pino request logging works with correlation IDs
8. CI pipeline passes (lint → build → test)
9. ESLint passes with no errors
10. Folder structure is clean and organized
11. Documentation is production-quality
