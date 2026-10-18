FROM node:24-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/email-service/package.json ./apps/email-service/
COPY libs/ ./libs/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm exec nest build email-service

FROM node:24-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3002
CMD ["node", "dist/apps/email-service/main"]
