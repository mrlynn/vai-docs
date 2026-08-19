---
title: "vai code-search"
description: "Semantic code search — index a repo and query by meaning"
sidebar_position: 3
---

import RobotMomentCallout from '@site/src/components/RobotMomentCallout';

# vai code-search

Index a codebase into MongoDB Atlas and run **semantic** (embedding-based) search over source chunks. This is not grep or regex: results are ranked by meaning, using a code-oriented embedding model by default.

<RobotMomentCallout
  pose="thinking"
  eyebrow="Meaning, not grep"
  title="Semantic code search answers “where is this discussed?” not “symbol X”"
  ctaLabel="MCP code-search tools"
  ctaTo="/docs/api-reference/mcp-tools#code-search-tools"
>
  <p>
    Pair <code>init</code>, <code>refresh</code>, and incremental hashes with
    the right MCP tools for agents. Workspace tools (
    <code>vai_search_code</code>) and the code index family (
    <code>vai_code_search</code>) assume different collections, so match the
    tool to how you indexed.
  </p>
</RobotMomentCallout>

Use the CLI for local workflows; use MCP tools [`vai_code_index`](/docs/api-reference/mcp-tools#code-search-tools), [`vai_code_search`](/docs/api-reference/mcp-tools#code-search-tools), and related tools when an agent should drive indexing and search.

## Synopsis

```bash
vai code-search [options] <query>
vai code-search init [path] [options]
vai code-search status [options]
vai code-search refresh [path] [options]
```

## Subcommands

### Query (default)

With a positional query, vai embeds the question, runs vector search on the indexed collection, and returns ranked code chunks (with optional reranking).

| Flag | Description | Default |
|------|-------------|---------|
| `query` | Search text (positional) | — |
| `-l, --limit <n>` | Max results | `10` |
| `--no-rerank` | Skip reranking | rerank on |
| `--rerank-model <model>` | Reranking model | `rerank-2.5` |
| `-m, --model <model>` | Embedding model | From config / code default |
| `--db <name>` | MongoDB database | Project / env |
| `--collection <name>` | Collection | From project naming |
| `--json` | JSON output | — |
| `-q, --quiet` | Less noise | — |

### `init`

Full index of a directory: discover files, chunk, embed, upsert into Atlas, and ensure a vector search index.

| Flag | Description | Default |
|------|-------------|---------|
| `[path]` | Workspace root | Current directory |
| `-m, --model <model>` | Embedding model | Code-optimized default |
| `--db <name>` | Database | Resolved from config |
| `--collection <name>` | Collection | Derived from project |
| `--chunk-size <n>` | Chunk size (characters) | `512` |
| `--chunk-overlap <n>` | Overlap | `50` |
| `--max-files <n>` | Cap files scanned | `5000` |
| `--max-file-size <bytes>` | Skip larger files | `100000` |
| `--batch-size <n>` | Embedding batch size | `20` |
| `--json` / `-q` | Output modes | — |

### `status`

Summary stats: chunk count, files indexed, languages, last indexed time, vector index state. Counts exclude `index_meta` control documents.

### `refresh`

Re-index changed files using **content hash** and mtime (and optional git hints when metadata is present). Use `--full` to re-embed everything regardless of incremental skip.

| Flag | Description |
|------|-------------|
| `[path]` | Workspace root (default: cwd) |
| `--full` | Ignore incremental optimization; rebuild all scanned files |
| `-m, --model`, `--db`, `--collection`, `--chunk-size`, `--chunk-overlap`, `--batch-size`, `--json`, `-q` | Same roles as `init` / query |

## Related MCP tools

| MCP tool | Role |
|----------|------|
| `vai_code_index` | Index or refresh a codebase (path or GitHub URL) into a code-search collection |
| `vai_code_search` | Semantic search over that collection |
| `vai_code_query` | RAG-style: retrieve + rerank for “how does X work” questions |
| `vai_code_find_similar` | Embed a snippet; nearest neighbors in the index |
| `vai_code_status` | Same class of stats as `vai code-search status` |

**Not the same as** [`vai_search_code`](/docs/api-reference/mcp-tools#workspace-tools): that tool searches a collection built by [`vai_index_workspace`](/docs/api-reference/mcp-tools#workspace-tools) (general workspace indexing). Prefer **`vai_code_*`** when you are using the dedicated code-index pipeline and `voyage-code-3`-style chunks.

## Further reading

- [MCP tools reference](/docs/api-reference/mcp-tools) — all 22 tools, grouped by domain
- [Indexing semantics (voyageai-cli KB)](https://github.com/mrlynn/voyageai-cli/blob/main/src/kb/corpus/reference/code-search-indexing-semantics.md) — chunking, hashes, and incremental refresh behavior
