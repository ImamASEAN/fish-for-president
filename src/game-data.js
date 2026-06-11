const places = {
  louisiana: { x: 550, y: 470, zoom: 1.45 },
  newOrleans: { x: 590, y: 470, zoom: 1.7 },
  texas: { x: 455, y: 430, zoom: 1.35 },
  pennsylvania: { x: 790, y: 225, zoom: 1.55 },
  washington: { x: 815, y: 265, zoom: 1.8 },
  national: { x: 480, y: 295, zoom: 1 }
};

const go = (id, label, nextScene, extra = {}) => ({ id, label, nextScene, ...extra });
const dialogue = (...lines) => lines.map(([speaker, text]) => ({ speaker, text }));
const scene = (id, chapter, title, location, map, choices, extra = {}) => ({
  id, chapter, title, location, map, choices, showStats: chapter !== "Prologue", ...extra
});

export const CHAPTER_CARDS = {
  ch1_report: {
    number: "Chapter One",
    title: "Fish Out of Water",
    subtitle: "Before Carpter can change the country, he must convince it to notice his home."
  },
  ch2_report: {
    number: "Chapter Two",
    title: "A Current of Attention",
    subtitle: "Being seen is easy. Making people look at the problem is harder."
  },
  ch3_report: {
    number: "Chapter Three",
    title: "When the Ocean Comes Inland",
    subtitle: "The campaign reaches a city already learning what rising water costs."
  },
  ch4_report: {
    number: "Chapter Four",
    title: "Thirty Percent Bluer",
    subtitle: "A corporation discovers that changing its logo is cheaper than changing its behavior."
  },
  ch5_report: {
    number: "Chapter Five",
    title: "The Comfortable Delay",
    subtitle: "Three candidates explain why the country should act now, later, or after another committee."
  },
  ch6_report: {
    number: "Chapter Six",
    title: "The Road to Washington",
    subtitle: "Carpter reaches the capital carrying every promise made along the way."
  }
};

export const BRIEFINGS = {
  ch1_report: {
    label: "Wetland Loss",
    stat: "About 2,000 square miles of Louisiana land were lost from 1932 to 2016.",
    context: "Wetlands shelter wildlife, communities, and infrastructure while helping reduce storm impacts.",
    source: "USGS and Louisiana Coastal Protection and Restoration Authority",
    sourceUrl: "https://pubs.usgs.gov/publication/sim3381",
    image: "wetlands"
  },
  ch2_report: {
    label: "Plastic Pollution",
    stat: "The United States generated about 35.7 million tons of plastic in 2018.",
    context: "Plastic persists, breaks into smaller pieces, and can harm wildlife long after a campaign poster comes down.",
    source: "U.S. Environmental Protection Agency",
    sourceUrl: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/plastics-material-specific-data",
    image: "plastic"
  },
  ch3_report: {
    label: "Flood Protection",
    stat: "A single acre of wetland can typically store about one million gallons of water.",
    context: "Natural barriers and public infrastructure both matter, but protection is not distributed equally.",
    source: "U.S. Environmental Protection Agency",
    sourceUrl: "https://www3.epa.gov/owow/RealEstate/reading/Flooding.pdf",
    image: "flooding"
  },
  ch4_report: {
    label: "Greenwashing",
    stat: "Environmental marketing claims should be specific, clear, and supported by reliable evidence.",
    context: "Greenwashing makes an organization appear environmentally responsible without matching action.",
    source: "U.S. Federal Trade Commission Green Guides",
    sourceUrl: "https://www.ftc.gov/business-guidance/resources/environmental-claims-summary-green-guides",
    image: "industry"
  },
  ch5_report: {
    label: "Climate Delay",
    stat: "Delay arguments often acknowledge environmental harm while opposing meaningful action now.",
    context: "The debate is no longer only whether a problem exists, but who benefits when solutions are postponed.",
    source: "Environmental communication research summarized in the campaign",
    sourceUrl: "https://doi.org/10.1017/sus.2020.13",
    image: "debate"
  },
  ch6_report: {
    label: "Building Change",
    stat: "Clean-energy employment grew by 142,000 jobs in 2023, more than twice the rate of overall U.S. employment growth.",
    context: "Lasting change needs policy, workers, enforcement, funding, and public accountability.",
    source: "U.S. Department of Energy, 2024 USEER",
    sourceUrl: "https://www.energy.gov/node/4844205",
    image: "policy"
  }
};

export const PROMISES = [
  {
    id: "marsh",
    title: "Protect Carpter's Marsh",
    selected: ["promise_restoration", "promise_green_jobs", "promise_polluter_pays"],
    fulfilled: ["agenda_coastal_resilience", "agenda_polluter_accountability", "agenda_clean_jobs"],
    compromised: ["accepted_parish_deal", "gulfstar_partnership"]
  },
  {
    id: "attention",
    title: "Turn Attention Into Action",
    selected: ["operation_dock_rally", "operation_coastal_tour", "operation_ad_campaign"],
    fulfilled: ["final_shared_governance", "final_public_testimony", "agenda_movement"],
    compromised: ["endorsed_commerce"]
  },
  {
    id: "flooding",
    title: "Protect Communities From Flooding",
    selected: ["plan_neighborhoods", "plan_wetlands", "plan_port_first", "plan_emergency_only"],
    fulfilled: ["agenda_coastal_resilience"],
    compromised: ["plan_emergency_only", "deferred_riverfront_fight"]
  },
  {
    id: "gulfstar",
    title: "Hold GulfStar Accountable",
    selected: ["evidence_workers", "evidence_science", "evidence_audit", "evidence_existing", "evidence_unproven"],
    fulfilled: ["gulfstar_exposed", "gulfstar_showdown", "agenda_polluter_accountability"],
    compromised: ["gulfstar_public_agreement", "gulfstar_partnership", "gulfstar_leverage_deal"]
  },
  {
    id: "agenda",
    title: "Deliver a National Environmental Agenda",
    selected: ["agenda_coastal_resilience", "agenda_polluter_accountability", "agenda_clean_jobs", "agenda_clean_water", "agenda_movement"],
    fulfilled: ["final_written_commitments", "final_shared_governance"],
    compromised: ["final_solo_speech"]
  }
];

