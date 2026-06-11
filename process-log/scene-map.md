# Production Scene Map

This file translates the story outline into a structure that can be implemented without rewriting the narrative system for every chapter.

## Runtime State

```txt
stats
  support: 3
  oceanHope: 3
  funds: 3
  hydration: 5

paths
  people: 0
  system: 0
  populist: 0

factions
  coastal: 0
  environmental: 0
  business: 0

flags: set of story IDs
evidenceStrength: none | weak | moderate | strong
debateMomentum: 0
activeCorporatePartnership: false
```

All stats remain between 0 and 10. Faction relationships stay hidden. The dominant political path is computed from path points and exists only when one path leads both others by at least 2 points.

## Scene Types

| Type | Purpose |
| --- | --- |
| `narrative` | Short narration or character moment with one continue action |
| `decision` | Dialogue followed by 2-5 responses |
| `investment` | Decision that displays a Funds cost and disables unaffordable choices |
| `report` | Shows consequences and conditional callbacks |
| `debate` | Response-card scene that changes Debate Momentum |
| `ending` | Displays the calculated ending and political-path variation |

## Choice Shape

Every choice can use the following fields:

```txt
id
label
requires
cost
effects
addFlag
pathPoint
reaction
nextScene
```

The player sees the response label and Funds cost. Exact hidden effects, faction changes, path points, and future flags are not shown.

## Main Sequence

| Order | Scene ID | Type | Main purpose |
| --- | --- | --- | --- |
| 1 | `title` | narrative | Start or continue game |
| 2 | `prologue_home` | decision | Choose Carpter's childhood home |
| 3 | `prologue_incident` | decision | Choose his first response to pollution |
| 4 | `prologue_belief` | decision | Establish his starting political belief |
| 5 | `prologue_launch` | decision | Choose how Carpter reaches land |
| 6 | `prologue_ending` | narrative | Reveal title and starting stats |
| 7 | `ch1_report` | report | Show the disappearing marsh |
| 8 | `ch1_promise` | investment | Make the first environmental promise |
| 9 | `ch1_parish_offer` | decision | Respond to Boudreaux's political deal |
| 10 | `ch1_consequence` | report | Show the first rally and callbacks |
| 11 | `ch2_report` | report | Show attention, plastic, and virality |
| 12 | `ch2_operation` | investment | Choose campaign expansion |
| 13 | `ch2_endorsement` | decision | Choose or reject a coalition |
| 14 | `ch2_consequence` | report | Show coalition obligations |
| 15 | `ch3_report` | report | Show flooding and unequal protection |
| 16 | `ch3_plan` | investment | Choose a regional protection plan |
| 17 | `ch3_riverfront_deal` | decision | Respond to Landry's offer |
| 18 | `ch3_consequence` | report | Show protection and political identity |
| 19 | `ch4_report` | report | Arrive at GulfStar's greenwashing event |
| 20 | `ch4_evidence` | investment | Choose how to prove industrial pollution |
| 21 | `ch4_partnership` | decision | Accept, negotiate, or reject GulfStar |
| 22 | `ch4_consequence` | report | Calculate evidence strength and corporate dependence |
| 23 | `ch5_report` | report | Prepare for the national debate |
| 24 | `ch5_preparation` | investment | Invest in debate preparation or use existing record |
| 25 | `ch5_round_jobs` | debate | Answer the jobs-and-economy attack |
| 26 | `ch5_round_evidence` | debate | Defend evidence and responsibility |
| 27 | `ch5_partnership_answer` | debate | Conditional GulfStar partnership response |
| 28 | `ch5_round_seriousness` | debate | Answer the seriousness-and-delay attack |
| 29 | `ch5_consequence` | report | Calculate debate outcome |
| 30 | `ch6_report` | report | Show the coalition arriving in Washington |
| 31 | `ch6_agenda` | investment | Choose the final national agenda |
| 32 | `ch6_coalition` | decision | Choose who presents the agenda |
| 33 | `ending_calculator` | ending | Resolve outcome in priority order |
| 34 | `ending_final_scene` | ending | Apply path variation and final marsh scene |

## Conditional Inserts

Keep branching manageable by inserting short conditional lines inside shared scenes instead of creating separate scenes for every flag.

Examples:

- `refinery_witness` changes Carpter's memory in Chapters 4 and 5.
- `endorsed_workers` adds worker support in Chapters 3, 4, and 6.
- `gulfstar_partnership` inserts a required response between debate rounds 2 and 3.
- A dominant path adds one special response to Chapters 3, 4, and 6.
- Childhood flags change the heartfelt response in debate round 3.

## Ending Resolution

The `ending_calculator` checks conditions in this order:

1. Hydration and coalition continuation
2. Active corporate dependence
3. President Carpter victory
4. Movement Leader
5. Meme Candidate
6. Forgotten Campaign

After choosing the base ending, append the dominant-path variation and selected final-agenda result.

## Target Pacing

- Prologue: 4 decisions
- Chapters 1-4: 2 major decisions each
- Chapter 5: preparation plus 3 debate responses
- Chapter 6: 2 final decisions

Total: approximately 18 meaningful player decisions, plus short reports and reactions. Keep most dialogue scenes under 80 player-facing words.
