# vai-docs Content Specification

This document tracks every page in the vai documentation site, its current status, content source, and priority.

## Status Key

- **Done**: Full content written and reviewed
- **Scaffolded**: Frontmatter + headers + placeholder text, needs content
- **Missing**: Page referenced in sidebar but not created

## Priority Key

- **P0**: Must have for launch. Core user journeys.
- **P1**: Important. Frequently needed reference material.
- **P2**: Nice to have. Can be added incrementally.

## Style Guide

- No horizontal rules (`---`) between sections
- No em dashes. Use commas, colons, or restructure instead
- No unicode em dash character
- Terminal examples in ` ```bash ` blocks
- JSON examples in ` ```json ` blocks
- Use Docusaurus admonitions (`:::note`, `:::tip`, `:::warning`) for callouts
- Every command page follows the template: Synopsis, Description, Options, Examples, Related Commands
- Keep sentences concise. One idea per paragraph.

## Content Sources

| Source | Location | Lines | Used For |
|--------|----------|-------|----------|
| README.md | `/Users/michael.lynn/code/voyageai-cli/README.md` | ~654 | Getting started, command reference, features |
| MCP Server spec | `/Users/michael.lynn/code/voyageai-cli/docs/mcp-server.md` | ~627 | MCP guides + API reference |
| Workflow spec | `/Users/michael.lynn/code/voyageai-cli/docs/vai-agentic-workflow-spec.md` | ~1498 | Workflow guides + schema |
| Chat spec | `/Users/michael.lynn/code/voyageai-cli/docs/vai-chat-spec.md` | ~1102 | Chat guides |
| Use cases doc | `/Users/michael.lynn/code/voyageai-cli/docs/industry-use-cases.md` | ~863 | Use case pages |
| Explanations | `/Users/michael.lynn/code/voyageai-cli/src/lib/explanations.js` | ~1688 | Core concepts (30 topics) |
| Source code | `/Users/michael.lynn/code/voyageai-cli/src/` | varies | Command options, behavior details |

## Pages

### Introduction (1 page)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/intro.md` | Done | P0 | New | What is vai, capabilities, quick install |

### Getting Started (5 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/getting-started/installation.md` | Done | P0 | README | Prerequisites, npm install, credentials |
| `docs/getting-started/quickstart.md` | Done | P0 | README | 5-step manual quickstart |
| `docs/getting-started/configuration.md` | Done | P0 | README | Env vars, config store, resolution order |
| `docs/getting-started/project-config.md` | Done | P0 | README | .vai.json schema and fields |
| `docs/getting-started/shell-completions.md` | Done | P1 | README | Bash/Zsh setup |

### Core Concepts (14 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/core-concepts/embeddings.md` | Scaffolded | P1 | explanations.js | What embeddings are, how they work |
| `docs/core-concepts/vector-search.md` | Scaffolded | P1 | explanations.js | Vector search mechanics, HNSW |
| `docs/core-concepts/rag.md` | Scaffolded | P1 | explanations.js | RAG pattern explained |
| `docs/core-concepts/reranking.md` | Scaffolded | P1 | explanations.js | Two-stage retrieval, cross-encoders |
| `docs/core-concepts/two-stage-retrieval.md` | Scaffolded | P1 | explanations.js | Search then rerank pattern |
| `docs/core-concepts/cosine-similarity.md` | Scaffolded | P2 | explanations.js | Math behind similarity |
| `docs/core-concepts/shared-embedding-space.md` | Scaffolded | P2 | explanations.js | How embeddings share space |
| `docs/core-concepts/mixture-of-experts.md` | Scaffolded | P2 | explanations.js | MoE architecture |
| `docs/core-concepts/quantization.md` | Scaffolded | P2 | explanations.js | Quantization for efficiency |
| `docs/core-concepts/input-types.md` | Scaffolded | P2 | explanations.js | Query vs document input types |
| `docs/core-concepts/multimodal/multimodal-embeddings.md` | Scaffolded | P2 | explanations.js | Multimodal embedding concepts |
| `docs/core-concepts/multimodal/cross-modal-search.md` | Scaffolded | P2 | explanations.js | Text-to-image search |
| `docs/core-concepts/multimodal/modality-gap.md` | Scaffolded | P2 | explanations.js | Gap between modalities |
| `docs/core-concepts/multimodal/multimodal-rag.md` | Scaffolded | P2 | explanations.js | RAG with multimodal |

