---
title: "vai index"
description: "Manage Atlas Vector Search indexes"
sidebar_position: 4
---

# vai index

Create, list, and delete MongoDB Atlas Vector Search indexes.

## Synopsis

```bash
vai index create --db <database> --collection <name> --field <name> [options]
vai index list --db <database> --collection <name> [options]
vai index delete --db <database> --collection <name> --index-name <name> [options]
```

## Description

`vai index` manages vector search indexes on MongoDB Atlas collections. Indexes are required for `$vectorSearch` queries to work. The command has three subcommands: `create`, `list`, and `delete`.

---

### vai index create

Create a new vector search index on a collection.

| Flag | Description | Default |
|------|-------------|---------|
| `--db <database>` | Database name **(required)** | — |
| `--collection <name>` | Collection name **(required)** | — |
| `--field <name>` | Embedding field name **(required)** | — |
| `-d, --dimensions <n>` | Vector dimensions | `1024` |
| `-s, --similarity <type>` | Similarity function: `cosine`, `dotProduct`, `euclidean` | `cosine` |
| `-n, --index-name <name>` | Index name | `vector_index` |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

```bash
vai index create --db myapp --collection docs --field embedding --dimensions 1024
```

:::note
Index creation is asynchronous. It may take a few minutes for the index to become ready for queries.
:::

---

### vai index list

List all search indexes on a collection.

| Flag | Description | Default |
|------|-------------|---------|
| `--db <database>` | Database name **(required)** | — |
| `--collection <name>` | Collection name **(required)** | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

```bash
vai index list --db myapp --collection docs
```

---

### vai index delete

Drop a search index by name.

| Flag | Description | Default |
|------|-------------|---------|
| `--db <database>` | Database name **(required)** | — |
| `--collection <name>` | Collection name **(required)** | — |
| `-n, --index-name <name>` | Index name to delete **(required)** | — |
| `--json` | Machine-readable JSON output | — |
| `-q, --quiet` | Suppress non-essential output | — |

```bash
vai index delete --db myapp --collection docs --index-name vector_index
```

## Examples

### Create an index with dot product similarity

```bash
vai index create --db myapp --collection docs --field embedding \
  --dimensions 1024 --similarity dotProduct --index-name my_index
```

### List indexes as JSON

```bash
vai index list --db myapp --collection docs --json
```

## Tips

- You need at least one vector search index before using `vai search` or `vai query`.
- Use `--similarity cosine` (the default) unless you have specific requirements for dot product or Euclidean distance.
- The `vai pipeline --create-index` flag can auto-create an index as part of the pipeline.
- If an index with the same name already exists, `create` will fail — use a different `--index-name` or delete the existing one first.

## Related Commands

- [`vai search`](./search) — Search using a vector index
- [`vai pipeline`](../rag-pipeline/pipeline) — Create indexes automatically with `--create-index`
