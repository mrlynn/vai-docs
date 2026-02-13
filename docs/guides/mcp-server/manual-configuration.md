---
title: Manual Configuration
description: Configure MCP server by editing config files directly
sidebar_position: 3
---

# Manual MCP Configuration

If `vai mcp install` doesn't work for your setup, you can configure the MCP server manually.

## Claude Desktop

Edit `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vai": {
      "command": "vai",
      "args": ["mcp"],
      "env": {
        "VOYAGE_API_KEY": "your-api-key",
        "MONGODB_URI": "mongodb+srv://user:pass@cluster.mongodb.net"
      }
    }
  }
}
```

## Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "vai": {
      "command": "vai",
      "args": ["mcp"],
      "env": {
        "VOYAGE_API_KEY": "your-api-key"
      }
    }
  }
}
```

## VS Code

Edit `~/.vscode/mcp.json`:

```json
{
  "servers": {
    "vai": {
      "command": "vai",
      "args": ["mcp"],
      "env": {
        "VOYAGE_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Using Full Path

If `vai` isn't on the PATH in the AI tool's environment, use the full path:

```bash
# Find the full path
which vai
# e.g., /usr/local/bin/vai or /Users/you/.nvm/versions/node/v20/bin/vai
```

Then use it in the config:

```json
{
  "command": "/usr/local/bin/vai",
  "args": ["mcp"]
}
```

## With Default Database

Pass `--db` and `--collection` so MCP tools know where to search:

```json
{
  "command": "vai",
  "args": ["mcp", "--db", "myapp", "--collection", "docs"]
}
```

## Further Reading

- [Transport Modes](./transport-modes) — stdio vs. HTTP
- [Authentication](./authentication) — Securing HTTP transport
