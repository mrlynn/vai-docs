---
title: Cost Optimizer Demo
description: Prove asymmetric retrieval savings on your data
sidebar_position: 1
---

# Cost Optimizer Demo

The **Cost Optimizer** demo teaches a fundamental truth about Voyage AI's shared embedding space: **you can embed documents with an expensive model once, then query with a cheap model forever** — without losing retrieval quality.

This demo proves it empirically on realistic data, then projects your savings at your scale.

## Why This Matters

Vector search costs scale with the number of queries, not documents. At enterprise scale:

- **Symmetric approach** (same model for indexing & queries): $222K/year
- **Asymmetric approach** (large for docs, lite for queries): $15K/year
- **Savings: $207K/year (93.2% reduction)**

This works because Voyage's models share an embedding space — a query embedded with `voyage-4-lite` can be compared against documents embedded with `voyage-4-large` with nearly identical retrieval results.

## Running the Demo

### Via CLI

```bash
vai demo cost-optimizer
```

This walks you through the entire flow interactively:
1. Ingest 65 sample documents and embed with `voyage-4-large`
2. Run example queries with both `voyage-4-large` and `voyage-4-lite`
3. Compare results and show cost projections
4. Export analysis to Markdown or JSON

Options:

```bash
vai demo cost-optimizer --no-pause    # Skip Enter prompts (good for scripting)
```

### Via Web Playground

```bash
vai playground
```

Then navigate to the **Optimize** tab.

**Workflow:**
1. Click **Get Started**
2. Configure database/collection (defaults: `vai_demo.cost_optimizer_demo`)
3. Click **Run Analysis**
4. Review educational cards explaining each metric
5. See cost projections for your scale (1M docs, 50M queries/month)

### Via Desktop App

```bash
vai app
```

Then navigate to **Optimize** tab in the built-in playground. Same workflow as web playground, but integrated into the desktop experience.

## How It Works

### 1. Data Ingestion

The demo embeds 65 realistic sample documents (SaaS API documentation across 6 categories):

- **Auth** — 12 docs (authentication, tokens, sessions)
- **Endpoints** — 15 docs (REST API routes, parameters)
- **SDKs** — 10 docs (client libraries, installation)
- **Database** — 10 docs (data modeling, constraints)
- **Errors** — 8 docs (error codes, troubleshooting)
- **Deployment** — 10 docs (infrastructure, scaling)

Each document is embedded with `voyage-4-large` (1024 dimensions) and stored in MongoDB Atlas with a vector search index.

### 2. Query Comparison

The demo runs 10 example queries against the corpus using both models:

**Example queries:**
- "How do I authenticate with an API key?"
- "What database constraints apply to this schema?"
- "How should I handle rate limits?"

For each query:
- **voyage-4-large**: expensive, high-quality embeddings
- **voyage-4-lite**: cheap, fast embeddings

Both retrieve the top-5 matching documents and calculate:
- **Recall @ 5**: % of large-model results that lite-model also found
- **Average relevance score**: mean score of top-5 hits
- **Token cost**: how much this query costs to run

### 3. Cost Projection

The demo projects costs at enterprise scale:

**Assumptions:**
- 1M documents in corpus
- 50M queries per month (1.6M/day)
- Shared embedding space (lite queries work on large-indexed docs)

**Calculations:**
- **One-time indexing cost**: 1M docs × voyage-4-large cost
- **Monthly query cost**: 50M queries × model cost
- **Annual total**: (indexing + 12 × monthly queries)

**Models compared:**
- `voyage-4-large`: $2 per 1M embedding tokens (~1.3 tokens per word)
- `voyage-4-lite`: $0.02 per 1M embedding tokens (100x cheaper)

### 4. Educational Cards

The UI displays "Why this matters" callouts explaining:

- **Shared Embedding Space**: Why lite can query large-indexed docs
- **Recall @ 5**: What it means and why >90% is excellent
- **Asymmetric Retrieval Trade-offs**: When symmetric makes sense, when asymmetric wins
- **Token Economics**: How token count drives cost, not document size

## Understanding the Results

### Recall @ 5: What's Good?

**Recall @ 5 = 100%**: Both models find identical top-5 results.  
**Recall @ 5 = 80%**: Lite misses 1 out of 5 results large found.  
**Recall @ 5 > 90%**: Excellent for asymmetric retrieval.

