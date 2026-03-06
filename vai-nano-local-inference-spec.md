# VAI: voyage-4-nano Local Inference Integration

**Spec Version:** 1.0.0  
**Target Release:** v1.31.0  
**Author:** Michael Lynn, Principal Staff Developer Advocate, MongoDB  
**Status:** Draft

---

## Executive Summary

`voyage-4-nano` is the first Voyage AI embedding model released as open weights on Hugging Face (Apache 2.0). Unlike the rest of the voyage-4 family — which require API keys — nano can run entirely on a local machine. Critically, it **shares the same embedding space** as voyage-4-large, voyage-4, and voyage-4-lite, meaning a collection indexed locally with nano is directly queryable via the API with any other voyage-4 model.

This creates VAI's most compelling onboarding story yet: a developer can install VAI, embed documents, and run vector search with **zero API keys, zero accounts, zero cost**. When they're ready to scale to production, they switch to the API — and their index doesn't change.

This spec defines the Python subprocess bridge (Option 1) for integrating local nano inference into VAI's existing Node.js architecture.

---

## 1. The Core Insight

The nano integration is not just a new model option. It unlocks a fundamentally new developer journey:

```
Before nano:
  install vai → need Voyage API key → need MongoDB URI → can start

After nano:
  install vai → vai nano setup → vai embed --local → vai search (local) → works
  (upgrade to API key when ready to scale)
```

The "embed locally, search globally" demo — index with nano locally, then query the same collection via voyage-4-lite through the API — is a live proof of the shared embedding space in a way no benchmark number can match.

---

## 2. Architecture: Python Subprocess Bridge

### 2.1 Why a Subprocess Bridge

VAI is built on Node.js. Running a PyTorch model requires Python. Rather than rewriting the inference stack or adding a native Node.js ML dependency, VAI spawns a Python child process that handles inference and communicates via JSON over stdin/stdout.

This is clean, auditable, and honest about the dependency. The Python process is a thin wrapper — it receives text, loads the model (with caching), and returns embeddings. No web server, no persistent daemon, no hidden complexity.

### 2.2 Communication Protocol

```
VAI (Node.js)                    nano-bridge.py (Python)
     │                                    │
     │  { "texts": [...], "config": {} }  │
     │ ─────────────────────────────────► │
     │                                    │  load/cache model
     │                                    │  run inference
     │                                    │
     │  { "embeddings": [[...], ...],     │
     │    "model": "voyage-4-nano",       │
     │    "dimensions": 1024,             │
     │    "inference_ms": 142 }           │
     │ ◄───────────────────────────────── │
```

Single JSON line in, single JSON line out. Newline-delimited. The bridge process is spawned on first use and optionally kept warm for the session duration.

### 2.3 System Components

```
src/
  lib/
    nano.js              ← Node.js bridge manager (NEW)
  commands/
    embed.js             ← add --local flag (MODIFIED)
    pipeline.js          ← add --local flag (MODIFIED)
    benchmark.js         ← add nano subcommands (MODIFIED)
  nano/
    nano-bridge.py       ← Python inference bridge (NEW)
    nano-setup.js        ← dependency installer/checker (NEW)
    requirements.txt     ← Python deps pinned (NEW)
```

---

## 3. New CLI Surface

### 3.1 `vai nano` — Top-Level Subcommand

A new top-level command manages the local inference environment:

```
vai nano <subcommand>

Subcommands:
  setup       Install Python dependencies for local inference
  status      Check if local inference is available and ready
  test        Run a quick smoke test (embed one sentence, print vector)
  info        Show model details, cache location, Python environment
  clear-cache Remove the cached model files (~700MB)
```

**`vai nano setup`** is the onboarding entry point. It:
1. Checks for Python 3.9+ in PATH
2. Creates a virtual environment at `~/.vai/nano-env/`
3. Installs pinned dependencies from `requirements.txt`
4. Downloads `voyageai/voyage-4-nano` from Hugging Face (~700MB, cached to `~/.vai/nano-model/`)
5. Runs a smoke test to verify the installation
6. Prints a summary and next steps

**`vai nano status`** output:
```
voyage-4-nano Local Inference
─────────────────────────────
Python:          ✓ 3.11.4 (/usr/bin/python3)
Virtual env:     ✓ ~/.vai/nano-env/
Dependencies:    ✓ sentence-transformers 3.x, torch 2.x
Model cache:     ✓ ~/.vai/nano-model/ (712 MB)
Device:          CPU  (no CUDA detected)
Status:          Ready

Run: vai embed "hello world" --local
```

