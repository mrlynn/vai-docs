---
title: Common Errors
description: Solutions for frequent vai issues
sidebar_position: 1
---

# Common Errors

## Authentication Errors

### "VOYAGE_API_KEY not set"

The Voyage AI API key is not configured.

```bash
# Fix: Set your API key
vai config set api-key YOUR_API_KEY

# Or use environment variable
export VOYAGE_API_KEY=YOUR_API_KEY
```

### "Invalid API key" / 401 Unauthorized

Your API key is invalid or expired.

```bash
# Check your key
vai config get api-key

# Test connectivity
vai ping
```

Get a new key from the [Voyage AI dashboard](https://dash.voyageai.com/).

## MongoDB Errors

### "MONGODB_URI not set" / Connection failed

MongoDB connection string is not configured or unreachable.

```bash
# Set your connection string
vai config set mongodb-uri "mongodb+srv://user:pass@cluster.mongodb.net"

# Test the connection
vai ping
```

### "Index not found" / Empty search results

Your collection doesn't have a vector search index, or it hasn't finished building.

```bash
# Create an index
vai index create --db myapp --collection docs --field embedding

# List existing indexes
vai index list --db myapp --collection docs
```

Note: Indexes take a few minutes to become ready after creation.

### "Index already exists"

Use a different index name or delete the existing one:

```bash
vai index delete --db myapp --collection docs --index-name vector_index
```

## Embedding Errors

### "Input too long" / Truncation errors

Your text exceeds the model's context window.

```bash
# Enable truncation
vai embed --file long-document.txt --truncation

# Or chunk the document first
vai chunk long-document.txt --chunk-size 8000
```

### "Batch size cannot exceed 128"

The Voyage AI API limits batches to 128 texts.

```bash
# Reduce batch size
vai ingest --file data.jsonl --db myapp --collection docs --field embedding --batch-size 100
```

## Project Config Errors

### "Database and collection required"

Commands like `pipeline`, `query`, and `chat` need database and collection settings.

```bash
# Option 1: Use flags
vai pipeline ./docs/ --db myapp --collection knowledge

# Option 2: Initialize a project (recommended)
vai init
```

### "Project already initialized"

A `.vai.json` file already exists.

```bash
# Overwrite it
vai init --force
```

## Chat Errors

### "Database and collection required for pipeline mode"

Chat in pipeline mode needs a collection to search.

```bash
vai chat --db myapp --collection docs

# Or use agent mode (discovers collections)
vai chat --mode agent
```

## General Tips

- Run `vai ping` to verify both API and database connectivity
- Use `--json` on any command for machine-readable error output
- Check `vai config list` to see all configured values
- Use `--dry-run` where available to test before executing
