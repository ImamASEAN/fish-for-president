# Story Outline

## Prologue - Before the Campaign

**Purpose:** Let the player define Carpter before he enters politics. The choices should feel like pieces of his life, not answers on a character-creation form.

**Length:** Approximately 2-3 minutes.

**Presentation rule:** Do not show stat changes or the stat bar during the prologue. Begin with base values of 3 Support, 3 Ocean Hope, 3 Funds, and 5 Hydration. Apply the hidden effects below, then reveal only the final totals when Carpter reaches land.

**Tone rule:** Every choice should contain a personal detail, relationship, or small memory. Humor should come from Carpter being a fish trying to enter human politics, never from treating the damage to his home as unimportant.

**Scene rhythm:** Most decisions follow a short dialogue exchange. Another character presents a problem or challenges Carpter, then the player chooses what Carpter says or does. Keep each exchange to roughly 3-5 short lines before the decision.

### Beat 1 - Where Carpter Grew Up

**Draft scene text:**

> Before anyone called him a candidate, Carpter was just a small fish with a stubborn streak.
>
> Where did he call home?

| Choice shown to the player | Personal meaning | Hidden effect | Callback flag |
| --- | --- | --- | --- |
| **The marsh, where every root hid a neighbor.** | Carpter grew up in a close coastal community. | Support +1, Hydration +1 | `marsh_child` |
| **Beneath Bellweather Dock, listening to fishers argue politics.** | Carpter learned how humans speak and argue. | Support +2 | `human_listener` |
| **Beside the refinery canal, where rainbows on the water never came from rain.** | Pollution shaped Carpter's childhood. | Ocean Hope +2, Hydration -1 | `refinery_witness` |

### Beat 2 - The Incident

**Draft scene text:**

> One morning, Carpter found plastic tangled in the marsh and oil shining on the water.
>
> "Maybe the tide will take it away," a neighbor said. Carpter had heard that before.

| Choice shown to the player | Personal meaning | Hidden effect | Callback flag |
| --- | --- | --- | --- |
| **Call the neighbors. They would face it together.** | Carpter organizes his community. | Support +2 | `organizer` |
| **Pull the plastic free. A minnow was trapped.** | Carpter helps whoever needs him now. | Ocean Hope +2, Hydration -1 | `hands_on` |
| **Follow the oily current. Someone caused this.** | Carpter searches for who is responsible. | Ocean Hope +1, Hydration -1; easier evidence route in Factory Town | `investigator` |

### Beat 3 - What Carpter Comes to Believe

**Draft scene text:**

> By sunset, the marsh looked a little more like home. By the next morning, more waste had arrived.
>
> A young fish looked up at Carpter. "Will it be clean tomorrow?"
>
> Carpter wanted to say yes. Instead, he began thinking about what would have to change before he could say it honestly.

| Choice shown to the player | Personal meaning | Hidden effect | Path point | Callback flag |
| --- | --- | --- | --- | --- |
| **"I will make them understand what this costs us."** | Carpter believes people can change when the harm becomes personal to them too. | Support +1, Ocean Hope +1 | `people_path` | `idealist` |
| **"I will make the people responsible answer for it."** | Carpter believes accountability must come before comfortable promises. | Ocean Hope +2, Support -1 | `populist_path` | `firebrand` |
| **"I will learn how their system works, then make it work for us."** | Carpter accepts that lasting change may require allies, resources, and uncomfortable deals. | Funds +2, Ocean Hope -1 | `system_path` | `pragmatist` |

### Beat 4 - Leaving the Ocean

**Draft scene text:**

> Carpter delivered the best speech of his life beneath Bellweather Dock.
>
> "Sounded important," Miss June said. "Shame about the blubbing."
>
> If Carpter wanted humans to listen, he would have to go ashore.

| Choice shown to the player | Personal meaning | Hidden effect | Callback flag |
| --- | --- | --- | --- |
| **Take the neighbors' homemade tank. It squeaked, but it was theirs.** | Carpter launches with his community behind him. | Support +1, Ocean Hope +1, Funds -1 | `grassroots_launch` |
| **Ride in Miss June's old aquarium. The plastic castle stayed.** | Carpter accepts safe, personal help. | Support +1, Hydration +1 | `fisher_launch` |
| **Accept the marina's display tank. Its logo was bigger than Carpter.** | Carpter gains resources but owes an early favor. | Funds +2, Support +1, Ocean Hope -1 | `sponsored_launch` |

### Prologue Ending

Carpter rolls onto land. Miss June stands beside his tank to translate.

> Reporter: "Is this a protest?"
>
> Carpter: "Blub."
>
> Miss June: "No. He says it is a presidential campaign."
>
> Carpter: "Blub blub."
>
> Miss June: "And he would like me to stop adding words."

The title appears, followed by the four-stat campaign bar with Carpter's final starting totals. Do not explain which prologue choices caused which totals.

Transition directly into Chapter 1, where Carpter forms his campaign and makes its first promise.

## Post-Prologue Chapter Structure

Each campaign chapter acts as one compact political turn:

1. **Situation report:** Carpter learns what changed and what requires attention.
2. **Adviser meeting:** Recurring characters argue for competing approaches.
3. **Major decision:** Carpter commits to a policy, promise, or public position.
4. **Political complication:** Someone offers support, demands a compromise, or challenges the decision.
5. **Consequence report:** Immediate reactions appear; some effects remain hidden until later.

Important decisions affect stats, faction relationships, character relationships, promises, and future dialogue options. Player-facing screens should describe consequences without showing exact numerical changes.

### Chapter Storytelling Checklist

Each chapter includes:

- a focused environmental issue shown through the setting
- a political conflict caused by that issue
- a short heartfelt moment showing who is affected
- a comic beat that gives the scene charm
- one optional Campaign Note with a factual takeaway

The chapter compasses are **Home, Attention, Shared Survival, Corruption, Truth vs Delay,** and **Change**.

### Hidden Political Paths

| Internal ID | Player-facing identity | Carpter's approach |
| --- | --- | --- |
| `people_path` | **Stand With the People** | Build coalitions, listen first, and make change through solidarity |
| `system_path` | **Master Their Game** | Use institutions, deals, and opponents' own rules to create change |
| `populist_path` | **Challenge Corporate Power** | Rally ordinary people and confront corporations responsible for the damage |

