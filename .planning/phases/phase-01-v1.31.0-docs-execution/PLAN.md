# Phase Plan: v1.31.0 Docs Execution

## Phase Goal

Implement the full `v1.31.0` documentation update for nano/local inference and release normalization in the `vai-docs` site.

## Scope

- update release messaging
- update existing docs pages
- add new nano/local inference docs pages
- add release-note blog content
- validate the site

## Task List

### Task 1: Normalize high-visibility release messaging

Files:

- `docusaurus.config.ts`
- `docs/intro.md`
- `docs/getting-started/installation.md`

Definition of done:

- the site banner and opening docs surfaces clearly present `v1.31.0`
- installation and intro content reflect local inference as a first-class path

### Task 2: Update core reference pages for nano

Files:

- `docs/models/voyage-4-family.md`
- `docs/commands/embeddings/embed.mdx`
- `docs/commands/rag-pipeline/pipeline.md`
- `docs/commands/tools-and-learning/explain.mdx`

Definition of done:

- references to nano are concrete, accurate, and discoverable
- `--local` and related usage is documented where appropriate
- the shared-space story is clear

### Task 3: Add dedicated nano/local inference docs

Candidate outputs:

- `docs/guides/local-inference/overview.md`
- `docs/guides/local-inference/setup-and-usage.md`

Implementation notes:

- exact filenames may change to fit the final sidebar taxonomy
- pages should cover setup, commands, bridge behavior, tradeoffs, and migration to API-backed models

Definition of done:

- users can learn local inference without reading the spec file
- pages are linked from navigation and from related reference docs

### Task 4: Publish release notes

Files:

- new blog post under `blog/`

Definition of done:

- release note announces `v1.31.0`
- blog content links to the new or updated nano docs
- announcement bar link points to the correct release content if appropriate

### Task 5: Normalize remaining release references

Approach:

- search all live docs surfaces for stale current-release claims
- preserve archival meaning where content is intentionally historical
- update anything that presents an outdated release as the current state

Definition of done:

- no prominent stale "current release" references remain

### Task 6: Validate and document outcomes

Validation:

- run lints or typecheck relevant to the docs repo
- verify recently edited files for diagnostics

Definition of done:

- no introduced doc config or link issues are obvious
- Memory Bank `activeContext.md` and `progress.md` are updated to reflect implementation status

## Risks and Checks

- Check that new pages fit the existing sidebar without overloading the taxonomy
- Check that blog slugs and banner links match real routes
- Check that release normalization does not erase useful historical context
