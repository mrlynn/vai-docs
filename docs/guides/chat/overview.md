---
title: Chat Overview
description: Conversational RAG with vai chat
sidebar_position: 1
---

# Chat Guide

`vai chat` provides a conversational RAG interface — ask questions about your documents and get grounded answers from an LLM.

## How It Works

```mermaid
sequenceDiagram
    participant You
    participant vai as vai chat
    participant VoyageAI as Voyage AI
    participant MongoDB as MongoDB Atlas
    participant LLM as LLM Provider

    You->>vai: Ask a question
    vai->>VoyageAI: Embed query
    VoyageAI-->>vai: Query vector
    vai->>MongoDB: Vector search
    MongoDB-->>vai: Relevant docs
    vai->>VoyageAI: Rerank (optional)
    VoyageAI-->>vai: Ranked results
    vai->>LLM: Context + question
    LLM-->>vai: Streamed response
    vai-->>You: Grounded answer
```

## Two Modes

### Pipeline Mode (Default)

Fixed RAG flow for every turn: search → rerank → generate. Predictable and efficient.

```bash
vai chat --db myapp --collection docs --mode pipeline
```

### Agent Mode

The LLM uses tool calls to decide when to search, which collection to query, and how to combine results. More flexible but less predictable.

```bash
vai chat --db myapp --collection docs --mode agent
```

## Supported LLM Providers

| Provider | Models | Setup |
|----------|--------|-------|
| **Anthropic** | Claude 4, Claude Sonnet | API key required |
| **OpenAI** | GPT-4, GPT-3.5 | API key required |
| **Ollama** | Llama 3, Mistral, etc. | Local installation |

## Quick Start

```bash
# 1. Configure LLM provider
vai config set llm-provider anthropic
vai config set llm-api-key sk-ant-...

# 2. Start chatting
vai chat --db myapp --collection docs
```

## Next Steps

- [Setup](./setup) — Configure LLM providers
- [Providers](./providers) — Provider-specific details
- [Agent Mode](./agent-mode) — Advanced tool-calling mode
