FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_MODE
ENV NEXT_PUBLIC_MODE=${NEXT_PUBLIC_MODE}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER nextjs

CMD ["npm", "start"]