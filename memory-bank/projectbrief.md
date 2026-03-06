# Project Brief

## Project

`vai-docs` is the documentation site for `voyageai-cli` (`vai`), a CLI toolkit for building semantic search and RAG workflows with Voyage AI embeddings and MongoDB Atlas Vector Search.

The site is built with Docusaurus and serves as the canonical public documentation for installation, command reference, guides, models, troubleshooting, and release announcements.

## Current Objective

Launch a documentation initiative for `vai` `v1.31.0` focused on the new `voyage-4-nano` local inference capability.

This work must:

- document `voyage-4-nano` as a major new user-facing capability
- explain the lightweight Python bridge as part of the user story
- update existing docs that now have stale assumptions about API-key-first onboarding
- add new nano and local inference pages
- publish a release-note blog post for `v1.31.0`
- normalize visible release/version messaging across the docs site

## Scope Boundaries

In scope:

- docs updates in `docs/`
- new docs pages
- sidebar updates if needed
- homepage, install, and banner messaging
- blog release notes
- planning artifacts for delivery

Out of scope:

- changes to the `voyageai-cli` implementation itself
- Docusaurus versioned docs, since the site currently uses a single live docs tree
- introducing a new site architecture unless required by the documentation work

## Success Criteria

- `v1.31.0` is the clearly presented current release across the site
- nano/local inference docs are comprehensive and discoverable
- onboarding reflects both API-based and zero-API-key local workflows
- users can understand when and why to use nano, how local inference works, and how it connects to the broader Voyage 4 family
- the docs repo has planning context that future sessions can resume from without rediscovery
