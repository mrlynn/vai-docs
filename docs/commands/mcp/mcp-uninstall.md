---
title: "vai mcp uninstall"
description: "Remove MCP server from AI tool configs"
sidebar_position: 3
---

# vai mcp uninstall

Remove the vai MCP server entry from AI tool configuration files.

## Synopsis

```bash
vai mcp uninstall [targets...]
```

## Description

`vai mcp uninstall` removes the vai MCP server configuration from the specified AI tools. Accepts the same target names as `vai mcp install`.

### Supported Targets

`claude`, `claude-code`, `cursor`, `windsurf`, `vscode`, `all`

## Examples

### Uninstall from all tools

```bash
vai mcp uninstall all
```

### Uninstall from a specific tool

```bash
vai mcp uninstall cursor
```

## Related Commands

- [`vai mcp install`](./mcp-install) — Install MCP server
- [`vai mcp status`](./mcp-status) — Check installation status
