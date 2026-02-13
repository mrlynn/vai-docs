---
title: MCP Troubleshooting
description: Troubleshooting the vai MCP server
sidebar_position: 4
---

# MCP Server Troubleshooting

## Check Installation Status

```bash
vai mcp status
```

This shows which AI tools have the vai MCP server configured.

## Common Issues

### MCP server not detected by AI tool

**Symptoms**: Claude Desktop/Cursor/VS Code doesn't show vai tools.

**Solutions**:

1. **Verify installation**:
   ```bash
   vai mcp status
   ```

2. **Reinstall with force**:
   ```bash
   vai mcp install claude --force
   ```

3. **Restart the AI tool** — most tools only discover MCP servers on startup.

4. **Check the config file manually**. For Claude Desktop:
   ```bash
   cat ~/.config/claude/claude_desktop_config.json
   ```
   
   Should contain a `vai` entry under `mcpServers`.

### "VOYAGE_API_KEY not set" in MCP context

The MCP server needs access to your Voyage AI API key. Ensure it's set in one of:

```bash
# Global config
vai config set api-key YOUR_KEY

# Or embed in MCP install
vai mcp install all --api-key YOUR_KEY

# Or environment variable
export VOYAGE_API_KEY=YOUR_KEY
```

### MCP server crashes on startup

Run manually with verbose logging to see errors:

```bash
vai mcp --verbose 2>mcp-errors.log
```

Common causes:
- Missing API key
- Node.js version too old (requires Node 18+)
- Missing dependencies (`npm install -g voyageai-cli` to reinstall)

### HTTP transport not connecting

For HTTP transport mode:

```bash
# Start the server
vai mcp --transport http --port 3100

# Test it
curl http://localhost:3100/health
```

If using authentication, generate a key first:

```bash
vai mcp generate-key
```

### Tools not working (empty results)

If MCP tools connect but return empty results:

1. Verify MongoDB is configured: `vai config get mongodb-uri`
2. Verify the database/collection exists and has documents
3. Set defaults: `vai mcp --db myapp --collection docs`

## Resetting MCP Configuration

```bash
# Remove from all tools
vai mcp uninstall all

# Reinstall fresh
vai mcp install all --force
```

## Further Reading

- [`vai mcp`](/docs/commands/mcp) — MCP server command reference
- [MCP Server Guide](/docs/guides/mcp-server/overview) — Setup guide
- [Common Errors](./common-errors) — General troubleshooting