Major decisions add one point toward a path. Paths do not lock choices. A dominant path can unlock special dialogue, change how characters describe Carpter, and shape the final version of an ending.

### Path Voices and Boundaries

| Path | Typical Carpter line | Boundary |
| --- | --- | --- |
| **Stand With the People** | "Bring everyone affected to the table." | Coalition-building does not mean avoiding every confrontation. |
| **Master Their Game** | "Get the promise in writing. Then make them keep it." | Cunning does not automatically mean corruption or abandoning the mission. |
| **Challenge Corporate Power** | "The coast keeps paying while they keep profiting." | Populist anger targets powerful decision-makers, not workers or ordinary business owners. |

At the start of Chapter 3, a path becomes dominant when it leads the other paths by at least 2 points. Otherwise, Carpter remains politically undefined. Dominance unlocks one special response per later chapter, but all standard choices remain available.

### Path Payoffs

| Dominant path | Successful Carpter becomes | Failure risk |
| --- | --- | --- |
| **Stand With the People** | A coalition builder who turns many groups into a durable movement | Tries to satisfy everyone and delivers too little |
| **Master Their Game** | A reform strategist who bends institutions toward environmental action | Wins influence but loses sight of why he entered politics |
| **Challenge Corporate Power** | A people's champion who forces polluters to answer publicly | Builds a passionate movement that struggles to gain broader support |

These modify the final ending rather than replacing the five outcome endings.

### Recurring Political Cast

| Character | Role | What they pressure Carpter to consider |
| --- | --- | --- |
| Miss June Broussard | Campaign manager and coastal voice | Trust, local people, and whether promises feel honest |
| Dr. Anika Reed | Environmental policy adviser | Evidence, long-term impact, and refusing empty action |
| Mr. Bell | Marina owner and early business connection | Money, public image, and political compromise |
| Lena Ortiz | Reporter | Accountability, contradictions, and what the public sees |
| Nia Baptiste | New Orleans councilmember and community advocate | Whether policy protects the people most often ignored |
| Celeste Voss | GulfStar executive and corporate opponent | Whether environmental promises create accountability or merely good publicity |
| Senator Grant Vale | National opponent | Whether delay can be presented as moderation and responsibility |

### Hidden Faction Relationships

- **Coastal communities:** Respond to jobs, protection, honesty, and whether Carpter remembers home.
- **Environmental organizers:** Respond to strong policy, evidence, and resistance to greenwashing.
- **Business interests:** Respond to compromise, stability, and whether Carpter threatens polluters.

These are not additional visible stats. They unlock support, create opposition, and change later dialogue.

## Chapter 1 - The Home That Is Disappearing

**Compass:** Home.

**Purpose:** Carpter forms his campaign around the damaged place that made him run, then learns that political support usually comes with conditions.

**Environmental focus:** Coastal pollution, warming water, and wetland loss.

**Memorable image:** A young fish uses a bottle cap as a dinner plate because it has never known the marsh without plastic.

**Heartfelt beat:** Carpter realizes the youngest animals think the damaged marsh is normal.

**Comic beat:** Carpter's first newspaper appearance sits beside a fried-catfish coupon.

**Campaign Note:** Wetlands provide wildlife habitat and help reduce the effects of storms along coastlines.

**Length:** Approximately 2-3 minutes.

**Balance note:** Stats stay between 0 and 10. Hydration begins higher than the other stats so risky prologue choices cannot immediately end the campaign.

**Chapter budget rule:** Carpter makes one small investment in this chapter. Each policy option costs 1 Fund, so every possible prologue build can afford it.

### Situation Report - The Morning After

The morning after Carpter announces his campaign, Miss June places three newspaper clippings beside his tank.

> Miss June: "Good news. You made the front page."
>
> Carpter: "And the bad news?"
>
> Miss June: "They put you between the weather and a coupon for fried catfish."

**Small prologue callbacks:**

- `grassroots_launch`: The homemade tank has become a symbol among local volunteers.
- `fisher_launch`: Miss June's support makes local fishers willing to hear Carpter out.
- `sponsored_launch`: Mr. Bell expects the campaign to protect the marina's reputation.
- `investigator`: Carpter already has evidence that the refinery may be responsible.

**Report items:**

- Pollution has worsened around the marsh.
- The water is warmer, and part of the marsh where Carpter played has disappeared.
- Younger animals treat plastic caught in the roots as ordinary.
- Local families want jobs and protection from future storms.
- The campaign has attention but no clear first promise.

### Adviser Meeting - What Do We Promise?

Carpter meets with Miss June, marine scientist Dr. Anika Reed, and marina owner Mr. Bell in the back room of a bait shop.

> Dr. Reed: "The marsh needs restoration, monitoring, and time."
>
> Mr. Bell: "Voters do not campaign for monitoring. Promise jobs."
>
> Miss June: "They need both. They also need to believe you mean it."
>
> Dr. Reed: "So what comes first?"

**Major decision:**

| Carpter's response | Private effect | Visible cost | Path point | Promise flag |
| --- | --- | --- | --- | --- |
| **"Begin restoring the worst part of the marsh."** | Ocean Hope +2; Dr. Reed approves; Mr. Bell disapproves | Funds -1 | `system_path` | `promise_restoration` |
| **"Hire local workers to begin rebuilding it."** | Support +1, Ocean Hope +1; Miss June approves | Funds -1 | `people_path` | `promise_green_jobs` |
| **"Fund an investigation and make polluters pay."** | Ocean Hope +1; business relationship falls; unlocks investigation route | Funds -1 | `populist_path` | `promise_polluter_pays` |

### Political Complication - The Parish Offer

Before Carpter's first rally, Parish President Dale Boudreaux offers permits, a stage, and public support. In return, he wants Carpter to avoid naming the refinery.

> Boudreaux: "I can put a crowd in front of you tonight."
>
> Miss June: "And what do you want behind him tomorrow?"
>
> Boudreaux: "Nothing dramatic. Just keep the refinery out of the speech."
>
> Mr. Bell: "A campaign needs friends, Carpter."

**Decision:**