### 3.2 `--local` Flag on `vai embed`

```bash
# Embed using local nano inference (no API key required)
vai embed "What is vector search?" --local

# Explicit model (nano is the only local option for now)
vai embed "What is vector search?" --local --model voyage-4-nano

# Specify MRL dimensions
vai embed "What is vector search?" --local --dimensions 512

# Specify quantization output type
vai embed "What is vector search?" --local --precision int8

# Embed a file, store to MongoDB
vai embed ./docs/ --local --db myapp --collection knowledge
```

The `--local` flag routes embedding through `src/lib/nano.js` instead of `src/lib/api.js`. All downstream behavior (chunking, MongoDB storage, index creation) is unchanged.

### 3.3 `--local` Flag on `vai pipeline`

```bash
# Full RAG pipeline with no API key
vai pipeline ./docs/ --local --db myapp --collection knowledge --create-index
```

This is the zero-credential onboarding path. A developer goes from raw documents to a queryable MongoDB Atlas collection without a Voyage API key.

### 3.4 New `vai benchmark` Subcommands

```bash
# Compare MRL dimension tradeoffs using nano locally
vai benchmark dimensions --local --text "your sample text"

# Compare quantization precision tradeoffs using nano locally  
vai benchmark quantization --local --text "your sample text"

# Cross-bridge shared space validation
# Embed with nano locally, embed with voyage-4-lite via API, compare cosine similarity
vai benchmark cross-bridge --text "your sample text"
```

`cross-bridge` is the key demo command — it proves the shared embedding space works across the local/API boundary by showing high cosine similarity (~0.93+) between a nano-embedded vector and a voyage-4-lite-embedded vector of the same text.

---

## 4. `src/lib/nano.js` — Bridge Manager

This is the core new library module. It handles process lifecycle, caching, and the communication protocol.

### 4.1 Public API

```javascript
/**
 * Embed texts using local voyage-4-nano inference.
 * @param {string[]} texts - Array of texts to embed
 * @param {object} options
 * @param {string} [options.inputType='document'] - 'document' or 'query'
 * @param {number} [options.dimensions=1024] - MRL dimensions: 256, 512, 1024, 2048
 * @param {string} [options.precision='float32'] - 'float32', 'int8', 'uint8', 'binary'
 * @returns {Promise<NanoEmbedResult>}
 */
export async function embedLocal(texts, options = {}) {}

/**
 * Check if local inference is available without attempting to run it.
 * Fast check — does not load the model.
 * @returns {Promise<NanoStatusResult>}
 */
export async function checkNanoStatus() {}

/**
 * Run the nano setup wizard interactively.
 * @param {object} options
 * @param {boolean} [options.quiet=false] - Suppress progress output
 * @returns {Promise<void>}
 */
export async function setupNano(options = {}) {}

/**
 * Kill the warm bridge process if running.
 * Called on process exit.
 */
export function shutdownBridge() {}
```

### 4.2 Process Lifecycle

On first call to `embedLocal()`:
1. `checkNanoStatus()` — fast pre-flight: Python exists? venv exists? model cached?
2. If not ready → throw `NanoNotReadyError` with setup instructions
3. Spawn `python3 nano-bridge.py` from the venv, with `~/.vai/nano-model/` as model path
4. Wait for the bridge's ready signal (model load can take 2–5s)
5. Send embed request, receive response
6. Optionally keep the process alive for the session (`keepWarm: true` default for interactive use, `false` for single-shot pipeline runs)

**Process warm/cold decision logic:**
- `vai embed` (interactive): keep warm for 5 minutes of inactivity
- `vai pipeline` (batch): keep warm for the duration, kill on completion
- `vai benchmark`: kill after benchmark completes

### 4.3 Error Taxonomy

```
NanoNotReadyError     - Python/venv/model not set up; includes setup instructions
NanoPythonMissingError - Python 3.9+ not found in PATH
NanoDepsError         - venv exists but pip install failed or deps are wrong versions
NanoModelMissingError - Model not cached; suggests 'vai nano setup' or prompts to download
NanoBridgeError       - Bridge process crashed or returned malformed JSON
NanoTimeoutError      - Inference exceeded timeout threshold (default: 60s per batch)
```

