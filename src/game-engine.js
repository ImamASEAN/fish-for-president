export const SAVE_VERSION = 3;
export const STAT_KEYS = ["support", "oceanHope", "funds", "hydration"];
export const PATH_KEYS = ["people", "system", "populist"];

const clamp = (value, min = 0, max = 10) => Math.max(min, Math.min(max, value));

export function createInitialState() {
  return {
    version: SAVE_VERSION,
    sceneId: "title",
    stats: { support: 3, oceanHope: 3, funds: 3, hydration: 5 },
    paths: { people: 0, system: 0, populist: 0 },
    factions: { coastal: 0, environmental: 0, business: 0 },
    special: {
      evidenceStrength: "none",
      debateMomentum: 0,
      corporatePartnership: false,
      partnershipRejected: false,
      coalitionStrength: 0,
      uiRoadStage: 0
    },
    flags: [],
    history: [],
    completedScenes: [],
    reaction: "",
    election: null
  };
}

export function migrateState(saved) {
  if (!saved || saved.version !== SAVE_VERSION) {
    return createInitialState();
  }
  const initial = createInitialState();
  return {
    ...initial,
    ...saved,
    stats: { ...initial.stats, ...saved.stats },
    paths: { ...initial.paths, ...saved.paths },
    factions: { ...initial.factions, ...saved.factions },
    special: { ...initial.special, ...saved.special }
  };
}

export function getDominantPath(state) {
  const sorted = Object.entries(state.paths).sort((a, b) => b[1] - a[1]);
  return sorted[0][1] - sorted[1][1] >= 2 ? sorted[0][0] : null;
}

export function meetsRequirements(state, requires = {}) {
  const flags = new Set(state.flags);
  const allSatisfied = (requires.allFlags || []).every((flag) => flags.has(flag));
  const anySatisfied =
    !requires.anyFlags?.length || requires.anyFlags.some((flag) => flags.has(flag));
  const excluded = (requires.noFlags || []).some((flag) => flags.has(flag));
  const pathSatisfied = !requires.dominantPath || getDominantPath(state) === requires.dominantPath;
  const factionSatisfied = Object.entries(requires.minFaction || {}).every(
    ([key, value]) => state.factions[key] >= value
  );
  const evidenceOrder = { none: 0, weak: 1, moderate: 2, strong: 3 };
  const evidenceSatisfied =
    !requires.minEvidence ||
    evidenceOrder[state.special.evidenceStrength] >= evidenceOrder[requires.minEvidence];
  const momentumSatisfied =
    requires.minMomentum === undefined ||
    state.special.debateMomentum >= requires.minMomentum;

  return (
    allSatisfied &&
    anySatisfied &&
    !excluded &&
    pathSatisfied &&
    factionSatisfied &&
    evidenceSatisfied &&
    momentumSatisfied
  );
}

export function canChoose(state, choice) {
  return state.stats.funds >= getChoiceCost(state, choice) && meetsRequirements(state, choice.requires);
}

export function getChoiceCost(state, choice) {
  const baseCost = choice.cost || 0;
  const maintenanceDiscount =
    choice.maintenance && state.flags.includes("grassroots_launch") ? 1 : 0;
  return Math.max(0, baseCost - maintenanceDiscount);
}

export function getVisibleConditionals(state, conditionals = []) {
  return conditionals.filter((item) => meetsRequirements(state, item.requires));
}

export function applyChoice(state, choice) {
  if (!canChoose(state, choice)) {
    return state;
  }

  const next = structuredClone(state);
  next.stats.funds = clamp(next.stats.funds - getChoiceCost(state, choice));

  for (const [key, amount] of Object.entries(choice.effects || {})) {
    if (STAT_KEYS.includes(key)) next.stats[key] = clamp(next.stats[key] + amount);
  }
  for (const [key, amount] of Object.entries(choice.factionEffects || {})) {
    next.factions[key] = clamp(next.factions[key] + amount, -10, 10);
  }
  if (choice.pathPoint && PATH_KEYS.includes(choice.pathPoint)) next.paths[choice.pathPoint] += 1;

  for (const flag of choice.addFlags || []) {
    if (!next.flags.includes(flag)) next.flags.push(flag);
  }
  next.flags = next.flags.filter((flag) => !(choice.removeFlags || []).includes(flag));

  for (const [key, value] of Object.entries(choice.setSpecial || {})) {
    next.special[key] = value;
  }
  for (const [key, amount] of Object.entries(choice.specialEffects || {})) {
    next.special[key] = (next.special[key] || 0) + amount;
  }

  if (!next.completedScenes.includes(state.sceneId)) next.completedScenes.push(state.sceneId);
  next.history.push({
    sceneId: state.sceneId,
    choiceId: choice.id,
    label: choice.label,
    promiseId: choice.promiseId || null
  });
  next.sceneId = choice.nextScene;
  next.reaction = choice.reaction || "";
  next.election = null;
  if (next.stats.hydration === 0 && next.sceneId !== "title") {
    next.sceneId = "death_hydration";
    next.reaction = "Carpter's tank filter sputters dry. The campaign stops immediately.";
  }
  return next;
}
