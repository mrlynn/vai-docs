---
title: Built-in Templates
description: Pre-built workflow templates
sidebar_position: 4
---

# Built-in Workflow Templates

vai includes pre-built workflow templates for common RAG tasks. List them with:

```bash
vai workflow list
```

## Using Built-in Templates

Run a built-in template by name instead of a file path:

```bash
vai workflow run ingest-and-index --input path=./docs --input db=myapp
```

## Customizing Templates

To customize a built-in template:

1. View it with `--dry-run` to understand the steps
2. Use `vai workflow init` to create your own based on the template
3. Edit the JSON to match your needs

```bash
# See what a template does
vai workflow run ingest-and-index --dry-run --input path=./docs

# Create a custom version
vai workflow init -o my-pipeline.json
# Edit my-pipeline.json...
vai workflow run my-pipeline.json --input path=./docs
```

## Further Reading

- [Writing Workflows](./writing-workflows) — Create custom workflows
- [Schema Reference](./schema-reference) — Full JSON schema