| Carpter's response | Private effect | Resource change | Path point | Story flag |
| --- | --- | --- | --- | --- |
| **"No deal. The refinery stays in the speech."** | Support -1, Ocean Hope +1; Boudreaux relationship falls | None | `populist_path` | `rejected_parish_deal` |
| **"I will focus on the coast, not the company."** | Support +1, Ocean Hope -1; Boudreaux relationship rises | Funds +1 | `people_path` | `accepted_parish_deal` |
| **"Give us the permits. I will choose my own words."** | Requires `human_listener` or `pragmatist`; Support +1; creates later risk | None | `system_path` | `outmaneuvered_boudreaux` |

### Consequence Report - The First Rally

The rally occurs at Bellweather Dock. Its size and tone reflect Carpter's choices.

- Restoration promise: Dr. Reed joins the campaign publicly.
- Green-jobs promise: Coastal workers bring handmade campaign signs.
- Polluter-pays promise: The refinery issues a statement calling Carpter "an uninformed aquatic agitator."
- Accepted parish deal: The crowd is larger, but Lena notices the refinery was never mentioned.
- Rejected parish deal: The stage permit disappears; Miss June turns an old boat trailer into a platform.
- Outmaneuvered Boudreaux: Carpter names pollution without naming the refinery. Boudreaux applauds very slowly.

**Closing dialogue:**

> Lena: "You made promises today. Which one matters most?"
>
> Carpter: "The one I can still keep when keeping it becomes difficult."

Transition to Chapter 2, where the campaign must decide whose support it is willing to accept.

## Chapter 2 - Nobody Takes You Seriously

**Compass:** Attention.

**Purpose:** Carpter tries to turn public attention into a coalition without allowing the environmental issue to become a joke or marketing prop.

**Environmental focus:** Plastic pollution and public awareness.

**Memorable image:** A campaign poster hangs from the broken dock beside plastic that nobody has bothered to remove.

**Heartfelt beat:** A local child named Maya takes Carpter seriously before most adults do.

**Comic beat:** A pelican stands behind the podium for the entire rally and is repeatedly mistaken for Carpter's running mate.

**Campaign Note:** Plastic can persist in the environment, break into smaller pieces, and harm wildlife.

**Length:** Approximately 2-3 minutes.

**Chapter budget rule:** A basic campaign operation costs 1 Fund. A stronger coastwide operation costs 2 Funds and may be unavailable after an expensive start.

### Situation Report - The Broken Dock

Bellweather Dock becomes Carpter's first campaign office. Miss June keeps the papers dry. Dr. Reed is less successful.

> Miss June: "People are talking about you."
>
> Carpter: "Are they listening?"
>
> Maya: "I am."
>
> Lena: "The adults are arguing about whether the pelican is your running mate."

**Chapter 1 callbacks:**

- `promise_restoration`: Early restoration work has begun, but volunteers need equipment.
- `promise_green_jobs`: Coastal workers ask when hiring will begin.
- `promise_polluter_pays`: The refinery refuses Carpter's request for records.
- `accepted_parish_deal`: Boudreaux expects a friendly seat near the stage.
- `rejected_parish_deal`: The parish denies use of the public hall.
- `outmaneuvered_boudreaux`: Boudreaux warns Carpter not to embarrass him again.

**Report items:**

- Carpter's first promise earned attention, but keeping it requires a larger campaign.
- Photos of Carpter beside the plastic-covered dock are spreading online.
- Some people discuss the pollution. Others only share fish jokes.
- Supporters are offering help for different reasons.
- The campaign must decide how much it can afford to expand.

### Adviser Meeting - How Far Do We Reach?

> Miss June: "We can organize the next rally ourselves. Small, but honest."
>
> Mr. Bell: "Or buy enough advertising to make the dock famous."
>
> Dr. Reed: "I would prefer they notice the plastic beneath the poster."
>
> Miss June: "Then perhaps we take the plan to them."

**Campaign investment:**

| Carpter's response | Private effect | Visible cost | Path point | Operation flag |
| --- | --- | --- | --- | --- |
| **"Organize a rally and cleanup here at the dock."** | Support +1, Ocean Hope +1 | Funds -1 | `people_path` | `operation_dock_rally` |
| **"Take the campaign and this evidence along the whole coast."** | Support +2, Ocean Hope +1; stronger coastal relationship | Funds -2 | `populist_path` | `operation_coastal_tour` |
| **"Buy the airtime. Make sure they see the polluted dock."** | Support +2; business relationship rises; Dr. Reed disapproves | Funds -1 | `system_path` | `operation_ad_campaign` |

The coastwide tour remains visible but unavailable when Carpter has fewer than 2 Funds.

### Political Complication - Three Endorsements

Before the rally, three groups offer their support. Carpter can publicly accept one endorsement.

> Lena: "Three groups want to stand behind you tonight."
>
> Miss June: "The coastal workers want jobs that will last."
>
> Dr. Reed: "Blue Tide wants environmental promises that will last."
>
> Mr. Bell: "And the Gulf Commerce Council has money that will last."

**Decision:**

| Carpter's response | Private effect | Resource change | Path point | Endorsement flag |
| --- | --- | --- | --- | --- |
| **"The coastal workers built this place. They stand with us."** | Support +2; coastal relationship rises; business relationship falls slightly | Funds +1 | `people_path` | `endorsed_workers` |
| **"Blue Tide kept this crisis visible. They stand with us."** | Ocean Hope +2; environmental relationship rises; business relationship falls | Funds +1 | `populist_path` | `endorsed_blue_tide` |
| **"We need the Commerce Council's resources."** | Support +1; business relationship rises; environmental relationship falls | Funds +2 | `system_path` | `endorsed_commerce` |
| **"No group gets to own this campaign."** | Ocean Hope +1; all faction relationships fall slightly | None | `populist_path` | `rejected_endorsements` |

**Conditional reactions:**

- `promise_green_jobs` + `endorsed_workers`: Workers trust Carpter's promise and begin organizing future rallies.
- `promise_restoration` + `endorsed_blue_tide`: Dr. Reed calls the endorsement proof that the campaign is serious.
- `accepted_parish_deal` + `endorsed_blue_tide`: Blue Tide questions why Carpter avoided naming the refinery.
- `sponsored_launch` + `endorsed_commerce`: Mr. Bell begins speaking about the campaign as if he helped invent it.
- `firebrand` + `endorsed_commerce`: Miss June asks Carpter whether he still recognizes his own campaign.

