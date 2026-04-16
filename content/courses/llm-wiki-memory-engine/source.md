# Quelle: LLM Wiki v2

- **Typ:** GitHub Gist
- **URL:** https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
- **Autor:** rohitg00 (basiert auf agentmemory-Erfahrungen)

## Originaltext

LLM Wiki v2 — extending Karpathy's LLM Wiki pattern with lessons from building agentmemory

### What the Original Gets Right

The foundation remains sound: "stop re-deriving, start compiling." The three-layer architecture (raw sources, wiki, schema) and basic operations (ingest, query, lint) provide solid grounding.

### Missing Layer: Memory Lifecycle

Knowledge requires temporal management:

- **Confidence scoring**: Facts should carry metadata about supporting sources, recency, and contradictions. Example: Score 0.85 based on three factors. "Project X uses Redis" — confirmed by 3 sources.
- **Supersession**: New information should explicitly replace old claims — linked, timestamped, old preserved but marked stale. "Version control for knowledge."
- **Forgetting**: Implement retention curves using exponential decay, resetting with reinforcement. Ebbinghaus 1885: ~70% forgotten in 24h. Each reinforcement resets the curve. "Architecture decisions decay slowly, transient bugs decay fast."
- **Consolidation tiers**: Working memory → episodic memory → semantic memory → procedural memory. Promotes information up as evidence accumulates.

### Beyond Flat Pages: Knowledge Graph

- **Entity extraction**: People, projects, libraries, concepts, files, decisions — type + attributes + relationships
- **Typed relationships**: "uses", "depends on", "contradicts", "caused", "fixed", "supersedes" — semantic weight, confidence, source
- **Graph traversal**: "What's the impact of upgrading Redis?" — navigates meaning, not words
- **Graph doesn't replace pages, augments them**: Pages for reading, graph for navigation/discovery

### Search at Scale

- **BM25**: Keyword matching with stemming and synonym expansion
- **Vector search**: Semantic similarity via embeddings
- **Graph traversal**: Entity-aware relationship walking
- **Reciprocal Rank Fusion**: score = sum(1/(k + rank)), k=60 typical
- **Keep index.md as human-readable catalog**: Don't rely on it as primary search past ~100 pages

### Automation: Event-Driven Architecture

6 Event-Hooks:
- **on-new-source**: Auto-ingest, entity extraction, graph updates
- **on-session-start**: Load context
- **on-session-end**: Compress observations
- **on-query**: Quality scoring — "quality score > threshold" decides if answer goes into wiki
- **on-memory-write**: Validate, cross-reference
- **on-schedule**: Lint, consolidation, decay

"Human in the loop for curation" — bookkeeping automated, direction stays human.

### Quality and Self-Correction

- **Score everything**: Well-structured, cites sources, consistent. Second pass with different prompt. Threshold for review.
- **Self-healing**: Orphan pages, stale claims, broken cross-references auto-repaired
- **Contradiction resolution**: Source recency, source authority, number of supporting observations. Human can override.

### Crystallization

Structured digest from completed work threads: question, findings, files/entities, lessons. "Explorations are a source, just like articles."

### Multi-Agent and Collaboration

- **Mesh sync**: Last-write-wins, timestamp-based resolution, manual override for conflicts
- **Shared vs. private**: Personal rolls up into shared when promoted
- **Work coordination**: Who's working on what, blocked, done, prevent duplicate work

### Privacy and Governance

- **Filter on ingest**: API keys, tokens, passwords, PII — automatic
- **Audit trail**: Every operation logged — timestamp, what changed, why
- **Bulk operations**: Bulk-delete, export, merge duplicates — audited and reversible

### Output Formats Beyond Markdown

Comparison tables, timelines, dependency graphs, slide decks, JSON/CSV exports, team briefs. "Depends on audience and question."

### The Schema as Product

Entity types, relationship types, ingest rules, create vs. update, quality standards, contradictions, consolidation schedule, private vs. shared. "First version rough, after few dozen sources gets better." Transferable.

### Implementation Spectrum

6 Stufen:
1. Minimal Viable Wiki — sources + wiki + index.md + schema
2. + Lifecycle — confidence scoring, supersession, retention decay
3. + Structure — entity extraction, typed relationships, knowledge graph
4. + Automation — event hooks, auto-ingest, auto-lint, context injection
5. + Scale — hybrid search, consolidation tiers, quality scoring
6. + Collaboration — mesh sync, shared/private scoping, work coordination

"Pick your entry point based on needs."

### Why This Matters

Bottleneck is bookkeeping. Memex finally buildable. "Librarians that do the work."
