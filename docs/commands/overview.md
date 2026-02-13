---
title: Command Reference
description: All vai commands at a glance
sidebar_position: 1
---

# Command Reference

vai provides 33 commands organized by function. Every command supports `--help` for detailed usage.

## Project Setup

| Command | Description |
|---------|-------------|
| [`vai init`](/docs/commands/project-setup/init) | Initialize a project with `.vai.json` config |
| [`vai generate`](/docs/commands/project-setup/generate) | Generate production code snippets (client, retrieval, ingest, search-api) |
| [`vai scaffold`](/docs/commands/project-setup/scaffold) | Create complete starter projects (Node.js, Next.js, Python) |

## RAG Pipeline

| Command | Description |
|---------|-------------|
| [`vai pipeline`](/docs/commands/rag-pipeline/pipeline) | End-to-end: chunk files, embed, store in MongoDB, create index |
| [`vai query`](/docs/commands/rag-pipeline/query) | Two-stage retrieval: embed query, vector search, rerank results |
| [`vai chunk`](/docs/commands/rag-pipeline/chunk) | Split documents into chunks (5 strategies: fixed, sentence, paragraph, recursive, markdown) |
| [`vai estimate`](/docs/commands/rag-pipeline/estimate) | Compare embedding costs across models and strategies |

## Embeddings and Reranking

| Command | Description |
|---------|-------------|
| [`vai embed`](/docs/commands/embeddings/embed) | Generate vector embeddings for text |
| [`vai rerank`](/docs/commands/embeddings/rerank) | Rerank documents by relevance to a query |
| [`vai similarity`](/docs/commands/embeddings/similarity) | Compare text similarity using cosine distance |

## Data Management

| Command | Description |
|---------|-------------|
| [`vai store`](/docs/commands/data-management/store) | Embed and store a single document |
| [`vai ingest`](/docs/commands/data-management/ingest) | Bulk import documents from JSONL with progress tracking |
| [`vai search`](/docs/commands/data-management/search) | Vector similarity search against MongoDB Atlas |
| [`vai index`](/docs/commands/data-management/index) | Manage vector search indexes (create, list, delete) |
| [`vai purge`](/docs/commands/data-management/purge) | Remove embeddings by model, date, source, or staleness |
| [`vai refresh`](/docs/commands/data-management/refresh) | Re-embed documents with a new model or dimensions |

## Evaluation and Benchmarking

| Command | Description |
|---------|-------------|
| [`vai eval`](/docs/commands/evaluation/eval) | Evaluate retrieval quality (MRR, nDCG, Recall, MAP, Precision) |
| [`vai eval compare`](/docs/commands/evaluation/eval-compare) | Compare evaluation results across configurations |
| [`vai benchmark`](/docs/commands/evaluation/benchmark) | Run benchmarks (embed, rerank, asymmetric, quantization, cost, batch, space, e2e) |

## MCP Server

| Command | Description |
|---------|-------------|
| [`vai mcp`](/docs/commands/mcp/mcp) | Start the Model Context Protocol server (11 tools for AI editors) |
| [`vai mcp install`](/docs/commands/mcp/mcp-install) | Auto-install MCP server into Claude, Cursor, Windsurf, VS Code |
| [`vai mcp uninstall`](/docs/commands/mcp/mcp-uninstall) | Remove MCP server from AI tool configs |
| [`vai mcp status`](/docs/commands/mcp/mcp-status) | Show MCP installation status across all supported tools |

## Tools and Learning

| Command | Description |
|---------|-------------|
| [`vai models`](/docs/commands/tools-and-learning/models) | List available models with architecture, pricing, and benchmark scores |
| [`vai explain`](/docs/commands/tools-and-learning/explain) | Interactive explainer for 30+ topics (embeddings, RAG, reranking, etc.) |
| [`vai config`](/docs/commands/tools-and-learning/config) | Manage persistent configuration (set, get, delete, list, path, reset) |
| [`vai ping`](/docs/commands/tools-and-learning/ping) | Test Voyage AI API and MongoDB Atlas connectivity |
| [`vai playground`](/docs/commands/tools-and-learning/playground) | Launch the web playground (7 interactive tabs) |
| [`vai completions`](/docs/commands/tools-and-learning/completions) | Generate shell completion scripts for Bash and Zsh |
| [`vai demo`](/docs/commands/tools-and-learning/demo) | Guided interactive walkthrough of vai features |
| [`vai about`](/docs/commands/tools-and-learning/about) | Display version, system info, and project details |

## Advanced

| Command | Description |
|---------|-------------|
| [`vai chat`](/docs/commands/advanced/chat) | Conversational RAG with Anthropic, OpenAI, or Ollama |
| [`vai workflow run`](/docs/commands/advanced/workflow-run) | Execute a workflow definition (built-in or custom) |
| [`vai workflow validate`](/docs/commands/advanced/workflow-validate) | Validate workflow syntax, dependencies, and detect cycles |
| [`vai workflow list`](/docs/commands/advanced/workflow-list) | List built-in workflow templates |
| [`vai workflow init`](/docs/commands/advanced/workflow-init) | Scaffold a new workflow JSON file |

## Global Flags

These flags work with any command:

| Flag | Description |
|------|-------------|
| `--help` | Show command help |
| `-V, --version` | Show vai version |
| `--json` | Output in JSON format (machine-readable) |
| `--quiet` | Suppress non-essential output |
