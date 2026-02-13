---
title: Template Expressions
description: Expression grammar and examples for vai workflows
sidebar_position: 5
---

# Template Expressions

Template expressions are the data-flow mechanism in vai workflows. They let steps reference workflow inputs, defaults, and outputs from other steps using the `{{ }}` syntax.

## Syntax

Expressions are delimited by double curly braces:

```
{{ expression }}
```

Expressions can appear anywhere in a step's `inputs`, in `condition` fields, `forEach` fields, and in the workflow `output`.

## Expression Types

### Workflow Inputs

Reference parameters provided at runtime via `--input`:

```
{{ inputs.query }}
{{ inputs.limit }}
{{ inputs.verbose }}
```

### Defaults

Reference shared defaults defined at the workflow level:

```
{{ defaults.db }}
{{ defaults.collection }}
{{ defaults.model }}
```

### Step Outputs

Reference the output of a completed step by its `id`:

```
{{ search_api.output }}
{{ search_api.output.results }}
{{ search_api.output.resultCount }}
```

### Array Indexing

Access specific elements in arrays:

```
{{ search_api.output.results[0] }}
{{ search_api.output.results[0].content }}
{{ search_api.output.results[0].metadata.source }}
```

### forEach Item

Inside a `forEach` step, `item` refers to the current array element:

```
{{ item }}
{{ item.content }}
{{ item.metadata.source }}
```

## Grammar

The template expression grammar supports:

| Pattern | Example | Description |
|---------|---------|-------------|
| Dot access | `{{ a.b.c }}` | Navigate nested objects |
| Array index | `{{ a.b[0] }}` | Access array element by index |
| Chained access | `{{ a.b[0].c.d }}` | Combine dot access and indexing |
| Comparison | `{{ a.b > 0.8 }}` | Compare values (returns boolean) |
| Negation | `{{ !a.b }}` | Logical NOT |
| Property length | `{{ a.b.length }}` | Array or string length |
| Mixed static | Prefix `{{ expr }}` suffix | Embed expressions in strings |

### Comparison Operators

Used in `condition` fields and filter expressions:

| Operator | Example | Description |
|----------|---------|-------------|
| `>` | `{{ score > 0.8 }}` | Greater than |
| `<` | `{{ score < 0.5 }}` | Less than |
| `>=` | `{{ count >= 10 }}` | Greater than or equal |
| `<=` | `{{ count <= 100 }}` | Less than or equal |
| `==` | `{{ status == "active" }}` | Equality |
| `!=` | `{{ type != "draft" }}` | Inequality |

### Logical Operators

| Operator | Example | Description |
|----------|---------|-------------|
| `!` | `{{ !similarity_check.output }}` | Logical NOT |
| `&&` | `{{ a > 0 && b > 0 }}` | Logical AND |
| `\|\|` | `{{ a \|\| b }}` | Logical OR |

## Examples

### String Interpolation

Embed expressions within larger strings:

```json
{
  "prompt": "Based on the following documents, answer this question: {{ inputs.question }}"
}
```

The expression is replaced inline, producing a complete string.

### Passing Entire Objects

Pass an entire step output as input to another step:

```json
{
  "context": "{{ filter_results.output }}"
}
```

When the expression is the entire value (not embedded in a string), the resolved object is passed directly without stringification.

### Conditional Execution

Use comparisons in the `condition` field:

```json
{
  "id": "ingest_doc",
  "tool": "ingest",
  "condition": "{{ !similarity_check.output || similarity_check.output.similarity < 0.85 }}"
}
```

This step only runs if:
- The similarity check was skipped (no output), OR
- The similarity score is below 0.85

### Filter Conditions

The `filter` tool uses expressions with `item` as the current element:

```json
{
  "id": "high_relevance",
  "tool": "filter",
  "inputs": {
    "array": "{{ search_results.output.results }}",
    "condition": "item.score > 0.7"
  }
}
```

Note: filter conditions use `item` without the `{{ }}` delimiters since the entire `condition` string is interpreted as an expression.

### Nested Output Construction

Build structured output from multiple steps:

```json
{
  "output": {
    "answer": "{{ summarize.output.text }}",
    "sources": "{{ filter_results.output }}",
    "metadata": {
      "collections_searched": 2,
      "total_results": "{{ merge_results.output.resultCount }}",
      "query": "{{ inputs.query }}"
    }
  }
}
```

## Dependency Detection

vai automatically detects dependencies between steps by scanning template expressions. If step B references `{{ step_a.output.results }}`, the engine ensures step A completes before step B starts.

This detection works recursively: if step C depends on step B which depends on step A, the engine builds the correct execution order:

```
Layer 1: step_a           (no dependencies)
Layer 2: step_b           (depends on step_a)
Layer 3: step_c           (depends on step_b)
```

Steps in the same layer with no shared dependencies run in parallel.

## Resolution Rules

1. **Missing values**: If a template expression resolves to `undefined`, the value is `null`
2. **Skipped steps**: If a step was skipped (condition was falsy), its output is `null`
3. **Type preservation**: When an expression is the entire value, the resolved type is preserved (objects stay objects, arrays stay arrays)
4. **String embedding**: When an expression is embedded in a larger string, the resolved value is converted to a string

## Limitations

The template engine is deliberately simple:

- No arbitrary JavaScript execution
- No function calls (e.g., no `.map()`, `.filter()`, `.join()`)
- No arithmetic beyond comparisons
- No ternary operators
- No string concatenation operators (use string embedding instead)

This simplicity is a design choice: workflows should be inspectable and predictable. Complex data transformations should use the `transform` or `filter` step tools.

## Next Steps

- **[Schema Reference](/docs/guides/workflows/schema-reference)**: Complete field reference
- **[Writing Workflows](/docs/guides/workflows/writing-workflows)**: Step-by-step tutorial
- **[Built-in Templates](/docs/guides/workflows/built-in-templates)**: See expressions in practice
