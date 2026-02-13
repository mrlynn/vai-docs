---
title: "vai similarity"
description: "Compare text similarity using cosine distance"
sidebar_position: 3
---

# vai similarity

Compute cosine similarity between texts by embedding them and comparing their vectors.

## Synopsis

```bash
vai similarity [textA] [textB] [options]
vai similarity [textA] --against <text1> <text2> ... [options]
```

## Description

`vai similarity` embeds two or more texts and computes cosine similarity between them. It supports two modes:

- **Two-text comparison**: Compare exactly two texts and get a single similarity score.
- **One-vs-many**: Compare one text against multiple texts using `--against`, with results sorted by similarity (descending).

All texts are embedded in a single API call for efficiency.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--against <texts...>` | Compare first text against multiple texts | — |
| `--file1 <path>` | Read text A from a file | — |
| `--file2 <path>` | Read text B from a file | — |
| `-m, --model <model>` | Embedding model | `voyage-4-large` |
| `--dimensions <n>` | Output dimensions | Model default |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output (score only) | — |

## Examples

### Compare two texts

```bash
vai similarity "king" "queen"
```

### Compare one text against many

```bash
vai similarity "database" --against "MongoDB is a NoSQL database" "Python is a programming language" "Vector search finds similar documents"
```

### Compare files

```bash
vai similarity --file1 document-a.txt --file2 document-b.txt
```

### Get just the score

```bash
vai similarity "cat" "dog" --quiet
# Output: 0.847293
```

### JSON output for scripting

```bash
vai similarity "hello" "world" --json
```

## Output

In two-text mode, outputs a single cosine similarity score (0.0–1.0). In one-vs-many mode, results are sorted by similarity descending, showing each comparison text and its score.

## Tips

- Cosine similarity ranges from -1 to 1, but for normalized embeddings it's typically 0 to 1. Higher = more similar.
- Use `--quiet` to get just the numeric score — useful for scripting.
- No `--input-type` is set since you're comparing texts directly, not doing asymmetric retrieval.

## Related Commands

- [`vai embed`](./embed) — Generate raw embeddings
- [`vai search`](../data-management/search) — Similarity search against a MongoDB collection
