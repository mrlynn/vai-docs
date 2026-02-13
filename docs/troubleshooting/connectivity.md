---
title: Connectivity
description: Troubleshooting API and database connections
sidebar_position: 2
---

# Connectivity Troubleshooting

## Quick Diagnosis

```bash
vai ping
```

This tests both the Voyage AI API and MongoDB Atlas connectivity, showing latency and status for each.

## Voyage AI API Issues

### Connection Timeout

**Symptoms**: `vai ping` hangs or times out on the Voyage AI check.

**Possible causes**:
- Network/firewall blocking outbound HTTPS to `api.voyageai.com`
- Proxy not configured
- DNS resolution failure

**Solutions**:
```bash
# Test direct connectivity
curl -s https://api.voyageai.com/v1/embeddings -H "Authorization: Bearer $VOYAGE_API_KEY" -H "Content-Type: application/json" -d '{"input":["test"],"model":"voyage-4-lite"}'

# If behind a proxy
export HTTPS_PROXY=http://proxy:8080
```

### Custom API Base URL

If you're using a custom endpoint or proxy:

```bash
vai config set base-url https://your-custom-endpoint.com/v1
```

## MongoDB Atlas Issues

### Connection Refused

**Symptoms**: `MongoServerSelectionError` or connection timeout.

**Common fixes**:
1. **IP Allowlist**: Add your IP to the Atlas Network Access list
2. **Credentials**: Verify username/password in the connection string
3. **Cluster status**: Check the Atlas dashboard for cluster health

```bash
# Test the URI directly
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/test"
```

### Authentication Failed

Verify your connection string:

```bash
vai config get mongodb-uri
```

Common issues:
- Password contains special characters — URL-encode them
- Using the wrong database user (must have `readWrite` role)
- SRV DNS resolution failing — try the standard connection string format

### Vector Search Not Working

If `vai search` returns no results:

1. Verify the index exists and is ready:
   ```bash
   vai index list --db myapp --collection docs
   ```

2. Verify documents have the correct embedding field:
   ```bash
   vai search --query "test" --db myapp --collection docs --field embedding --limit 1 --json
   ```

3. Verify the index dimensions match your embedding dimensions.

## Environment Variables

vai checks these in order: CLI flags → `.vai.json` → environment variables → `~/.vai/config.json`.

| Variable | Purpose |
|----------|---------|
| `VOYAGE_API_KEY` | Voyage AI API key |
| `MONGODB_URI` | MongoDB connection string |
| `VAI_DB` | Default database name |
| `VAI_COLLECTION` | Default collection name |