export const NEWS = [
  { chapter: 1, state: "LA", title: "A Fish Enters Politics", text: "Local reporters remain divided on whether Carpter needs a birth certificate or a fishing license." },
  { chapter: 2, state: "FL", title: "Plastic Coast", text: "Volunteers collect bags of plastic while a campaign poster asks voters to keep the ocean in mind." },
  { chapter: 3, state: "TX", title: "Water At The Door", text: "Flooded neighborhoods ask why protection always arrives first where property values are highest." },
  { chapter: 4, state: "OH", title: "Workers Speak", text: "Industrial workers say clean water and good jobs should not be presented as enemies." },
  { chapter: 5, state: "PA", title: "Three-Way Debate", text: "Grant Vale attacks regulation. Moe Goldberg asks for a spreadsheet. Carpter asks for clean water." },
  { chapter: 6, state: "DC", title: "Election Night", text: "The country prepares to learn whether a fish can carry the Electoral College." }
];

export const scenes = {
  title: scene("title", "A tiny campaign against a rising tide", "Fish for President", "United States", places.national, [
    go("begin", "Begin Carpter's story", "prologue_home")
  ], {
    type: "title", showStats: false, paragraphs: ["The coast has waited long enough.", "Now it is sending a candidate."]
  }),

  prologue_home: scene("prologue_home", "Prologue", "Where Carpter Grew Up", "Louisiana Coast", places.louisiana, [
    go("marsh_child", "The marsh, where every root hid a neighbor.", "prologue_incident", { effects: { support: 1, hydration: 1 }, addFlags: ["marsh_child"] }),
    go("human_listener", "Beneath Bellweather Dock, listening to fishers argue politics.", "prologue_incident", { effects: { support: 2 }, addFlags: ["human_listener"] }),
    go("refinery_witness", "Beside the refinery canal, where rainbows never came from rain.", "prologue_incident", { effects: { oceanHope: 2, hydration: -1 }, addFlags: ["refinery_witness"] })
  ], { paragraphs: ["Before anyone called him a candidate, Carpter was a small fish with a stubborn streak.", "Where did he call home?"] }),

  prologue_incident: scene("prologue_incident", "Prologue", "The Morning Everything Changed", "Louisiana Marsh", places.louisiana, [
    go("organizer", "Call the neighbors. They would face it together.", "prologue_belief", { effects: { support: 2 }, addFlags: ["organizer"] }),
    go("hands_on", "Pull the plastic free. A minnow was trapped.", "prologue_belief", { effects: { oceanHope: 2, hydration: -1 }, addFlags: ["hands_on"] }),
    go("investigator", "Follow the oily current. Someone caused this.", "prologue_belief", { effects: { oceanHope: 1, hydration: -1 }, addFlags: ["investigator"] })
  ], { paragraphs: ["Plastic tangled the marsh. Oil shone on the water.", "\"Maybe the tide will take it away,\" a neighbor said. Carpter had heard that before."] }),

  prologue_belief: scene("prologue_belief", "Prologue", "What Carpter Came To Believe", "Louisiana Marsh", places.louisiana, [
    go("idealist", "\"I will make them understand what this costs us.\"", "prologue_launch", { effects: { support: 1, oceanHope: 1 }, pathPoint: "people", addFlags: ["idealist"] }),
    go("firebrand", "\"I will make the people responsible answer for it.\"", "prologue_launch", { effects: { oceanHope: 2, support: -1 }, pathPoint: "populist", addFlags: ["firebrand"] }),
    go("pragmatist", "\"I will learn their system, then make it work for us.\"", "prologue_launch", { effects: { funds: 2, oceanHope: -1 }, pathPoint: "system", addFlags: ["pragmatist"] })
  ], { paragraphs: ["A young fish asked whether the marsh would be clean tomorrow.", "Carpter wanted to say yes. Instead, he decided what kind of promise he could make."] }),

  prologue_launch: scene("prologue_launch", "Prologue", "Leaving The Ocean", "Bellweather Dock", places.louisiana, [
    go("grassroots_launch", "Take the neighbors' homemade tank. It squeaked, but it was theirs.", "prologue_ending", { cost: 1, effects: { support: 1, oceanHope: 1 }, factionEffects: { coastal: 1 }, addFlags: ["grassroots_launch"] }),
    go("fisher_launch", "Ride in Miss June's aquarium. The plastic castle stayed.", "prologue_ending", { effects: { support: 1, hydration: 1 }, factionEffects: { coastal: 1 }, addFlags: ["fisher_launch"] }),
    go("sponsored_launch", "Accept the marina display tank. Its logo was bigger than Carpter.", "prologue_ending", { effects: { funds: 4, support: 1, oceanHope: -1 }, factionEffects: { business: 1 }, addFlags: ["sponsored_launch"] })
  ], { dialogue: dialogue(["Narrator", "Carpter delivered the best speech of his life underwater."], ["Miss June", "Sounded important. Shame about the blubbing."]) }),

  prologue_ending: scene("prologue_ending", "Prologue", "A Candidate Comes Ashore", "Bellweather Dock", places.louisiana, [
    go("start_chapter_one", "Return to the campaign map", "road_ch1")
  ], { type: "report", showStats: true, dialogue: dialogue(["Reporter", "Is this a protest?"], ["Miss June", "No. He says it is a presidential campaign."], ["Carpter", "Blub blub."], ["Miss June", "And he would like me to stop adding words."]) }),

  road_ch1: scene("road_ch1", "Road to Washington", "Fish Out of Water", "Louisiana Coast", places.louisiana, [
    go("arrive_ch1", "Roll onto Bellweather Dock", "ch1_report", { addFlags: ["arrived_ch1"] })
  ], { type: "road", targetScene: "ch1_report", showStats: true }),

  road_ch2: scene("road_ch2", "Road to Washington", "A Current of Attention", "Broken Dock", places.louisiana, [
    go("travel_ch2_safe", "Service the tank before the next rally.", "ch2_report", { cost: 1, maintenance: true, effects: { hydration: 1 }, addFlags: ["safe_travel_ch2"] }),
    go("travel_ch2_cheap", "Keep moving. The filter can survive one more day.", "ch2_report", { effects: { hydration: -1 }, addFlags: ["cheap_travel_ch2"] })
  ], { type: "road", targetScene: "ch2_report", showStats: true }),

  road_ch3: scene("road_ch3", "Road to Washington", "When the Ocean Comes Inland", "New Orleans", places.newOrleans, [
    go("travel_ch3_safe", "Hire a filtered transport to New Orleans.", "ch3_report", { cost: 1, maintenance: true, effects: { hydration: 1 }, addFlags: ["safe_travel_ch3"] }),
    go("travel_ch3_cheap", "Ride through the heat in the campaign tank.", "ch3_report", { effects: { hydration: -1 }, addFlags: ["cheap_travel_ch3"] })
  ], { type: "road", targetScene: "ch3_report", showStats: true }),

  road_ch4: scene("road_ch4", "Road to Washington", "Thirty Percent Bluer", "GulfStar Factory Town", places.texas, [
    go("travel_ch4_safe", "Replace the filter before entering Factory Town.", "ch4_report", { cost: 2, maintenance: true, effects: { hydration: 1 }, addFlags: ["safe_travel_ch4"] }),
    go("travel_ch4_cheap", "Save the money and endure the industrial water.", "ch4_report", { effects: { hydration: -1, oceanHope: -1 }, addFlags: ["cheap_travel_ch4"] })
  ], { type: "road", targetScene: "ch4_report", showStats: true }),

  road_ch5: scene("road_ch5", "Road to Washington", "The Comfortable Delay", "Pennsylvania Debate Studio", places.pennsylvania, [
    go("travel_ch5_safe", "Prepare a proper debate-stage aquarium.", "ch5_report", { cost: 2, maintenance: true, effects: { hydration: 1 }, addFlags: ["safe_travel_ch5"] }),
    go("travel_ch5_cheap", "Use the television studio's emergency bucket.", "ch5_report", { effects: { hydration: -1 }, addFlags: ["cheap_travel_ch5"] })
  ], { type: "road", targetScene: "ch5_report", showStats: true }),

  road_ch6: scene("road_ch6", "Road to Washington", "The Road to Washington", "Washington, D.C.", places.washington, [
    go("travel_ch6_safe", "Fund the final filtered journey to Washington.", "ch6_report", { cost: 2, maintenance: true, effects: { hydration: 1 }, addFlags: ["safe_travel_ch6"] }),
    go("travel_ch6_cheap", "Push through one last exhausting trip.", "ch6_report", { effects: { hydration: -1 }, addFlags: ["cheap_travel_ch6"] })
  ], { type: "road", targetScene: "ch6_report", showStats: true }),

  ch1_report: scene("ch1_report", "Chapter 1 · Home", "The Home That Is Disappearing", "Louisiana Coast", places.louisiana, [
    go("review_first_promise", "Meet with the campaign advisers", "ch1_promise")
  ], { type: "report", paragraphs: ["The water is warmer. Part of Carpter's childhood marsh has disappeared.", "A young fish uses a bottle cap as a dinner plate."], note: "Wetlands provide wildlife habitat and help reduce storm impacts.", dialogue: dialogue(["Miss June", "Good news. You made the front page."], ["Carpter", "And the bad news?"], ["Miss June", "You are beside a coupon for fried catfish."]) }),

  ch1_promise: scene("ch1_promise", "Chapter 1 · Home", "What Do We Promise?", "June's Bait Shop", places.louisiana, [
    go("promise_restoration", "\"Begin restoring the worst part of the marsh.\"", "ch1_parish_offer", { cost: 1, effects: { oceanHope: 2 }, factionEffects: { environmental: 1, business: -1 }, pathPoint: "system", addFlags: ["promise_restoration"], promiseId: "marsh" }),
    go("promise_green_jobs", "\"Hire local workers to rebuild it.\"", "ch1_parish_offer", { cost: 1, effects: { support: 1, oceanHope: 1, funds: 1 }, factionEffects: { coastal: 1 }, pathPoint: "people", addFlags: ["promise_green_jobs"], promiseId: "marsh" }),
    go("promise_polluter_pays", "\"Investigate the damage and make polluters pay.\"", "ch1_parish_offer", { cost: 1, effects: { oceanHope: 1 }, factionEffects: { environmental: 1, business: -1 }, pathPoint: "populist", addFlags: ["promise_polluter_pays"], promiseId: "marsh" })
  ], { type: "investment", dialogue: dialogue(["Dr. Reed", "The marsh needs restoration, monitoring, and time."], ["Mr. Bell", "Voters campaign for jobs, not monitoring."], ["Miss June", "They need both. What comes first?"]) }),

  ch1_parish_offer: scene("ch1_parish_offer", "Chapter 1 · Home", "The Parish Offer", "Bellweather Dock", places.louisiana, [
    go("rejected_parish_deal", "\"No deal. The refinery stays in the speech.\"", "ch1_consequence", { effects: { support: -1, oceanHope: 1 }, factionEffects: { environmental: 1, business: -1 }, pathPoint: "populist", addFlags: ["rejected_parish_deal"] }),
    go("accepted_parish_deal", "\"I will focus on the coast, not the company.\"", "ch1_consequence", { effects: { support: 1, oceanHope: -1, funds: 1 }, factionEffects: { business: 1 }, pathPoint: "people", addFlags: ["accepted_parish_deal"] }),
    go("outmaneuvered_boudreaux", "\"Give us the permits. I choose my own words.\"", "ch1_consequence", { requires: { anyFlags: ["human_listener", "pragmatist"] }, effects: { support: 1 }, pathPoint: "system", addFlags: ["outmaneuvered_boudreaux"] })
  ], { dialogue: dialogue(["Boudreaux", "I can put a crowd in front of you tonight."], ["Miss June", "What do you want behind him tomorrow?"], ["Boudreaux", "Just keep the refinery out of the speech."]) }),

  ch1_consequence: scene("ch1_consequence", "Chapter 1 · Home", "The First Rally", "Bellweather Dock", places.louisiana, [
    go("begin_ch2", "Return to the road", "road_ch2")
  ], { type: "report", paragraphs: ["The crowd is small enough that Miss June recognizes most of it.", "Carpter's first promise is now something people can support, question, or oppose."], dialogue: dialogue(["Lena", "Which promise matters most?"], ["Carpter", "The one I can keep when keeping it becomes difficult."]) }),

  ch2_report: scene("ch2_report", "Chapter 2 · Attention", "Nobody Takes You Seriously", "Broken Dock", places.louisiana, [
    go("plan_operation", "Decide how far the campaign should reach", "ch2_operation")
  ], { type: "report", paragraphs: ["A campaign poster hangs beside plastic nobody has removed.", "Maya takes Carpter seriously. Most adults are still discussing the pelican behind him."], note: "Plastic can persist, break into smaller pieces, and harm wildlife.", dialogue: dialogue(["Miss June", "People are talking about you."], ["Carpter", "Are they listening?"], ["Maya", "I am."]) }),

  ch2_operation: scene("ch2_operation", "Chapter 2 · Attention", "How Far Do We Reach?", "Broken Dock", places.louisiana, [
    go("operation_dock_rally", "\"Organize a rally and cleanup here.\"", "ch2_endorsement", { cost: 2, effects: { support: 1, oceanHope: 1, funds: 1 }, pathPoint: "people", addFlags: ["operation_dock_rally"], promiseId: "attention" }),
    go("operation_coastal_tour", "\"Take this evidence along the whole coast.\"", "ch2_endorsement", { cost: 3, effects: { support: 2, oceanHope: 1 }, factionEffects: { coastal: 1 }, pathPoint: "populist", addFlags: ["operation_coastal_tour"], promiseId: "attention" }),
    go("operation_ad_campaign", "\"Buy airtime. Make them see the polluted dock.\"", "ch2_endorsement", { cost: 2, effects: { support: 2 }, factionEffects: { business: 1 }, pathPoint: "system", addFlags: ["operation_ad_campaign"], promiseId: "attention" }),
    go("operation_handbills", "\"Use volunteers and hand-painted signs.\"", "ch2_endorsement", { effects: { support: 1, hydration: -1 }, addFlags: ["operation_handbills"], promiseId: "attention" })
  ], { type: "investment", dialogue: dialogue(["Miss June", "We can organize here. Small, but honest."], ["Mr. Bell", "Or buy enough airtime to make the dock famous."], ["Dr. Reed", "I would prefer they notice the plastic."]) }),

  ch2_endorsement: scene("ch2_endorsement", "Chapter 2 · Attention", "Three Endorsements", "Broken Dock", places.louisiana, [
    go("endorsed_workers", "\"The coastal workers stand with us.\"", "ch2_consequence", { effects: { support: 2, funds: 2 }, factionEffects: { coastal: 2, business: -1 }, pathPoint: "people", addFlags: ["endorsed_workers"] }),
    go("endorsed_blue_tide", "\"Blue Tide stands with us.\"", "ch2_consequence", { effects: { oceanHope: 2, funds: 1 }, factionEffects: { environmental: 2, business: -1 }, pathPoint: "populist", addFlags: ["endorsed_blue_tide"] }),
    go("endorsed_commerce", "\"We need the Commerce Council's resources.\"", "ch2_consequence", { effects: { support: 1, funds: 1, oceanHope: -1 }, factionEffects: { business: 2, environmental: -1 }, pathPoint: "system", addFlags: ["endorsed_commerce"] }),
    go("rejected_endorsements", "\"No group gets to own this campaign.\"", "ch2_consequence", { effects: { oceanHope: 1 }, factionEffects: { coastal: -1, environmental: -1, business: -1 }, pathPoint: "populist", addFlags: ["rejected_endorsements"] })
  ], { dialogue: dialogue(["Lena", "Three groups want to stand behind you."], ["Miss June", "Workers want lasting jobs."], ["Dr. Reed", "Blue Tide wants lasting promises."], ["Mr. Bell", "Commerce has lasting money."]) }),

  ch2_consequence: scene("ch2_consequence", "Chapter 2 · Attention", "The Coalition Forms", "Gulf Coast", places.louisiana, [
    go("begin_ch3", "Return to the road", "road_ch3")
  ], { type: "report", paragraphs: ["The campaign grows, and so do the expectations attached to it.", "The pelican receives three requests for comment and declines all of them."], dialogue: dialogue(["Lena", "Does support mean influence?"], ["Carpter", "Only if I forget why they offered it."]) }),

  ch3_report: scene("ch3_report", "Chapter 3 · Shared Survival", "The Ocean Reaches The City", "New Orleans", places.newOrleans, [
    go("plan_flood_response", "Meet Councilmember Nia Baptiste", "ch3_plan")
  ], { type: "report", paragraphs: ["Water marks climb walls behind family photographs.", "Carpter sees humans as creatures trying not to drown too."], note: "Wetlands and other natural barriers can reduce flooding, but protection is often distributed unevenly.", dialogue: dialogue(["Nia", "The pumps failed again."], ["Miss June", "Which neighborhoods?"], ["Nia", "The same ones they always fail first."]) }),

  ch3_plan: scene("ch3_plan", "Chapter 3 · Shared Survival", "What Gets Protected First?", "New Orleans Shelter", places.newOrleans, [
    go("plan_neighborhoods", "\"Repair the worst pumps and build shelters.\"", "ch3_riverfront_deal", { cost: 3, effects: { support: 2, oceanHope: 1 }, factionEffects: { coastal: 1 }, pathPoint: "people", addFlags: ["plan_neighborhoods"], promiseId: "flooding" }),
    go("plan_wetlands", "\"Restore wetlands and strengthen natural barriers.\"", "ch3_riverfront_deal", { cost: 3, effects: { oceanHope: 2, support: 1 }, factionEffects: { environmental: 1 }, pathPoint: "populist", addFlags: ["plan_wetlands"], promiseId: "flooding" }),
    go("plan_port_first", "\"Protect the port, then fund the rest.\"", "ch3_riverfront_deal", { cost: 3, effects: { support: 1, funds: 1 }, factionEffects: { business: 2, coastal: -1 }, pathPoint: "system", addFlags: ["plan_port_first"], promiseId: "flooding" }),
    go("plan_emergency_only", "\"Open temporary shelters with what we have.\"", "ch3_riverfront_deal", { effects: { support: 1 }, addFlags: ["plan_emergency_only"], promiseId: "flooding" })
  ], { type: "investment", dialogue: dialogue(["Nia", "I can move money today, but not enough for everything."], ["Dr. Reed", "Restore natural barriers."], ["Mr. Bell", "Protect the port."], ["Miss June", "People are standing in water now."]) }),

  ch3_riverfront_deal: scene("ch3_riverfront_deal", "Chapter 3 · Shared Survival", "The Riverfront Deal", "New Orleans", places.newOrleans, [
    go("accepted_riverfront_deal", "\"Take the deal, but shelters stay first.\"", "ch3_consequence", { effects: { support: 1, funds: 2 }, pathPoint: "people", addFlags: ["accepted_riverfront_deal"] }),
    go("deferred_riverfront_fight", "\"Take the money. We can fight later.\"", "ch3_consequence", { effects: { funds: 2, oceanHope: -1 }, factionEffects: { business: 1, coastal: -1 }, pathPoint: "system", addFlags: ["deferred_riverfront_fight"] }),
    go("rejected_riverfront_deal", "\"No. Protection is not a luxury product.\"", "ch3_consequence", { effects: { oceanHope: 1, support: 1 }, factionEffects: { business: -1 }, pathPoint: "populist", addFlags: ["rejected_riverfront_deal"] }),
    go("community_resilience_agreement", "\"Put residents and businesses in one public agreement.\"", "ch3_consequence", { requires: { dominantPath: "people" }, effects: { funds: 2, support: 1 }, specialEffects: { coalitionStrength: 1 }, addFlags: ["community_resilience_agreement"] }),
    go("enforced_riverfront_clause", "\"Your tax agreement already requires public funding. Honor it.\"", "ch3_consequence", { requires: { dominantPath: "system" }, effects: { funds: 2 }, addFlags: ["enforced_riverfront_clause"] }),
    go("opened_landry_books", "\"Open your books, Victor.\"", "ch3_consequence", { requires: { dominantPath: "populist" }, effects: { support: 2, funds: 1 }, factionEffects: { business: -2 }, addFlags: ["opened_landry_books"] })
  ], { dialogue: dialogue(["Landry", "Protect the riverfront and I can find the money."], ["Nia", "That money was missing until his buildings needed it."], ["Landry", "That is an unfairly accurate way to say it."]) }),

  ch3_consequence: scene("ch3_consequence", "Chapter 3 · Shared Survival", "After The Rain", "New Orleans", places.newOrleans, [
    go("begin_ch4", "Return to the road", "road_ch4")
  ], { type: "report", paragraphs: ["The rain stops. The political argument does not.", "For the first time, national reporters describe Carpter as more than a curious fish."], dialogue: dialogue(["Nia", "You cannot stop water with a speech."], ["Carpter", "No. But we can stop pretending some homes matter less."]) }),

  ch4_report: scene("ch4_report", "Chapter 4 · Corruption", "The Greenwashing Machine", "GulfStar Factory Town", places.texas, [
    go("gather_evidence", "Find out what GulfStar is hiding", "ch4_evidence")
  ], { type: "report", paragraphs: ["A cheerful SAVE THE OCEAN DAY banner hides a polluted discharge pipe.", "Carpter recognizes the same oily shimmer he saw at home."], note: "Greenwashing uses environmental language or imagery without matching action.", dialogue: dialogue(["Celeste Voss", "GulfStar is changing."], ["Lena", "What changed?"], ["Voss", "Our logo is thirty percent bluer."], ["Carpter", "The water is thirty percent darker."]) }),

  ch4_evidence: scene("ch4_evidence", "Chapter 4 · Corruption", "How Do We Prove It?", "GulfStar Factory Town", places.texas, [
    go("evidence_workers", "\"Protect workers and collect testimony.\"", "ch4_partnership", { cost: 2, effects: { support: 2, oceanHope: 1, funds: 1 }, pathPoint: "people", addFlags: ["evidence_workers"], setSpecial: { evidenceStrength: "moderate" }, promiseId: "gulfstar" }),
    go("evidence_science", "\"Hire independent scientists and trace the discharge.\"", "ch4_partnership", { cost: 3, effects: { oceanHope: 3 }, pathPoint: "populist", addFlags: ["evidence_science"], setSpecial: { evidenceStrength: "strong" }, promiseId: "gulfstar" }),
    go("evidence_audit", "\"Audit GulfStar's permits and contracts.\"", "ch4_partnership", { cost: 2, effects: { oceanHope: 1, support: 1 }, pathPoint: "system", addFlags: ["evidence_audit"], setSpecial: { evidenceStrength: "moderate" }, promiseId: "gulfstar" }),
    go("evidence_existing", "\"Use the evidence we already have.\"", "ch4_partnership", { requires: { anyFlags: ["investigator", "refinery_witness"] }, effects: { oceanHope: 1 }, addFlags: ["evidence_existing"], setSpecial: { evidenceStrength: "moderate" }, promiseId: "gulfstar" }),
    go("evidence_unproven", "\"Make the accusation now.\"", "ch4_partnership", { effects: { support: 1 }, pathPoint: "populist", addFlags: ["evidence_unproven"], setSpecial: { evidenceStrength: "weak" }, promiseId: "gulfstar" })
  ], { type: "investment", dialogue: dialogue(["Dr. Reed", "We need samples and records."], ["Miss June", "Workers know what happens here."], ["Mr. Bell", "Or meet privately and get something useful."], ["Carpter", "Useful for whom?"]) }),

  ch4_partnership: scene("ch4_partnership", "Chapter 4 · Corruption", "The GulfStar Partnership", "GulfStar Headquarters", places.texas, [
    go("gulfstar_public_agreement", "\"Sign a public cleanup agreement with worker protections.\"", "ch4_consequence", { effects: { oceanHope: 1, support: 1, funds: 1 }, pathPoint: "people", addFlags: ["gulfstar_public_agreement"] }),
    go("gulfstar_partnership", "\"Take the partnership. Use their money against the problem.\"", "ch4_consequence", { effects: { support: 1, oceanHope: -2, funds: 2 }, factionEffects: { business: 2 }, pathPoint: "system", addFlags: ["gulfstar_partnership"], setSpecial: { corporatePartnership: true } }),
    go("gulfstar_exposed", "\"No partnership. Release the evidence.\"", "ch4_consequence", { effects: { oceanHope: 2, support: 1 }, factionEffects: { business: -2 }, pathPoint: "populist", addFlags: ["gulfstar_exposed"] }),
    go("gulfstar_public_table", "\"Workers, residents, and GulfStar negotiate in public.\"", "ch4_consequence", { requires: { dominantPath: "people" }, effects: { funds: 2, support: 2 }, specialEffects: { coalitionStrength: 1 }, addFlags: ["gulfstar_public_table"] }),
    go("gulfstar_leverage_deal", "\"Sign the cleanup fund. My lawyers keep the evidence.\"", "ch4_consequence", { requires: { dominantPath: "system" }, effects: { funds: 2, oceanHope: 1 }, addFlags: ["gulfstar_leverage_deal"] }),
    go("gulfstar_showdown", "\"Keep the check. Your workers and our evidence will speak.\"", "ch4_consequence", { requires: { dominantPath: "populist" }, effects: { support: 2, oceanHope: 2 }, factionEffects: { business: -3 }, addFlags: ["gulfstar_showdown"] })
  ], { dialogue: dialogue(["Voss", "We can fund cleanup, jobs, and your campaign."], ["Miss June", "That is a lot of help arriving late."], ["Voss", "Late help is still help."], ["Carpter", "So is late accountability."]) }),

  ch4_consequence: scene("ch4_consequence", "Chapter 4 · Corruption", "Behind The Banner", "Factory Town", places.texas, [
    go("begin_ch5", "Return to the road", "road_ch5")
  ], { type: "report", paragraphs: ["GulfStar loses control of the story, but not its influence.", "The evidence will now face two polished human opponents on national television."], dialogue: dialogue(["Lena", "Do you believe GulfStar cares about the ocean?"], ["Carpter", "I believe they care that the ocean can vote now."]) }),

  ch5_report: scene("ch5_report", "Chapter 5 · Truth vs Delay", "The Delay Machine", "Pennsylvania Debate Studio", places.pennsylvania, [
    go("prepare_debate", "Meet the advisers before the cameras turn on", "ch5_preparation")
  ], { type: "report", paragraphs: ["Grant Vale calls regulation reckless. Moe Goldberg calls for a practical middle course.", "Carpter's podium contains a filter and an emergency backup bucket."], note: "Climate delay accepts a problem exists while arguing against meaningful action now.", dialogue: dialogue(["Miss June", "The bucket says break glass in case of democracy."], ["Carpter", "Thoughtful."]) }),

  ch5_preparation: scene("ch5_preparation", "Chapter 5 · Truth vs Delay", "How Do We Prepare?", "Debate Green Room", places.pennsylvania, [
    go("prep_town_halls", "\"Bring people's stories with us.\"", "ch5_round_jobs", { cost: 3, pathPoint: "people", addFlags: ["prep_town_halls"], specialEffects: { debateMomentum: 1 } }),
    go("prep_policy_book", "\"Build a policy book they cannot dismiss.\"", "ch5_round_jobs", { cost: 4, pathPoint: "system", addFlags: ["prep_policy_book"], specialEffects: { debateMomentum: 1 } }),
    go("prep_delay_campaign", "\"Show who profits from delay.\"", "ch5_round_jobs", { cost: 4, pathPoint: "populist", addFlags: ["prep_delay_campaign"], specialEffects: { debateMomentum: 1 } }),
    go("prep_existing_record", "\"Use the record we already built.\"", "ch5_round_jobs", { addFlags: ["prep_existing_record"] })
  ], { type: "investment", dialogue: dialogue(["Miss June", "Talk like the fish people trust."], ["Dr. Reed", "Use the evidence."], ["Mr. Bell", "Look presidential."], ["Carpter", "Was I not?"]) }),

  ch5_round_jobs: scene("ch5_round_jobs", "Chapter 5 · Debate", "Round One: Jobs", "National Debate", places.pennsylvania, [
    go("jobs_cost", "\"Families already pay for polluted water and failed protection.\"", "ch5_round_evidence", { effects: { support: 1 }, specialEffects: { debateMomentum: 1 } }),
    go("jobs_stories", "\"Ask the families we met whether delay was affordable.\"", "ch5_round_evidence", { requires: { allFlags: ["prep_town_halls"] }, effects: { support: 1 }, specialEffects: { debateMomentum: 2 } }),
    go("jobs_green", "\"Jobs restoring wetlands are still jobs.\"", "ch5_round_evidence", { requires: { anyFlags: ["promise_green_jobs", "endorsed_workers", "plan_wetlands"] }, effects: { oceanHope: 1 }, specialEffects: { debateMomentum: 2 } }),
    go("jobs_profits", "\"Vale's donors are worried about profits, not jobs.\"", "ch5_round_evidence", { requires: { dominantPath: "populist" }, specialEffects: { debateMomentum: 2 } })
  ], { type: "debate", dialogue: dialogue(["Vale", "Working families cannot survive on noble intentions."], ["Goldberg", "Nor can they survive a plan without arithmetic."], ["Moderator", "Candidate Carpter?"]) }),

  ch5_round_evidence: scene("ch5_round_evidence", "Chapter 5 · Debate", "Round Two: Evidence", "National Debate", places.pennsylvania, [
    go("proof_records", "\"Then let us discuss GulfStar's discharge records.\"", "ch5_partnership_answer", { requires: { minEvidence: "strong" }, effects: { oceanHope: 1 }, specialEffects: { debateMomentum: 3 } }),
    go("proof_case", "\"Workers, records, and samples already show the truth.\"", "ch5_partnership_answer", { requires: { minEvidence: "moderate" }, specialEffects: { debateMomentum: 2 } }),
    go("proof_workers", "\"Workers deserve answers, not threats.\"", "ch5_partnership_answer", { requires: { anyFlags: ["evidence_workers", "gulfstar_public_agreement", "gulfstar_public_table"] }, effects: { support: 1 }, specialEffects: { debateMomentum: 2 } }),
    go("proof_logo", "\"A blue logo does not make dark water clean.\"", "ch5_partnership_answer", { specialEffects: { debateMomentum: 1 } }),
    go("proof_reckless", "\"Everyone knows what GulfStar did.\"", "ch5_partnership_answer", { requires: { allFlags: ["evidence_unproven"] }, specialEffects: { debateMomentum: -1 } })
  ], { type: "debate", dialogue: dialogue(["Vale", "Accusations are not evidence."], ["Goldberg", "Evidence should survive both anger and advertising."], ["Moderator", "Candidate Carpter?"]) }),

  ch5_partnership_answer: scene("ch5_partnership_answer", "Chapter 5 · Debate", "The Partnership Question", "National Debate", places.pennsylvania, [
    go("partnership_cleanup", "\"I took their money and made cleanup begin.\"", "ch5_round_seriousness", { requires: { allFlags: ["gulfstar_partnership"] }, effects: { oceanHope: -1 }, specialEffects: { debateMomentum: 1 } }),
    go("partnership_mistake", "\"It was a mistake.\"", "ch5_round_seriousness", { requires: { allFlags: ["gulfstar_partnership"] }, effects: { support: -1 }, setSpecial: { partnershipRejected: true }, specialEffects: { debateMomentum: 1 }, addFlags: ["admitted_partnership_mistake"] }),
    go("partnership_deflect", "\"That question is a distraction.\"", "ch5_round_seriousness", { requires: { allFlags: ["gulfstar_partnership"] }, specialEffects: { debateMomentum: -2 } }),
    go("no_partnership", "\"My record is public. So is GulfStar's.\"", "ch5_round_seriousness", { requires: { noFlags: ["gulfstar_partnership"] }, specialEffects: { debateMomentum: 1 } })
  ], { type: "debate", dialogue: dialogue(["Goldberg", "Transparency matters most when the check has already cleared."], ["Moderator", "Did GulfStar buy influence?"]) }),

  ch5_round_seriousness: scene("ch5_round_seriousness", "Chapter 5 · Debate", "Round Three: Leadership", "National Debate", places.pennsylvania, [
    go("serious_home", "\"My home disappeared while leaders asked for more time.\"", "ch5_consequence", { effects: { oceanHope: 1 }, specialEffects: { debateMomentum: 2 } }),
    go("serious_people", "\"Leadership means bringing people together before the water reaches them.\"", "ch5_consequence", { requires: { dominantPath: "people" }, effects: { support: 1 }, specialEffects: { debateMomentum: 3 } }),
    go("serious_system", "\"Leadership means knowing which rule can become a lever.\"", "ch5_consequence", { requires: { dominantPath: "system" }, specialEffects: { debateMomentum: 3 }, addFlags: ["institutional_coalition"] }),
    go("serious_power", "\"Leadership means saying who profits while everyone else waits.\"", "ch5_consequence", { requires: { dominantPath: "populist" }, effects: { oceanHope: 1 }, specialEffects: { debateMomentum: 3 } }),
    go("serious_blub", "\"Blub blub, democracy.\"", "ch5_consequence", { effects: { support: 1, hydration: -1 }, specialEffects: { debateMomentum: 1 }, addFlags: ["blub_democracy"] })
  ], { type: "debate", dialogue: dialogue(["Vale", "This country must choose leadership, not a symbol."], ["Goldberg", "Preferably leadership with a costed proposal."], ["Subtitle Machine", "BLUB: UNDECIDED VOTER NOISES"]) }),

  ch5_consequence: scene("ch5_consequence", "Chapter 5 · Truth vs Delay", "After The Debate", "Pennsylvania", places.pennsylvania, [
    go("begin_ch6", "Return to the road", "road_ch6")
  ], { type: "report", paragraphs: ["For a moment, the country stops asking whether a fish can lead.", "It starts asking whether the humans already in charge have."], dialogue: dialogue(["Lena", "Did they take you seriously?"], ["Carpter", "They took the water seriously. That is a start."]) }),

  ch6_report: scene("ch6_report", "Chapter 6 · Change", "Can A System Change?", "Washington, D.C.", places.washington, [
    go("choose_agenda", "Make the final national commitment", "ch6_agenda")
  ], { type: "report", paragraphs: ["Workers, organizers, executives, and reporters arrive for the final event.", "White House staff debate whether an aquarium counts as official housing."], note: "Lasting environmental change requires policy, participation, enforcement, and continued accountability.", dialogue: dialogue(["Miss June", "The aquarium has a flag and three lawyers."], ["Carpter", "Presidential, then."]) }),

  ch6_agenda: scene("ch6_agenda", "Chapter 6 · Change", "What Do We Ask The Country To Do?", "Washington, D.C.", places.washington, [
    go("agenda_coastal_resilience", "\"Pass a Coastal Restoration and Resilience Act.\"", "ch6_coalition", { cost: 4, effects: { oceanHope: 3, support: 1 }, pathPoint: "people", addFlags: ["agenda_coastal_resilience"], promiseId: "agenda" }),
    go("agenda_polluter_accountability", "\"Pass a Polluter Accountability Act.\"", "ch6_coalition", { cost: 4, effects: { oceanHope: 3 }, pathPoint: "populist", addFlags: ["agenda_polluter_accountability"], promiseId: "agenda" }),
    go("agenda_clean_jobs", "\"Build a national clean-jobs transition.\"", "ch6_coalition", { cost: 4, effects: { support: 2, oceanHope: 2 }, pathPoint: "system", addFlags: ["agenda_clean_jobs"], promiseId: "agenda" }),
    go("agenda_clean_water", "\"Pass a focused Clean Water Enforcement Bill.\"", "ch6_coalition", { cost: 3, effects: { oceanHope: 2 }, addFlags: ["agenda_clean_water"], promiseId: "agenda" }),
    go("agenda_movement", "\"Turn this campaign into a national movement.\"", "ch6_coalition", { effects: { support: 1, oceanHope: 1 }, addFlags: ["agenda_movement"], promiseId: "agenda" })
  ], { type: "investment", dialogue: dialogue(["Dr. Reed", "A law without enforcement is another promise."], ["Nia", "Protection must reach people before the next storm."], ["Miss June", "And it must sound like the Carpter who left home."]) }),

  ch6_coalition: scene("ch6_coalition", "Chapter 6 · Change", "Who Gets A Seat?", "Washington, D.C.", places.washington, [
    go("final_broad_coalition", "\"Workers, residents, scientists, and honest businesses take the stage.\"", "election_calculator", { requires: { minFaction: { coastal: 0, environmental: 0 } }, effects: { support: 2 }, pathPoint: "people", specialEffects: { coalitionStrength: 2 }, addFlags: ["final_broad_coalition"] }),
    go("final_governing_coalition", "\"Our advisers present a governing plan.\"", "election_calculator", { effects: { support: 1 }, pathPoint: "system", specialEffects: { coalitionStrength: 1 }, addFlags: ["final_governing_coalition"] }),
    go("final_people_front", "\"People harmed by pollution stand at the front.\"", "election_calculator", { effects: { oceanHope: 2, support: 1 }, factionEffects: { business: -1 }, pathPoint: "populist", specialEffects: { coalitionStrength: 1 }, addFlags: ["final_people_front"] }),
    go("final_solo_speech", "\"I make the final case alone.\"", "election_calculator", { requires: { minMomentum: 4 }, effects: { support: 1 }, addFlags: ["final_solo_speech"] }),
    go("final_shared_governance", "\"Everyone who carried this campaign gets a voice.\"", "election_calculator", { requires: { dominantPath: "people" }, effects: { support: 2, oceanHope: 1 }, specialEffects: { coalitionStrength: 3 }, addFlags: ["final_shared_governance"] }),
    go("final_written_commitments", "\"Put the votes, funding, and enforcement in writing.\"", "election_calculator", { requires: { dominantPath: "system" }, effects: { oceanHope: 2 }, specialEffects: { coalitionStrength: 2 }, addFlags: ["final_written_commitments"] }),
    go("final_public_testimony", "\"Let the country hear those corporations expected to stay quiet.\"", "election_calculator", { requires: { dominantPath: "populist" }, effects: { support: 2, oceanHope: 2 }, specialEffects: { coalitionStrength: 2 }, addFlags: ["final_public_testimony"] })
  ], { dialogue: dialogue(["Lena", "Everyone wants to stand beside you."], ["Miss June", "Some even wanted to before the cameras."], ["Carpter", "Who actually carried us here?"]) }),

  election_calculator: scene("election_calculator", "Election Night", "The Country Decides", "United States", places.national, [
    go("reveal_results", "Reveal the election results", "election_results")
  ], { type: "election", paragraphs: ["Three campaigns wait: Carpter's environmental coalition, Grant Vale's promise of delay, and Moe Goldberg's practical middle course.", "Two hundred seventy electoral votes are required to win."] }),

  election_results: scene("election_results", "Election Night", "The Results", "United States", places.national, [
    go("read_final_recap", "Read the campaign recap", "ending_final")
  ], { type: "results" }),

  ending_final: scene("ending_final", "Final Report", "What The Campaign Changed", "Louisiana Marsh", places.louisiana, [
    go("restart", "Begin another campaign", "title", { reset: true })
  ], { type: "ending", paragraphs: ["Miss June: \"Was all this really about becoming president?\"", "Carpter looks toward the water.", "Carpter: \"It was about making them stop looking away.\""] })
  ,
  death_hydration: scene("death_hydration", "Campaign Over", "The Tank Runs Dry", "The Campaign Road", places.national, [
    go("restart_after_death", "Begin another campaign", "title", { reset: true })
  ], {
    type: "gameover",
    paragraphs: [
      "Carpter's tank filter stops. Miss June ends the campaign and gets him back to safe water.",
      "A campaign cannot protect the ocean by forgetting the fish carrying it."
    ]
  }),
  gameover_election: scene("gameover_election", "Campaign Over", "The Country Chooses Someone Else", "United States", places.national, [
    go("restart_after_loss", "Begin another campaign", "title", { reset: true })
  ], {
    type: "gameover",
    paragraphs: [
      "Carpter does not reach 270 electoral votes. Grant Vale or Moe Goldberg will enter the White House.",
      "The environmental promises in Carpter's ledger remain promises. The campaign is over."
    ]
  })
};
