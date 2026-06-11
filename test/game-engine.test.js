import test from "node:test";
import assert from "node:assert/strict";

import {
  applyChoice,
  canChoose,
  createInitialState,
  getDominantPath,
  getVisibleConditionals
} from "../src/game-engine.js";
import { scenes } from "../src/game-data.js";
import { calculateElection, determineEnding, STATES } from "../src/election.js";

test("choices apply costs, effects, flags, paths, and next scene", () => {
  const state = createInitialState();
  const next = applyChoice(state, {
    id: "test-choice",
    cost: 1,
    effects: { support: 2, oceanHope: -1 },
    factionEffects: { coastal: 1 },
    pathPoint: "people",
    addFlags: ["kept_promise"],
    nextScene: "next"
  });

  assert.equal(next.stats.funds, 2);
  assert.equal(next.stats.support, 5);
  assert.equal(next.stats.oceanHope, 2);
  assert.equal(next.factions.coastal, 1);
  assert.equal(next.paths.people, 1);
  assert.deepEqual(next.flags, ["kept_promise"]);
  assert.equal(next.sceneId, "next");
  assert.equal(state.sceneId, "title");
});

test("stats remain between zero and ten", () => {
  const state = createInitialState();
  const next = applyChoice(state, {
    id: "limits",
    effects: { support: 99, hydration: -99 },
    nextScene: "next"
  });

  assert.equal(next.stats.support, 10);
  assert.equal(next.stats.hydration, 0);
});

test("unaffordable and locked choices are disabled", () => {
  const state = createInitialState();
  assert.equal(canChoose(state, { cost: 4 }), false);
  assert.equal(canChoose(state, { requires: { allFlags: ["missing"] } }), false);
  assert.equal(canChoose(state, { requires: { anyFlags: ["missing", "also_missing"] } }), false);
  assert.equal(canChoose(state, { cost: 3 }), true);
});

test("dominant path requires a lead of at least two", () => {
  const state = createInitialState();
  state.paths.people = 2;
  state.paths.system = 1;
  assert.equal(getDominantPath(state), null);

  state.paths.people = 3;
  assert.equal(getDominantPath(state), "people");
});

test("conditional text respects required flags", () => {
  const state = createInitialState();
  state.flags = ["marsh_child"];
  const visible = getVisibleConditionals(state, [
    { requires: { allFlags: ["marsh_child"] }, text: "Visible" },
    { requires: { allFlags: ["investigator"] }, text: "Hidden" }
  ]);

  assert.deepEqual(visible.map((item) => item.text), ["Visible"]);
});

test("every choice points to an existing scene", () => {
  for (const scene of Object.values(scenes)) {
    for (const choice of scene.choices) {
      assert.ok(
        scenes[choice.nextScene],
        `${scene.id}.${choice.id} points to missing scene ${choice.nextScene}`
      );
    }
  }
});

test("special campaign fields update through choices", () => {
  const state = createInitialState();
  const next = applyChoice(state, {
    id: "special",
    setSpecial: { evidenceStrength: "strong", corporatePartnership: true },
    specialEffects: { debateMomentum: 3, coalitionStrength: 1 },
    nextScene: "next"
  });

  assert.equal(next.special.evidenceStrength, "strong");
  assert.equal(next.special.corporatePartnership, true);
  assert.equal(next.special.debateMomentum, 3);
  assert.equal(next.special.coalitionStrength, 1);
});

test("election contains all states plus DC and totals 538 electoral votes", () => {
  const election = calculateElection(createInitialState());
  assert.equal(STATES.length, 51);
  assert.equal(election.results.length, 51);
  assert.equal(election.results.reduce((sum, result) => sum + result.ev, 0), 538);
  assert.equal(Object.values(election.totals).reduce((sum, value) => sum + value, 0), 538);
});

test("election is deterministic and supports three candidates", () => {
  const state = createInitialState();
  assert.deepEqual(calculateElection(state), calculateElection(state));
  const winners = new Set(calculateElection(state).results.map((result) => result.winner));
  assert.ok(winners.has("vale"));
  assert.ok(winners.has("goldberg"));
});

test("a strong Carpter campaign can win the presidency", () => {
  const state = createInitialState();
  state.stats.support = 10;
  state.stats.oceanHope = 10;
  state.special.debateMomentum = 10;
  state.special.coalitionStrength = 3;
  state.stats.hydration = 8;
  state.paths.people = 5;
  state.flags = ["final_shared_governance", "agenda_coastal_resilience", "endorsed_workers"];
  const election = calculateElection(state);

  assert.ok(election.totals.carpter >= 270);
  assert.equal(determineEnding(state, election), "president");
});

test("losing the election and dehydration are terminal outcomes", () => {
  const losing = createInitialState();
  assert.equal(determineEnding(losing, calculateElection(losing)), "lost");

  const dehydrated = createInitialState();
  dehydrated.stats.hydration = 0;
  assert.equal(determineEnding(dehydrated, calculateElection(dehydrated)), "dehydration");
});

test("campaign routes end through election or dehydration without accidental dead ends", () => {
  for (const pickLast of [false, true]) {
    let state = createInitialState();
    let turns = 0;
    while (!["election_results", "death_hydration"].includes(state.sceneId) && turns < 60) {
      const available = scenes[state.sceneId].choices.filter((choice) => canChoose(state, choice));
      assert.ok(available.length > 0, `dead end at ${state.sceneId}`);
      state = applyChoice(state, pickLast ? available.at(-1) : available[0]);
      turns += 1;
    }
    assert.ok(["election_results", "death_hydration"].includes(state.sceneId));
  }
});

test("hydration reaching zero immediately ends the campaign", () => {
  const state = createInitialState();
  state.stats.hydration = 1;
  state.sceneId = "road_ch3";
  const next = applyChoice(state, {
    id: "exhausting-trip",
    effects: { hydration: -1 },
    nextScene: "ch3_report"
  });
  assert.equal(next.sceneId, "death_hydration");
});

test("a difficult but fully playable campaign route can win the election", () => {
  const winningChoices = [
    "begin", "marsh_child", "organizer", "pragmatist", "grassroots_launch",
    "start_chapter_one", "arrive_ch1", "review_first_promise", "promise_green_jobs",
    "outmaneuvered_boudreaux", "begin_ch2", "travel_ch2_cheap", "plan_operation",
    "operation_handbills", "endorsed_blue_tide", "begin_ch3", "travel_ch3_safe",
    "plan_flood_response", "plan_port_first", "enforced_riverfront_clause", "begin_ch4",
    "travel_ch4_cheap", "gather_evidence", "evidence_audit", "gulfstar_leverage_deal",
    "begin_ch5", "travel_ch5_cheap", "prepare_debate", "prep_existing_record",
    "jobs_green", "proof_logo", "no_partnership", "serious_system", "begin_ch6",
    "travel_ch6_safe", "choose_agenda", "agenda_movement", "final_written_commitments",
    "reveal_results"
  ];
  let state = createInitialState();
  for (const choiceId of winningChoices) {
    const choice = scenes[state.sceneId].choices.find((item) => item.id === choiceId);
    assert.ok(choice, `${choiceId} is missing from ${state.sceneId}`);
    assert.equal(canChoose(state, choice), true, `${choiceId} should be available`);
    state = applyChoice(state, choice);
  }

  assert.equal(state.sceneId, "election_results");
  assert.ok(calculateElection(state).totals.carpter >= 270);
  assert.ok(state.stats.hydration > 0);
});
