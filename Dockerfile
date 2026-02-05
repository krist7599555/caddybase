FROM --platform=$TARGETPLATFORM debian:12-slim as mise
WORKDIR /app
RUN apt-get update  \
  && apt-get -y --no-install-recommends install  \
  sudo curl git ca-certificates build-essential \
  && rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV MISE_DATA_DIR="/mise"
ENV MISE_CONFIG_DIR="/mise"
ENV MISE_CACHE_DIR="/mise/cache"
ENV MISE_INSTALL_PATH="/usr/local/bin/mise"
ENV PATH="/mise/shims:$PATH"

RUN curl https://mise.run | sh

COPY ./mise.toml ./
RUN --mount=type=cache,target=/root/.cache/mise \
  --mount=type=cache,target=/root/.local/share/mise \
  mise trust /app/mise.toml && mise install


FROM mise as builder
COPY package.json ./
RUN --mount=type=cache,target=/root/.bun \
  bun install
COPY . .
RUN bun run build

FROM mise
COPY --from=builder /app/Caddyfile ./Caddyfile
COPY --from=builder /app/mise.toml ./mise.toml
COPY --from=builder /app/build ./build
EXPOSE 8080
USER root
CMD mise run prod