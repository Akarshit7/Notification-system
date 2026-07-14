### Task 1: Project Initialization

**Files:**
- Create: `package.json` (root)
- Create: `pnpm-workspace.yaml`
- Create: `.gitignore`
- Create: `nest-cli.json`
- Create: `tsconfig.json`
- Create: `tsconfig.build.json`
- Create: `apps/api-gateway/tsconfig.app.json`
- Create: `libs/config/tsconfig.lib.json`
- Create (shared template): `apps/placeholder-app/package.json` pattern
- Create: `libs/config/package.json`

**Interfaces:**
- Consumes: nothing
- Produces: Root monorepo structure with pnpm + NestJS monorepo mode

- [ ] **Step 1: Create root package.json**

```json
{
  "name": "notification-platform",
  "version": "0.1.0",
  "private": true,
  "description": "Production-grade notification platform",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"**/*.ts\"",
    "lint": "eslint \"{apps,libs}/**/*.ts\" --fix",
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./apps/api-gateway/test/jest-e2e.json",
    "start:dev": "nest start --watch",
    "start:api-gateway": "nest start api-gateway --watch",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push",
    "prisma:studio": "prisma studio",
    "docker:up": "docker compose -f docker/docker-compose.yml up -d",
    "docker:down": "docker compose -f docker/docker-compose.yml down",
    "prepare": "husky"
  },
  "engines": {
    "node": ">=24.0.0",
    "pnpm": ">=11.0.0"
  },
  "packageManager": "pnpm@11.5.2"
}
```

- [ ] **Step 2: Create pnpm-workspace.yaml**

```yaml
packages:
  - 'apps/*'
  - 'libs/*'
```

- [ ] **Step 3: Create .gitignore**

```
node_modules/
dist/
coverage/
.env
.env.local
.env.*.local
*.log
.DS_Store
.turbo
prisma/*.db
prisma/*.db-journal
```