Why? Because:
- You're often displaying 5-10 results anyway
- Even if lite finds results in slightly different order, top results overlap
- Missing 1-2 out of 5 is often acceptable for 93% cost savings

### Token Cost vs Query Cost

The demo tracks both:
- **Tokens**: Actual embedding vector operations
- **Dollar cost**: Voyage pricing applied to token count

**Example:**
- Query "How do I authenticate?" → 5 tokens with lite
- 50M queries/month × 5 tokens = 250M tokens
- 250M tokens × $0.02 / 1M = $5K/month for queries alone

With symmetric (large) approach: $37K/month. That's the $207K/year difference.

### Scale Sensitivity

The demo shows how cost savings scale:

| Scale | Symmetric/Year | Asymmetric/Year | Savings |
|-------|---|---|---|
| 100K docs, 5M queries | $22K | $1.5K | 93% |
| 1M docs, 50M queries | $222K | $15K | 93% |
| 10M docs, 500M queries | $2.2M | $150K | 93% |

The **93% savings ratio holds constant** because it's driven by the 100x cost difference between voyage-4-large and voyage-4-lite.

## When to Use Asymmetric Retrieval

### ✅ Use Asymmetric When:

- Queries vastly outnumber documents (10:1 ratio or higher)
- Recall @ 5 or @ 10 is sufficient (top results matter most)
- You can tolerate occasional misses in top-10 for massive cost savings
- Your corpus is stable (re-indexing happens rarely)

**Example**: Search across 1M customer help articles. Customers search 50M times/month. 93% cost savings = ship it.

### ❌ Use Symmetric When:

- Documents and queries are balanced (similar volume)
- You need perfect recall (missing any result is unacceptable)
- Corpus changes frequently (re-embedding documents is expensive anyway)
- Your scale is small enough that cost savings don't matter

**Example**: RAG system for 100 internal docs queried 1K times/month. Cost difference is negligible; keep it simple with one model.

## Integration with Your Data

The demo uses sample data, but the pattern works with any corpus:

### Option 1: Run on Your Data (via CLI)

```bash
vai optimize --db my_db --collection my_docs
```

This scans your existing collection, runs the same analysis, and projects *your* savings.

### Option 2: Use the Web Playground

The Optimize tab connects to your MongoDB Atlas cluster via the configured URI. Create your own collection, and the tab will analyze it.

## Token Cost Breakdown

For transparency, here's what the demo costs:

**One-time setup (~10 minutes):**
- Embed 65 sample docs with voyage-4-large: ~2,500 tokens → ~$0.005
- Create vector search index in MongoDB: free
- First analysis run (20 queries × 2 models): ~200 tokens → ~$0.01

**Each subsequent analysis run:**
- 20 queries × 2 models × ~5 tokens/query: ~200 tokens → ~$0.01

**Monthly cost at realistic use:**
- Run analysis 20 times to experiment: ~$0.20
- Well worth the learning.

## Related Concepts

- **[Shared Embedding Space](../../core-concepts/shared-embedding-space)** — How lite queries work on large-indexed docs
- **[Asymmetric Retrieval](../../core-concepts/vector-search#asymmetric-models)** — The architectural pattern
- **[Vector Search](../../core-concepts/vector-search)** — Fundamentals
- **[Voyage 4 Family](../../models/voyage-4-family)** — Model specifications and token costs
- **[Web Playground](../web-playground)** — All interactive tabs

## Troubleshooting

### "Run Analysis" button is disabled

**Cause**: Voyage API key not configured.

**Fix**:
```bash
vai config set api-key <your-api-key>
```

Then refresh the playground.

### "Could not find collection vai_demo.cost_optimizer_demo"

**Cause**: Data hasn't been ingested yet. Click **Get Started** again or run:

```bash
vai demo cost-optimizer
```

### Results show 0% recall

**Cause**: Database connection issue or vector index not created.

**Fix**:
1. Verify MongoDB URI: `vai config get mongodb-uri`
2. Re-run the demo to re-create the index
3. Check that your MongoDB Atlas cluster has vector search enabled (Atlas M10 or higher required)

## Further Reading

- [`vai demo`](/docs/commands/tools-and-learning/demo) — Command reference
- [`vai optimize`](/docs/commands/tools-and-learning/optimize) — CLI cost analysis command
- [`vai playground`](/docs/guides/web-playground) — All playground tabs
- [Cost Optimization Guide](../benchmarking/cost-benchmark) — Deeper analysis of cost trade-offs
