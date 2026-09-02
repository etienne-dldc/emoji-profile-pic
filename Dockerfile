# ---- Build stage: build the static site ----
FROM denoland/deno:latest AS builder

# Point Deno's cache at a known location so it can be discarded after build.
ENV DENO_DIR=/deno-dir

WORKDIR /app

# Copy manifests first so the dependency layer caches across source edits.
COPY deno.json deno.lock ./

# Install dependencies reproducibly from the lock file (populates node_modules).
RUN deno ci

# Copy the rest of the source and build the production bundle into ./dist.
COPY . .
RUN deno task build

# ---- Production stage: serve with Caddy ----
FROM caddy:2-alpine

WORKDIR /srv

COPY --from=builder /app/dist ./site
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