### Consequence Report - The Coalition Forms

- Dock rally: The event is modest, but local supporters feel heard.
- Coastal tour: Carpter displays plastic collected from each stop and returns with an exhausted filter.
- Advertising campaign: The slogan **A FRESH VOICE FROM FRESH WATER** appears everywhere. Dr. Reed notes that Carpter is not a freshwater fish.
- Workers endorsement: Union dues and organizers strengthen the campaign, but workers expect Carpter to protect coastal livelihoods.
- Blue Tide endorsement: Small donors and volunteers offer resources and scrutiny in equal measure.
- Commerce endorsement: Donations arrive with a twelve-page list of suggested positions.
- No endorsement: Carpter keeps his independence, but the campaign remains thinly staffed.

**Closing dialogue:**

> Lena: "Does accepting support mean accepting influence?"
>
> Carpter: "Only if I forget why they offered it."

Transition to Chapter 3 in New Orleans, where Carpter must decide who receives protection when the budget cannot cover everyone.

## Chapter 3 - The Ocean Reaches the City

**Compass:** Shared Survival.

**Purpose:** Carpter learns that environmental damage threatens human homes, work, culture, and safety too, then must decide what protection means when resources are limited.

**Environmental focus:** Flooding, storms, wetland loss, and climate justice.

**Memorable image:** Water marks climb the walls behind bright music posters and family photographs.

**Heartfelt beat:** Carpter sees humans as creatures trying not to drown too.

**Comic beat:** The shelter keeps offering Carpter bottled water, and Miss June keeps politely explaining the scale problem.

**Campaign Note:** Wetlands and other natural barriers can help reduce flooding and storm impacts, but protection is often unevenly distributed.

**Length:** Approximately 3 minutes.

**Chapter budget rule:** Strong regional plans cost 2 Funds. A limited emergency response costs nothing but creates little lasting protection.

### Situation Report - New Orleans

Heavy rain floods several streets before Carpter's New Orleans event. Councilmember Nia Baptiste meets the campaign inside a crowded neighborhood shelter.

> Nia: "The pumps failed again."
>
> Miss June: "Which neighborhoods?"
>
> Nia: "The same ones they always fail first."
>
> A volunteer: "Does the candidate need bottled water?"
>
> Miss June: "Only if you have several hundred."

**Earlier-choice callbacks:**

- `promise_restoration`: Dr. Reed argues that stronger wetlands would reduce future danger.
- `promise_green_jobs`: Coastal workers offer trained crews if Carpter funds the work.
- `promise_polluter_pays`: Blue Tide asks why companies near the river are not paying.
- `endorsed_workers`: Workers can carry out one plan more effectively.
- `endorsed_blue_tide`: Environmental volunteers bring maps and public pressure.
- `endorsed_commerce`: Business donors want the port and tourist districts protected first.
- `rejected_endorsements`: The campaign arrives independent but short on staff.

**Report items:**

- Residents need immediate shelter and long-term protection.
- Wetland loss and weak infrastructure increase future risk.
- The city offers help, but its priorities favor wealthier districts.
- Carpter's campaign is no longer speaking only for marine life.

### Adviser Meeting - What Gets Protected First?

> Nia: "I can move money today, but not enough for everything."
>
> Dr. Reed: "Restore the natural barriers before the next storm."
>
> Mr. Bell: "Protect the port. If the economy stops, every plan stops."
>
> Miss June: "People are standing in water now."

**Major decision:**

| Carpter's response | Private effect | Visible cost | Path point | Plan flag |
| --- | --- | --- | --- | --- |
| **"Build neighborhood shelters and repair the worst pumps."** | Support +2, Ocean Hope +1; coastal relationship rises | Funds -2 | `people_path` | `plan_neighborhoods` |
| **"Restore wetlands and strengthen the natural barriers."** | Ocean Hope +2, Support +1; Dr. Reed approves | Funds -2 | `populist_path` | `plan_wetlands` |
| **"Protect the port, then use its revenue to fund the rest."** | Support +1, Funds +1 later; business relationship rises; vulnerable residents feel ignored | Funds -2 | `system_path` | `plan_port_first` |
| **"Open temporary shelters with what we already have."** | Support +1; no long-term protection; Nia is disappointed | No cost | None | `plan_emergency_only` |

**Conditional improvements:**

- `endorsed_workers` + `plan_neighborhoods`: Support +1 because trained crews begin immediately.
- `promise_restoration` + `plan_wetlands`: Ocean Hope +1 because earlier work connects to the new plan.
- `endorsed_commerce` + `plan_port_first`: The later Funds return increases from +1 to +2.

### Political Complication - The Riverfront Deal

City power broker Victor Landry offers to cover part of Carpter's plan if a luxury riverfront development receives priority protection.

> Landry: "Protect the riverfront, and I can find the money."
>
> Nia: "That money was missing until his buildings needed it."
>
> Landry: "That is an unfairly accurate way to say it."
>
> Miss June: "What do we tell him?"

**Standard decisions:**

| Carpter's response | Private effect | Resource change | Path point | Story flag |
| --- | --- | --- | --- | --- |
| **"Take the deal, but the shelters stay first."** | Support +1; Nia remains cautious; Landry relationship rises | Funds +1 | `people_path` | `accepted_riverfront_deal` |
| **"Take the money. We can fight over priorities later."** | Business relationship rises; Ocean Hope -1; Nia disapproves | Funds +2 | `system_path` | `deferred_riverfront_fight` |
| **"No. Protection is not a luxury product."** | Ocean Hope +1, Support +1; business relationship falls | None | `populist_path` | `rejected_riverfront_deal` |

**Dominant-path special response:**

| Required path | Special response | Effect | Story flag |
| --- | --- | --- | --- |
| **Stand With the People** | **"Nia, bring residents and businesses into one public agreement."** | Funds +1, Support +1; shared plan prevents Landry from controlling priorities | `community_resilience_agreement` |
| **Master Their Game** | **"Your tax agreement already requires public flood funding. Honor it."** | Funds +2; Landry relationship falls; no priority concession | `enforced_riverfront_clause` |
| **Challenge Corporate Power** | **"Open your books, Victor. Let the city see who has been paying and who has not."** | Support +2, Funds +1; business relationship falls sharply | `opened_landry_books` |

