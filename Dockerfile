# ---- Build stage: build the static site with Vite+ ----
FROM ghcr.io/voidzero-dev/vite-plus:1.1.0 AS builder

WORKDIR /app

# Copy manifests first so the dependency layer caches across source edits.
COPY --chown=vp:vp package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Install dependencies reproducibly from the lock file (populates node_modules).
RUN vp install --frozen-lockfile

# Copy the rest of the source and build the production bundle into ./dist.
COPY --chown=vp:vp . .
RUN vp build

# ---- Production stage: serve with Caddy ----
FROM caddy:2-alpine

WORKDIR /srv

COPY --from=builder /app/dist ./site
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
