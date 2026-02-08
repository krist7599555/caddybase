# ⚡ Caddybase ⚡

**Deploy WebDAV, PocketBase, and SvelteKit in one single image.** 
Portable. Accessible. Debuggable.

---

## 🚀 Overview

Caddybase is a "batteries-included" architecture that combines a modern frontend, a powerful backend, and a flexible file-sharing interface into a single, portable unit. It uses **Caddy** as a high-performance entry point and reverse proxy to orchestrate everything.

- 🌐 **SvelteKit**: High-performance frontend logic and SSR.
- 📦 **PocketBase**: Dead-simple auth, database, and file storage.
- 📂 **WebDAV**: Direct filesystem access for power users and automation.
- 🛡️ **Caddy**: The glue that binds them with TLS support and custom routing.

---

## 📜 Data Scripture (Important Files & Scripts)

The heartbeat of this project lies in these configuration files:

| File / Command | Role | Description |
| :--- | :--- | :--- |
| `Dockerfile` | **The Forge** | Multi-stage build process using `mise` for a minimized, portable production image. |
| `Caddyfile` | **The Gatekeeper** | Handles reverse proxying, WebDAV mapping, and basic authentication. |
| `mise.toml` | **The Orchestrator** | Manages development and production tasks (`dev`, `prod`). |
| `bin/caddy-with-webdav` | **The Engine** | A custom-built Caddy binary with the `mholt/caddy-webdav` plugin. |
| `PocketBase` | **The Core** | Provides API, Admin UI, and Database. |
| `/data` | **The Sanctuary** | The designated Docker volume for persistent PocketBase and WebDAV data. |

---

## 🧠 What You Need To Know

### 1. The Entry Point
Everything runs behind Caddy on **Port 8080**. You don't need to expose PocketBase (8090) or SvelteKit (3000) directly.

### 2. Routing Logic
*   `/` → **SvelteKit App** (Node.js runtime)
*   `/_/` → **PocketBase Admin UI**
*   `/api/*` → **PocketBase Collections & Auth**
*   `/webdav/*` → **WebDAV Endpoint** (Requires Authentication)
*   `/browse/*` → **Read-only File Browser**

### 3. WebDAV Authentication
The WebDAV endpoint is protected by Basic Auth.
- **User:** `krist7599555`
- **Password:** *[Check Caddyfile for bcrypt hash]*
- **Note:** Browsers often fail to render WebDAV properly. Use **Finder (Go > Connect to Server)**, **Cyberduck**, or **Transmit**.

### 4. Development Workflow
We use `mise` for environment management.
```bash
# Start the entire stack (Caddy + PB + SvelteKit)
mise run dev
```

---

## 🛠 Getting Started

### Prerequisites
- [mise](https://mise.jdx.dev/) (recommended) or `bun` + `pocketbase` + `caddy` manually.
- [xcaddy](https://github.com/caddyserver/xcaddy) (if building the Caddy binary from scratch).
- Docker or Podman.

### Building the Engine (Custom Caddy)
Caddybase requires a custom Caddy binary with WebDAV support. You can build it for multiple architectures:
```bash
# Using mise (defined in mise.local.toml)
mise run build-caddy
```
This generates:
- `bin/caddy-with-webdav.darwin-arm64`
- `bin/caddy-with-webdav.linux-amd64`

### Local Setup
1. Clone the repository.
2. Install dependencies: `bun install`.
3. Start the dev environment: `mise run dev`.

### Production Deployment
The project is designed to be built and run as a single container:

```bash
docker build -t caddybase .
docker run -p 8080:8080 -v $(pwd)/data:/data caddybase
```

---

## 🏗 Advanced Tasks
Defined in `mise.toml` and `mise.local.toml`:

- **`mise run build-svelte`**: Compiles the frontend.
- **`mise run build-docker`**: Builds the AMD64 image (using Podman/Docker).
- **`mise run deploy-docker`**: Pushes the image to the registry.
- **`mise run clean-gen`**: Deletes generated artifacts (`.svelte-kit`, `bin`, `build`).

---

## 🛠 Debugging & Portability
- **Logs:** Caddy logs to `stdout` in console format for easy Docker monitoring.
- **Portable Data:** Simply zip the `/data` directory to move your entire database, users, and uploaded files to a new server.
- **Debugging:** Use the `/browse` endpoint to quickly inspect the container's internal filesystem (read-only).
