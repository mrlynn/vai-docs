# Core Concepts Overview

This section covers the fundamental concepts and technologies that power Vector AI's embedding and retrieval system. Understanding these concepts will help you make informed decisions about configuration, optimization, and best practices.

## Key Concepts

### Embeddings

[Embeddings](../core-concepts/embeddings.md) are numerical representations of text (or other modalities like images) that capture semantic meaning in a vector space. Vector AI uses state-of-the-art embedding models to convert content into these vectors, enabling similarity search and understanding of context.

### Shared Embedding Space

[Shared Embedding Space](../core-concepts/shared-embedding-space.md) refers to the unified vector space where different types of content (text documents, images, etc.) are mapped so that semantically similar items are close together regardless of modality. This enables powerful cross-modal search capabilities.

### Multimodal Capabilities

[Multimodal Embeddings](../core-concepts/multimodal/multimodal-embeddings.md) allow Vector AI to process and index content from multiple modalities simultaneously, while [Modality Gap](../core-concepts/multimodal/modality-gap.md) describes the challenge of bridging different data types in a shared space.

### RAG (Retrieval-Augmented Generation)

[Vector Search RAG](../core-concepts/rag.md) combines retrieval from your vector database with LLM generation, enabling applications that can answer questions using your proprietary data while maintaining context and relevance.

### Vector Search & Similarity

- [Vector Search](../core-concepts/vector-search.md) uses proximity in embedding space to find similar items efficiently at scale
- [Cosine Similarity](../core-concepts/cosine-similarity.md) is the primary metric for measuring similarity between vectors

### Advanced Retrieval Techniques

- [Two-Stage Retrieval](../core-concepts/two-stage-retrieval.md) implements a retrieve-and-rerank approach for improved accuracy
- [Reranking](../core-concepts/reranking.md) re-orders initial search results to prioritize the most relevant items

### Model Efficiency

[Quantization](../core-concepts/quantization.md) reduces model size and computational requirements while maintaining accuracy, enabling faster inference and lower costs.

### Architecture Patterns

[Machine Learning Mixture of Experts](../core-concepts/mixture-of-experts.md) describes an architecture where different sub-models handle different tasks or data types, improving overall system performance and specialization.

## Quick Reference

| Concept | Purpose | Use Case |
|---------|---------|----------|
| Embeddings | Convert content to vectors | Indexing all content types |
| Shared Space | Unify modalities | Cross-modal search |
| RAG | Augment LLMs with data | Question answering systems |
| Two-Stage | Improve relevance | High-accuracy retrieval |
| Quantization | Reduce costs | Production deployments |

## Next Steps

- [Getting Started](../getting-started/installation.md) to install and configure Vector AI
- [Guides](../guides/chat/overview.md) for practical implementation examples
- [Commands](../commands/project-setup/init.md) reference for all available operations
