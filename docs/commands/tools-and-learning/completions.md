---
title: "vai completions"
description: "Generate shell completion scripts"
sidebar_position: 7
---

# vai completions

Generate shell completion scripts for Bash and Zsh, enabling tab-completion for vai commands, subcommands, and flags.

## Synopsis

```bash
vai completions <shell>
```

## Description

`vai completions` outputs a completion script for the specified shell. Pipe it into your shell config file to enable tab-completion for all vai commands, their subcommands, and option flags.

Supported shells: `bash`, `zsh`

## Examples

### Bash completions

```bash
# Add to ~/.bashrc
vai completions bash >> ~/.bashrc
source ~/.bashrc

# Or install system-wide
vai completions bash > /usr/local/etc/bash_completion.d/vai
```

### Zsh completions

```bash
# Add to ~/.zshrc
vai completions zsh >> ~/.zshrc
source ~/.zshrc
```

## What Gets Completed

- All top-level commands (`embed`, `search`, `pipeline`, etc.)
- Subcommands (`index create`, `config set`, `workflow run`, etc.)
- Command-specific flags (`--model`, `--db`, `--collection`, etc.)
- Config keys for `vai config set` (`api-key`, `mongodb-uri`, etc.)

## Related Commands

- [`vai config`](./config) — Configure vai settings
- [`vai about`](./about) — Show version info
