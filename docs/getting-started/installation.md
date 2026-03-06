---
title: Installation
description: Install vai and set up prerequisites
sidebar_position: 1
---

# Installation

## Prerequisites

- **Node.js 20+** ([download](https://nodejs.org/)) for npm install (Homebrew and Docker handle this automatically)
- **Python 3.9+** for `voyage-4-nano` local inference
- **MongoDB Atlas cluster** (free tier at [mongodb.com/atlas](https://www.mongodb.com/atlas)) for storage and search commands
- **Voyage AI API key** (free tier available at [dash.voyageai.com](https://dash.voyageai.com)) for API-backed embedding, reranking, and query workflows

## Fastest Local Start in v1.31.0

`vai v1.31.0` adds `voyage-4-nano` local inference, so you can embed locally before configuring a Voyage AI API key.

```bash
npm install -g voyageai-cli
vai nano setup
vai embed "What is vector search?" --local
```

`vai nano setup` creates the isolated Python environment, installs the required dependencies, downloads the model, and verifies the lightweight Python bridge that powers local inference.

## Install via Homebrew (macOS / Linux)

The simplest way to install on macOS or Linux:

```bash
brew tap mrlynn/vai
brew install vai
```

Verify the installation:

```bash
vai --version
```

To upgrade later:

```bash
brew update && brew upgrade vai
```

## Install via npm

Install globally to get the `vai` command:

```bash
npm install -g voyageai-cli
```

Verify the installation:

```bash
vai --version
```

## Run Without Installing

Use `npx` to run vai without a global install:

```bash
npx voyageai-cli@latest quickstart
npx voyageai-cli@latest embed "Hello, world"
```

## Install via Docker

Run vai in a container with no Node.js install required:

```bash
git clone https://github.com/mrlynn/voyageai-cli.git
cd voyageai-cli
docker build -t vai .
```

Run any vai command:

```bash
docker run --rm -e VOYAGE_API_KEY="your-key" vai embed "hello world"
```

Start the web playground:

```bash
docker run --rm -p 3333:3333 -e VOYAGE_API_KEY="your-key" vai playground --no-open
```

For Docker Compose, the wrapper script, and production deployment, see the [Docker guide](/docs/guides/docker/overview).

## Set Up Optional Credentials

Local `voyage-4-nano` embedding does not require a Voyage API key. You only need credentials when you move into API-backed embedding, reranking, chat, or MongoDB-backed storage and search.

For API-backed and database workflows, set:

```bash
# Option 1: Environment variables
export VOYAGE_API_KEY="your-voyage-ai-key"
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/"

# Option 2: .env file (add to .gitignore)
echo 'VOYAGE_API_KEY=your-key' >> .env
echo 'MONGODB_URI=mongodb+srv://...' >> .env

# Option 3: Built-in config store (persisted in ~/.vai/config.json)
echo "your-key" | vai config set api-key --stdin
vai config set mongodb-uri "mongodb+srv://..."
```

Credentials resolve in order: environment variables, then `.env` file, then `~/.vai/config.json`.

## Verify Your Setup

Verify local inference:

```bash
vai nano status
vai nano test
```

Verify API and MongoDB connectivity when those credentials are configured:

```bash
vai ping
```

`vai ping` checks the Voyage AI API and MongoDB Atlas connection. `vai nano test` verifies that the local model, Python bridge, and embedding path are ready.

## Desktop App

For a GUI experience, download the desktop app from [GitHub Releases](https://github.com/mrlynn/voyageai-cli/releases):

| Platform | Format |
|----------|--------|
| macOS (Apple Silicon) | `.dmg` |
| macOS (Intel) | `.dmg` |
| Windows | `.exe` installer |
| Linux | `.AppImage` / `.deb` |

## Troubleshooting

Run the diagnostic tool if something isn't working:

```bash
vai doctor
```

This checks Node.js version, API key validity, MongoDB connectivity, and common configuration issues.

## Next Steps

- **[Local Inference Guide](/docs/guides/local-inference/overview)**: Learn how nano and the Python bridge work
- **[Quickstart](/docs/getting-started/quickstart)**: Interactive tutorial
- **[Configuration](/docs/getting-started/configuration)**: Environment variables and config options
- **[5-Minute RAG Pipeline](/docs/guides/five-minute-rag)**: End-to-end tutorial
