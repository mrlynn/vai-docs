---
title: Testing
description: Verify your MCP server setup
sidebar_position: 6
---

# Testing the MCP Server

## Check Installation

```bash
vai mcp status
```

This shows which AI tools have vai configured.

## Test Manually (stdio)

Run the server directly to verify it starts:

```bash
vai mcp --verbose
```

The `--verbose` flag logs tool calls to stderr. Press `Ctrl+C` to stop.

## Test in Your AI Tool

After installing and restarting your AI tool, try these prompts:

1. **"List available Voyage AI models"** → Should call `vai_models`
2. **"Explain what embeddings are"** → Should call `vai_explain`
3. **"Search for documents about authentication"** → Should call `vai_query` (requires MongoDB)
4. **"Embed the text 'hello world'"** → Should call `vai_embed`

## Test HTTP Transport

```bash
# Start the server
vai mcp --transport http --port 3100

# In another terminal, test the health endpoint
curl http://localhost:3100
```

## Common Issues

- **Server not found**: Restart the AI tool after installation
- **Tools not working**: Check `vai config list` for API key and MongoDB URI
- **Permission errors**: Ensure `vai` is on the system PATH

See [MCP Troubleshooting](/docs/troubleshooting/mcp-troubleshooting) for detailed solutions.
