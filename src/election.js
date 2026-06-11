import { getDominantPath } from "./game-engine.js";

const rawStates = [
  ["AL",9,"gulf",4,0],["AK",3,"rural",3,1],["AZ",11,"sun",2,2],["AR",6,"rural",4,0],
  ["CA",54,"coastal",-2,3],["CO",10,"sun",0,3],["CT",7,"coastal",-1,4],["DE",3,"coastal",0,3],
  ["FL",30,"gulf",2,2],["GA",16,"gulf",2,1],["HI",4,"coastal",-2,2],["ID",4,"rural",5,0],
  ["IL",19,"industry",0,3],["IN",11,"industry",3,1],["IA",6,"rural",2,2],["KS",6,"rural",4,1],
  ["KY",8,"industry",4,0],["LA",8,"gulf",1,1],["ME",4,"coastal",-1,2],["MD",10,"coastal",-1,3],
  ["MA",11,"coastal",-3,4],["MI",15,"industry",0,2],["MN",10,"industry",-1,3],["MS",6,"gulf",4,0],
  ["MO",10,"industry",3,1],["MT",4,"rural",4,1],["NE",5,"rural",4,1],["NV",6,"sun",1,3],
  ["NH",4,"coastal",0,4],["NJ",14,"coastal",-1,4],["NM",5,"sun",-1,2],["NY",28,"coastal",-2,5],
  ["NC",16,"coastal",1,2],["ND",3,"rural",5,0],["OH",17,"industry",2,2],["OK",7,"rural",5,0],
  ["OR",8,"coastal",-2,3],["PA",19,"industry",1,3],["RI",4,"coastal",-2,3],["SC",9,"coastal",3,1],
  ["SD",3,"rural",5,0],["TN",11,"industry",4,1],["TX",40,"gulf",3,2],["UT",6,"sun",4,2],
  ["VT",3,"coastal",-3,2],["VA",13,"coastal",0,3],["WA",12,"coastal",-2,4],["WV",4,"industry",5,0],
  ["WI",10,"industry",1,3],["WY",3,"rural",6,0],["DC",3,"institutional",-4,5]
];

export const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",
  CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",
  IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",
  ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",
  MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",
  NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",
  NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",
  PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",
  TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",
  WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",DC:"Washington, D.C."
};

export const STATES = rawStates.map(([code, ev, concern, valeLean, goldbergLean]) => ({
  code, name: STATE_NAMES[code], ev, concern, valeLean, goldbergLean
}));

const has = (state, flag) => state.flags.includes(flag);
const hasAny = (state, flags) => flags.some((flag) => has(state, flag));
const GREAT_LAKES = new Set(["MN", "WI", "IL", "IN", "MI", "OH", "PA", "NY"]);

function stateScores(state, item) {
  const path = getDominantPath(state);
  let carpter =
    state.stats.support * 0.62 +
    state.stats.oceanHope * 0.32 +
    state.special.debateMomentum * 0.32 -
    0.8 +
    (state.stats.hydration - 5) * 0.08;
  let vale = 11.5 + item.valeLean;
  let goldberg = 10.2 + item.goldbergLean + Math.max(0, state.factions.business) * 0.15;
  const reasons = [];

  if (item.concern === "coastal") {
    carpter += 1.25 + state.stats.oceanHope * 0.22;
    if (has(state, "operation_coastal_tour")) carpter += 0.8;
    if (hasAny(state, ["plan_wetlands", "agenda_coastal_resilience"])) carpter += 0.8;
    reasons.push("Coastal voters weighed Carpter's environmental record.");
  }
  if (item.concern === "gulf") {
    carpter += item.code === "LA" ? 4.5 : 2;
    if (hasAny(state, ["promise_green_jobs", "endorsed_workers", "community_resilience_agreement"])) carpter += 0.8;
    if (has(state, "gulfstar_exposed") || has(state, "gulfstar_showdown")) carpter += 1.5;
    reasons.push("Gulf communities followed Carpter's fight over pollution and storms.");
  }
  if (item.concern === "industry") {
    if (has(state, "promise_green_jobs") || has(state, "endorsed_workers") || has(state, "agenda_clean_jobs")) carpter += 2.2;
    else vale += 1;
    reasons.push("Jobs and the cost of environmental transition shaped the vote.");
  }
  if (GREAT_LAKES.has(item.code)) {
    carpter += 1.25 + state.stats.oceanHope * 0.12;
    if (hasAny(state, ["evidence_workers", "gulfstar_public_table", "agenda_clean_jobs"])) carpter += 0.8;
    reasons.unshift("Great Lakes voters connected clean water with secure local jobs.");
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
    reasons.push("The GulfStar partnership weakened Carpter's outsider message.");
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
    reasons.push("A strong record, debate, and coalition made Carpter nationally competitive.");
  }

  return { carpter, vale, goldberg, reasons };
}

export function calculateElection(state) {
  const results = STATES.map((item) => {
    const scores = stateScores(state, item);
    const winner = Object.entries(scores)
      .filter(([key]) => key !== "reasons")
      .sort((a, b) => b[1] - a[1])[0][0];
    return { ...item, winner, scores, reason: scores.reasons[0] || "National campaign strength decided the state." };
  });
  const totals = { carpter: 0, vale: 0, goldberg: 0 };
  results.forEach(({ winner, ev }) => { totals[winner] += ev; });
  const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
  return { results, totals, winner };
}

export function determineEnding(state, election) {
  if (state.stats.hydration === 0) return "dehydration";
  if (election.totals.carpter >= 270) return "president";
  return "lost";
}
