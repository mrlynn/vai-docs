---
title: "vai mcp status"
description: "Show MCP installation status across AI tools"
sidebar_position: 4
---

# vai mcp status

Show the vai MCP server installation status across all supported AI tools.

## Synopsis

```bash
vai mcp status
```

## Description

`vai mcp status` checks each supported AI tool's config file and reports whether the vai MCP server is configured. Shows the tool name, status (installed/not found), and config file path for each target.

## Examples

### Check status

```bash
vai mcp status
```

Example output:

```
vai MCP Server — Installation Status

  ✅ installed      Claude Desktop   ~/.config/claude/claude_desktop_config.json
  ✅ installed      Cursor           ~/.cursor/mcp.json
  ❌ not found      Windsurf         ~/.windsurf/mcp.json
  ❌ not found      VS Code          ~/.vscode/mcp.json
```

## Related Commands

- [`vai mcp install`](./mcp-install) — Install MCP server into tools
- [`vai mcp uninstall`](./mcp-uninstall) — Remove MCP server from tools
