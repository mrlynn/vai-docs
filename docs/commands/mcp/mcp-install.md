---
title: "vai mcp install"
description: "Auto-install MCP server into AI tools"
sidebar_position: 2
---

# vai mcp install

Automatically install the vai MCP server into the configuration files of supported AI tools.

## Synopsis

```bash
vai mcp install [targets...] [options]
```

## Description

`vai mcp install` writes the vai MCP server configuration into the config files of AI tools like Claude Desktop, Claude Code, Cursor, Windsurf, and VS Code. This enables these tools to discover and use vai's embedding, search, and RAG tools.

### Supported Targets

| Target | Tool |
|--------|------|
| `claude` | Claude Desktop |
| `claude-code` | Claude Code CLI |
| `cursor` | Cursor IDE |
| `windsurf` | Windsurf IDE |
| `vscode` | VS Code |
| `all` | Install into all supported tools |

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `[targets...]` | Target tools (space-separated, or `all`) | — |
| `--force` | Overwrite existing vai entry | — |
| `--transport <mode>` | Transport mode: `stdio` or `http` | `stdio` |
| `--port <number>` | HTTP port (http transport only) | — |
| `--api-key <key>` | Voyage API key to embed in config | — |

## Examples

### Install into all tools

```bash
vai mcp install all
```

### Install into Claude Desktop and Cursor

```bash
vai mcp install claude cursor
```

### Install with API key embedded

```bash
vai mcp install all --api-key your-voyage-api-key
```

### Force overwrite existing config

```bash
vai mcp install claude --force
```

## Tips

- Run `vai mcp status` first to see which tools are already configured.
- The installer writes to each tool's standard config file location. If a vai entry already exists, use `--force` to overwrite.
- After installation, restart the AI tool for the MCP server to be discovered.

## Related Commands

- [`vai mcp uninstall`](./mcp-uninstall) — Remove MCP server from tools
- [`vai mcp status`](./mcp-status) — Check installation status
- [`vai mcp`](./mcp) — Start the MCP server manually
