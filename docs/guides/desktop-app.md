---
title: Desktop App
description: Using vai's desktop application features
sidebar_position: 8
---

# Desktop App

vai includes desktop application capabilities through the `vai app` command and the web playground, providing a graphical interface for exploring Voyage AI features.

## Web Playground

The primary desktop experience is the web playground:

```bash
vai playground
```

This launches a local web server at `http://localhost:3333` with an interactive multi-tab interface for embedding, similarity comparison, reranking, search, chat, and model exploration.

See the [Web Playground Guide](./web-playground) for full details.

## Using vai with AI Desktop Apps

vai integrates with desktop AI tools via the MCP server:

### Claude Desktop

```bash
vai mcp install claude
```

After restarting Claude Desktop, you can ask Claude to search your knowledge base, generate embeddings, and explain RAG concepts — all through the Claude Desktop interface.

### Cursor / Windsurf / VS Code

```bash
vai mcp install cursor windsurf vscode
```

These IDE-based tools can call vai's MCP tools inline while you're coding.

## Further Reading

- [Web Playground](./web-playground) — Full playground guide
- [MCP Server Guide](./mcp-server/overview) — Setting up AI tool integration
