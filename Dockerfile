# syntax=docker/dockerfile:1.5

# ---- Base Node image ----
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --no-optional --no-audit --progress=false

# Copy static assets and source code
COPY . .

# ---- Production image ----
FROM base AS production
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000"]

# ---- Development image ----
FROM base AS development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000"]

# ---- Final stage (selectable by build arg) ----
FROM production AS final
ARG NODE_ENV=production
LABEL org.opencontainers.image.source="cinco-doce-website"

# For local dev, override with: docker build --target=development ...
