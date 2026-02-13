---
title: Authentication
description: Securing the MCP HTTP transport
sidebar_position: 5
---

# MCP Authentication

When using the HTTP transport, the vai MCP server requires authentication to prevent unauthorized access to your embedding and search tools.

## Generate an API Key

```bash
vai mcp generate-key
```

This generates a random API key and outputs it. Store it securely — you'll need it for client configuration.

## Start the Server

```bash
vai mcp --transport http --port 3100
```

The server reads the API key from config and validates it on every request.

## Client Configuration

Include the API key in your MCP client's HTTP headers:

```
Authorization: Bearer YOUR_MCP_API_KEY
```

## Security Best Practices

- **Don't expose to the internet** without additional security (VPN, firewall, reverse proxy)
- **Use stdio transport** when possible — it needs no authentication
- **Rotate keys** periodically with `vai mcp generate-key`
- **Keep keys out of version control** — use environment variables or config files

## Further Reading

- [Transport Modes](./transport-modes) — stdio vs. HTTP
- [Manual Configuration](./manual-configuration) — Config file setup