### Consequence Report - After the Rain

- Neighborhood plan: Shelters and repaired pumps protect vulnerable residents first.
- Wetlands plan: Immediate relief is slower, but the coast begins rebuilding its natural defenses.
- Port-first plan: The economy steadies while residents question when their turn will come.
- Emergency-only plan: Volunteers prevent the worst outcome, but the next storm remains a threat.
- Accepted riverfront deal: More work becomes possible, though Landry claims credit.
- Deferred fight: The campaign has money, and Nia has doubts.
- Rejected deal: Carpter earns trust but leaves New Orleans with fewer resources.
- Path-special responses: Carpter's political identity becomes visible to the national press for the first time.

**Closing dialogue:**

> Nia: "You cannot stop the water with a speech."
>
> Carpter: "No. Humans are creatures trying not to drown too."
>
> Nia: "Put that in the next speech."

Transition to Chapter 4 in Factory Town, where Carpter must confront the corporation tied to the pollution near his home.

## Chapter 4 - The Greenwashing Machine

**Compass:** Corruption.

**Purpose:** Carpter discovers that GulfStar Petrochemical, the company tied to pollution near his home, is using environmental language to avoid responsibility.

**Environmental focus:** Industrial pollution, greenwashing, and corporate influence.

**Memorable image:** A cheerful **SAVE THE OCEAN DAY** banner hides a polluted discharge pipe.

**Heartfelt beat:** Carpter recognizes the same oily shimmer he saw in the marsh.

**Comic beat:** GulfStar's executive proudly explains that the company logo is now "thirty percent bluer."

**Campaign Note:** Greenwashing uses environmental language or imagery to appear responsible without matching action.

**Length:** Approximately 3 minutes.

**Chapter budget rule:** A thorough independent investigation costs 2 Funds. Smaller evidence efforts cost 1 Fund or rely on earlier work.

### Situation Report - Save the Ocean Day

GulfStar invites Carpter to its Factory Town headquarters for **Save the Ocean Day**. Employees wear blue shirts while a pipe behind the stage releases dark water.

> Executive Celeste Voss: "GulfStar is changing."
>
> Lena: "What changed?"
>
> Voss: "Our logo is now thirty percent bluer."
>
> Carpter: "The water is thirty percent darker."

**Earlier-choice callbacks:**

- `refinery_witness`: Carpter immediately recognizes the smell and oily shimmer from childhood.
- `investigator`: Carpter already knows where part of the discharge travels.
- `promise_polluter_pays`: GulfStar has prepared a legal response specifically for Carpter.
- `endorsed_workers`: Factory workers quietly offer testimony about unsafe practices.
- `endorsed_blue_tide`: Blue Tide brings water-testing volunteers.
- `endorsed_commerce`: The Commerce Council warns Carpter not to embarrass a major employer.
- `opened_landry_books`: Lena arrives ready to follow the money.

**Report items:**

- GulfStar funds local jobs and several environmental advertisements.
- Waste from the factory may be connected to the refinery canal near Carpter's home.
- Workers fear pollution and job losses at the same time.
- The campaign needs evidence before making a national accusation.

### Adviser Meeting - How Do We Prove It?

> Dr. Reed: "We need independent samples and records."
>
> Miss June: "Workers know what happens here. They need protection before they speak."
>
> Mr. Bell: "Or we meet with GulfStar privately and get something useful."
>
> Carpter: "Something useful for whom?"

**Major decision:**

| Carpter's response | Private effect | Visible cost | Path point | Evidence flag |
| --- | --- | --- | --- | --- |
| **"Protect the workers and collect their testimony."** | Support +2, Ocean Hope +1; workers relationship rises | Funds -1 | `people_path` | `evidence_workers` |
| **"Hire independent scientists and trace the discharge."** | Ocean Hope +3; strongest evidence; Dr. Reed approves | Funds -2 | `populist_path` | `evidence_science` |
| **"Audit GulfStar's permits and public contracts."** | Ocean Hope +1, Support +1; creates legal leverage | Funds -1 | `system_path` | `evidence_audit` |
| **"Use the evidence we already have."** | Available with `investigator` or `refinery_witness`; Ocean Hope +1; evidence remains incomplete | No cost | None | `evidence_existing` |
| **"Make the accusation without waiting."** | Support +1; weak evidence creates debate vulnerability | No cost | `populist_path` | `evidence_unproven` |

**Conditional improvements:**

- `endorsed_workers` + `evidence_workers`: Testimony becomes strong evidence instead of moderate evidence.
- `endorsed_blue_tide` + `evidence_science`: The investigation costs only 1 Fund.
- `outmaneuvered_boudreaux` + `evidence_audit`: Parish records reveal a hidden permit exception.

**Evidence strength for Chapter 5:**

- **Strong:** Independent science, improved worker testimony, or improved permit audit. Unlocks a decisive debate response.
- **Moderate:** Standard worker testimony, standard permit audit, or existing evidence. Supports Carpter but leaves room for attack.
- **Weak:** Unproven accusation. GulfStar and Carpter's opponent can challenge his credibility.

### Political Complication - The GulfStar Partnership

Voss offers campaign funding and a cleanup commitment if Carpter calls GulfStar a "partner in progress" and avoids discussing its past pollution.

> Voss: "We can fund cleanup, jobs, and your campaign."
>
> Miss June: "That is a lot of help arriving very late."
>
> Voss: "Late help is still help."
>
> Carpter: "So is late accountability."

**Standard decisions:**

| Carpter's response | Private effect | Resource change | Path point | Story flag |
| --- | --- | --- | --- | --- |
| **"Sign a public cleanup agreement with worker protections."** | Ocean Hope +1, Support +1; GulfStar remains influential; workers gain protection | Funds +1 | `people_path` | `gulfstar_public_agreement` |
| **"Take the partnership. We will use their money against the problem."** | Support +1, Ocean Hope -2; business relationship rises; creates hypocrisy attack | Funds +3 | `system_path` | `gulfstar_partnership` |
| **"No partnership. We release the evidence."** | Ocean Hope +2, Support +1; business relationship falls sharply | None | `populist_path` | `gulfstar_exposed` |

**Dominant-path special response:**

