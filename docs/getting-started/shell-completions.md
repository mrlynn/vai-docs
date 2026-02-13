---
title: Shell Completions
description: Tab completion for vai commands
sidebar_position: 5
---

# Shell Completions

vai provides tab completion for Bash and Zsh. Completions cover commands, subcommands, flags, model names, and topic names.

## Bash

```bash
# Generate and source completions
vai completions bash >> ~/.bashrc
source ~/.bashrc
```

## Zsh

```bash
# Generate and source completions
vai completions zsh >> ~/.zshrc
source ~/.zshrc
```

## What Gets Completed

- All 33 commands and their subcommands
- Command flags and options
- Model names (e.g., `voyage-4-large`, `voyage-4-lite`)
- Topic names for `vai explain`
- Chunking strategies for `--strategy`

## Usage

After setup, press `Tab` to complete:

```bash
vai qu<Tab>        # → vai query
vai bench<Tab>     # → vai benchmark
vai explain emb<Tab>  # → vai explain embeddings
```
