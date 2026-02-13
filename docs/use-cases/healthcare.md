---
title: Healthcare & Clinical
description: Build a clinical knowledge base with semantic search powered by voyage-4-large and MongoDB Atlas Vector Search.
sidebar_position: 2
---

# Build a Clinical Knowledge Base in 20 Minutes

**Model:** `voyage-4-large` · From clinical guidelines to searchable AI, using your own infrastructure.

## Problem

Clinical documentation is overwhelming. Guidelines update quarterly, drug interaction databases span thousands of pages, and protocols vary by department. When a clinician searches for "diabetes kidney treatment," they need to find documents about "glycemic management in chronic kidney disease" — but keyword search won't make that connection.

The stakes are high. Missed information in a clinical context isn't just inconvenient — it affects patient outcomes.

## Solution

`vai pipeline` with `voyage-4-large` (Voyage AI's highest-accuracy general-purpose model) processes clinical documents into semantically searchable chunks stored in MongoDB Atlas Vector Search. There is no healthcare-specific embedding model, so `voyage-4-large` is the recommended choice for its superior accuracy on complex, domain-specific text.

## Sample Documents

We provide 15 sample clinical documents (~34KB total) representing a realistic clinical knowledge base:

| Document | Description |
|---|---|
| `diabetes-management` | Diabetes management guidelines |
| `diabetes-renal` | Glycemic management in chronic kidney disease |
| `metformin-reference` | Metformin prescribing reference |
| `sglt2-inhibitors` | SGLT2 inhibitor class overview |
| `hypertension-guidelines` | Hypertension treatment guidelines |
| `ace-inhibitor-reference` | ACE inhibitor prescribing reference |
| `heart-failure-protocol` | Heart failure management protocol |
| `anticoagulation-guide` | Anticoagulation therapy guide |
| `sepsis-bundle` | Sepsis recognition and treatment bundle |
| `pain-management` | Pain management protocols |
| `drug-interactions-cardiac` | Cardiac drug interactions |
| `ckd-staging` | Chronic kidney disease staging criteria |
| `insulin-protocols` | Insulin dosing protocols |
| `discharge-checklist` | Patient discharge checklist |
| `falls-prevention` | Falls prevention protocol |

[Download sample documents](https://vai.mlynn.org/use-cases/healthcare/sample-docs/sample-docs.zip)

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
  --model voyage-4-large \
  --db healthcare_demo \
  --collection clinical_knowledge \
  --create-index
```

This processes all 15 documents into **118 chunks**, generates embeddings, stores them in MongoDB Atlas, and creates a vector search index.

### 5. Search your knowledge base

```bash
vai search "medications to avoid with kidney problems" \
  --db healthcare_demo \
  --collection clinical_knowledge
```

### 6. Explore in the playground

```bash
vai playground --db healthcare_demo --collection clinical_knowledge
```

## Example Queries

### "What medications should I avoid in a patient with kidney problems?"

| Source | Score |
|---|---|
| `metformin-reference` | 94% |
| `ckd-staging` | 91% |
| `ace-inhibitor-reference` | 87% |

The search understands that "kidney problems" relates to renal function, CKD staging, and drug dosing adjustments — surfacing the metformin reference (which requires renal dose adjustment) and the CKD staging criteria.

### "How do I manage blood sugar in someone who cannot take metformin?"

| Source | Score |
|---|---|
| `diabetes-management` | 93% |
| `diabetes-renal` | 90% |
| `sglt2-inhibitors` | 86% |

The query never mentions "SGLT2 inhibitors" or "glycemic management," but semantic search correctly identifies alternative diabetes treatments and renal-specific glycemic guidelines.

## Model Comparison

| Model | Relevance Score | Notes |
|---|---|---|
| **`voyage-4-large`** | **95%** | **Recommended** — highest accuracy general-purpose model |
| `voyage-4-lite` | 84% | Lower cost, reduced accuracy on clinical terminology |
| `voyage-code-3` | 72% | Optimized for code, not clinical text |

Since there is no healthcare-specific Voyage AI model, `voyage-4-large` is the clear choice. Its accuracy on domain-specific terminology significantly outperforms lighter alternatives.

## Scaling to Production

### HIPAA considerations

MongoDB Atlas offers HIPAA-eligible clusters with a Business Associate Agreement (BAA). When working with protected health information (PHI), deploy your Atlas cluster on a HIPAA-eligible tier and ensure your Voyage AI usage complies with your organization's data handling policies.

### Document volume

Clinical knowledge bases grow quickly. A typical hospital system might have thousands of guidelines, protocols, and formulary documents. `vai pipeline` handles large document sets efficiently — run it in batches or against entire directory trees.

### Keeping guidelines current

Clinical guidelines update frequently. Automate re-indexing when source documents change to ensure your knowledge base reflects the latest evidence-based recommendations.

### Metadata filtering

Use MongoDB Atlas metadata filters to scope searches by department, document type, or effective date. This is especially useful when guidelines have superseded versions.

### Conversational interface

Use `vai chat` for a conversational interface over your clinical knowledge base:

```bash
vai chat --db healthcare_demo --collection clinical_knowledge
```

## Next Steps

- **`vai playground`** — Interactive web UI for exploring your indexed documents
- **`vai chat`** — Conversational interface over your knowledge base
- **[Developer Documentation](./developer-docs)** — Engineering docs with `voyage-code-3`
- **[Legal & Compliance](./legal)** — Contract search with `voyage-law-2`
- **[Financial Services](./finance)** — Financial document search with `voyage-finance-2`
