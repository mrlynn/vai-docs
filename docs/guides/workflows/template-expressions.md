---
title: Template Expressions
description: Passing data between workflow steps
sidebar_position: 3
---

# Template Expressions

Template expressions let you pass data between workflow steps and inject runtime inputs using `{{variable}}` syntax.

## Syntax

| Expression | Resolves To |
|------------|-------------|
| `{{variable}}` | Runtime input passed via `--input variable=value` |
| `{{step_id.output}}` | Output from a previous step |
| `{{step_id.output.field}}` | Specific field from a step's output |

## Examples

### Runtime Inputs

```json
{
  "input": { "path": "{{docs_path}}" }
}
```

```bash
vai workflow run my-workflow.json --input docs_path=./docs
```

### Step Output References

```json
{
  "id": "embed",
  "depends": ["chunk"],
  "input": { "texts": "{{chunk.output}}" }
}
```

The `embed` step receives the output of the `chunk` step as its `texts` input.

### Nested Field Access

```json
{
  "input": { "query_vector": "{{embed-query.output.vector}}" }
}
```

## Tips

- Step outputs are only available to steps that declare a dependency via `depends`
- Template expressions are resolved just before each step executes
- Use descriptive step IDs so template expressions read naturally
