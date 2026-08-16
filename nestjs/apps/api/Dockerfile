FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY nx.json tsconfig.base.json ./
COPY apps/api ./apps/api
RUN npx nx build api --configuration=production

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache wget && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist/apps/api ./dist
COPY --from=build /app/apps/api/package.json ./
USER nestjs
EXPOSE 3000
CMD ["sh", "-c", "exec node dist/main.js"]
