---
title: FAQ
description: Frequently asked questions about vai
sidebar_position: 10
---

# Frequently Asked Questions

## Voyage AI vs. Other AI Providers

### What is the difference between Voyage AI models and models from OpenAI, Anthropic, or Google?

They solve different problems. Voyage AI specializes in **embeddings** and **reranking**, which are the retrieval layers of a RAG pipeline. Models from OpenAI, Anthropic (Claude), and Google (Gemini) are **large language models (LLMs)** that generate text, hold conversations, and reason over context.

Think of it this way:

| Capability | Voyage AI | OpenAI / Anthropic / Google |
|---|---|---|
| Turn text into vector embeddings | Yes (core product) | Limited (OpenAI has `text-embedding-3`, others don't offer standalone embedding APIs) |
| Rerank search results by relevance | Yes (`rerank-2.5`, `rerank-2.5-lite`) | No |
| Generate text, answer questions, chat | No | Yes (GPT-4o, Claude, Gemini) |
| Hold multi-turn conversations | No | Yes |
| Tool calling / agent mode | No | Yes |

Voyage AI consistently ranks at the top of retrieval benchmarks (MTEB, BEIR) for embedding quality. Their models are purpose-built for search, which means they outperform the embedding endpoints that general-purpose LLM providers offer as a side feature.

vai uses both: Voyage AI for the retrieval pipeline (embed, search, rerank) and your choice of LLM for generation and chat.

### Why not just use OpenAI embeddings for everything?

You can, but you would get worse retrieval quality. Voyage AI's embedding models consistently outperform OpenAI's `text-embedding-3-large` on standard retrieval benchmarks, often by a significant margin. Voyage AI also offers domain-specific models for code (`voyage-code-3`), finance (`voyage-finance-2`), and law (`voyage-law-2`) that are tuned for those domains.

Additionally, Voyage AI's reranking models (`rerank-2.5`) provide a second stage of relevance scoring that dramatically improves result precision. OpenAI does not offer a reranking API.

### Does vai work with models other than Voyage AI?

For **embeddings and reranking**, vai is built specifically around the Voyage AI API. This is by design: Voyage AI offers the best retrieval models available, and vai is purpose-built to make them easy to use.

For **chat and text generation**, vai supports three LLM providers:

- **Anthropic** (Claude): default model `claude-sonnet-4-5-20250929`
- **OpenAI** (GPT-4o): default model `gpt-4o`
- **Ollama** (local): default model `llama3.1`, runs entirely on your machine

Configure your provider with:

```bash
vai config set llm-provider anthropic
vai config set llm-api-key YOUR_KEY
```

## How vai Uses Voyage AI

### How does vai use Voyage AI for chat?

`vai chat` implements retrieval-augmented generation (RAG). When you ask a question:

1. **Voyage AI embeds your query** into a vector
2. **MongoDB Atlas Vector Search** finds the most relevant documents
3. **Voyage AI reranks** those results for precision
4. The **top results are passed as context** to your configured LLM (Anthropic, OpenAI, or Ollama)
5. The **LLM generates a response** grounded in your documents

Voyage AI handles steps 1-3 (retrieval). The LLM handles step 5 (generation). vai orchestrates the full pipeline.

### How does vai use Voyage AI in workflows?

Workflows are multi-step JSON pipelines that can call any vai tool. The workflow engine provides these Voyage AI operations as step types:

- **`query`**: full RAG query (embed, search, rerank in one step)
- **`search`**: vector similarity search
- **`rerank`**: rerank a set of documents against a query
- **`embed`**: generate embeddings
- **`similarity`**: compare two texts semantically
- **`ingest`**: chunk, embed, and store documents

Combined with control-flow steps (`merge`, `filter`, `transform`) and `generate` (LLM), you can build sophisticated pipelines: multi-collection search, A/B model comparisons, quality gates, and more.

### How does vai use Voyage AI in MCP / agentic AI?

vai exposes Voyage AI capabilities as MCP (Model Context Protocol) tools that AI assistants can call autonomously. When you run `vai mcp install`, your AI editor (Claude Desktop, Cursor, VS Code) gains these tools:

- **`vai_query`**: full RAG pipeline (embed, search, rerank)
- **`vai_search`**: vector search without reranking
- **`vai_rerank`**: rerank documents against a query
- **`vai_embed`**: generate embeddings for text
- **`vai_similarity`**: compare two texts semantically
- **`vai_ingest`**: chunk, embed, and store documents
- **`vai_collections`**: list MongoDB collections with vector index info
- **`vai_models`**: list available Voyage AI models
- **`vai_explain`**: educational explanations of embedding concepts

The AI assistant decides when and how to use these tools based on your natural language requests. For example, asking "find documents about authentication in my codebase" triggers the assistant to call `vai_query` with an appropriate query, then present the results.

## General

### What is vai?

vai is an open-source CLI tool, MCP server, and desktop app that provides the fastest path from documents to semantic search. It integrates Voyage AI's embedding and reranking models with MongoDB Atlas Vector Search, giving you a complete RAG pipeline from a single command line tool.

### Is vai an official MongoDB or Voyage AI product?

No. vai is an independent, community-built tool created by [Michael Lynn](https://github.com/mrlynn). It is not affiliated with or endorsed by MongoDB, Inc. or Voyage AI.

### How do I get a Voyage AI API key?

Sign up at [dash.voyageai.com](https://dash.voyageai.com/), then copy your API key and set it:

```bash
vai config set api-key YOUR_KEY
```

### Does vai work without MongoDB?

Yes, partially. Commands like `vai embed`, `vai rerank`, `vai similarity`, `vai models`, `vai explain`, and `vai benchmark` work with just a Voyage AI API key. Storage, search, ingestion, and chat features require a MongoDB Atlas connection string.

### What file types does vai support for ingestion?

`vai pipeline` and `vai chunk` support: `.txt`, `.md`, `.html`, `.json`, `.jsonl`, `.pdf`

`vai ingest` supports: JSON, JSONL, CSV, and plain text files.

### How much does vai cost?

vai itself is free and open source (MIT license). You pay for the services it connects to:

1. **Voyage AI API**: per-token pricing for embeddings and reranking
2. **MongoDB Atlas**: standard Atlas pricing for storage and vector search
3. **LLM provider** (optional): pricing depends on which provider you use for chat

Estimate your costs:

```bash
vai estimate --docs 100000 --queries 1000000 --months 12
```

## Models

### Which Voyage AI model should I use?

| Model | Best for | Price (per 1M tokens) |
|---|---|---|
| `voyage-4-large` | Best quality, general purpose | $0.12 |
| `voyage-4` | Balanced quality and cost | $0.06 |
| `voyage-4-lite` | High-volume, budget-conscious | $0.02 |
| `voyage-code-3` | Code search and retrieval | $0.18 |
| `voyage-finance-2` | Financial documents | Domain pricing |
| `voyage-law-2` | Legal documents | Domain pricing |

For most use cases, start with `voyage-4-large`. Switch to `voyage-4-lite` if cost is a concern, or use asymmetric retrieval to get the best of both.

See [Choosing a Model](/docs/models/choosing-a-model) for a full guide.

### Can I mix models from different families?

Within the Voyage 4 family (`voyage-4-large`, `voyage-4`, `voyage-4-lite`), yes. They share an embedding space, which enables asymmetric retrieval (embed documents with the cheaper model, queries with the better model).

You **cannot** mix Voyage 4 models with domain-specific models (`voyage-code-3`, `voyage-finance-2`) or legacy models. Each model family has its own embedding space.

### What is asymmetric retrieval?

Embedding documents with a cheaper model (`voyage-4-lite` at $0.02/1M tokens) and queries with a higher-quality model (`voyage-4-large` at $0.12/1M tokens). This works because the Voyage 4 family shares an embedding space. For a typical workload with many documents and fewer queries, this saves 60-80% on embedding costs with minimal quality loss.

```bash
vai benchmark asymmetric --db mydb --collection docs
```

### What dimensions should I use?

Start with 1024 (the default for Voyage 4 models). Reduce to 256 or 512 only if storage size or search latency is a bottleneck. Run `vai benchmark space` to measure the quality tradeoff for your data.

## Workflows

### What are workflows?

Workflows are multi-step RAG pipelines defined as portable JSON files. Instead of running individual commands, you describe a sequence of steps (search, rerank, filter, generate) and vai executes them in dependency order with automatic parallelization.

```bash
# Run a built-in workflow
vai workflow run question-answer-with-citations --input query="How does auth work?"

# List all available workflows
vai workflow list
```

### How many workflows are available?

vai ships with **11 example workflows** covering common patterns like batch similarity checking, multi-query fusion, RAG with guardrails, and content quality gates.

The **Workflow Store** provides 20+ official workflows that can be installed from npm, plus a growing number of community-contributed workflows.

```bash
# Browse the store
vai workflow search

# Install a community workflow
vai workflow install vai-workflow-model-shootout
```

### Can I create and publish my own workflows?

Yes. See the [Publishing Workflows](/docs/guides/workflows/publishing-workflows) guide. Any npm package named `vai-workflow-*` with a valid `workflow.json` is automatically discovered by vai. The scaffold tool generates a publish-ready package:

```bash
vai workflow create --from ./my-pipeline.json --name my-workflow
cd vai-workflow-my-workflow
npm publish
```

## MCP Server

### What is MCP and why should I care?

MCP (Model Context Protocol) is a standard that lets AI assistants call external tools. With vai's MCP server, your AI editor can run semantic searches, generate embeddings, and rerank results without you typing CLI commands. You just ask in natural language.

### Which AI editors support vai's MCP server?

Claude Desktop, Claude Code, Cursor, Windsurf, and VS Code (with Copilot Chat).

### How do I set up MCP?

```bash
# Install for all supported editors
vai mcp install all

# Or install for a specific editor
vai mcp install claude-desktop
vai mcp install cursor
```

See the [MCP Server Guide](/docs/guides/mcp-server/overview) for details.

## Desktop App and Playground

### What is the vai desktop app?

An Electron-based desktop application that bundles the full CLI, an interactive web playground, and the Workflow Store in a native window. It adds OS-level secure storage for API keys (via the system keychain), native dark/light theme support, and a sidebar for quick navigation.

```bash
# Launch the desktop app
vai app

# Or launch the web playground in your browser
vai playground
```

### What is the difference between the desktop app and the CLI?

The CLI and desktop app have the same capabilities. The desktop app wraps everything in a graphical interface and adds secure keychain storage for API keys. The web playground (available in both) provides interactive UIs for search, embedding visualization, the Workflow Store, and more.

## Privacy and Security

### What data does vai send to external services?

vai sends data only to the services you explicitly configure:

| Data | Where it goes | Why |
|---|---|---|
| Text to embed | Voyage AI API | Required to generate embeddings |
| Documents to rerank | Voyage AI API | Required for relevance scoring |
| Embeddings and documents | MongoDB Atlas | Storage and vector search |
| Query + retrieved context | Your LLM provider | Chat and text generation |

### Can I keep everything local?

Partially. If you use **Ollama** as your LLM provider, chat conversations never leave your machine. However, Voyage AI embeddings and reranking require API calls to Voyage AI's servers, and vector search requires MongoDB Atlas.

```bash
vai config set llm-provider ollama
vai config set llm-model llama3.1
```

### Does vai collect telemetry?

No. vai does not phone home, track usage, or collect analytics. All processing happens between your machine and the services you configure (Voyage AI, MongoDB, your LLM provider).

## Troubleshooting

### My search returns no results

1. Verify documents are stored: `vai search --query "test" --db mydb --collection mycoll --json`
2. Verify the vector index exists: `vai index list --db mydb --collection mycoll`
3. Verify you used the same model family for both storage and search

### Embeddings are different sizes than expected

Check the `--dimensions` flag and model. Voyage 4 models default to 1024 dimensions. Domain-specific models may have fixed dimensions. Run `vai models` to see the default dimensions for each model.

### How do I reset my configuration?

```bash
# View current config
vai config list

# Reset a specific value
vai config set api-key NEW_KEY

# Config file location
~/.vai/config
```