| Required path | Special response | Effect | Story flag |
| --- | --- | --- | --- |
| **Stand With the People** | **"The workers, residents, and GulfStar will negotiate in public."** | Funds +1, Support +2; cleanup and job protections become binding | `gulfstar_public_table` |
| **Master Their Game** | **"Sign the cleanup fund. The evidence stays with my lawyers."** | Funds +2, Ocean Hope +1; Carpter gains leverage but risks appearing secretive | `gulfstar_leverage_deal` |
| **Challenge Corporate Power** | **"Keep the check. Your workers and our evidence will speak instead."** | Support +2, Ocean Hope +2; business relationship collapses | `gulfstar_showdown` |

### Consequence Report - Behind the Banner

- Worker testimony: Employees become part of the environmental story instead of being treated as the enemy.
- Scientific evidence: GulfStar's link to the polluted canal becomes difficult to deny.
- Permit audit: GulfStar's influence over local regulation becomes visible.
- Existing evidence: Carpter has a credible story, but GulfStar can challenge details.
- Unproven accusation: The crowd responds, while Lena warns that the claim must survive scrutiny.
- Public agreement: Cleanup begins, but GulfStar prints **PARTNER OF CARPTER** beneath its blue logo.
- Partnership: The campaign gains major resources and a contradiction opponents will use later.
- Exposure: GulfStar loses control of the story and prepares a national counterattack.
- Path-special responses: Carpter's dominant political identity becomes central to how the country understands him.
- Evidence strength determines whether Carpter enters the national debate with proof, a credible case, or only an accusation.

**Closing dialogue:**

> Lena: "Do you believe GulfStar cares about the ocean?"
>
> Carpter: "I believe they care that the ocean can vote now."

Transition to Chapter 5, the national debate, where Carpter must defend his record against GulfStar's allies and a polished human opponent.

## Chapter 5 - The Delay Machine

**Compass:** Truth vs Delay.

**Purpose:** Carpter reaches the national stage and must prove that his campaign is more than a joke while defending the choices and compromises he already made.

**Environmental focus:** Climate delay, lobbying, and excuses for inaction.

**Memorable image:** Senator Grant Vale stands at a normal podium while Carpter's podium contains a filter and an emergency backup bucket.

**Heartfelt beat:** The audience stops laughing when Carpter describes the marsh where he grew up.

**Comic beat:** The subtitle machine briefly translates `Blub` as `Undecided voter noises`.

**Campaign Note:** Climate delay accepts that a problem exists while arguing against meaningful action now.

**Length:** Approximately 3 minutes.

**Debate rule:** The debate uses a temporary hidden **Debate Momentum** score. Strong and earned responses add more Momentum. The final score changes Support and which national opportunities appear in Chapter 6.

### Situation Report - Before the Cameras

Carpter arrives at the national debate studio. Senator Grant Vale, a polished candidate backed by GulfStar allies, waits across the stage.

> Miss June: "They put an emergency bucket under your podium."
>
> Carpter: "Thoughtful."
>
> Dr. Reed: "It says 'break glass in case of democracy.'"
>
> Miss June: "Still thoughtful."

**Record callbacks:**

- Strong GulfStar evidence unlocks a decisive proof-based response.
- Moderate evidence supports Carpter but leaves room for challenge.
- Weak evidence lets Vale attack Carpter's credibility.
- `gulfstar_partnership` gives Vale a strong hypocrisy attack.
- `gulfstar_exposed` or `gulfstar_showdown` makes GulfStar fund ads against Carpter.
- `plan_emergency_only` lets Vale argue Carpter makes speeches without lasting plans.
- Stronger Chapter 3 plans let Carpter point to results.

### Adviser Meeting - How Do We Prepare?

> Miss June: "Talk like the fish that people already trust."
>
> Dr. Reed: "Use the evidence. Make delay impossible to defend."
>
> Mr. Bell: "Look presidential. Try not to accuse the moderator."
>
> Carpter: "Was that happening often enough to mention?"

**Debate preparation:**

| Carpter's response | Private effect | Visible cost | Path point | Prep flag |
| --- | --- | --- | --- | --- |
| **"Hold town halls and bring people's stories with us."** | Starts with Debate Momentum +1; unlocks community testimony response | Funds -2 | `people_path` | `prep_town_halls` |
| **"Build a policy book they cannot dismiss."** | Starts with Debate Momentum +1; weak evidence counts as moderate during debate | Funds -3 | `system_path` | `prep_policy_book` |
| **"Show the country who profits from delay."** | Starts with Debate Momentum +1; unlocks corporate-delay response | Funds -3 | `populist_path` | `prep_delay_campaign` |
| **"We use the record we already built."** | No starting bonus; all previously earned responses remain available | No cost | None | `prep_existing_record` |

### Debate Round 1 - Jobs and the Economy

> Vale: "Carpter's environmental promises may sound noble, but working families cannot survive on noble intentions."
>
> Moderator: "Candidate Carpter, your response?"

| Response card | Requirement | Effect |
| --- | --- | --- |
| **"Working families are already paying for polluted water and failed protection."** | Always available | Debate Momentum +1, Support +1 |
| **"Ask the families we met whether delay has been affordable."** | `prep_town_halls` | Debate Momentum +2, Support +1 |
| **"Jobs restoring wetlands are still jobs."** | `promise_green_jobs`, `endorsed_workers`, or `plan_wetlands` | Debate Momentum +2, Ocean Hope +1 |
| **"The port is stronger when the coast protecting it is stronger."** | `plan_port_first` or `system_path` dominant | Debate Momentum +2; business relationship rises slightly |
| **"My opponent is worried about jobs. His donors are worried about profits."** | `populist_path` dominant or `prep_delay_campaign` | Debate Momentum +2; business relationship falls |

**Potential attack:** If Carpter accepted GulfStar's partnership, Vale notes that Carpter's largest corporate partner apparently agrees with him. Carpter loses Debate Momentum -1 unless he has `gulfstar_leverage_deal`.

### Debate Round 2 - Evidence and Responsibility

> Vale: "My opponent has accused a major employer of poisoning his home. Accusations are not evidence."
>
> The audience turns toward Carpter.