Each error includes `remediation` — a short string of the exact command to fix it, suitable for display in the CLI.

---

## 5. `src/nano/nano-bridge.py` — Python Inference Bridge

### 5.1 Responsibilities

- Load `voyageai/voyage-4-nano` via sentence-transformers
- Receive JSON requests from stdin
- Run inference using `encode_query()` or `encode_document()` appropriately
- Return JSON results to stdout
- Emit a ready signal when model is loaded
- Handle MRL truncation via `truncate_dim`
- Handle quantization via the `precision` argument
- Cache the model in memory for the process lifetime (no reload between requests)

### 5.2 Request/Response Schema

**Request (stdin, newline-terminated):**
```json
{
  "texts": ["text one", "text two"],
  "input_type": "document",
  "dimensions": 1024,
  "precision": "float32"
}
```

**Response (stdout, newline-terminated):**
```json
{
  "embeddings": [[0.023, -0.041, ...], [...]],
  "model": "voyage-4-nano",
  "dimensions": 1024,
  "precision": "float32",
  "device": "cpu",
  "inference_ms": 142
}
```

**Ready signal (stdout, emitted once on startup):**
```json
{"status": "ready", "model": "voyage-4-nano", "device": "cpu"}
```

**Error response:**
```json
{"error": "out_of_memory", "message": "..."}
```

### 5.3 Model Loading

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "voyageai/voyage-4-nano",
    trust_remote_code=True,
    truncate_dim=dimensions,
    cache_folder=model_cache_path   # ~/.vai/nano-model/
)
```

The bridge accepts a `--model-path` argument pointing to the local cache, so Hugging Face downloads are only triggered once (during `vai nano setup`), not on every invocation.

### 5.4 Device Detection

The bridge auto-detects the best available device:
```python
device = "cuda" if torch.cuda.is_available() else \
         "mps" if torch.backends.mps.is_available() else "cpu"
```

CUDA and MPS (Apple Silicon) are used when available. CPU is the baseline expectation — on modern hardware, nano runs acceptably on CPU for development workloads (approximately 50–200ms per batch of 10 documents at 1024 dimensions).

---

## 6. `src/nano/nano-setup.js` — Setup Orchestrator

Handles the one-time setup flow, invoked by `vai nano setup`.

### 6.1 Setup Steps

```
Step 1/5  Check Python version
          ✓ Python 3.11.4 found

Step 2/5  Create virtual environment
          Creating ~/.vai/nano-env/ ...
          ✓ Virtual environment ready

Step 3/5  Install dependencies
          Installing sentence-transformers, torch ... (this may take a few minutes)
          ✓ Dependencies installed

Step 4/5  Download model
          Downloading voyageai/voyage-4-nano (~700 MB) ...
          ████████████████░░░░ 78%  ETA 0:00:42
          ✓ Model cached to ~/.vai/nano-model/

Step 5/5  Smoke test
          Embedding "Hello, world!" ...
          ✓ Inference succeeded (312ms, 1024 dimensions, CPU)

───────────────────────────────────────────────
voyage-4-nano is ready for local inference.

Try it:
  vai embed "What is vector search?" --local
  vai nano test
  vai pipeline ./docs/ --local --db myapp --collection knowledge