### Command Reference (36 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/commands/overview.md` | Done | P0 | New | Full command table with all 33 commands |
| **Project Setup** | | | | |
| `docs/commands/project-setup/init.md` | Scaffolded | P1 | README + source | vai init |
| `docs/commands/project-setup/generate.md` | Scaffolded | P1 | README + source | vai generate |
| `docs/commands/project-setup/scaffold.md` | Scaffolded | P1 | README + source | vai scaffold |
| **RAG Pipeline** | | | | |
| `docs/commands/rag-pipeline/pipeline.md` | Scaffolded | P0 | README + source | vai pipeline (key command) |
| `docs/commands/rag-pipeline/query.md` | Scaffolded | P0 | README + source | vai query |
| `docs/commands/rag-pipeline/chunk.md` | Scaffolded | P1 | README + source | vai chunk |
| `docs/commands/rag-pipeline/estimate.md` | Scaffolded | P1 | README + source | vai estimate |
| **Embeddings** | | | | |
| `docs/commands/embeddings/embed.md` | Scaffolded | P0 | README + source | vai embed |
| `docs/commands/embeddings/rerank.md` | Scaffolded | P0 | README + source | vai rerank |
| `docs/commands/embeddings/similarity.md` | Scaffolded | P1 | README + source | vai similarity |
| **Data Management** | | | | |
| `docs/commands/data-management/store.md` | Scaffolded | P1 | README + source | vai store |
| `docs/commands/data-management/ingest.md` | Scaffolded | P0 | README + source | vai ingest |
| `docs/commands/data-management/search.md` | Scaffolded | P0 | README + source | vai search |
| `docs/commands/data-management/index.md` | Scaffolded | P1 | README + source | vai index |
| `docs/commands/data-management/purge.md` | Scaffolded | P2 | README + source | vai purge |
| `docs/commands/data-management/refresh.md` | Scaffolded | P2 | README + source | vai refresh |
| **Evaluation** | | | | |
| `docs/commands/evaluation/eval.md` | Scaffolded | P1 | README + source | vai eval |
| `docs/commands/evaluation/eval-compare.md` | Scaffolded | P1 | README + source | vai eval-compare |
| `docs/commands/evaluation/benchmark.md` | Scaffolded | P1 | README + source | vai benchmark |
| **MCP** | | | | |
| `docs/commands/mcp/mcp.md` | Scaffolded | P0 | mcp-server.md | vai mcp |
| `docs/commands/mcp/mcp-install.md` | Scaffolded | P0 | mcp-server.md | vai mcp-install |
| `docs/commands/mcp/mcp-uninstall.md` | Scaffolded | P1 | mcp-server.md | vai mcp-uninstall |
| `docs/commands/mcp/mcp-status.md` | Scaffolded | P1 | mcp-server.md | vai mcp-status |
| **Tools and Learning** | | | | |
| `docs/commands/tools-and-learning/models.md` | Scaffolded | P1 | README + source | vai models |
| `docs/commands/tools-and-learning/explain.md` | Scaffolded | P1 | README + source | vai explain |
| `docs/commands/tools-and-learning/config.md` | Scaffolded | P1 | README + source | vai config |
| `docs/commands/tools-and-learning/ping.md` | Scaffolded | P2 | README + source | vai ping |
| `docs/commands/tools-and-learning/playground.md` | Scaffolded | P2 | README + source | vai playground |
| `docs/commands/tools-and-learning/completions.md` | Scaffolded | P2 | README + source | vai completions |
| `docs/commands/tools-and-learning/demo.md` | Scaffolded | P2 | README + source | vai demo |
| `docs/commands/tools-and-learning/about.md` | Scaffolded | P2 | README + source | vai about |
| **Advanced** | | | | |
| `docs/commands/advanced/chat.md` | Scaffolded | P0 | chat-spec.md | vai chat |
| `docs/commands/advanced/workflow-run.md` | Scaffolded | P0 | workflow-spec.md | vai workflow run |
| `docs/commands/advanced/workflow-validate.md` | Scaffolded | P1 | workflow-spec.md | vai workflow validate |
| `docs/commands/advanced/workflow-list.md` | Scaffolded | P1 | workflow-spec.md | vai workflow list |
| `docs/commands/advanced/workflow-init.md` | Scaffolded | P1 | workflow-spec.md | vai workflow init |

