---
title: Modality Gap
description: Understanding distance between text and image embeddings
sidebar_position: 3
---

# Modality Gap

The modality gap is the systematic distance between embeddings of different content types (text vs. images) in a shared multimodal embedding space. Even when a text description perfectly matches an image, their embeddings won't be identical — there's always a small offset between the modalities.

## Why It Exists

Text and images are fundamentally different input types processed by different encoder architectures. While multimodal models align these representations, the alignment is imperfect — each modality's encoder produces vectors in slightly different regions of the space.

## Practical Impact

- **Within-modality** comparisons (text-to-text, image-to-image) produce higher similarity scores
- **Cross-modal** comparisons (text-to-image) produce somewhat lower scores, even for perfect matches
- Don't compare absolute scores across modality types — a 0.7 text-to-image score may represent a strong match

## Mitigation

- Use **relative ranking** rather than absolute thresholds for cross-modal search
- **Reranking** can help re-score cross-modal results more accurately
- Consider separate score thresholds for within-modality vs. cross-modal queries

## Further Reading

- [Multimodal Embeddings](./multimodal-embeddings) — Foundation concepts
- [Cross-Modal Search](./cross-modal-search) — Practical cross-modal retrieval
