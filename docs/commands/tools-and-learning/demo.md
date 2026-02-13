---
title: "vai demo"
description: "Guided interactive walkthrough of vai features"
sidebar_position: 6
---

# vai demo

A guided, step-by-step terminal walkthrough that demonstrates vai's key features by running real commands interactively.

## Synopsis

```bash
vai demo [options]
```

## Description

`vai demo` walks you through vai's core capabilities by running actual commands and showing their output. Each step pauses for you to press Enter before continuing, making it ideal for learning or presenting vai to others.

The demo runs real vai subcommands as child processes with inherited stdio, so you see exactly the same output you'd get running commands yourself.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--no-pause` | Skip "Press Enter" prompts between steps | — |

## Examples

### Run the interactive demo

```bash
vai demo
```

### Run without pauses (for CI or recording)

```bash
vai demo --no-pause
```

## Tips

- Make sure your API key is configured (`vai config set api-key`) before running the demo.
- If a step fails, the demo asks whether you want to continue or abort.
- For a browser-based exploration experience, try [`vai playground`](./playground) instead.

## Related Commands

- [`vai playground`](./playground) — Web-based interactive playground
- [`vai explain`](./explain) — Learn about specific concepts
