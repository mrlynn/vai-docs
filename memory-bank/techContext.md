# Tech Context

## Stack

- Docusaurus `3.9.2`
- React `19`
- TypeScript for config and editor support
- Markdown and MDX for content authoring
- Local search via `@easyops-cn/docusaurus-search-local`

## Relevant Files

- `docusaurus.config.ts`: site config, metadata, navbar, footer, announcement bar
- `sidebars.ts`: sidebar information architecture
- `docs/intro.md`: homepage doc content
- `docs/getting-started/installation.md`: install and prerequisites
- `docs/models/voyage-4-family.md`: family-level model framing
- `docs/commands/embeddings/embed.mdx`: embed reference
- `docs/commands/rag-pipeline/pipeline.md`: pipeline reference
- `docs/commands/tools-and-learning/explain.mdx`: educational topic reference
- `blog/`: release-note posts
- `vai-nano-local-inference-spec.md`: primary nano feature specification in this repo

## Current Constraints

- No docs versioning support is configured
- Existing visible release messaging is stale in multiple places
- Some content is scaffolded, some is already fully written, so updates must preserve local style and page conventions
- The repo already has unrelated uncommitted changes, so edits should be isolated to planning and later docs files

## Documentation Conventions

- concise prose
- code examples in fenced blocks with explicit language
- Docusaurus admonitions for key callouts
- command pages follow Synopsis, Description, Options, Examples, Related Commands
- no inline imports in code files
- no em dash usage in prose, per existing style guidance
