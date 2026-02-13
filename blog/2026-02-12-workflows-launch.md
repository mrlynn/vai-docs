---
slug: workflows-launch
title: "Agentic Workflows: composable RAG pipelines"
authors: [mrlynn]
tags: [vai, workflows, rag, release]
---

vai v1.25.0 introduces agentic workflows: multi-step RAG pipelines defined as portable JSON files. Search multiple collections, merge results, filter by relevance, and summarize with LLMs, all from a single command.

<!-- truncate -->

## The problem

Individual vai commands handle single operations well. But real RAG pipelines often need multiple steps chained together:

- Search two collections, merge results, then rerank
- Check if a document already exists before ingesting
- Query a knowledge base, then summarize results with an LLM

Previously, you would write a bash script or Node.js code to chain these operations. Workflows let you define the pipeline declaratively.

## How it works

A workflow is a JSON file that defines a directed acyclic graph of steps. Each step maps to a vai operation and can reference outputs from previous steps using template expressions:

```json
{
  "name": "Multi-Collection Search",
  "steps": [
    {
      "id": "search_api",
      "tool": "query",
      "inputs": {
        "query": "{{ inputs.query }}",
        "collection": "api_docs"
      }
    },
    {
      "id": "search_arch",
      "tool": "query",
      "inputs": {
        "query": "{{ inputs.query }}",
        "collection": "architecture"
      }
    },
    {
      "id": "merge",
      "tool": "merge",
      "inputs": {
        "arrays": [
          "{{ search_api.output.results }}",
          "{{ search_arch.output.results }}"
        ]
      }
    }
  ]
}
```

vai analyzes step dependencies and runs independent steps in parallel. In the example above, the two searches run simultaneously, then merge waits for both to complete.

## Built-in templates

vai ships with 5 templates covering common patterns:

| Template | Description |
|----------|-------------|
| `multi-collection-search` | Search multiple collections, merge, rerank |
| `smart-ingest` | Deduplicate before ingesting |
| `research-and-summarize` | Search then summarize with an LLM |
| `consistency-check` | Compare content across collections |
| `cost-analysis` | Compare embedding costs across models |

Try one:

```bash
vai workflow list
vai workflow run multi-collection-search \
  --input query="how do embeddings work" \
  --input collection1=api_docs \
  --input collection2=tutorials
```

## No auth, no accounts, no hosted services

Workflows are JSON files that live in your project. No accounts, no cloud services, no lock-in. Commit them to git, share with your team, run them anywhere vai is installed.

## Learn more

- [Workflows Overview](/docs/guides/workflows/overview)
- [Writing Workflows](/docs/guides/workflows/writing-workflows)
- [Built-in Templates](/docs/guides/workflows/built-in-templates)
- [Schema Reference](/docs/guides/workflows/schema-reference)