| Response card | Requirement | Effect |
| --- | --- | --- |
| **"Then let us discuss GulfStar's discharge records."** | Strong evidence | Debate Momentum +3, Ocean Hope +1 |
| **"Here is what the workers, records, and samples already show."** | Moderate or strong evidence | Debate Momentum +2 |
| **"Workers and residents deserve answers, not threats."** | Worker evidence, public agreement, or `people_path` dominant | Debate Momentum +2, Support +1 |
| **"Their own permits prove they broke the rules."** | Audit evidence, `gulfstar_leverage_deal`, or `system_path` dominant | Debate Momentum +2, Ocean Hope +1 |
| **"A blue logo does not make dark water clean."** | Always available | Debate Momentum +1 |
| **"Everyone knows what GulfStar did."** | Weak evidence only | Debate Momentum -1; Vale calls the claim reckless |

**Partnership response:** If Carpter accepted `gulfstar_partnership`, he must also answer why he took GulfStar's money.

- **"I took their money and made them begin cleanup."** Debate Momentum +1, but Ocean Hope -1.
- **"It was a mistake."** Debate Momentum +1, Support -1; marks the partnership as rejected going forward.
- **"That question is a distraction."** Debate Momentum -2.

### Debate Round 3 - Seriousness and Delay

> Vale: "At some point, this country must decide whether it wants leadership or a symbol."
>
> The subtitle machine displays: **BLUB: UNDECIDED VOTER NOISES**
>
> Miss June: "We are firing that machine."

| Response card | Requirement | Effect |
| --- | --- | --- |
| **"I entered politics because my home was disappearing while leaders asked for more time."** | Always available; wording changes with Carpter's childhood choice | Debate Momentum +2, Ocean Hope +1 |
| **"Leadership means bringing people together before the water reaches them."** | `people_path` dominant | Debate Momentum +3, Support +1 |
| **"Leadership means knowing which rule can become a lever."** | `system_path` dominant | Debate Momentum +3; unlocks institutional coalition in Chapter 6 |
| **"Leadership means saying who profits when everyone else is told to wait."** | `populist_path` dominant | Debate Momentum +3, Ocean Hope +1 |
| **"Blub blub, democracy."** | Always available | Debate Momentum +1, Support +1; Hydration -1 |

**Heartfelt variation by childhood:**

- `marsh_child`: Carpter remembers neighbors losing the roots that sheltered them.
- `human_listener`: Carpter remembers hearing humans promise that someone would act eventually.
- `refinery_witness`: Carpter remembers his mother explaining why the rainbow on the water was not beautiful.

### Consequence Report - After the Debate

| Final Debate Momentum | Outcome |
| --- | --- |
| 7 or more | **Clear win:** Support +2; Carpter enters Chapter 6 with national momentum |
| 4-6 | **Credible performance:** Support +1; Carpter is treated as a serious candidate |
| 1-3 | **Mixed performance:** No stat change; the campaign remains competitive but uncertain |
| 0 or less | **Debate loss:** Support -1; Carpter is treated as a novelty by much of the press |

**Additional consequences:**

- Strong evidence forces GulfStar into a national investigation.
- Weak evidence lets GulfStar frame Carpter as reckless.
- Honest acknowledgement of the GulfStar partnership begins repairing environmental trust.
- A dominant-path response makes Carpter's political identity clear to national voters.

**Closing dialogue:**

> Lena: "Do you think they took you seriously?"
>
> Carpter: "For a moment, they forgot to ask whether a fish could lead."
>
> Miss June: "And started asking whether the humans had."

Transition to Chapter 6 in Washington, D.C., where Carpter must turn the campaign into a final national agenda.

## Chapter 6 - Can a System Change?

**Compass:** Change.

**Purpose:** Carpter turns the campaign into a final national agenda and discovers whether winning power, building a movement, or forcing accountability creates the most lasting change.

**Environmental focus:** Policy, responsibility, enforcement, and collective action.

**Memorable image:** Carpter arrives in Washington carried by the coalition the player built, or nearly alone if that coalition fractured.

**Heartfelt beat:** Carpter realizes the campaign was never only about becoming president; it was about making people stop looking away.

**Comic beat:** White House staff spend several minutes debating whether the Oval Office aquarium counts as official housing.

**Campaign Note:** Lasting environmental change usually requires policy, public participation, enforcement, and continued accountability.

**Length:** Approximately 3-4 minutes plus ending.

**Chapter budget rule:** A full national agenda costs 3 Funds. A focused bill costs 2 Funds. A public movement costs no Funds but cannot immediately create federal policy.

### Situation Report - Arrival in Washington

Carpter arrives for the campaign's final event as election results approach.

> Miss June: "Washington prepared an official aquarium."
>
> Carpter: "How official?"
>
> Miss June: "It has a flag, a seal, and three people arguing whether it counts as housing."
>
> Carpter: "Presidential, then."

**Coalition arrival variations:**

- Strong coastal relationship: Workers and families arrive with signs from Louisiana.
- Strong environmental relationship: Blue Tide volunteers carry water samples, maps, and evidence.
- Strong business relationship: Industry representatives offer public support and private suggestions.
- Weak relationships: The final event looks large on television but feels thin behind the cameras.
- Clear debate win: National press treats Carpter as a serious contender.
- Debate loss: Reporters still ask whether the campaign was performance art.

**Report items:**

- Carpter may win office, lose narrowly, or become more influential outside government.
- Earlier promises have created allies, critics, and unfinished work.
- The campaign has enough attention for one final national commitment.

### Adviser Meeting - What Do We Ask the Country to Do?

> Dr. Reed: "A law without enforcement is another promise."
>
> Nia: "Protection must reach people before the next storm."
>
> Miss June: "And it must still sound like the Carpter who left home."
>
> Mr. Bell: "Preferably a Carpter who can count votes."

**Final agenda decision:**

| Carpter's response | Private effect | Visible cost | Path point | Agenda flag |
| --- | --- | --- | --- | --- |
| **"Pass a Coastal Restoration and Resilience Act."** | Ocean Hope +3, Support +1; fulfills restoration and flood promises | Funds -3 | `people_path` | `agenda_coastal_resilience` |
| **"Pass a Polluter Accountability Act."** | Ocean Hope +3; corporate dependence falls; strong evidence improves outcome | Funds -3 | `populist_path` | `agenda_polluter_accountability` |
| **"Build a national clean-jobs and transition program."** | Support +2, Ocean Hope +2; workers and business can cooperate | Funds -3 | `system_path` | `agenda_clean_jobs` |
| **"Pass a focused Clean Water Enforcement Bill."** | Ocean Hope +2; narrower but achievable policy | Funds -2 | None | `agenda_clean_water` |
| **"Turn the campaign into a national environmental movement."** | Support +1, Ocean Hope +1; strengthens non-government ending | No cost | None | `agenda_movement` |

