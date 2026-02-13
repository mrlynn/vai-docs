---
title: "vai chat"
description: "Conversational RAG with Anthropic, OpenAI, or Ollama"
sidebar_position: 1
---

# vai chat

A conversational RAG interface that combines vector search retrieval with LLM-powered responses. Chat with your knowledge base using natural language.

## Synopsis

```bash
vai chat [options]
```

## Description

`vai chat` starts an interactive chat session that:

1. Takes your question
2. Retrieves relevant documents from MongoDB Atlas via vector search
3. Optionally reranks results for better precision
4. Sends the context + question to an LLM for a grounded response
5. Streams the response back to your terminal

Supports three LLM providers: **Anthropic** (Claude), **OpenAI** (GPT), and **Ollama** (local models). Sessions can be persisted to MongoDB for resumption.

Two modes are available:
- **Pipeline mode** (default): Fixed RAG flow — search → rerank → generate
- **Agent mode**: The LLM uses tool calls to decide when and how to search

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--db <name>` | MongoDB database name | From `.vai.json` |
| `--collection <name>` | Collection with embedded documents | From `.vai.json` |
| `--session <id>` | Resume a previous chat session | — |
| `--llm-provider <name>` | LLM provider: `anthropic`, `openai`, `ollama` | From config |
| `--llm-model <name>` | Specific LLM model | From config |
| `--llm-api-key <key>` | LLM API key | From config |
| `--llm-base-url <url>` | LLM API base URL (for Ollama) | From config |
| `--mode <mode>` | Chat mode: `pipeline` or `agent` | `pipeline` |
| `--max-context-docs <n>` | Max retrieved documents for context | `5` |
| `--max-turns <n>` | Max conversation turns before truncation | `20` |
| `--no-history` | Disable MongoDB persistence (in-memory only) | — |
| `--no-rerank` | Skip reranking step | — |
| `--no-stream` | Wait for complete response (don't stream) | — |
| `--system-prompt <text>` | Override the system prompt | — |
| `--text-field <name>` | Document text field name | `text` |
| `--filter <json>` | MongoDB pre-filter for vector search | — |
| `--estimate` | Show per-turn cost breakdown and exit | — |
| `--json` | Output JSON per turn (for scripting) | — |
| `-q, --quiet` | Suppress decorative output | — |

## Examples

### Start a chat session

```bash
vai chat --db myapp --collection docs
```

### Chat with Ollama (local)

```bash
vai chat --llm-provider ollama --llm-model llama3 --llm-base-url http://localhost:11434
```

### Agent mode with Anthropic

```bash
vai chat --mode agent --llm-provider anthropic --llm-model claude-sonnet-4-20250514
```

### Resume a previous session

```bash
vai chat --session abc123
```

### Estimate per-turn costs

```bash
vai chat --estimate
```

## Setup

Before using chat, configure your LLM provider:

```bash
# Anthropic
vai config set llm-provider anthropic
vai config set llm-api-key sk-ant-...

# OpenAI
vai config set llm-provider openai
vai config set llm-api-key sk-...

# Ollama (no API key needed)
vai config set llm-provider ollama
vai config set llm-base-url http://localhost:11434
vai config set llm-model llama3
```

Or use `vai init` — the interactive wizard includes chat setup.

## Tips

- Pipeline mode is simpler and more predictable. Agent mode gives the LLM more autonomy to search and reason.
- Use `--no-history` for quick ad-hoc questions without persisting the conversation.
- The `--filter` option lets you scope the chat to specific document categories.
- Chat settings can also be configured in `.vai.json` under the `chat` key.

## Related Commands

- [`vai query`](../rag-pipeline/query) — Single-shot retrieval (non-conversational)
- [`vai config`](../tools-and-learning/config) — Set LLM provider credentials
- [`vai init`](../project-setup/init) — Interactive project setup including chat config
