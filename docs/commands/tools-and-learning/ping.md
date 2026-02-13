---
title: "vai ping"
description: "Test Voyage AI API and MongoDB Atlas connectivity"
sidebar_position: 4
---

# vai ping

Test connectivity to the Voyage AI API and optionally MongoDB Atlas. Shows latency, model used, and connection status.

## Synopsis

```bash
vai ping [options]
```

## Description

`vai ping` sends a test embedding request to the Voyage AI API to verify your API key and connectivity. If a MongoDB URI is configured, it also tests the database connection. Useful for verifying your setup after installation or troubleshooting connectivity issues.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |
| `--mask` | Mask sensitive info (hostnames, endpoints) | Also enabled by `VAI_MASK=1` |

## Examples

### Basic connectivity test

```bash
vai ping
```

### JSON output for CI/CD

```bash
vai ping --json
```

### Masked output for screen recordings

```bash
vai ping --mask
# or
VAI_MASK=1 vai ping
```

## Tips

- Run `vai ping` after `vai config set api-key` to verify your key works.
- The `--mask` flag hides cluster hostnames (useful for demos and recordings). Public API hosts (`ai.mongodb.com`, `api.voyageai.com`) are not masked.
- If MongoDB isn't configured, only the Voyage AI API is tested.

## Related Commands

- [`vai config`](./config) — Set API keys and connection strings
- [`vai about`](./about) — Show version and system info
