---
title: Test Sets
description: Creating evaluation test sets
sidebar_position: 2
---

# Creating Test Sets

A test set is a JSON file containing queries and their known relevant document IDs.

## Format

```json
[
  {
    "query": "How do I configure authentication?",
    "relevant": ["6507a1234b5c6d7e8f901234", "6507a1234b5c6d7e8f901235"]
  },
  {
    "query": "What are replica sets?",
    "relevant": ["6507a1234b5c6d7e8f901236"]
  }
]
```

Each entry has:
- **`query`** — The search query
- **`relevant`** — Array of document `_id` values that are relevant to this query

## Finding Document IDs

```bash
# Search and note the _id values of relevant results
vai search --query "authentication" --db myapp --collection docs --json | jq '.[].\_id'
```

## Best Practices

- **Start small**: 10-20 queries is enough for initial evaluation
- **Cover variety**: Include different query types (factual, conceptual, specific, broad)
- **Multiple relevant docs**: Most queries have 2-5 relevant documents
- **Be honest**: Only mark truly relevant documents, not just vaguely related ones
- **Update regularly**: Add new queries as you discover edge cases

## Running Evaluation

```bash
vai eval --test-set my-test-set.json --db myapp --collection docs
```

## Further Reading

- [Evaluation Overview](./overview) — Metrics and workflow
- [Comparing Configs](./comparing-configs) — A/B testing configurations
