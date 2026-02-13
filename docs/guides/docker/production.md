---
title: Production Deployment
description: Reverse proxies, logging, health monitoring, and orchestration
sidebar_position: 4
---

# Production Deployment

This guide covers deploying vai services in production environments with reverse proxies, TLS, logging, and container orchestration.

## Reverse Proxy with Nginx

Place Nginx in front of the MCP server or playground for TLS termination and rate limiting:

```nginx
upstream vai_mcp {
    server localhost:3100;
}

server {
    listen 443 ssl;
    server_name vai.example.com;

    ssl_certificate     /etc/ssl/certs/vai.crt;
    ssl_certificate_key /etc/ssl/private/vai.key;

    location /mcp {
        proxy_pass http://vai_mcp;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_buffering off;
        proxy_cache off;
    }

    location /health {
        proxy_pass http://vai_mcp;
    }
}
```

:::tip
The MCP server uses Server-Sent Events (SSE) for streaming responses. Make sure `proxy_buffering off` is set so responses stream through to clients without delay.
:::

## Health Monitoring

### MCP Server

The MCP server exposes a `/health` endpoint:

```bash
curl http://localhost:3100/health
```

```json
{
  "status": "ok",
  "version": "1.27.0",
  "uptime": 3600,
  "voyageAi": "configured",
  "mongodb": "configured"
}
```

Use this endpoint with monitoring tools (Prometheus, Datadog, uptime checkers) to verify the service is running and its upstream connections are healthy.

### Playground

The playground serves HTTP on its configured port. A simple HTTP 200 check works:

```bash
curl -sf http://localhost:3333 > /dev/null && echo "healthy" || echo "unhealthy"
```

### Docker Healthchecks

Both services include Docker healthchecks in the Dockerfile and `docker-compose.yml`. Check status with:

```bash
docker compose ps
# Shows (healthy) or (unhealthy) for each service
```

## Logging

Container logs go to stdout/stderr by default. Use Docker's logging drivers to forward them to your log aggregation system:

```yaml
# docker-compose.override.yml
services:
  mcp-server:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

For structured logging, the MCP server supports `--verbose` for debug output, and the `--json` flag on CLI commands produces machine-readable output.

## Security Considerations

### MCP Server Authentication

Always enable authentication for the MCP server in production:

```bash
# Generate a secure key
vai mcp generate-key

# The key is saved to ~/.vai/config.json
# Pass it via environment variable
VAI_MCP_SERVER_KEY=your-generated-key
```

Clients authenticate with a Bearer token in the Authorization header.

### Network Isolation

Use Docker networks to isolate services:

```yaml
services:
  mcp-server:
    networks:
      - backend
  playground:
    networks:
      - frontend
      - backend

networks:
  frontend:
  backend:
    internal: true  # no external access
```

### Secrets Management

In production, avoid `.env` files. Use your platform's secrets manager:

```yaml
# Docker Swarm
services:
  mcp-server:
    secrets:
      - voyage_api_key
    environment:
      VOYAGE_API_KEY_FILE: /run/secrets/voyage_api_key

secrets:
  voyage_api_key:
    external: true
```

For Kubernetes, use Secrets or tools like HashiCorp Vault.

## Kubernetes

A basic Kubernetes deployment for the MCP server:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vai-mcp-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vai-mcp-server
  template:
    metadata:
      labels:
        app: vai-mcp-server
    spec:
      containers:
        - name: vai
          image: vai:latest  # Replace with your registry image
          args: ["mcp-server", "--transport", "http", "--host", "0.0.0.0", "--port", "3100"]
          ports:
            - containerPort: 3100
          env:
            - name: VOYAGE_API_KEY
              valueFrom:
                secretKeyRef:
                  name: vai-secrets
                  key: voyage-api-key
            - name: MONGODB_URI
              valueFrom:
                secretKeyRef:
                  name: vai-secrets
                  key: mongodb-uri
          livenessProbe:
            httpGet:
              path: /health
              port: 3100
            initialDelaySeconds: 10
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /health
              port: 3100
            initialDelaySeconds: 5
            periodSeconds: 10
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: vai-mcp-server
spec:
  selector:
    app: vai-mcp-server
  ports:
    - port: 3100
      targetPort: 3100
```

## Resource Limits

Recommended resource allocations:

| Service | Memory (min) | Memory (max) | CPU |
|---------|-------------|-------------|-----|
| CLI commands | 64 MB | 256 MB | 0.1 core |
| Playground | 64 MB | 256 MB | 0.1 core |
| MCP Server | 128 MB | 512 MB | 0.25 core |
| Ollama | 2 GB | 8 GB+ | 2+ cores |

Ollama resource needs depend heavily on the model. Smaller models like `phi` need less memory, while `llama3.1` benefits from more.

## Further Reading

- [Docker Overview](./overview) for single-container basics
- [Docker Compose](./compose) for local multi-service setup
- [MCP Server Authentication](/docs/guides/mcp-server/authentication) for securing the HTTP transport
- [MCP Server Transport Modes](/docs/guides/mcp-server/transport-modes) for stdio vs. HTTP details
