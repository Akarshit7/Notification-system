# Notification Platform

A production-grade, event-driven notification platform built as a NestJS monorepo. It is designed to
fan out notifications across email, SMS, push, and WebSocket channels, with a scheduler, template
service, worker pool, and user-preference management — wired together through RabbitMQ (SNS/SQS via
LocalStack) and backed by PostgreSQL and Redis.

> **Status:** foundational scaffold. The `api-gateway` service is fully functional (HTTP API, health
> checks, metrics, Swagger, structured logging, tracing). The remaining services are bootable
> placeholders ready to have their business logic implemented. See [ROADMAP.md](./ROADMAP.md).

## Architecture

```
                         ┌─────────────────┐
        HTTP clients ───▶│   api-gateway   │
                         └────────┬────────┘
                                  │  events (RabbitMQ / SNS-SQS)
        ┌──────────────┬─────────┼─────────┬──────────────┐
        ▼              ▼         ▼         ▼              ▼
 ┌────────────┐ ┌───────────┐ ┌───────┐ ┌───────────┐ ┌──────────────┐
 │ notification│ │   email   │ │  sms  │ │   push    │ │  websocket   │
 └─────┬──────┘ └───────────┘ └───────┘ └───────────┘ └──────────────┘
       │
       ├──▶ template-service        ── manages notification templates
       ├──▶ user-preference-service  ── per-user channel preferences
       ├──▶ scheduler-service        ── delayed/scheduled delivery
       └──▶ worker-service           ── async processing pool
```

### Services (`apps/`)

| Service                  | Port | Responsibility                              |
| ------------------------ | ---- | ------------------------------------------- |
| `api-gateway`            | 3000 | Public HTTP API, routing, Swagger, metrics  |
| `notification-service`   | 3001 | Orchestrates notification fan-out           |
| `email-service`          | 3002 | Email channel delivery                      |
| `push-service`           | 3003 | Mobile/web push delivery                    |
| `sms-service`            | 3004 | SMS channel delivery                        |
| `websocket-service`      | 3005 | Real-time WebSocket delivery                |
| `scheduler-service`      | 3006 | Scheduled and delayed notifications         |
| `worker-service`         | 3007 | Async worker pool                           |
| `template-service`       | 3008 | Notification template management            |
| `user-preference-service`| 3009 | User channel preferences and opt-outs       |

### Shared libraries (`libs/`)

| Library         | Purpose                                                               |
| --------------- | --------------------------------------------------------------------- |
| `config`        | Typed, validated configuration (Zod) loaded from the environment      |
| `database`      | Prisma client wrapper + Redis service                                 |
| `logger`        | Pino-based structured logging + request logging interceptor           |
| `events`        | RabbitMQ/AMQP event bus abstraction                                   |
| `observability` | OpenTelemetry tracing, Prometheus metrics, Terminus health endpoints  |
| `common`        | Shared constants, decorators, guards (scaffold)                       |
| `utils`         | Shared utility functions (scaffold)                                   |
| `dto`           | Shared Data Transfer Objects (scaffold)                               |

### Local infrastructure (`docker/`)

`docker-compose.yml` provisions the full local stack:

| Component   | Port(s)        | Notes                              |
| ----------- | -------------- | ---------------------------------- |
| PostgreSQL  | 5432           | state store                        |
| Redis       | 6379           | cache / coordination               |
| RabbitMQ    | 5672, 15672    | broker (15672 = management UI)     |
| LocalStack  | 4566           | SNS/SQS emulation                  |
| Prometheus  | 9090           | metrics scraping                   |
| Grafana     | 3000           | dashboards (admin / admin)         |
| Jaeger      | 16686, 4317/18 | tracing UI / OTLP ingest           |
| MailHog     | 1025, 8025     | SMTP capture / web UI              |
| Adminer     | 8080           | database UI                        |

> Grafana's default port (3000) collides with `api-gateway`'s default port. Change one of them if you
> run both locally.

## Tech stack

- **Runtime:** Node.js 24+, pnpm 11 (workspaces)
- **Framework:** NestJS 11
- **Data:** PostgreSQL (Prisma 6), Redis (ioredis), RabbitMQ (amqplib)
- **Observability:** OpenTelemetry, Prometheus (`prom-client`), Terminus health checks, Pino logging
- **Build:** Webpack (via Nest CLI) bundling workspace code with `@app/*` path aliases
- **Quality:** ESLint 10 (flat config), Prettier, Husky + lint-staged, Jest

## Getting started

### Prerequisites

- Node.js >= 24
- pnpm >= 11
- Docker + Docker Compose

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create your local environment file
cp .env.example .env

# 3. Start the local infrastructure
pnpm docker:up

# 4. Generate the Prisma client
pnpm prisma:generate

# 5. Run the API gateway in watch mode
pnpm start:api-gateway
```

The API is then available at `http://localhost:3000/api/v1` and Swagger docs at
`http://localhost:3000/api/docs`.

### Build & run a single service

```bash
pnpm exec nest build api-gateway
node dist/apps/api-gateway/main.js
```

## Scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `pnpm build`           | Build the default app (`api-gateway`)              |
| `pnpm build:all`       | Build every service into `dist/apps/<service>`     |
| `pnpm start:dev`       | Start the default app in watch mode                |
| `pnpm start:api-gateway` | Start `api-gateway` in watch mode                |
| `pnpm lint`            | Lint `apps/` and `libs/` (with `--fix`)            |
| `pnpm format`          | Format all TypeScript with Prettier                |
| `pnpm test`            | Run unit tests                                     |
| `pnpm test:e2e`        | Run the API gateway end-to-end tests               |
| `pnpm test:cov`        | Run tests with coverage                            |
| `pnpm prisma:generate` | Generate the Prisma client                         |
| `pnpm prisma:push`     | Push the Prisma schema to the database             |
| `pnpm docker:up`       | Start local infrastructure                         |
| `pnpm docker:down`     | Stop local infrastructure                          |

## Configuration

Configuration is validated at startup with Zod (`libs/config`). Required variables:

| Variable         | Required | Description                                  |
| ---------------- | -------- | -------------------------------------------- |
| `DATABASE_URL`   | yes      | PostgreSQL connection string                 |
| `REDIS_URL`      | yes      | Redis connection string                      |
| `RABBITMQ_URL`   | yes      | RabbitMQ connection string                   |
| `AWS_ACCESS_KEY` | yes      | AWS / LocalStack access key                  |
| `AWS_SECRET_KEY` | yes      | AWS / LocalStack secret key                  |
| `AWS_REGION`     | no       | Defaults to `us-east-1`                      |
| `NODE_ENV`       | no       | Defaults to `development`                    |
| `PORT`           | no       | Per-service default (see service port table) |
| `LOG_LEVEL`      | no       | Defaults to `info`                           |
| `OTEL_*`         | no       | OpenTelemetry exporter configuration         |

See [`.env.example`](./.env.example) for a ready-to-use template.

## Project structure

```
.
├── apps/                  # services (api-gateway + 9 domain services)
├── libs/                  # shared libraries
├── docker/                # local infrastructure (compose + configs)
├── prisma/                # Prisma schema
├── docs/                  # architecture notes
├── webpack.config.js      # Nest build bundling config (resolves @app/* aliases)
├── nest-cli.json          # Nest monorepo + webpack builder configuration
└── eslint.config.mjs      # ESLint flat config
```

## Health & metrics

Every service exposes:

- `GET /health` — Terminus health check
- `GET /live` — liveness probe
- `GET /ready` — readiness probe
- `GET /metrics` — Prometheus metrics (api-gateway)

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

## License

No license has been specified for this project.
