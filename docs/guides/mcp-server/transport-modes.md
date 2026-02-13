---
title: Transport Modes
description: stdio vs. HTTP transport for the MCP server
sidebar_position: 4
---

# Transport Modes

The vai MCP server supports two transport modes: **stdio** (default) and **HTTP**.

## stdio Transport (Default)

The server communicates via stdin/stdout using JSON-RPC. This is the standard mode used by Claude Desktop, Cursor, and most MCP clients.

```bash
vai mcp --transport stdio
```

- **Pros**: No network configuration, no authentication needed, works out of the box
- **Cons**: Only accessible by the parent process, no remote access
- **Use for**: Local AI tools (Claude Desktop, Cursor, Windsurf, VS Code)

## HTTP Transport — Streamable HTTP

The server runs as an HTTP service using Streamable HTTP transport (the current MCP specification). This is the default HTTP mode used by modern MCP clients.

```bash
vai mcp --transport http --port 3100
```

- **Endpoint**: `POST /mcp`
- **Pros**: Remote access, multiple clients, stateless per-request
- **Cons**: Requires authentication, network configuration
- **Use for**: Modern MCP clients, shared team servers, custom integrations

### Authentication

HTTP transport requires an API key for security:

```bash
# Generate a key
vai mcp generate-key

# Start with authentication
vai mcp --transport http --port 3100
```

### Custom Host/Port

```bash
vai mcp --transport http --host 0.0.0.0 --port 8080
```

:::warning
Binding to `0.0.0.0` exposes the server to all network interfaces. Use authentication and firewall rules.
:::

## HTTP Transport — SSE (Server-Sent Events)

Some MCP clients — notably **n8n** — use the older SSE-based MCP transport instead of Streamable HTTP. The `--sse` flag enables SSE endpoints alongside the standard Streamable HTTP endpoint.

```bash
vai mcp --transport http --port 3100 --sse
```

This starts the server with **both** transports:

| Endpoint | Transport | Used by |
|----------|-----------|---------|
| `POST /mcp` | Streamable HTTP | Claude Desktop, Cursor, modern clients |
| `GET /sse` | SSE (event stream) | n8n, legacy MCP clients |
| `POST /messages?sessionId=...` | SSE (message delivery) | n8n, legacy MCP clients |
| `GET /health` | Health check | Monitoring |
| `GET /health/sse` | SSE session count | Monitoring |

### How SSE works

1. The client opens a `GET /sse` connection → receives a persistent event stream
2. The server sends an `endpoint` event with the message URL (including a session ID)
3. The client sends JSON-RPC requests via `POST /messages?sessionId=<id>`
4. Responses stream back over the SSE connection

### Session management

- **Max concurrent sessions**: 50
- **Idle timeout**: 30 minutes (sessions with no activity are pruned)
- **Cleanup**: Sessions are automatically removed when the client disconnects

### When to use SSE

| Scenario | Transport |
|----------|-----------|
| Claude Desktop, Cursor, Windsurf, VS Code | stdio (default) |
| Modern remote MCP clients | HTTP (Streamable HTTP) |
| **n8n workflows** | **HTTP + SSE** |
| Legacy MCP clients | HTTP + SSE |

:::tip
The `--sse` flag is **additive** — it doesn't change or disable Streamable HTTP. Both transports share the same tools, auth, and configuration.
:::

## Comparison

| Feature | stdio | Streamable HTTP | SSE |
|---------|-------|----------------|-----|
| Flag | `--transport stdio` | `--transport http` | `--transport http --sse` |
| Auth required | No | Yes (bearer token) | Yes (bearer token) |
| Multiple clients | No | Yes (stateless) | Yes (session-based) |
| Remote access | No | Yes | Yes |
| Used by | Claude, Cursor | Modern MCP clients | n8n, legacy clients |

## Further Reading

- [Authentication](./authentication) — Securing the HTTP transport
- [Manual Configuration](./manual-configuration) — Config file setup
- [n8n Integration](/docs/guides/n8n-integration) — Connect vai to n8n workflows
