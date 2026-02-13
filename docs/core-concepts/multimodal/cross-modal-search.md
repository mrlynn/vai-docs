---
title: Cross-Modal Search
description: Searching across text, images, and video
sidebar_position: 2
---

# Cross-Modal Search

Cross-modal search uses multimodal embeddings to find content in one modality using a query from another — for example, finding images using a text description, or finding documents related to an uploaded image.

## How It Works

When text and images share the same embedding space, a text query like "sunset over the ocean" produces a vector that's close to images of sunsets. The vector search doesn't know or care about modalities — it just finds the nearest vectors.

## Examples

| Query Modality | Result Modality | Example |
|---------------|-----------------|---------|
| Text → Images | "red sports car" finds car photos |
| Image → Text | Upload photo, find related articles |
| Text → Video | "cooking pasta" finds video clips |
| Image → Images | Upload photo, find visually similar images |

## Key Consideration: Modality Gap

There's typically a small but measurable gap between text and image embeddings — text vectors cluster together, and image vectors cluster together, with a gap between them. This means:

- **Within-modality** similarity scores are higher (text-to-text, image-to-image)
- **Cross-modal** similarity scores are somewhat lower (text-to-image)

This is normal and expected. See [Modality Gap](./modality-gap) for details.

## Further Reading

- [Multimodal Embeddings](./multimodal-embeddings) — Foundation concepts
- [Modality Gap](./modality-gap) — Understanding the cross-modal distance
- [Multimodal RAG](./multimodal-rag) — Building RAG with mixed content
