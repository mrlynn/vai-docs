# System Patterns

## Documentation Architecture

The site is a Docusaurus 3 documentation app with a single live docs tree.

Key patterns:

- `docs/` holds source content for all documentation pages
- `blog/` holds release notes and announcements
- `sidebars.ts` defines discoverability and navigation structure
- `docusaurus.config.ts` contains global site messaging such as the announcement bar
- `static/img/` contains brand and release assets

There is no Docusaurus docs versioning configured. Release alignment is therefore handled through content normalization rather than versioned doc snapshots.

## Content Update Pattern

For major feature launches:

1. Update site-wide entry points:
   - homepage
   - installation
   - announcement banner
2. Update command and model reference pages
3. Add focused deep-dive guides for the new capability
4. Publish a blog post for the release
5. Normalize old release references that imply a stale "current" version

## Nano Documentation Pattern

The nano feature should be documented across three layers:

- capability layer: what nano is, why it matters, how local inference changes onboarding
- reference layer: command flags, setup flow, model behavior, tradeoffs
- release layer: what shipped in `v1.31.0` and what users should try first

## Messaging Pattern

The new docs should consistently reinforce:

- local inference is a user-facing capability
- `voyage-4-nano` shares embedding space with the Voyage 4 family
- the lightweight Python bridge is part of the implementation and onboarding story
- local-first does not replace API workflows, it complements them

## Planning Pattern

This repo previously had no Memory Bank or `.planning` structure. Planning artifacts should now capture:

- current release focus
- page targets
- sequencing
- risks and dependencies
- completion status
