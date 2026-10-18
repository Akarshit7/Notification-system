# Roadmap

## Done

- [x] Monorepo scaffold (pnpm workspaces, NestJS 11)
- [x] Shared `config` library with Zod-validated environment config
- [x] Shared `logger` library (Pino) + request logging interceptor
- [x] Shared `database` library (Prisma + Redis) with graceful connection handling
- [x] Shared `events` library (RabbitMQ/AMQP)
- [x] Shared `observability` library (OpenTelemetry, Prometheus, Terminus health)
- [x] `api-gateway` HTTP API with Swagger, metrics and health endpoints
- [x] Bootable placeholder services for every domain
- [x] Local infrastructure via Docker Compose (Postgres, Redis, RabbitMQ, LocalStack, Prometheus,
      Grafana, Jaeger, MailHog, Adminer)
- [x] Webpack-based build producing runnable `dist/apps/<service>/main.js`
- [x] CI pipeline (lint, build, test)

## Next

- [ ] Define Prisma data models (users, notifications, templates, preferences, delivery attempts)
- [ ] Implement `notification-service` orchestration and fan-out
- [ ] Implement channel services: `email`, `sms`, `push`, `websocket`
- [ ] Implement `template-service` (CRUD + rendering)
- [ ] Implement `user-preference-service` (channel preferences, opt-outs)
- [ ] Implement `scheduler-service` (delayed / scheduled delivery)
- [ ] Implement `worker-service` (async processing pool + retries)
- [ ] Wire SNS/SQS topics and queues (LocalStack init script → real AWS)
- [ ] Add authentication / authorization at the gateway
- [ ] Add OpenTelemetry instrumentation to all services
- [ ] Add Grafana dashboards and Prometheus alert rules
- [ ] Container images and deployment manifests per service
- [ ] Integration and load testing
