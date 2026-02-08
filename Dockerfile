FROM debian:12-slim AS mise
WORKDIR /app
RUN apt-get update \
    && apt-get -y --no-install-recommends install \
    sudo curl git ca-certificates build-essential file \
    && rm -rf /var/lib/apt/lists/*

ENV MISE_DATA_DIR="/mise"
ENV MISE_CONFIG_DIR="/mise"
ENV MISE_CACHE_DIR="/mise/cache"
ENV MISE_INSTALL_PATH="/usr/local/bin/mise"
ENV PATH="/mise/shims:$PATH"

ENV MISE_TRUSTED_CONFIG_PATHS='/app/mise.toml'

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN curl https://mise.run | sh

COPY ./mise.toml ./

RUN --mount=type=cache,target=/root/.cache/mise \
    --mount=type=cache,target=/root/.local/share/mise \
    mise trust --all && mise install


FROM mise AS builder
COPY package.json ./
RUN --mount=type=cache,target=/root/.bun \
    mise exec -- bun install
COPY . .
RUN mise exec -- bun --bun vite build


FROM mise
COPY --from=builder /app/mise.toml ./mise.toml
COPY --from=builder /app/Caddyfile ./Caddyfile
COPY --from=builder /app/bin/caddy-with-webdav.linux-amd64 ./bin/caddy-with-webdav
COPY --from=builder /app/build ./build

RUN chmod +x ./bin/caddy-with-webdav \
    && mkdir -p /data

VOLUME /data
EXPOSE 8080
CMD ["mise", "run", "prod"]