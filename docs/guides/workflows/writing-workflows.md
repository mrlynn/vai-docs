---
title: Writing Workflows
description: Create custom multi-step RAG pipelines
sidebar_position: 3
---

# Writing Workflows

This guide walks through creating a custom workflow from scratch. We'll build a pipeline that searches a collection, filters low-relevance results, and generates an LLM summary.

## Scaffold a Workflow

Start with the init command:

```bash
vai workflow init --name search-and-summarize
```

This creates a `search-and-summarize.json` file with a minimal template.

## Workflow Structure

Every workflow has four sections:

```json
{
  "name": "Search and Summarize",
  "description": "Find relevant docs and summarize with an LLM",
  "version": "1.0.0",
  "inputs": { },
  "defaults": { },
  "steps": [ ],
  "output": { }
}
```

## Step 1: Define Inputs

Inputs are values provided at runtime via `--input key=value`:

```json
{
  "inputs": {
    "question": {
      "type": "string",
      "required": true,
      "description": "The question to research"
    },
    "limit": {
      "type": "number",
      "default": 5,
      "description": "Max documents to retrieve"
    }
  }
}
```

## Step 2: Set Defaults

Defaults are shared values available to all steps:

```json
{
  "defaults": {
    "db": "myapp",
    "collection": "knowledge"
  }
}
```

## Step 3: Add Steps

### Search Step

```json
{
  "id": "search",
  "tool": "query",
  "description": "Search the knowledge base",
  "inputs": {
    "query": "{{ inputs.question }}",
    "db": "{{ defaults.db }}",
    "collection": "{{ defaults.collection }}",
    "limit": "{{ inputs.limit }}"
  }
}
```

### Filter Step

Keep only results above a score threshold:

```json
{
  "id": "filter_results",
  "tool": "filter",
  "description": "Remove low-relevance results",
  "inputs": {
    "array": "{{ search.output.results }}",
    "condition": "item.score > 0.7"
  }
}
```

The `filter_results` step depends on `search` (it references `search.output`), so vai automatically runs `search` first.

### Summarize Step

Use an LLM to synthesize the filtered results:

```json
{
  "id": "summarize",
  "tool": "generate",
  "description": "Generate a summary from search results",
  "inputs": {
    "prompt": "Based on the following documents, answer this question: {{ inputs.question }}",
    "context": "{{ filter_results.output }}",
    "systemPrompt": "You are a technical documentation assistant. Cite sources."
  }
}
```

## Step 4: Define Output

The output section determines what the workflow returns:

```json
{
  "output": {
    "answer": "{{ summarize.output.text }}",
    "sources": "{{ filter_results.output }}",
    "documentsSearched": "{{ search.output.resultCount }}"
  }
}
```

## Complete Workflow

```json
{
  "name": "Search and Summarize",
  "description": "Find relevant docs and summarize with an LLM",
  "version": "1.0.0",
  "inputs": {
    "question": {
      "type": "string",
      "required": true,
      "description": "The question to research"
    },
    "limit": {
      "type": "number",
      "default": 5
    }
  },
  "defaults": {
    "db": "myapp",
    "collection": "knowledge"
  },
  "steps": [
    {
      "id": "search",
      "tool": "query",
      "description": "Search the knowledge base",
      "inputs": {
        "query": "{{ inputs.question }}",
        "db": "{{ defaults.db }}",
        "collection": "{{ defaults.collection }}",
        "limit": "{{ inputs.limit }}"
      }
    },
    {
      "id": "filter_results",
      "tool": "filter",
      "description": "Remove low-relevance results",
      "inputs": {
        "array": "{{ search.output.results }}",
        "condition": "item.score > 0.7"
      }
    },
    {
      "id": "summarize",
      "tool": "generate",
      "description": "Generate a summary",
      "inputs": {
        "prompt": "Based on the following documents, answer: {{ inputs.question }}",
        "context": "{{ filter_results.output }}",
        "systemPrompt": "You are a technical documentation assistant. Cite sources."
      }
    }
  ],
  "output": {
    "answer": "{{ summarize.output.text }}",
    "sources": "{{ filter_results.output }}"
  }
}
```

## Validate and Run

```bash
# Check for errors
vai workflow validate search-and-summarize.json

# Dry run (no API calls)
vai workflow run search-and-summarize.json --dry-run --input question="test"

# Execute
vai workflow run search-and-summarize.json --input question="How does authentication work?"
```

## Tips

- **Step IDs** must be unique and use `[a-zA-Z_][a-zA-Z0-9_]*` format
- **Dependencies** are auto-detected from template expressions
- **Parallel execution**: Steps with no shared dependencies run simultaneously
- **Conditions**: Use the `condition` field to conditionally skip steps
- **forEach**: Iterate over arrays with `forEach: "{{ step.output.items }}"`

## Next Steps

- **[Schema Reference](/docs/guides/workflows/schema-reference)**: Every field documented
- **[Template Expressions](/docs/guides/workflows/template-expressions)**: Expression grammar and examples