### Guides (28 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/guides/five-minute-rag.md` | Done | P0 | README | 4-step RAG tutorial |
| **Chat** | | | | |
| `docs/guides/chat/overview.md` | Scaffolded | P0 | chat-spec.md | Chat feature overview |
| `docs/guides/chat/setup.md` | Scaffolded | P0 | chat-spec.md | LLM provider setup |
| `docs/guides/chat/providers.md` | Scaffolded | P1 | chat-spec.md | Anthropic, OpenAI, Ollama |
| `docs/guides/chat/agent-mode.md` | Scaffolded | P1 | chat-spec.md | Agentic chat capabilities |
| **Workflows** | | | | |
| `docs/guides/workflows/overview.md` | Done | P0 | workflow-spec.md | Workflow concepts |
| `docs/guides/workflows/schema-reference.md` | Done | P0 | workflow-spec.md | Every field documented |
| `docs/guides/workflows/writing-workflows.md` | Done | P0 | New | Step-by-step tutorial |
| `docs/guides/workflows/built-in-templates.md` | Done | P0 | New | 5 templates documented |
| `docs/guides/workflows/template-expressions.md` | Done | P1 | workflow-spec.md | Expression grammar |
| **MCP Server** | | | | |
| `docs/guides/mcp-server/overview.md` | Scaffolded | P0 | mcp-server.md | MCP server overview |
| `docs/guides/mcp-server/automatic-setup.md` | Scaffolded | P0 | mcp-server.md | vai mcp-install |
| `docs/guides/mcp-server/manual-configuration.md` | Scaffolded | P1 | mcp-server.md | Manual JSON config |
| `docs/guides/mcp-server/transport-modes.md` | Scaffolded | P1 | mcp-server.md | stdio vs HTTP |
| `docs/guides/mcp-server/authentication.md` | Scaffolded | P1 | mcp-server.md | HTTP auth |
| `docs/guides/mcp-server/testing.md` | Scaffolded | P2 | mcp-server.md | Testing the MCP server |
| **Code Generation** | | | | |
| `docs/guides/code-generation/generate-snippets.md` | Scaffolded | P1 | README | vai generate |
| `docs/guides/code-generation/scaffold-projects.md` | Scaffolded | P1 | README | vai scaffold |
| **Benchmarking** | | | | |
| `docs/guides/benchmarking/overview.md` | Scaffolded | P1 | README | Benchmarking overview |
| `docs/guides/benchmarking/embed-benchmark.md` | Scaffolded | P2 | README | Embedding benchmarks |
| `docs/guides/benchmarking/asymmetric-benchmark.md` | Scaffolded | P2 | README | Asymmetric benchmarks |
| `docs/guides/benchmarking/quantization-benchmark.md` | Scaffolded | P2 | README | Quantization benchmarks |
| `docs/guides/benchmarking/cost-benchmark.md` | Scaffolded | P2 | README | Cost benchmarks |
| **Evaluation** | | | | |
| `docs/guides/evaluation/overview.md` | Scaffolded | P1 | README | Eval overview |
| `docs/guides/evaluation/test-sets.md` | Scaffolded | P2 | README | Creating test sets |
| `docs/guides/evaluation/comparing-configs.md` | Scaffolded | P2 | README | Config comparison |
| **Data Lifecycle** | | | | |
| `docs/guides/data-lifecycle/purge-stale.md` | Scaffolded | P2 | README | Purging old data |
| `docs/guides/data-lifecycle/refresh-embeddings.md` | Scaffolded | P2 | README | Re-embedding |
| **Standalone** | | | | |
| `docs/guides/desktop-app.md` | Scaffolded | P2 | README | Electron desktop app |
| `docs/guides/web-playground.md` | Scaffolded | P2 | README | Web playground |

