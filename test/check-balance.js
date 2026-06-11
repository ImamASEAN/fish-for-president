import { getDominantPath } from "../src/game-engine.js";
import { STATES } from "../src/election.js";

const has = (state, flag) => state.flags.includes(flag);
const hasAny = (state, flags) => flags.some((flag) => has(state, flag));
const GREAT_LAKES = new Set(["MN", "WI", "IL", "IN", "MI", "OH", "PA", "NY"]);

function runSimulation(params) {
  function stateScores(state, item) {
    const path = getDominantPath(state);
    let carpter =
      state.stats.support * params.supportWeight +
      state.stats.oceanHope * params.hopeWeight +
      state.special.debateMomentum * params.debateWeight +
      params.carpterBaseline +
      (state.stats.hydration - 5) * 0.08;
    
    let vale = params.valeBaseline + item.valeLean;
    let goldberg = params.goldbergBaseline + item.goldbergLean + Math.max(0, state.factions.business) * 0.15;

    if (item.concern === "coastal") {
      carpter += 1.25 + state.stats.oceanHope * 0.22;
      if (has(state, "operation_coastal_tour")) carpter += 0.8;
      if (hasAny(state, ["plan_wetlands", "agenda_coastal_resilience"])) carpter += 0.8;
    }
    if (item.concern === "gulf") {
      carpter += item.code === "LA" ? params.laBonus : 2;
      if (hasAny(state, ["promise_green_jobs", "endorsed_workers", "community_resilience_agreement"])) carpter += 0.8;
      if (has(state, "gulfstar_exposed") || has(state, "gulfstar_showdown")) carpter += 1.5;
    }
    if (item.concern === "industry") {
      if (has(state, "promise_green_jobs") || has(state, "endorsed_workers") || has(state, "agenda_clean_jobs")) carpter += 2.2;
      else vale += 1;
    }
    if (GREAT_LAKES.has(item.code)) {
      carpter += 1.25 + state.stats.oceanHope * 0.12;
      if (hasAny(state, ["evidence_workers", "gulfstar_public_table", "agenda_clean_jobs"])) carpter += 0.8;
    }
    if (item.concern === "rural") {
      if (path === "people") carpter += 0.8;
      if (path === "populist") carpter += 0.5;
    }
    if (item.concern === "institutional") goldberg += 2;

    if (path === "people" && state.special.coalitionStrength >= 2) carpter += 1.5;
    if (path === "people" && hasAny(state, ["endorsed_workers", "community_resilience_agreement", "gulfstar_public_table"])) carpter += 0.5;
    if (path === "system") {
      goldberg += 0.4;
      if (hasAny(state, ["evidence_audit", "gulfstar_leverage_deal", "institutional_coalition", "final_written_commitments"])) carpter += 1.2;
    }
    if (path === "populist") {
      carpter += 0.6;
      goldberg -= 0.5;
    }
    if (state.special.corporatePartnership && !state.special.partnershipRejected) {
      carpter -= 1.5;
      goldberg += 1;
    }
    if (has(state, "final_written_commitments")) carpter += 1;
    if (has(state, "final_shared_governance")) carpter += 1.2;
    if (has(state, "final_public_testimony")) carpter += 1;
    if (
      state.stats.support >= 9 &&
      state.stats.oceanHope >= 8 &&
      state.special.debateMomentum >= 7 &&
      state.special.coalitionStrength >= 2
    ) {
      carpter += 1.5;
    }

    return { carpter, vale, goldberg };
  }

  function calculateElection(state) {
    const results = STATES.map((item) => {
      const scores = stateScores(state, item);
      const winner = Object.entries(scores)
        .filter(([key]) => key !== "reasons")
        .sort((a, b) => b[1] - a[1])[0][0];
      return { ...item, winner, scores };
    });
    const totals = { carpter: 0, vale: 0, goldberg: 0 };
    results.forEach(({ winner, ev }) => { totals[winner] += ev; });
    const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
    return { results, totals, winner };
  }

  // Mediocre Campaign (No flags, average stats, mixed path)
  const r1 = calculateElection({
    stats: { support: 5, oceanHope: 5, funds: 2, hydration: 4 },
    special: { debateMomentum: 3, corporatePartnership: false, partnershipRejected: false, coalitionStrength: 0 },
    flags: [],
    paths: { people: 0, system: 0, populist: 0 },
    factions: { coastal: 0, environmental: 0, business: 0 }
  });

  // Strong Grassroots (People path, high support/hope, moderate debate)
  const r2 = calculateElection({
    stats: { support: 7, oceanHope: 7, funds: 2, hydration: 4 },
    special: { debateMomentum: 5, corporatePartnership: false, partnershipRejected: false, coalitionStrength: 2 },
    flags: ["endorsed_workers", "final_shared_governance"],
    paths: { people: 4, system: 1, populist: 1 },
    factions: { coastal: 0, environmental: 0, business: 0 }
  });

  // Perfect Walkthrough
  const r3 = calculateElection({
    stats: { support: 10, oceanHope: 10, funds: 4, hydration: 4 },
    special: {
      evidenceStrength: 'moderate',
      debateMomentum: 7,
      corporatePartnership: false,
      partnershipRejected: false,
      coalitionStrength: 2,
      uiRoadStage: 0
    },
    flags: [
      "marsh_child", "organizer", "pragmatist", "grassroots_launch", "arrived_ch1",
      "promise_green_jobs", "outmaneuvered_boudreaux", "cheap_travel_ch2", "operation_handbills",
      "endorsed_blue_tide", "safe_travel_ch3", "plan_port_first", "enforced_riverfront_clause",
      "cheap_travel_ch4", "evidence_audit", "gulfstar_leverage_deal", "cheap_travel_ch5",
      "prep_existing_record", "jobs_green", "proof_logo", "no_partnership", "serious_system",
      "safe_travel_ch6", "agenda_movement", "final_written_commitments"
    ],
    paths: { people: 1, system: 4, populist: 1 },
    factions: { coastal: 0, environmental: 0, business: 0 }
  });

  console.log(`Params: baseline ${params.carpterBaseline}, supportW ${params.supportWeight}, hopeW ${params.hopeWeight}, laBonus ${params.laBonus}`);
  console.log(`  Mediocre:    Carpter ${r1.totals.carpter} EVs (Winner: ${r1.winner})`);
  console.log(`  Grassroots:  Carpter ${r2.totals.carpter} EVs (Winner: ${r2.winner})`);
  console.log(`  Perfect:     Carpter ${r3.totals.carpter} EVs (Winner: ${r3.winner})`);
  console.log("------------------------");
}

// Test combinations
runSimulation({
  supportWeight: 0.65, hopeWeight: 0.35, debateWeight: 0.35,
  carpterBaseline: -0.4, valeBaseline: 10.8, goldbergBaseline: 9.6,
  laBonus: 5.5
});

runSimulation({
  supportWeight: 0.65, hopeWeight: 0.35, debateWeight: 0.35,
  carpterBaseline: 0.0, valeBaseline: 11.0, goldbergBaseline: 9.8,
  laBonus: 6.5
});

runSimulation({
  supportWeight: 0.62, hopeWeight: 0.32, debateWeight: 0.32,
  carpterBaseline: 0.0, valeBaseline: 11.2, goldbergBaseline: 9.9,
  laBonus: 6.0
});

runSimulation({
  supportWeight: 0.65, hopeWeight: 0.35, debateWeight: 0.35,
  carpterBaseline: 0.3, valeBaseline: 11.2, goldbergBaseline: 9.9,
  laBonus: 6.5
});

runSimulation({
  supportWeight: 0.65, hopeWeight: 0.35, debateWeight: 0.35,
  carpterBaseline: 0.4, valeBaseline: 11.0, goldbergBaseline: 9.7,
  laBonus: 6.2
});
