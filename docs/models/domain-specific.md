---
title: Domain-Specific Models
description: Specialized models for code, finance, and legal content
sidebar_position: 4
---

# Domain-Specific Models

Voyage AI offers specialized embedding models fine-tuned for specific domains. These models outperform general-purpose models on domain-specific retrieval tasks.

## Available Models

### voyage-code-3

| Feature | Details |
|---------|---------|
| **Domain** | Code and technical documentation |
| **Context** | 32K tokens |
| **Dimensions** | 256, 512, 1024 (default), 2048 |
| **Price** | $0.18/1M tokens |

Best for: source code retrieval, API documentation search, technical Q&A, code-to-code similarity.

```bash
vai embed "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }" \
  --model voyage-code-3 --input-type document
```

### voyage-finance-2

| Feature | Details |
|---------|---------|
| **Domain** | Financial documents |
| **Context** | 32K tokens |
| **Dimensions** | 1024 |
| **Price** | $0.12/1M tokens |

Best for: SEC filings, earnings reports, financial news, investment research.

### voyage-law-2

| Feature | Details |
|---------|---------|
| **Domain** | Legal documents |
| **Context** | 16K tokens |
| **Dimensions** | 1024 |
| **Price** | $0.12/1M tokens |

Best for: contracts, case law, legal briefs, regulatory documents.

## When to Use Domain-Specific vs. General-Purpose

**Use domain-specific** when:
- 80%+ of your corpus is in that domain
- Retrieval precision in that domain is critical
- You're building a domain-focused application

**Use general-purpose** (`voyage-4` family) when:
- Your content spans multiple domains
- You need the shared embedding space for asymmetric retrieval
- Cost optimization via model mixing is important

## Tips

- Domain-specific models do **not** share an embedding space with Voyage 4 models. You can't mix `voyage-code-3` documents with `voyage-4-large` queries.
- For mixed-domain corpora, use `voyage-4-large` — it handles code, finance, and legal content well, just not as well as the specialized models in their specific domains.

## Further Reading

- [Models Overview](./overview) — Full model catalog
- [Choosing a Model](./choosing-a-model) — Decision guide