### Models (5 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/models/overview.md` | Scaffolded | P1 | vai models output | Model listing |
| `docs/models/voyage-4-family.md` | Scaffolded | P1 | Voyage AI docs | voyage-4-large, voyage-4-lite |
| `docs/models/domain-specific.md` | Scaffolded | P1 | Voyage AI docs | Code, finance, law, multilingual |
| `docs/models/competitive-landscape.md` | Scaffolded | P2 | New | Comparison with other providers |
| `docs/models/choosing-a-model.md` | Scaffolded | P1 | New | Decision guide |

### API Reference (5 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/api-reference/environment-variables.md` | Done | P0 | README | All env vars |
| `docs/api-reference/mcp-tools.md` | Scaffolded | P0 | mcp-server.md | 11 MCP tools documented |
| `docs/api-reference/mcp-tool-parameters.md` | Scaffolded | P0 | mcp-server.md | Parameter schemas |
| `docs/api-reference/vai-json-schema.md` | Scaffolded | P1 | README | .vai.json schema |
| `docs/api-reference/workflow-schema.md` | Done | P0 | workflow-spec.md | Workflow JSON schema |

### Use Cases (4 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/use-cases/healthcare.md` | Scaffolded | P2 | industry-use-cases.md | Healthcare RAG |
| `docs/use-cases/legal.md` | Scaffolded | P2 | industry-use-cases.md | Legal document search |
| `docs/use-cases/finance.md` | Scaffolded | P2 | industry-use-cases.md | Financial analysis |
| `docs/use-cases/developer-docs.md` | Scaffolded | P1 | industry-use-cases.md | Developer documentation RAG |

### Troubleshooting (4 pages)

| Page | Status | Priority | Source | Notes |
|------|--------|----------|--------|-------|
| `docs/troubleshooting/common-errors.md` | Scaffolded | P1 | New + source | Common error messages |
| `docs/troubleshooting/mcp-troubleshooting.md` | Scaffolded | P1 | mcp-server.md | MCP-specific issues |
| `docs/troubleshooting/connectivity.md` | Scaffolded | P2 | New | MongoDB/API connectivity |
| `docs/troubleshooting/faq.md` | Scaffolded | P2 | New | Frequently asked questions |

## Summary

| Status | Count |
|--------|-------|
| Done (full content) | 17 |
| Scaffolded (needs content) | 86 |
| **Total** | **103** |

| Priority | Done | Scaffolded | Total |
|----------|------|------------|-------|
| P0 | 15 | 13 | 28 |
| P1 | 2 | 38 | 40 |
| P2 | 0 | 35 | 35 |
| **Total** | **17** | **86** | **103** |

## Recommended Content Order

Write remaining P0 pages first, then P1, then P2:

**P0 remaining (13 pages):**
1. `docs/commands/rag-pipeline/pipeline.md` (most-used command)
2. `docs/commands/rag-pipeline/query.md`
3. `docs/commands/embeddings/embed.md`
4. `docs/commands/embeddings/rerank.md`
5. `docs/commands/data-management/ingest.md`
6. `docs/commands/data-management/search.md`
7. `docs/commands/mcp/mcp.md`
8. `docs/commands/mcp/mcp-install.md`
9. `docs/commands/advanced/chat.md`
10. `docs/commands/advanced/workflow-run.md`
11. `docs/guides/chat/overview.md`
12. `docs/guides/chat/setup.md`
13. `docs/guides/mcp-server/overview.md`
14. `docs/guides/mcp-server/automatic-setup.md`
15. `docs/api-reference/mcp-tools.md`
16. `docs/api-reference/mcp-tool-parameters.md`

**Effort estimates:**
- Command pages: ~30 min each (extract from `--help` output + README)
- Guide pages: ~45 min each (adapt from spec docs, add examples)
- API reference pages: ~30 min each (extract schemas from source code)
- Core concept pages: ~20 min each (adapt from explanations.js)
- Use case pages: ~20 min each (adapt from industry-use-cases.md)
