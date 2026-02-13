<p align="center">
  <img src="static/img/V.png" alt="vai" width="160" />
</p>

<h1 align="center">vai docs</h1>

<p align="center">
  <strong>The fastest path from documents to semantic search</strong>
</p>

<p align="center">
  <a href="https://vai-docs.vercel.app"><img src="https://img.shields.io/badge/docs-vai--docs.vercel.app-00D4AA?style=flat-square&logo=vercel&logoColor=white" alt="Documentation" /></a>
  <a href="https://www.npmjs.com/package/voyageai-cli"><img src="https://img.shields.io/npm/v/voyageai-cli?style=flat-square&color=00D4AA&label=voyageai-cli" alt="npm version" /></a>
  <a href="https://github.com/mrlynn/vai-docs/actions"><img src="https://img.shields.io/github/actions/workflow/status/mrlynn/vai-docs/deploy.yml?style=flat-square&label=build" alt="Build Status" /></a>
  <a href="https://github.com/mrlynn/vai-docs"><img src="https://img.shields.io/github/last-commit/mrlynn/vai-docs?style=flat-square&color=40E0FF" alt="Last Commit" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-889397?style=flat-square" alt="License" /></a>
</p>

<p align="center">
  <a href="https://vai-docs.vercel.app">Live Site</a> &bull;
  <a href="https://github.com/mrlynn/voyageai-cli">voyageai-cli</a> &bull;
  <a href="https://vai-docs.vercel.app/blog">Blog</a> &bull;
  <a href="#contributing">Contributing</a>
</p>

This is the documentation site for [voyageai-cli](https://github.com/mrlynn/voyageai-cli) (vai), the CLI toolkit for building semantic search pipelines with Voyage AI embeddings and MongoDB Atlas Vector Search.

Built with [Docusaurus 3](https://docusaurus.io/) and deployed on [Vercel](https://vercel.com/).

## What's Inside

| Section | Pages | Description |
|---------|------:|-------------|
| **Getting Started** | 5 | Installation, quickstart, configuration, project config, shell completions |
| **Core Concepts** | 14 | Embeddings, vector search, RAG, reranking, cosine similarity, multimodal |
| **Command Reference** | 36 | All 33 vai commands with synopsis, options, and examples |
| **Guides** | 28 | RAG pipelines, chat, workflows, MCP server, benchmarking, evaluation |
| **Models** | 5 | Voyage AI model families, domain-specific models, selection guide |
| **API Reference** | 5 | Environment variables, MCP tools, workflow schema, project config schema |
| **Use Cases** | 4 | Developer docs, healthcare, legal, finance |
| **Troubleshooting** | 4 | Common errors, MCP issues, connectivity, FAQ |
| **Blog** | 2 | Release notes and feature announcements |
| | **103** | |

## Quick Start

**Prerequisites:** Node.js >= 20

```bash
git clone https://github.com/mrlynn/vai-docs.git
cd vai-docs
npm install
npm start
```

The development server starts at `http://localhost:3000` with live reload.

## Build

```bash
npm run build
```

Generates static files in the `build/` directory. Test the production build locally:

```bash
npm run serve
```

## Project Structure

```
vai-docs/
  blog/                   # Blog posts and authors
  docs/                   # Documentation source (Markdown)
    getting-started/      # Installation, quickstart, config
    core-concepts/        # Embeddings, RAG, vector search
    commands/             # All 33 command reference pages
    guides/               # Tutorials and how-to guides
    models/               # Voyage AI model documentation
    api-reference/        # Env vars, schemas, MCP tools
    use-cases/            # Industry-specific examples
    troubleshooting/      # Common issues and FAQ
  src/
    css/custom.css        # vai brand theme (colors, fonts)
    pages/                # Landing page (React)
  static/img/             # Logos, favicon, watermark
  docusaurus.config.ts    # Site configuration
  sidebars.ts             # Sidebar navigation tree
  vai-docs-content-spec.md  # Content plan with priorities
```

## Content Status

The site launches with **17 pages of full content** covering the core user journey. The remaining **86 pages** are scaffolded with frontmatter and section headers, ready for content. See [`vai-docs-content-spec.md`](vai-docs-content-spec.md) for the complete content plan with priorities and source references.

| Priority | Done | Scaffolded | Total |
|---------:|-----:|-----------:|------:|
| P0 | 15 | 13 | 28 |
| P1 | 2 | 38 | 40 |
| P2 | 0 | 35 | 35 |
| **Total** | **17** | **86** | **103** |

## Brand

The site follows the [vai brand guidelines](https://vai.mlynn.org/branding):

| Token | Value | Usage |
|-------|-------|-------|
| Primary Teal | `#00D4AA` | Links, buttons, accents |
| MDB Black | `#001E2B` | Dark mode background |
| Secondary Cyan | `#40E0FF` | Gradients, highlights |
| Surface Dark | `#112733` | Cards, code blocks |
| Border | `#3D4F58` | Dividers, outlines |

Typography uses system fonts for body text and Source Code Pro for monospace.

## Deployment

The site is configured for Vercel with zero additional setup. Connect the repository in the Vercel dashboard and it auto-detects Docusaurus.

**Manual deploy:**

```bash
npm run build
npx vercel --prod
```

## Contributing

Contributions are welcome. Every documentation page has an "Edit this page" link at the bottom.

**To add or improve content:**

1. Fork the repository
2. Create a branch (`git checkout -b docs/improve-embed-command`)
3. Edit the relevant `.md` file in `docs/`
4. Run `npm start` to preview locally
5. Submit a pull request

**Writing style:**
- No horizontal rules between sections
- No em dashes (use commas, colons, or restructure)
- Terminal examples in ` ```bash ` blocks, JSON in ` ```json ` blocks
- Use Docusaurus admonitions (`:::note`, `:::tip`, `:::warning`) for callouts
- Command pages follow the template: Synopsis, Description, Options, Examples, Related Commands

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Docusaurus](https://docusaurus.io/) | 3.9.2 | Static site generator |
| [React](https://react.dev/) | 19.0 | Landing page components |
| [TypeScript](https://www.typescriptlang.org/) | 5.6 | Type-safe configuration |
| [Vercel](https://vercel.com/) | — | Hosting and deployment |
| [MDX](https://mdxjs.com/) | 3.0 | Enhanced Markdown |

## License

MIT

## Author

[Michael Lynn](https://github.com/mrlynn), Principal Staff Developer Advocate at MongoDB.

vai is a community project. It is not an official MongoDB or Voyage AI product.