- [ ] **Step 4: Create nest-cli.json**

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/api-gateway/src",
  "compilerOptions": {
    "builder": "swc",
    "typeCheck": true,
    "tsConfigPath": "apps/api-gateway/tsconfig.app.json",
    "webpack": false
  },
  "monorepo": true,
  "root": "apps/api-gateway",
  "projects": {
    "api-gateway": {
      "type": "application",
      "root": "apps/api-gateway",
      "entryFile": "main",
      "sourceRoot": "apps/api-gateway/src",
      "compilerOptions": {
        "tsConfigPath": "apps/api-gateway/tsconfig.app.json"
      }
    },
    "notification-service": {
      "type": "application",
      "root": "apps/notification-service",
      "entryFile": "main",
      "sourceRoot": "apps/notification-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/notification-service/tsconfig.app.json"
      }
    },
    "email-service": {
      "type": "application",
      "root": "apps/email-service",
      "entryFile": "main",
      "sourceRoot": "apps/email-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/email-service/tsconfig.app.json"
      }
    },
    "push-service": {
      "type": "application",
      "root": "apps/push-service",
      "entryFile": "main",
      "sourceRoot": "apps/push-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/push-service/tsconfig.app.json"
      }
    },
    "sms-service": {
      "type": "application",
      "root": "apps/sms-service",
      "entryFile": "main",
      "sourceRoot": "apps/sms-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/sms-service/tsconfig.app.json"
      }
    },
    "websocket-service": {
      "type": "application",
      "root": "apps/websocket-service",
      "entryFile": "main",
      "sourceRoot": "apps/websocket-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/websocket-service/tsconfig.app.json"
      }
    },
    "scheduler-service": {
      "type": "application",
      "root": "apps/scheduler-service",
      "entryFile": "main",
      "sourceRoot": "apps/scheduler-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/scheduler-service/tsconfig.app.json"
      }
    },
    "worker-service": {
      "type": "application",
      "root": "apps/worker-service",
      "entryFile": "main",
      "sourceRoot": "apps/worker-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/worker-service/tsconfig.app.json"
      }
    },
    "template-service": {
      "type": "application",
      "root": "apps/template-service",
      "entryFile": "main",
      "sourceRoot": "apps/template-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/template-service/tsconfig.app.json"
      }
    },
    "user-preference-service": {
      "type": "application",
      "root": "apps/user-preference-service",
      "entryFile": "main",
      "sourceRoot": "apps/user-preference-service/src",
      "compilerOptions": {
        "tsConfigPath": "apps/user-preference-service/tsconfig.app.json"
      }
    },
    "config": {
      "type": "library",
      "root": "libs/config",
      "entryFile": "index",
      "sourceRoot": "libs/config/src",
      "compilerOptions": {
        "tsConfigPath": "libs/config/tsconfig.lib.json"
      }
    },
    "database": {
      "type": "library",
      "root": "libs/database",
      "entryFile": "index",
      "sourceRoot": "libs/database/src",
      "compilerOptions": {
        "tsConfigPath": "libs/database/tsconfig.lib.json"
      }
    },
    "logger": {
      "type": "library",
      "root": "libs/logger",
      "entryFile": "index",
      "sourceRoot": "libs/logger/src",
      "compilerOptions": {
        "tsConfigPath": "libs/logger/tsconfig.lib.json"
      }
    },
    "events": {
      "type": "library",
      "root": "libs/events",
      "entryFile": "index",
      "sourceRoot": "libs/events/src",
      "compilerOptions": {
        "tsConfigPath": "libs/events/tsconfig.lib.json"
      }
    },
    "dto": {
      "type": "library",
      "root": "libs/dto",
      "entryFile": "index",
      "sourceRoot": "libs/dto/src",
      "compilerOptions": {
        "tsConfigPath": "libs/dto/tsconfig.lib.json"
      }
    },
    "utils": {
      "type": "library",
      "root": "libs/utils",
      "entryFile": "index",
      "sourceRoot": "libs/utils/src",
      "compilerOptions": {
        "tsConfigPath": "libs/utils/tsconfig.lib.json"
      }
    },
    "common": {
      "type": "library",
      "root": "libs/common",
      "entryFile": "index",
      "sourceRoot": "libs/common/src",
      "compilerOptions": {
        "tsConfigPath": "libs/common/tsconfig.lib.json"
      }
    },
    "observability": {
      "type": "library",
      "root": "libs/observability",
      "entryFile": "index",
      "sourceRoot": "libs/observability/src",
      "compilerOptions": {
        "tsConfigPath": "libs/observability/tsconfig.lib.json"
      }
    }
  }
}
```

- [ ] **Step 5: Create root tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "paths": {
      "@app/config": ["libs/config/src"],
      "@app/config/*": ["libs/config/src/*"],
      "@app/database": ["libs/database/src"],
      "@app/database/*": ["libs/database/src/*"],
      "@app/logger": ["libs/logger/src"],
      "@app/logger/*": ["libs/logger/src/*"],
      "@app/events": ["libs/events/src"],
      "@app/events/*": ["libs/events/src/*"],
      "@app/dto": ["libs/dto/src"],
      "@app/dto/*": ["libs/dto/src/*"],
      "@app/utils": ["libs/utils/src"],
      "@app/utils/*": ["libs/utils/src/*"],
      "@app/common": ["libs/common/src"],
      "@app/common/*": ["libs/common/src/*"],
      "@app/observability": ["libs/observability/src"],
      "@app/observability/*": ["libs/observability/src/*"]
    }
  }
}
```

- [ ] **Step 6: Create tsconfig.build.json**

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts", "**/*test.ts"]
}
```

- [ ] **Step 7: Create dirs and tsconfig.app.json for api-gateway**

Run:
```bash
mkdir -p apps/api-gateway/src apps/api-gateway/test
```

Create `apps/api-gateway/tsconfig.app.json`:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "../../dist/apps/api-gateway"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

- [ ] **Step 8: Create lib workspace package.json template**

Create `libs/config/package.json`:
```json
{
  "name": "@app/config",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts"
}
```

- [ ] **Step 9: Create tsconfig.lib.json for each lib**

Create `libs/config/tsconfig.lib.json`:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "../../dist/libs/config"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

- [ ] **Step 10: Verify structure**

Run: `ls -la apps/ libs/`
Expected: folder structure exists

- [ ] **Step 11: Commit**

```bash
git init
git add -A
git commit -m "chore: initialize nestjs monorepo with pnpm workspaces"
```

---

