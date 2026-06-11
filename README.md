# Fish for President

A short browser-based political narrative game about Carpter, a small fish running for president after pollution and wetland loss threaten his Louisiana home.

## Run the Game

From this folder:

```powershell
node scripts/server.mjs
```

Then open:

```txt
http://localhost:4173
```

## Run Tests

```powershell
node --test
```

## Playable Content

- Full prologue and six campaign chapters
- Pannable and zoomable United States campaign map
- Map-first chapter transitions with a new gold `!` event at each destination
- Cinematic chapter title cards and sourced environmental briefings
- Dialogue that advances one line at a time
- Guided event markers, environmental news, and promise ledger
- Hidden political paths, factions, evidence, coalitions, and callbacks
- Three-candidate national debate and deterministic election
- Results for all 50 states plus Washington, D.C.
- Difficult resource economy with travel costs and Hydration management
- Terminal loss conditions for dehydration and losing the election
- Presidential victory and final promise recap
- Versioned local save, reset, desktop, and mobile layouts

Winning is intentionally difficult. A strong environmental record, national support, debate performance, coalition, funds, and enough Hydration to finish the campaign all matter.

## Briefing Images

Each chapter briefing currently contains a styled image placeholder. Final images can be connected through the centralized `briefings` object in `src/assets.js`.

The narrative design and implementation sequence are recorded in `process-log/story-outline.md` and `process-log/scene-map.md`. Factual briefing sources are recorded in `process-log/sources.md`. Asset licensing is recorded in `ASSET_CREDITS.md`.
