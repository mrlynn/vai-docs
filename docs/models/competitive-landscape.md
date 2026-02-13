---
title: Competitive Landscape
description: How Voyage AI compares to other embedding providers
sidebar_position: 5
---

# Competitive Landscape

Voyage AI models consistently rank at the top of independent embedding benchmarks. Here's how they compare to other providers as of January 2026.

## RTEB Benchmark Scores (NDCG@10)

The RTEB (Retrieval Text Embedding Benchmark) evaluates retrieval quality across 29 datasets.

| Model | Provider | Score | Price/1M tokens |
|-------|----------|-------|-----------------|
| **voyage-4-large** | Voyage AI | **71.41** | $0.12 |
| **voyage-4** | Voyage AI | **70.07** | $0.06 |
| Gemini Embedding 001 | Google | 68.66 | Varies |
| **voyage-4-lite** | Voyage AI | **68.10** | $0.02 |
| Cohere Embed v4 | Cohere | 65.75 | $0.10 |
| OpenAI v3 Large | OpenAI | 62.57 | $0.13 |

## Key Differentiators

### Quality Leadership
`voyage-4-large` leads the RTEB benchmark with a 71.41 score — nearly 3 points ahead of Google's closest competitor and almost 9 points ahead of OpenAI.

### Price-Performance
`voyage-4-lite` at $0.02/1M tokens outperforms OpenAI's large model ($0.13/1M) while costing 85% less.

### Shared Embedding Space
No other provider offers a shared embedding space across model tiers. This unique feature enables asymmetric retrieval — impossible with OpenAI, Cohere, or Google models.

### Domain-Specific Models
Voyage AI offers specialized models for code, finance, and legal domains. While other providers have general-purpose models only, Voyage AI's domain models outperform them on specialized benchmarks.

## View Benchmarks in vai

```bash
vai models --benchmarks
```

## Further Reading

- [Models Overview](./overview) — Full model catalog
- [Voyage 4 Family](./voyage-4-family) — Deep dive into Voyage 4
