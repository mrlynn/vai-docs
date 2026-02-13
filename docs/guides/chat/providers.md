---
title: Chat Providers
description: Provider-specific details for Anthropic, OpenAI, and Ollama
sidebar_position: 3
---

# Chat Providers

vai chat supports three LLM providers. Each has different strengths, pricing, and setup requirements.

## Anthropic (Claude)

| Feature | Details |
|---------|---------|
| **Models** | Claude Opus, Claude Sonnet, Claude Haiku |
| **Streaming** | ✅ Supported |
| **Tool calling** | ✅ (required for agent mode) |
| **Setup** | API key from [console.anthropic.com](https://console.anthropic.com) |

```bash
vai config set llm-provider anthropic
vai config set llm-api-key sk-ant-...
vai config set llm-model claude-sonnet-4-20250514
```

Best for: High-quality responses, agent mode, long context.

## OpenAI (GPT)

| Feature | Details |
|---------|---------|
| **Models** | GPT-4, GPT-4 Turbo, GPT-3.5 Turbo |
| **Streaming** | ✅ Supported |
| **Tool calling** | ✅ Supported |
| **Setup** | API key from [platform.openai.com](https://platform.openai.com) |

```bash
vai config set llm-provider openai
vai config set llm-api-key sk-...
vai config set llm-model gpt-4
```

Best for: Wide model selection, OpenAI-compatible endpoints.

## Ollama (Local)

| Feature | Details |
|---------|---------|
| **Models** | Llama 3, Mistral, Phi, Gemma, etc. |
| **Streaming** | ✅ Supported |
| **Tool calling** | Depends on model |
| **Setup** | Install [Ollama](https://ollama.ai), pull a model |
| **Cost** | Free (runs locally) |

```bash
ollama pull llama3
vai config set llm-provider ollama
vai config set llm-base-url http://localhost:11434
vai config set llm-model llama3
```

Best for: Privacy, no API costs, offline usage.

## Switching Providers

Change provider at any time:

```bash
vai config set llm-provider openai
```

Or override per session:

```bash
vai chat --llm-provider ollama --llm-model mistral
```
