---
title: Legal & Compliance
description: Turn your contract library into a searchable knowledge base with voyage-law-2 and MongoDB Atlas Vector Search.
sidebar_position: 3
---

# Turn Your Contract Library Into a Searchable Knowledge Base

**Model:** `voyage-law-2` · Semantic search across legal documents, powered by a model trained on legal text.

## Problem

Legal professionals spend 20–40% of their time searching for information. The challenge isn't that the information doesn't exist — it's that legal language is full of synonyms that keyword search can't bridge. "Indemnification," "hold harmless," and "defense and indemnity" all mean similar things, but a keyword search for one misses the others.

Multiply this across hundreds of contracts, policies, and compliance documents, and finding the right clause becomes a significant bottleneck.

## Solution

`vai pipeline` with `voyage-law-2` — a Voyage AI model specifically trained on legal text — processes your contract library into semantically searchable chunks stored in MongoDB Atlas Vector Search. Because the model understands legal terminology and relationships, it finds relevant clauses even when the wording differs from your query.

## Sample Documents

We provide 15 sample legal documents (~39KB total) representing a realistic contract and compliance library:

| Document | Description |
|---|---|
| `master-services-agreement` | MSA with standard commercial terms |
| `saas-subscription-agreement` | SaaS subscription terms |
| `data-processing-addendum` | DPA for data processing obligations |
| `nda-mutual` | Mutual non-disclosure agreement |
| `nda-unilateral` | One-way non-disclosure agreement |
| `employment-agreement` | Standard employment agreement |
| `independent-contractor` | Independent contractor agreement |
| `privacy-policy` | Company privacy policy |
| `acceptable-use-policy` | Acceptable use policy |
| `ip-assignment-agreement` | Intellectual property assignment |
| `gdpr-compliance-summary` | GDPR compliance overview |
| `ccpa-compliance-summary` | CCPA compliance overview |
| `soc2-policy-overview` | SOC 2 policy summary |
| `limitation-of-liability` | Limitation of liability provisions |
| `force-majeure-clauses` | Force majeure clause collection |

[Download sample documents](https://vai.mlynn.org/use-cases/legal/sample-docs/sample-docs.zip)

## Walkthrough

### 1. Install vai

```bash
npm install -g voyageai-cli
```

### 2. Configure credentials

```bash
vai configure
```

### 3. Download and extract sample docs

Download the sample documents and extract them to a `sample-docs/` directory.

### 4. Run the pipeline

```bash
vai pipeline ./sample-docs/ \
  --model voyage-law-2 \
  --db legal_demo \
  --collection legal_knowledge \
  --create-index
```

This processes all 15 documents into **142 chunks**, generates embeddings, stores them in MongoDB Atlas, and creates a vector search index.

### 5. Search your contracts

```bash
vai search "data deletion obligations" \
  --db legal_demo \
  --collection legal_knowledge
```

### 6. Explore in the playground

```bash
vai playground --db legal_demo --collection legal_knowledge
```

## Example Queries

### "What are our obligations if a customer requests deletion of their data?"

| Source | Score |
|---|---|
| `gdpr-compliance-summary` | 95% |
| `ccpa-compliance-summary` | 91% |
| `data-processing-addendum` | 88% |

The search understands that "deletion of data" relates to GDPR's right to erasure, CCPA's right to delete, and the data processing addendum's obligations — even though each document uses different terminology.

### "Compare the indemnification provisions across our contracts"

| Source | Score |
|---|---|
| `independent-contractor` | 93% |
| `master-services-agreement` | 90% |
| `saas-subscription-agreement` | 85% |

The model correctly surfaces all contracts containing indemnification clauses, regardless of whether they use "indemnify," "hold harmless," or "defend and indemnify."

## Model Comparison

| Model | Relevance Score | Notes |
|---|---|---|
| **`voyage-law-2`** | **95%** | **Recommended** — trained specifically on legal text |
| `voyage-4-large` | 87% | Good general-purpose alternative |
| `voyage-4-lite` | 78% | Misses nuanced legal terminology |

`voyage-law-2` significantly outperforms general-purpose models on legal content because it understands the semantic relationships between legal terms, clause structures, and regulatory concepts.

## Scaling to Production

### Privilege and confidentiality

Legal documents are sensitive. Ensure your MongoDB Atlas deployment meets your organization's security and access control requirements. Use Atlas's role-based access control to restrict who can query the collection.

### Contract volume

Large organizations manage thousands of contracts. `vai pipeline` handles bulk processing efficiently. Consider organizing documents by type or client and using separate collections or metadata filtering to scope searches.

### Metadata filtering

Use MongoDB Atlas metadata filters to narrow searches by contract type, counterparty, effective date, or jurisdiction. This is critical for large contract libraries where a broad semantic search may return too many results.

### Keeping docs current

Re-run the pipeline when contracts are amended or new agreements are executed. Automate this as part of your contract lifecycle management workflow.

### Conversational interface

Use `vai chat` for natural language interaction with your contract library:

```bash
vai chat --db legal_demo --collection legal_knowledge
```

## Next Steps

- **`vai playground`** — Interactive web UI for exploring your indexed documents
- **`vai chat`** — Conversational interface over your knowledge base
- **[Developer Documentation](./developer-docs)** — Engineering docs with `voyage-code-3`
- **[Healthcare & Clinical](./healthcare)** — Clinical knowledge base with `voyage-4-large`
- **[Financial Services](./finance)** — Financial document search with `voyage-finance-2`
