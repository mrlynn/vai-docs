# Product Context

## Why This Project Exists

`vai` lowers the barrier to building semantic search and RAG workflows with Voyage AI and MongoDB Atlas. The docs site exists to make that value legible, actionable, and easy to adopt.

The `v1.31.0` nano release changes the onboarding story in a meaningful way. Users no longer need to start with a Voyage API key to experience the product. They can install `vai`, set up `voyage-4-nano`, embed locally, and then grow into API-backed production usage later.

## User Problem

Before nano, the docs largely implied a cloud-first setup:

- install `vai`
- configure a Voyage API key
- configure MongoDB
- start embedding and querying

With nano, that framing is incomplete. Developers now need clear guidance on:

- what nano is
- how local inference works
- what the Python bridge does
- how to set up local inference
- how local and API workflows relate
- when to choose nano versus other Voyage 4 models

## User Experience Goals

- Make local inference feel first-class, not an advanced footnote
- Preserve the existing CLI mental model where possible
- Explain the Python bridge honestly without making the product feel complex
- Emphasize the "embed locally, scale globally" story and shared embedding space
- Ensure installation and homepage messaging match the current release reality

## Content Outcome Goals

- Users should discover nano quickly from the homepage, installation flow, model docs, and command docs
- Existing users should understand what changed in `v1.31.0`
- Release messaging should be consistent everywhere a version is shown
- The docs should support both narrative learning and direct command lookup
