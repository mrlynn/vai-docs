---
title: Financial Services
description: Semantic search across financial documents with voyage-finance-2 and MongoDB Atlas Vector Search.
sidebar_position: 4
---

# Semantic Search Across Financial Documents, In Minutes

**Model:** `voyage-finance-2` · Earnings calls, risk reports, and policy docs, searchable with a model trained on financial text.

## Problem

Financial analysis requires synthesizing information across earnings call transcripts, 10-K filings, risk reports, and internal policy documents. The challenge is compounded by financial jargon — when management mentions "headwinds," they mean challenges; "color" means additional detail; "constructive" means cautiously optimistic.

Keyword search can't decode this language. Searching for "challenges" won't find paragraphs about "headwinds," and searching for "risk" returns thousands of irrelevant hits across every financial document.

## Solution

`vai pipeline` with `voyage-finance-2` — a Voyage AI model specifically trained on financial text — processes your financial documents into semantically searchable chunks stored in MongoDB Atlas Vector Search. The model understands financial terminology, earnings call conventions, and regulatory language.

## Sample Documents

We provide 15 sample financial documents (~39KB total) representing a realistic financial document set:

| Document | Description |
|---|---|
| `q3-2025-earnings-call` | Q3 2025 earnings call transcript |
| `q4-2025-earnings-call` | Q4 2025 earnings call transcript |
| `q3-2025-10q-summary` | Q3 2025 10-Q filing summary |
| `annual-report-summary` | Annual report summary |
| `risk-committee-report` | Risk committee report |
| `credit-policy` | Credit risk policy |
| `market-risk-framework` | Market risk framework |
| `interest-rate-analysis` | Interest rate sensitivity analysis |
| `liquidity-policy` | Liquidity management policy |
| `compliance-aml-summary` | AML compliance summary |
| `vendor-risk-assessment` | Vendor risk assessment |
| `capital-allocation-memo` | Capital allocation memo |
| `esg-report-summary` | ESG report summary |
| `fintech-partnership-memo` | Fintech partnership evaluation |
| `regulatory-change-tracker` | Regulatory change tracker |

[Download sample documents](https://vai.mlynn.org/use-cases/finance/sample-docs/sample-docs.zip)

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
  --model voyage-finance-2 \
  --db finance_demo \
  --collection financial_knowledge \
  --create-index
```

This processes all 15 documents into **156 chunks**, generates embeddings, stores them in MongoDB Atlas, and creates a vector search index.

### 5. Search your documents

```bash
vai search "margin compression outlook" \
  --db finance_demo \
  --collection financial_knowledge
```

### 6. Explore in the playground

```bash
vai playground --db finance_demo --collection financial_knowledge
```

## Example Queries

### "What did management say about margin compression?"

| Source | Score |
|---|---|
| `q3-2025-earnings-call` | 94% |
| `q4-2025-earnings-call` | 89% |
| `annual-report-summary` | 82% |

The model understands that "margin compression" relates to discussions of profitability pressure, cost headwinds, and net interest margin — surfacing the relevant earnings call sections even when management used different phrasing.

### "What are our biggest risk exposures right now?"

| Source | Score |
|---|---|
| `risk-committee-report` | 93% |
| `market-risk-framework` | 87% |
| `credit-policy` | 81% |

The search connects "risk exposures" to specific risk categories discussed across multiple documents, rather than just matching the word "risk."

## Model Comparison

| Model | Relevance Score | Notes |
|---|---|---|
| **`voyage-finance-2`** | **94%** | **Recommended** — trained specifically on financial text |
| `voyage-4-large` | 86% | Decent general-purpose alternative |
| `voyage-4-lite` | 77% | Misses financial jargon and context |

`voyage-finance-2` outperforms general-purpose models because it understands the semantic relationships in financial language — connecting "headwinds" to "challenges," "constructive" to "cautiously optimistic," and "color" to "additional detail."

## Scaling to Production

### Data sensitivity (MNPI)

Financial documents often contain material non-public information (MNPI). Ensure your MongoDB Atlas deployment has appropriate access controls, encryption at rest, and audit logging. Restrict collection access to authorized personnel only.

### Scale projections

A mid-size financial institution might index thousands of documents — quarterly filings, board reports, risk assessments, and compliance memos. `vai pipeline` handles this volume efficiently. Expect roughly 10 chunks per page of content.

### Metadata filtering

Use MongoDB Atlas metadata filters to scope searches by document type, reporting period, business unit, or classification level. This is essential when analysts need to search within a specific quarter or document category.

### Real-time ingestion

For time-sensitive documents like earnings call transcripts, integrate `vai pipeline` into your document ingestion workflow so new content is searchable within minutes of publication.

### Conversational interface

Use `vai chat` for natural language interaction with your financial knowledge base:

```bash
vai chat --db finance_demo --collection financial_knowledge
```

## Next Steps

- **`vai playground`** — Interactive web UI for exploring your indexed documents
- **`vai chat`** — Conversational interface over your knowledge base
- **[Developer Documentation](./developer-docs)** — Engineering docs with `voyage-code-3`
- **[Healthcare & Clinical](./healthcare)** — Clinical knowledge base with `voyage-4-large`
- **[Legal & Compliance](./legal)** — Contract search with `voyage-law-2`