**Conditional improvements:**

- `promise_restoration` or `plan_wetlands` improves `agenda_coastal_resilience`.
- Strong evidence improves `agenda_polluter_accountability`.
- `promise_green_jobs` or `endorsed_workers` improves `agenda_clean_jobs`.
- `system_path` dominant plus institutional coalition improves any legislative agenda.
- `people_path` dominant improves coalition support for any agenda.
- `populist_path` dominant improves public pressure for accountability agendas.

### Final Political Test - Who Gets a Seat?

Before the final speech, Carpter must decide who helps present the agenda to the country.

> Lena: "Everyone wants to stand beside you."
>
> Miss June: "Some of them even wanted to before the cameras arrived."
>
> Carpter: "Who actually helped carry us here?"

**Decision:**

| Carpter's response | Private effect | Path point | Coalition flag |
| --- | --- | --- | --- |
| **"Workers, residents, scientists, and honest businesses all take the stage."** | Support +2; requires at least two non-hostile faction relationships | `people_path` | `final_broad_coalition` |
| **"Our advisers and institutional partners present a governing plan."** | Support +1; improves legislation chance; may feel distant from movement | `system_path` | `final_governing_coalition` |
| **"The people harmed by pollution stand at the front."** | Ocean Hope +2, Support +1; business relationship falls | `populist_path` | `final_people_front` |
| **"I make the final case alone."** | Support +1 if debate was won; otherwise no benefit | None | `final_solo_speech` |

**Dominant-path special response:**

| Required path | Special response | Effect | Coalition flag |
| --- | --- | --- | --- |
| **Stand With the People** | **"Everyone who carried this campaign gets a voice, not just a place on stage."** | Support +2, Ocean Hope +1; coalition remains active after election | `final_shared_governance` |
| **Master Their Game** | **"Put the votes, funding, and enforcement commitments in writing tonight."** | Ocean Hope +2; greatly improves legislative delivery | `final_written_commitments` |
| **Challenge Corporate Power** | **"Let the country hear the workers and families corporations expected to stay quiet."** | Support +2, Ocean Hope +2; corporate opposition intensifies | `final_public_testimony` |

### Election and Ending Calculator

Resolve the ending in this order:

1. **Hydration check**
   - If Hydration is 0 and Carpter built a strong coalition: resolve as **Movement Leader**, with Carpter recovering while others carry the speech.
   - If Hydration is 0 without a strong coalition: resolve as **Forgotten Campaign**.
2. **Corporate dependence check**
   - If GulfStar partnership remains active, Ocean Hope is 3 or lower, and business influence is high: **Corporate Puppet**.
   - Admitting the partnership was a mistake during the debate deactivates this check but does not erase its other consequences.
3. **Victory check**
   - If Support is 8 or higher, Ocean Hope is 6 or higher, and Debate Momentum was at least 4: **President Carpter**.
4. **Movement check**
   - If Ocean Hope is 7 or higher, or the movement agenda/shared-governance coalition was chosen: **Movement Leader**.
5. **Meme check**
   - If Support is 7 or higher and Ocean Hope is 4 or lower: **Meme Candidate**.
6. **Otherwise**
   - **Forgotten Campaign**.

### Ending Variations

#### President Carpter

Carpter wins and attempts the selected national agenda.

- Strong coalition and matching prior promises: The agenda begins with broad support.
- Weak coalition or broken promises: Carpter wins office but struggles to turn attention into law.
- `agenda_movement`: Carpter enters office promising to govern with the movement rather than above it.

**Comic image:** The Oval Office aquarium receives a small presidential desk.

#### Movement Leader

Carpter loses the election or falls short of office, but the campaign becomes a durable national environmental movement.

- High Ocean Hope: Communities continue projects Carpter began.
- Strong evidence: GulfStar faces accountability even without Carpter in office.
- Strong coalition: Workers, residents, and organizers keep working together.

**Heartfelt image:** Maya watches younger children carry homemade Carpter signs beside a cleaner dock.

#### Meme Candidate

Carpter becomes famous, but the environmental message is reduced to slogans, clips, and merchandise.

- The subtitle-machine clip becomes more famous than any policy.
- Carpter must decide whether to use the attention to rebuild or watch it fade.

**Critical message:** Awareness without action is not enough.

#### Corporate Puppet

Carpter reaches Washington with money and influence but loses control of the campaign's purpose.

- GulfStar advertises its partnership everywhere.
- Earlier evidence and promises return as accusations of hypocrisy.
- Carpter may still begin repairing trust if he admitted the mistake during the debate.

**Satirical image:** GulfStar's logo appears on the official presidential aquarium.

#### Forgotten Campaign

The campaign fades after failing to build enough support or environmental impact.

- Small local improvements remain.
- Miss June keeps the original campaign sign at Bellweather Dock.
- The ending remains sad but not hopeless: someone has begun asking different questions.

### Political-Path Ending Tone

Apply one variation to the selected ending:

- **Stand With the People:** Carpter is remembered for building a coalition broader than himself.
- **Master Their Game:** Carpter is remembered for learning how power works and using it, with the final tone depending on whether he kept his purpose.
- **Challenge Corporate Power:** Carpter is remembered for making powerful polluters answer publicly, with the final tone depending on whether he built enough allies.
- **No dominant path:** Carpter is remembered as difficult to define, with a record shaped more by individual decisions than one political identity.

### Final Scene

The exact location changes with the ending, but Carpter returns mentally or physically to the Louisiana marsh.

> Miss June: "Was all this really about becoming president?"
>
> Carpter looks toward the water.
>
> Carpter: "It was about making them stop looking away."

## Chapter Outline Template

For each chapter, record:

- What changes for Carpter
- The environmental issue being explored
- The main political or moral choice
- The intended emotional beat
- How each choice affects later scenes

Do not write final dialogue until the chapter's purpose and choices are clear.