```

### 6.2 Resumable Setup

If setup is interrupted (network drop during model download), re-running `vai nano setup` detects completed steps and resumes from the failure point. Hugging Face's cache mechanism handles partial downloads transparently.

### 6.3 Python Detection Strategy

```javascript
// In order of preference:
const candidates = [
  process.env.VAI_PYTHON,   // explicit override
  'python3',
  'python',
  '/usr/bin/python3',
  '/usr/local/bin/python3',
];
```

If none meet the 3.9+ version requirement, setup prints a friendly message pointing to python.org and offers to open the URL.

---

## 7. `src/nano/requirements.txt`

```
sentence-transformers>=3.0.0,<4.0.0
torch>=2.0.0
transformers>=4.40.0
huggingface_hub>=0.23.0
numpy>=1.24.0
```

All dependencies are pinned with compatible ranges (not exact versions) to avoid conflicts with user environments while maintaining stability. The venv is isolated at `~/.vai/nano-env/` and does not interact with the user's system Python.

---

## 8. `catalog.js` Updates

```javascript
{
  id: 'voyage-4-nano',
  name: 'voyage-4-nano',
  family: 'voyage-4',
  sharedSpace: true,
  local: true,              // NEW: indicates local inference available
  requiresApiKey: false,    // NEW: no API key needed in local mode
  apiSupported: false,      // nano is not available via the Voyage API
  contextLength: 32000,
  parameters: '340M',
  license: 'Apache 2.0',
  huggingFaceId: 'voyageai/voyage-4-nano',
  dimensions: [2048, 1024, 512, 256],    // MRL supported dimensions
  precisions: ['float32', 'int8', 'uint8', 'binary'],
  defaultDimensions: 1024,
  rtebScore: null,          // TBD pending RTEB eval
  costPerMToken: 0,         // local = free
  description: 'Open-weight local model. No API key required. Shares embedding space with voyage-4 series.',
  useCase: 'Local development, offline indexing, zero-cost experimentation',
  badge: 'LOCAL',
}
```

---

## 9. Demo Scenarios

### 9.1 Zero-Credential Onboarding

```bash
npm install -g voyageai-cli
vai nano setup
vai pipeline ./my-docs/ --local --db localdev --collection knowledge --create-index
vai query "how does authentication work?" --local --db localdev --collection knowledge
```

A complete working RAG pipeline with no accounts, no API keys, no cloud services. (MongoDB can be local Atlas CLI or Atlas free tier.)

### 9.2 "Embed Locally, Search Globally" — Shared Space Demo

```bash
# Index locally with nano (free)
vai pipeline ./docs/ --local --db myapp --collection knowledge

# Later, query via API with voyage-4-lite (no re-indexing)
vai query "authentication guide" --model voyage-4-lite --db myapp --collection knowledge
```

The query just works because nano and voyage-4-lite share the same embedding space. This is the demo.

### 9.3 Cross-Bridge Validation

```bash
vai benchmark cross-bridge --text "MongoDB Atlas Vector Search enables semantic retrieval"
```

Output:
```
Cross-Bridge Shared Space Validation
─────────────────────────────────────
Text: "MongoDB Atlas Vector Search enables semantic retrieval"

Embedding A: voyage-4-nano (local, CPU)        [1024 dims, 187ms]
Embedding B: voyage-4-lite (API)               [1024 dims, 94ms]

Cosine Similarity: 0.941  ✓ Excellent — shared space confirmed

Interpretation: These two embeddings, generated by completely different
model inference paths (local vs. API), are 94.1% similar. Documents
indexed with voyage-4-nano are directly searchable with voyage-4-lite.
```

### 9.4 MRL Dimension Tradeoffs

```bash
vai benchmark dimensions --local --text "What is vector search?"
```

Output:
```
MRL Dimension Comparison (voyage-4-nano, local)
────────────────────────────────────────────────
Dimensions   Vector size   Inference   Quality*
──────────   ──────────    ─────────   ────────
2048         8.0 KB        312ms       100% (baseline)
1024         4.0 KB        210ms        98.2%
 512         2.0 KB        187ms        95.1%
 256         1.0 KB        176ms        89.4%

* Quality estimated via self-similarity on paraphrase pairs
Recommendation: 1024 offers the best size/quality tradeoff for most workloads.
```

### 9.5 Quantization Tradeoffs

```bash
vai benchmark quantization --local --text "What is vector search?"
```

Output:
```
Quantization Comparison (voyage-4-nano, 1024 dims, local)
──────────────────────────────────────────────────────────
Precision   Bytes/vector   Storage 1M docs   Quality*
─────────   ────────────   ───────────────   ────────
float32     4,096 B        ~3.8 GB           100% (baseline)
int8        1,024 B        ~0.95 GB           98.1%   ◄ recommended
uint8       1,024 B        ~0.95 GB           97.9%
binary        128 B        ~0.12 GB           91.3%

