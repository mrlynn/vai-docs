---
title: Chat Setup
description: Configure LLM providers for vai chat
sidebar_position: 2
---

# Chat Setup

## Prerequisites

1. **Voyage AI API key** — for embedding queries and reranking
2. **MongoDB Atlas** — with embedded documents (use `vai pipeline` to ingest)
3. **LLM provider** — Anthropic, OpenAI, or Ollama

## Configure Your LLM

### Anthropic (Claude)

```bash
vai config set llm-provider anthropic
vai config set llm-api-key sk-ant-your-key-here
vai config set llm-model claude-sonnet-4-20250514
```

### OpenAI (GPT)

```bash
vai config set llm-provider openai
vai config set llm-api-key sk-your-key-here
vai config set llm-model gpt-4
```

### Ollama (Local)

```bash
# Install Ollama first: https://ollama.ai
ollama pull llama3

vai config set llm-provider ollama
vai config set llm-base-url http://localhost:11434
vai config set llm-model llama3
```

## Start Chatting

```bash
vai chat --db myapp --collection docs
```

## Using CLI Flags (No Config)

```bash
vai chat --db myapp --collection docs \
  --llm-provider anthropic \
  --llm-api-key sk-ant-your-key \
  --llm-model claude-sonnet-4-20250514
```

## Project Config

You can also set chat options in `.vai.json`:

```json
{
  "db": "myapp",
  "collection": "docs",
  "chat": {
    "mode": "pipeline",
    "maxContextDocs": 5,
    "maxConversationTurns": 20
  }
}
```

## Verify Setup

```bash
# Check all config
vai config list

# Test connectivity
vai ping

# Estimate per-turn cost
vai chat --estimate
```
