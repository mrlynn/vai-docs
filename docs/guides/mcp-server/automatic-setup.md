---
title: Automatic Setup
description: One-command MCP installation for AI tools
sidebar_position: 2
---

# Automatic MCP Setup

The fastest way to configure vai as an MCP server for your AI tools.

## Prerequisites

- vai installed globally: `npm install -g voyageai-cli`
- Voyage AI API key configured: `vai config set api-key YOUR_KEY`
- (Optional) MongoDB URI configured: `vai config set mongodb-uri YOUR_URI`

## Install

```bash
# Install into all supported tools at once
vai mcp install all

# Or install into specific tools
vai mcp install claude cursor
```

### Supported Targets

| Target | Tool | Config Path |
|--------|------|-------------|
| `claude` | Claude Desktop | `~/.config/claude/claude_desktop_config.json` |
| `claude-code` | Claude Code CLI | Claude Code MCP config |
| `cursor` | Cursor IDE | `~/.cursor/mcp.json` |
| `windsurf` | Windsurf IDE | `~/.windsurf/mcp.json` |
| `vscode` | VS Code | `~/.vscode/mcp.json` |

## Verify

```bash
vai mcp status
```

## Embed API Key in Config

To include your Voyage API key directly in the MCP config (so the server doesn't need environment variables):

```bash
vai mcp install all --api-key YOUR_VOYAGE_API_KEY
```

## Restart Your AI Tool

Most AI tools discover MCP servers on startup. After installation, **restart** Claude Desktop, Cursor, or your IDE.

## Test

Ask your AI tool something like:

> "Use vai to search for documents about vector search"

If the tool calls `vai_query`, the setup is working.

## Troubleshooting

If the MCP server isn't detected:

1. Check `vai mcp status`
2. Reinstall with `vai mcp install claude --force`
3. Restart the AI tool
4. See [MCP Troubleshooting](/docs/troubleshooting/mcp-troubleshooting)