* Quality estimated via cosine similarity vs float32 baseline
```

---

## 10. `vai explain nano` Update

The existing `nano` explainer topic should be updated to cover:

1. What nano is and why it's different (local, open-weights, Apache 2.0)
2. The shared embedding space — and why this means nano embeddings are production-compatible
3. MRL (Matryoshka Representation Learning) — what it means to truncate dimensions
4. Quantization — storage vs. quality tradeoffs
5. When to use nano vs. API models
6. The "embed locally, scale globally" pattern

---

## 11. Workflow Integration

Two new community workflows leverage the nano integration:

### `vai-workflow-nano-bootstrap`

Zero-API-key onboarding. Checks nano status, runs ingest with local inference, validates the collection, prints a summary. The first workflow a new user should run.

### `vai-workflow-cross-bridge-demo`

Embeds the same set of texts with nano (local) and voyage-4-lite (API), computes pairwise cosine similarities, and generates an LLM report confirming shared space validity with real user data.

---

## 12. Implementation Phases

### Phase 1 — Foundation (v1.31.0)

- `src/nano/nano-bridge.py` — inference bridge, basic float32, 1024 dims
- `src/nano/requirements.txt`
- `src/lib/nano.js` — process lifecycle, basic embed
- `src/nano/nano-setup.js` — setup wizard
- `vai nano setup`, `vai nano status`, `vai nano test`
- `--local` flag on `vai embed`
- `catalog.js` update
- `vai explain nano` content update
- Tests: unit tests for nano.js bridge protocol; integration test for setup + smoke test

### Phase 2 — Full Feature Parity (v1.31.x)

- MRL dimensions support (`--dimensions 256/512/1024/2048`)
- Quantization support (`--precision int8/uint8/binary`)
- `--local` flag on `vai pipeline`
- `vai nano info` and `vai nano clear-cache`
- Device auto-detection (CUDA/MPS/CPU) with `vai nano status` reporting

### Phase 3 — Benchmarking & Demos (v1.32.0)

- `vai benchmark dimensions --local`
- `vai benchmark quantization --local`
- `vai benchmark cross-bridge`
- `vai-workflow-nano-bootstrap` workflow
- `vai-workflow-cross-bridge-demo` workflow
- Playground tab: "Local Inference" — runs nano in subprocess, visualizes MRL/quantization tradeoffs

---

## 13. Testing Strategy

### Unit Tests (`test/nano/`)

- `nano-bridge-protocol.test.js` — mock subprocess, verify JSON in/out format
- `nano-manager.test.js` — process lifecycle (spawn, keepWarm, shutdown, timeout)
- `nano-setup.test.js` — Python detection logic, step resumption logic
- `nano-errors.test.js` — error taxonomy, remediation strings

### Integration Tests (require Python + model download, skipped in CI by default)

- `nano-smoke.test.js` — full round-trip: setup → embed → verify vector shape
- `nano-cross-bridge.test.js` — nano vs. voyage-4-lite cosine similarity ≥ 0.90

### CI Strategy

- Unit tests run in all CI contexts (no Python required, subprocess is mocked)
- Integration tests run only when `VAI_TEST_LOCAL_INFERENCE=1` is set
- A separate nightly CI job runs integration tests with a pre-cached model

---

## 14. Success Metrics

| Metric | Target |
|--------|--------|
| `vai nano setup` completion rate (user survey) | > 80% on first attempt |
| Cross-bridge cosine similarity | ≥ 0.90 consistently |
| Time from `npm install` to first local embedding | < 10 minutes (excluding model download) |
| CPU inference latency (batch of 10, 1024 dims) | < 500ms on modern laptop |
| Unit test coverage for nano.js | ≥ 90% |
| Zero regressions in existing API-based tests | 100% pass rate maintained |

---

## 15. Open Questions

1. **Hugging Face authentication** — nano is public, so `hf_hub_download` doesn't require a token today. The spec assumes this remains true. If Voyage AI gates the model, setup will need to handle `HfHubHTTPError` with a clear message.

2. **Windows compatibility** — Python subprocess spawning on Windows has edge cases around path quoting and venv activation. Phase 1 will target macOS/Linux; Windows support will be validated in Phase 2.

3. **Model version pinning** — The bridge should pin the Hugging Face commit hash to prevent silent behavior changes when Voyage AI updates the model. Add `revision` parameter to `SentenceTransformer()` constructor.

4. **Electron app integration** — The desktop app ships a bundled Node.js but not a bundled Python. The `--local` flag in the Electron context should check for Python in the host system PATH and fall through to the same setup flow. Bundling Python with the Electron app is out of scope for this spec.

5. **nano via the Voyage API** — Currently, nano is only available as open weights. If Voyage AI adds nano to the API in the future, `catalog.js` will need `apiSupported: true` and `requiresApiKey: true` for API mode, with `local` mode remaining as an alternative. The architecture supports this without breaking changes.
