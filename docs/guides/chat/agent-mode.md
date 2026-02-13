---
title: Agent Mode
description: LLM-driven tool-calling chat mode
sidebar_position: 4
---

# Agent Mode

Agent mode gives the LLM autonomy to decide when and how to search your knowledge base using tool calls, rather than following a fixed retrieval pipeline.

## Pipeline vs. Agent Mode

| Feature | Pipeline Mode | Agent Mode |
|---------|--------------|------------|
| **Retrieval** | Every turn: search → rerank → generate | LLM decides when to search |
| **Flexibility** | Fixed flow | LLM can search multiple times, different queries |
| **Predictability** | High | Lower (LLM-dependent) |
| **Token cost** | Consistent | Variable |
| **Requires** | Any LLM | LLM with tool-calling support |

## Usage

```bash
vai chat --mode agent --db myapp --collection docs
```

## How It Works

1. You ask a question
2. The LLM receives your question and a list of available tools (search, embed, etc.)
3. The LLM decides whether to search, what query to use, and which collection to target
4. vai executes the tool call and returns results to the LLM
5. The LLM may search again or generate an answer

This means the LLM can:
- Rephrase your question for better retrieval
- Search multiple times with different queries
- Skip searching for conversational turns that don't need retrieval
- Discover available collections dynamically

## Requirements

Agent mode requires an LLM that supports tool/function calling:
- **Anthropic**: Claude Sonnet, Claude Opus ✅
- **OpenAI**: GPT-4, GPT-4 Turbo ✅
- **Ollama**: Depends on model (Llama 3 with tool support ✅)

## When to Use Agent Mode

- **Exploratory conversations** where the user's intent varies turn by turn
- **Multi-collection setups** where the LLM should choose which collection to query
- **Complex questions** that benefit from multiple search passes

## When to Use Pipeline Mode

- **Production deployments** where predictable behavior is important
- **Cost-sensitive** workloads (pipeline mode has consistent token usage)
- **Simple Q&A** where every question needs retrieval
