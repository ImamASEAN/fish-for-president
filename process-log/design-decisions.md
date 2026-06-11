# Design Decisions

Use this file to record important choices during development.

## 2026-06-08 - Initial Scope

- Target playtime is 10-15 minutes.
- The game uses six locations and four visible stats.
- The primary mechanic is narrative choice. A short cleanup minigame was initially planned but later removed from the core design.
- The project will use placeholder art until the full story is playable.
- Final factual environmental claims will be tracked in `sources.md`.

## 2026-06-08 - Carpter and the Prologue

**Decision:** The main character is named Carpter. Before the campaign begins, the player makes four narrative choices about his upbringing, first response to pollution, political temperament, and journey onto land.

**Reason:** This gives the player ownership of Carpter and makes later choices feel connected to a consistent character. It also adds some of the personal-history appeal of the project's political-game inspiration without expanding the main campaign.

**Result:** Prologue stat effects remain hidden from the player. The visible stat bar appears only after Carpter reaches land and announces his campaign. Selected prologue choices can also unlock small dialogue callbacks later.

## 2026-06-08 - Personal Prologue Tone

**Decision:** Prologue choices will be written as specific memories and relationships rather than abstract strategic positions. Miss June Broussard will help Carpter reach land and initially translate his speech.

**Reason:** Carpter should feel like a person with a home and community before he feels like a collection of stats. The humor should come naturally from the difficulties of a fish entering human politics while the environmental stakes remain sincere.

**Result:** Each future choice should reveal something personal about Carpter or affect someone the player recognizes. Mechanical descriptions and stat effects remain in design notes, not in player-facing text.

## 2026-06-08 - Dialogue-First Decisions

**Decision:** Most decisions will follow a short dialogue exchange, and the available choices will usually be Carpter's spoken responses.

**Reason:** This makes choices feel like role-playing a political character rather than selecting actions from a menu. It also gives other characters room to challenge Carpter before the player commits to a position.

**Result:** Use roughly 3-5 short dialogue lines before important decisions. Keep narration and visible choices brief.

## 2026-06-08 - Political Narrative After the Prologue

**Decision:** Keep the personal-history prologue, then structure each later chapter as a compact political turn: situation report, adviser discussion, major decision, political complication, and consequence report.

**Reason:** The campaign should focus on governing-style pressure, competing interests, promises, relationships, and delayed consequences rather than action minigames or isolated moral choices.

**Result:** Exact stat changes remain in design notes but are not announced after every choice. Recurring characters and factions remember Carpter's decisions. Action minigames are removed from the core design so the post-prologue campaign stays focused on political narrative.

## 2026-06-08 - Resource Cost Progression

**Decision:** Policies and campaign operations spend Funds. Early commitments usually cost 1 Fund, regional commitments cost 2, and national commitments cost 3.

**Reason:** Better outcomes should require greater investment instead of being obviously superior free choices. Early costs stay small so the player can learn the system before facing harder budget decisions.

**Result:** Funds costs are shown before a decision. Other stat effects remain private until communicated through reports and reactions. Unaffordable options stay visible but cannot be selected.

Required policy decisions include a weak no-cost fallback. This prevents a broke campaign from becoming unplayable without making low Funds consequence-free.

## 2026-06-08 - Three Political Paths

**Decision:** Carpter can develop toward three hidden role-playing paths: Stand With the People, Master Their Game, or Challenge Corporate Power.

**Reason:** Repeated decisions should build a coherent political identity without forcing the player to select a permanent class at the beginning.

**Result:** Major decisions add one hidden path point. The dominant path unlocks later responses and changes ending narration, while mixed-path play remains possible. The populist path targets concentrated corporate power and corruption while remaining inclusive toward workers, small businesses, and ordinary people.

## 2026-06-08 - Environmental Focus and Tonal Contrast

**Decision:** Each chapter will combine one focused environmental issue with political gameplay, one heartfelt beat, and one light comic beat. The six chapter compasses are Home, Attention, Shared Survival, Corruption, Truth vs Delay, and Change.

**Reason:** The political systems are most meaningful when the player understands what is being protected. Tonal contrast keeps the short game charming and approachable without weakening its environmental message.

**Result:** Environmental information appears through scenes, consequences, and no more than one short Campaign Note per chapter. Humor targets campaign absurdity and human behavior, never affected communities or environmental harm.

## 2026-06-08 - Full Outline and Scene Map

**Decision:** The complete game uses 34 shared scenes with conditional dialogue inserts rather than separate branches for every possible choice.

**Reason:** Conditional inserts preserve meaningful callbacks while keeping the short game realistic to implement and test.

**Result:** The player makes approximately 18 meaningful decisions across the prologue, six chapters, debate, and finale. The implementation structure is recorded in `scene-map.md`.

## 2026-06-08 - First Playable Prototype

**Decision:** Build the game as a dependency-free browser app with reusable scene data, a small state engine, and CSS placeholder art.

**Reason:** A vanilla implementation keeps the project easy to understand, edit, test, and deploy while the story structure is still changing.

**Result:** The title, full prologue, and Chapter 1 are playable on desktop and mobile. The engine supports stats, Funds costs, hidden paths, factions, flags, locked choices, conditional callbacks, saving, and resetting.

## Decision Template

### YYYY-MM-DD - Decision title

**Decision:** What changed or was selected?

**Reason:** Why was this the best choice?

**Result:** What needs to happen next?
