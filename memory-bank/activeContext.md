# Active Context

## Current Focus

Complete Phase 1 execution for `vai-docs` `v1.31.0`, covering `voyage-4-nano` local inference docs, release normalization, and launch messaging.

## Confirmed Decisions

- Release target to document as current: `v1.31.0`
- Nano capability is already implemented and should be documented as shipped
- Scope includes:
  - updating existing docs
  - adding new nano/local inference docs pages
  - creating a release-note blog post
  - updating homepage, banner, and installation messaging
  - normalizing release references across the site
- The Python bridge is user-facing and should be documented explicitly
- A formal GSD planning structure has been created in-repo

## Working Assumptions

- `vai-nano-local-inference-spec.md` is the source of truth for the feature story and expected CLI surface
- the docs site should not introduce Docusaurus versioned docs as part of this work
- release normalization means updating all places that imply a stale current release, while preserving historical blog content where appropriate

## Expected Doc Targets

- site entry points: `docs/intro.md`, `docs/getting-started/installation.md`, `docusaurus.config.ts`
- reference pages: `docs/models/voyage-4-family.md`, `docs/commands/embeddings/embed.mdx`, `docs/commands/rag-pipeline/pipeline.md`, `docs/commands/tools-and-learning/explain.mdx`
- new local inference docs pages under `docs/guides/local-inference/`
- new `vai nano` command page under `docs/commands/embeddings/nano.md`
- release note blog post under `blog/`
- `sidebars.ts` if new docs pages need navigation entries

## Next Steps

1. Review the new nano/local inference docs for any wording or IA refinements
2. Decide whether to extend the local-first framing into additional secondary pages such as use cases and troubleshooting
3. Continue future release documentation from the existing `.planning` structure
