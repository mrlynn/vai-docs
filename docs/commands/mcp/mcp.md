---
title: "vai mcp"
description: "Start the Model Context Protocol server"
sidebar_position: 1
---

# vai mcp

Start the MCP (Model Context Protocol) server, exposing vai's tools to AI-powered editors and agents like Claude Desktop, Cursor, Windsurf, and VS Code.

## Synopsis

```bash
vai mcp [options]
vai mcp-server [options]
```

## Description

`vai mcp` (alias for `vai mcp-server`) starts an MCP server that exposes vai's embedding, search, reranking, and management capabilities as tools that AI agents can call. It supports two transport modes:

- **stdio** (default): Communicates via stdin/stdout JSON-RPC. Used by Claude Desktop, Cursor, and most MCP clients.
- **http**: Runs an HTTP server with Streamable HTTP transport. Useful for remote access or custom integrations.

The server registers tools across five domains: retrieval, embedding, management, utility, and ingest.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--transport <mode>` | Transport mode: `stdio` or `http` | `stdio` |
| `--port <number>` | HTTP port (http transport only) | `3100` |
| `--host <address>` | Bind address (http transport only) | `127.0.0.1` |
| `--sse` | Enable SSE transport alongside Streamable HTTP (for n8n, legacy MCP clients) | off |
| `--db <name>` | Default MongoDB database for tools | — |
| `--collection <name>` | Default collection for tools | — |
| `--verbose` | Enable debug logging to stderr | — |

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `generate-key` | Generate a new API key for remote HTTP authentication |

## Examples

### Start MCP server (stdio)

```bash
vai mcp
```

### Start HTTP server on custom port

```bash
vai mcp --transport http --port 8080
```

### With default database

```bash
vai mcp --db myapp --collection docs
```

### Start HTTP server with SSE for n8n

```bash
vai mcp --transport http --port 3100 --sse
```

### Generate an auth key for HTTP transport

```bash
vai mcp generate-key
```

## Tips

- For auto-installation into AI tools, use [`vai mcp install`](./mcp-install) instead of manually configuring.
- The stdio transport is used by most MCP clients (Claude Desktop, Cursor, Windsurf, VS Code).
- Use `--verbose` to see tool calls logged to stderr for debugging.
- HTTP transport requires authentication — use `vai mcp generate-key` to create an API key.
- Use `--sse` with HTTP transport to enable n8n and other SSE-based MCP clients. See the [n8n Integration Guide](/docs/guides/n8n-integration).

## Related Commands

- [`vai mcp install`](./mcp-install) — Auto-install into AI tools
- [`vai mcp uninstall`](./mcp-uninstall) — Remove from AI tools
- [`vai mcp status`](./mcp-status) — Check installation status
- [MCP Server Guide](/docs/guides/mcp-server/overview) — Setup and usage guide
