FROM node:20-alpine AS base

ENV APP_NAME="login"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

FROM base AS builder
WORKDIR /app

RUN pnpm install turbo --global
COPY . .
RUN turbo prune ${APP_NAME} --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG NEXT_PUBLIC_PORTAL_UI_BASE_URL
ARG NEXT_PUBLIC_ADMIN_UI_BASE_URL
ARG NEXT_PUBLIC_API_GATEWAY_BASE_URL

RUN pnpm turbo build --filter=${APP_NAME}...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/${APP_NAME}/next.config.mjs .
COPY --from=installer /app/apps/${APP_NAME}/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

EXPOSE 2000

ENV PORT=2000
ENV HOSTNAME=0.0.0.0
ENV RUNTIME_ENVIRONMENT=docker

CMD node apps/${APP_NAME}/server.js
