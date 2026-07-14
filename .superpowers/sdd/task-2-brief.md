### Task 2: Install Dependencies

**Files:**
- Modify: `package.json` (root — dependencies section)
- Create: `.npmrc`

**Interfaces:**
- Consumes: Task 1 (root exists)
- Produces: All npm packages installed

- [ ] **Step 1: Create .npmrc**

```
auto-install-peers=true
strict-peer-dependencies=false
```

- [ ] **Step 2: Install NestJS core dependencies**

Run:
```bash
pnpm add @nestjs/core @nestjs/common @nestjs/platform-express @nestjs/config @nestjs/swagger @nestjs/terminus @nestjs/microservices reflect-metadata rxjs class-transformer class-validator
```

- [ ] **Step 3: Install infrastructure client deps**

Run:
```bash
pnpm add @prisma/client ioredis amqplib amqp-connection-manager
```

- [ ] **Step 4: Install logging and observability deps**

Run:
```bash
pnpm add pino pino-pretty @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/resources @opentelemetry/semantic-conventions prom-client
```

- [ ] **Step 5: Install validation deps**

Run:
```bash
pnpm add zod
```

- [ ] **Step 6: Install dev dependencies**

Run:
```bash
pnpm add -D typescript @types/node @types/express @types/amqplib @types/ioredis @nestjs/cli @nestjs/schematics @nestjs/testing jest ts-jest ts-node @types/jest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged prisma @swc/core @swc/jest source-map-support
```

- [ ] **Step 7: Verify install**

Run: `pnpm ls --depth 0`
Expected: All dependencies listed without errors

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: install all project dependencies"
```

---

