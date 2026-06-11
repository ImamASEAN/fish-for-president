import {
  applyChoice,
  canChoose,
  createInitialState,
  getChoiceCost,
  getDominantPath,
  getVisibleConditionals,
  migrateState
} from "./game-engine.js";
import { BRIEFINGS, CHAPTER_CARDS, NEWS, PROMISES, scenes } from "./game-data.js";
import { calculateElection, determineEnding } from "./election.js";
import { ASSETS } from "./assets.js";

const SAVE_KEY = "fish-for-president-save-v3";
const app = document.querySelector("#app");
const chapterPins = ["ch1_report", "ch2_report", "ch3_report", "ch4_report", "ch5_report", "ch6_report", "election_calculator"];
const pathNames = { people: "Stand With The People", system: "Master Their Game", populist: "Challenge Corporate Power" };
const endingCopy = {
  president: ["President Carpter", "Carpter wins the presidency. The difficult part begins tomorrow."],
  lost: ["Election Lost", "Carpter loses the election. The campaign ends before its promises can become national policy."],
  dehydration: ["Campaign Over", "Carpter's tank runs dry before the country can decide."]
};
const newsPositions = {
  LA: [575, 470], FL: [745, 500], TX: [445, 430], OH: [690, 255], PA: [785, 215], DC: [817, 250]
};
const chapterPinPositions = {
  ch1_report: [515, 485],
  ch2_report: [570, 445],
  ch3_report: [625, 420],
  ch4_report: [455, 405],
  ch5_report: [775, 205],
  ch6_report: [820, 265],
  election_calculator: [500, 285]
};

let state = loadState();
let mapSvg = "";
let sidePanel = null;
let viewedSceneId = null;
let selectedState = null;
let revealCount = 0;
let revealTimer = null;
let mapView = { x: 0, y: 0, scale: 1 };
let dialogueStep = 0;
let lastSceneId = state.sceneId;

function loadState() {
  try {
    return migrateState(JSON.parse(localStorage.getItem(SAVE_KEY)));
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function resetGame() {
  state = createInitialState();
  revealCount = 0;
  viewedSceneId = null;
  sidePanel = null;
  dialogueStep = 0;
  state.special.uiRoadStage = 0;
  lastSceneId = state.sceneId;
  saveState();
  render();
}

function getChapterNumber(scene = scenes[state.sceneId]) {
  if (scene.chapter.includes("Election") || scene.chapter.includes("Final")) return 7;
  const match = scene.chapter.match(/Chapter (\d)/);
  return match ? Number(match[1]) : 0;
}

function normalizeMap(svg) {
  return svg
    .replace("<svg ", '<svg class="usa-map" viewBox="0 0 959 593" preserveAspectRatio="xMidYMid meet" ')
    .replace(/class="([a-z]{2})"/g, (_, code) => `class="state-shape state-${code.toUpperCase()}" data-state="${code.toUpperCase()}"`);
}

async function loadAssets() {
  try {
    mapSvg = normalizeMap(await fetch(ASSETS.usaMap).then((response) => response.text()));
  } catch {
    mapSvg = '<svg class="usa-map" viewBox="0 0 959 593"><rect x="80" y="90" width="800" height="400" rx="80"/></svg>';
  }
  render();
}

function stat(label, value, icon) {
  return `<div class="hud-stat" title="${label}: ${value} out of 10"><b>${icon}</b><span>${label}</span><strong>${value}</strong><i><em style="width:${value * 10}%"></em></i></div>`;
}

function renderHud(scene) {
  const path = getDominantPath(state);
  const stats = scene.showStats
    ? `<div class="hud-stats">
        ${stat("Support", state.stats.support, "★")}
        ${stat("Ocean Hope", state.stats.oceanHope, "≈")}
        ${stat("Funds", state.stats.funds, "$")}
        ${stat("Hydration", state.stats.hydration, "●")}
      </div>`
    : `<div class="prologue-badge">Carpter before politics</div>`;
  return `
    <header class="hud">
      <div class="campaign-seal"><img src="${scene.chapter === "Prologue" ? ASSETS.carpter : ASSETS.carpterSuit}" alt="Carpter"><span>CARPTER<br><small>FOR PRESIDENT</small></span></div>
      ${stats}
      <div class="identity-card"><span>Political identity</span><strong>${path ? pathNames[path] : "Still taking shape"}</strong></div>
    </header>`;
}

function pinState(pinScene) {
  const current = scenes[state.sceneId];
  if (current?.type === "road" && current.targetScene === pinScene.id) return "active";
  const currentIndex = chapterPins.indexOf(chapterPins.find((id) => state.sceneId.startsWith(id.split("_")[0])) || "");
  const pinIndex = chapterPins.indexOf(pinScene.id);
  if (state.completedScenes.includes(pinScene.id) || pinIndex < currentIndex) return "completed";
  if (pinScene.id === state.sceneId || state.sceneId.startsWith(pinScene.id.split("_")[0])) return "active";
  return "locked";
}

function renderPins() {
  return chapterPins.map((id, index) => {
    const pin = scenes[id];
    const status = pinState(pin);
    if (status === "locked") return "";
    const [x, y] = chapterPinPositions[id];
    return `<button class="event-pin ${status}" data-pin="${id}" style="left:${x}px;top:${y}px">
      <span>${status === "completed" ? "✓" : status === "active" ? "!" : "·"}</span>
      <b>${index === 6 ? "Election" : `Chapter ${index + 1}`}</b>
    </button>`;
  }).join("");
}

function renderRoadProgress() {
  const currentScene = scenes[state.sceneId];
  const activeTarget = currentScene?.type === "road" ? currentScene.targetScene : chapterPins.find((id) => state.sceneId.startsWith(id.split("_")[0]));
  const activeIndex = Math.max(0, chapterPins.indexOf(activeTarget));
  return `<div class="road-progress" aria-label="Road to Washington progress">
    <span>Road to Washington</span>
    <div>${chapterPins.map((id, index) => `<i class="${index < activeIndex ? "done" : index === activeIndex ? "now" : ""}"></i>`).join("")}</div>
    <b>${activeIndex < 6 ? `Stop ${activeIndex + 1} of 6` : "Election Night"}</b>
  </div>`;
}

function renderNewsPins() {
  const chapter = Math.max(1, getChapterNumber());
  return NEWS.filter((item) => item.chapter <= chapter).map((item, index) => {
    const [x, y] = newsPositions[item.state];
    return `<button class="news-pin" data-news="${index}" style="left:${x}px;top:${y}px" title="${item.title}">▤</button>`;
  }).join("");
}

function renderMap(scene) {
  return `
    <section class="map-viewport" id="mapViewport" aria-label="Campaign map">
      <div class="map-world" id="mapWorld">
        <div class="map-svg">${mapSvg}</div>
        ${renderPins()}
        ${renderNewsPins()}
        <div class="map-label gulf-label">GULF OF MEXICO</div>
        <div class="map-label campaign-label">CARPTER CAMPAIGN</div>
      </div>
      <div class="map-controls">
        <button data-map-action="in" aria-label="Zoom in">+</button>
        <button data-map-action="out" aria-label="Zoom out">−</button>
        <button data-map-action="focus" aria-label="Focus current event">◎</button>
      </div>
      <div class="map-key"><span class="key-active"></span>Current <span class="key-complete"></span>Complete <span class="key-locked"></span>Locked</div>
    </section>`;
}

function portraitFor(speaker) {
  if (speaker === "Carpter") return `<img src="${ASSETS.carpterSuit}" alt="">`;
  const initials = speaker.split(" ").map((word) => word[0]).join("").slice(0, 2);
  return `<span>${initials}</span>`;
}

function renderDialogue(lines = []) {
  return lines.slice(0, dialogueStep + 1).map(({ speaker, text }, index) => `
    <div class="dialogue-line ${index === dialogueStep ? "latest" : ""}">
      <div class="portrait">${portraitFor(speaker)}</div>
      <p><strong>${speaker}</strong>${text}</p>
    </div>`).join("");
}

function lockReason(choice) {
  if (state.stats.funds < getChoiceCost(state, choice)) return "Not enough Funds";
  if (choice.requires?.dominantPath) return `Requires ${pathNames[choice.requires.dominantPath]}`;
  if (choice.requires?.minEvidence) return `Requires ${choice.requires.minEvidence} evidence`;
  if (choice.requires?.minMomentum !== undefined) return "Requires a stronger debate";
  return "Requires an earlier decision";
}

function renderChoices(scene, isViewing) {
  if (isViewing) return `<button class="close-view" data-action="close-view">Return to current event</button>`;
  if (scene.dialogue?.length && dialogueStep < scene.dialogue.length - 1) {
    return `<button class="continue-dialogue" data-action="continue-dialogue">Continue conversation</button>`;
  }
  return `<div class="choices">${scene.choices.map((choice) => {
    const available = canChoose(state, choice);
    const cost = getChoiceCost(state, choice);
    const counting = scene.type === "results" && revealCount < 51;
    return `<button class="choice-button" data-choice-id="${choice.id}" ${available && !counting ? "" : "disabled"}>
      <span>${choice.label}</span>
      ${cost ? `<b>Funds −${cost}</b>` : choice.cost && choice.maintenance && state.flags.includes("grassroots_launch") ? "<b>Tank discount</b>" : ""}
      ${!available ? `<small>${lockReason(choice)}</small>` : counting ? "<small>Counting states...</small>" : ""}
    </button>`;
  }).join("")}</div>`;
}

function renderBriefingVisual(briefing) {
  const image = ASSETS.briefings[briefing.image];
  if (image) return `<img src="${image}" alt="${briefing.label} briefing">`;
  return `<div class="briefing-placeholder ${briefing.image}" aria-label="Image slot: ${briefing.label}">
    <span>IMAGE SLOT</span><b>${briefing.label}</b><small>Ready for your chapter image</small>
  </div>`;
}

function renderRoadPanel(scene) {
  const card = CHAPTER_CARDS[scene.targetScene];
  const briefing = BRIEFINGS[scene.targetScene];
  if (state.special.uiRoadStage === 1) {
    return `<article class="chapter-card">
      <span>${card.number}</span><h1>${card.title}</h1><p>${card.subtitle}</p>
      <button data-action="road-next">Open environmental briefing</button>
    </article>`;
  }
  if (state.special.uiRoadStage === 2) {
    return `<article class="briefing-window">
      <header><span>Environmental Briefing</span><h1>${briefing.label}</h1></header>
      ${renderBriefingVisual(briefing)}
      <div class="briefing-copy"><strong>${briefing.stat}</strong><p>${briefing.context}</p>
      <a href="${briefing.sourceUrl}" target="_blank" rel="noreferrer">${briefing.source}</a></div>
      <button data-action="road-next">Continue to the road</button>
    </article>`;
  }
  return `<article class="event-window road-window">
    <div class="window-title"><div><span>Road to Washington</span><h1>${scene.title}</h1><small>${scene.location}</small></div><div class="window-pin">!</div></div>
    <div class="event-body"><p class="narration">Travel takes money, time, and clean water. How will Carpter reach the next stop?</p>${renderChoices(scene, false)}</div>
  </article>`;
}

function debateOutcome() {
  const score = state.special.debateMomentum;
  if (score >= 7) return "Clear debate win";
  if (score >= 4) return "Credible national performance";
  if (score >= 1) return "Mixed debate performance";
  return "Debate loss";
}

function renderScenePanel(scene, isViewing = false) {
  const conditionals = getVisibleConditionals(state, scene.conditionals);
  const extra = scene.id === "ch5_consequence" ? `<p class="reaction">${debateOutcome()} · Momentum ${state.special.debateMomentum}</p>` : "";
  return `
    <article class="event-window ${scene.type || "decision"}">
      <div class="window-title">
        <div><span>${scene.chapter}</span><h1>${scene.title}</h1><small>${scene.location}</small></div>
        <div class="window-pin">●</div>
      </div>
      <div class="event-body">
        ${isViewing ? '<p class="viewing-note">Reviewing a completed campaign event.</p>' : ""}
        ${state.reaction && !isViewing ? `<p class="reaction">${state.reaction}</p>` : ""}
        ${extra}
        ${(scene.paragraphs || []).map((text) => `<p class="narration">${text}</p>`).join("")}
        ${conditionals.map(({ text }) => `<p class="conditional">${text}</p>`).join("")}
        ${renderDialogue(scene.dialogue)}
        ${scene.note ? `<aside class="campaign-note"><strong>Campaign Note</strong>${scene.note}</aside>` : ""}
        ${scene.type === "results" ? renderResultsSummary() : ""}
        ${scene.type === "ending" ? renderEndingSummary() : ""}
        ${renderChoices(scene, isViewing)}
      </div>
    </article>`;
}

function promiseStatus(promise) {
  const hasAny = (list) => list.some((flag) => state.flags.includes(flag));
  if (!hasAny(promise.selected)) return null;
  if (hasAny(promise.fulfilled)) return "fulfilled";
  if (hasAny(promise.compromised)) return "compromised";
  return "progressing";
}

function renderPromisePanel() {
  const promises = PROMISES.map((promise) => ({ ...promise, status: promiseStatus(promise) })).filter((promise) => promise.status);
  return `<aside class="side-drawer"><button data-action="close-panel">×</button><span class="drawer-kicker">Campaign record</span><h2>Promise Ledger</h2>
    ${promises.length ? promises.map((promise) => `<div class="promise-item ${promise.status}"><b>${promise.title}</b><span>${promise.status}</span></div>`).join("") : "<p>No public promises yet. Enjoy the brief silence.</p>"}
  </aside>`;
}

function renderNewsPanel() {
  const chapter = getChapterNumber();
  const items = NEWS.filter((item) => item.chapter <= Math.max(1, chapter));
  return `<aside class="side-drawer"><button data-action="close-panel">×</button><span class="drawer-kicker">National wire</span><h2>Campaign News</h2>
    ${items.reverse().map((item) => `<article class="news-item"><span>${item.state}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}
  </aside>`;
}

function renderStatePanel() {
  const result = ensureElection().results.find((item) => item.code === selectedState);
  if (!result) return "";
  const winner = result.winner === "carpter" ? "Carpter" : result.winner === "vale" ? "Grant Vale" : "Moe Goldberg";
  return `<aside class="side-drawer state-drawer"><button data-action="close-panel">×</button><span class="drawer-kicker">Election result</span>
    <h2>${result.name}</h2>
    <div class="state-call ${result.winner}"><strong>${winner}</strong><span>${result.ev} electoral votes</span></div>
    <p>${result.reason}</p>
    <div class="state-score-list">
      <span>Carpter <b>${result.scores.carpter.toFixed(1)}</b></span>
      <span>Grant Vale <b>${result.scores.vale.toFixed(1)}</b></span>
      <span>Moe Goldberg <b>${result.scores.goldberg.toFixed(1)}</b></span>
    </div>
  </aside>`;
}

function ensureElection() {
  if (!state.election) {
    state.election = calculateElection(state);
    saveState();
  }
  return state.election;
}

function scoreLine(candidate, label) {
  const total = ensureElection().totals[candidate];
  return `<div class="candidate-score ${candidate}"><span>${label}</span><strong data-score="${candidate}">${revealCount >= 51 ? total : "—"}</strong><small>electoral votes</small></div>`;
}

function renderResultsSummary() {
  const election = ensureElection();
  const leader = Object.entries(election.totals).sort((a, b) => b[1] - a[1])[0][0];
  return `<section class="results-summary">
    <div class="candidate-grid">${scoreLine("carpter", "Carpter")}${scoreLine("vale", "Grant Vale")}${scoreLine("goldberg", "Moe Goldberg")}</div>
    <p class="winner-call">${revealCount >= 51 ? `${leader === "carpter" ? "Carpter" : leader === "vale" ? "Grant Vale" : "Moe Goldberg"} wins the most electoral votes.` : "States are reporting..."}</p>
  </section>`;
}

function renderEndingSummary() {
  const election = ensureElection();
  const ending = determineEnding(state, election);
  const [title, text] = endingCopy[ending];
  const path = getDominantPath(state);
  const promises = PROMISES.map((promise) => ({ ...promise, status: promiseStatus(promise) })).filter((promise) => promise.status);
  return `<section class="ending-summary">
    <span class="ending-kicker">${election.totals.carpter} electoral votes · ${path ? pathNames[path] : "Independent political identity"}</span>
    <h2>${title}</h2><p>${text}</p>
    <h3>Promises and plans</h3>
    <div class="ending-promises">${promises.map((promise) => `<div class="${promise.status}"><b>${promise.title}</b><span>${promise.status}</span></div>`).join("")}</div>
  </section>`;
}

function renderRail() {
  return `<nav class="action-rail" aria-label="Campaign tools">
    <button data-panel="news"><b>4</b><span>News</span></button>
    <button data-panel="promises"><b>≡</b><span>Promises</span></button>
    <button data-action="reset"><b>↻</b><span>New Game</span></button>
  </nav>`;
}

function render() {
  clearInterval(revealTimer);
  const actualScene = scenes[state.sceneId] || scenes.title;
  if (lastSceneId !== state.sceneId) {
    dialogueStep = 0;
    lastSceneId = state.sceneId;
  }
  if (actualScene.type === "results" || actualScene.type === "ending") ensureElection();
  const shownScene = viewedSceneId ? scenes[viewedSceneId] : actualScene;
  app.innerHTML = `
    <div class="game-shell" data-scene="${actualScene.id}" data-road-stage="${state.special.uiRoadStage}">
      ${renderMap(actualScene)}
      ${renderHud(actualScene)}
      ${actualScene.chapter !== "Prologue" && actualScene.id !== "title" ? renderRoadProgress() : ""}
      ${renderRail()}
      ${actualScene.type === "road" && !viewedSceneId ? (state.special.uiRoadStage === 0 ? "" : renderRoadPanel(actualScene)) : renderScenePanel(shownScene, Boolean(viewedSceneId))}
      ${sidePanel === "news" ? renderNewsPanel() : sidePanel === "promises" ? renderPromisePanel() : sidePanel === "state" ? renderStatePanel() : ""}
    </div>`;
  attachEvents(actualScene);
  styleMapStates(actualScene);
  focusMap(actualScene.map, true);
  if (actualScene.type === "results" && revealCount < 51) startElectionReveal();
}

function styleMapStates(scene) {
  const paths = app.querySelectorAll(".state-shape");
  paths.forEach((path) => {
    path.style.fill = "";
    path.classList.remove("won-carpter", "won-vale", "won-goldberg", "unreported");
  });
  if (scene.type !== "results" && scene.type !== "ending") return;
  const election = ensureElection();
  election.results.forEach((result, index) => {
    const path = app.querySelector(`.state-${result.code}`);
    if (!path) return;
    path.classList.add(index < revealCount || scene.type === "ending" ? `won-${result.winner}` : "unreported");
    path.style.fill = index < revealCount || scene.type === "ending"
      ? result.winner === "carpter" ? "#208c91" : result.winner === "vale" ? "#a84339" : "#8b6cad"
      : "#c3b681";
    path.setAttribute("tabindex", "0");
    path.setAttribute("aria-label", `${result.name}, ${result.ev} electoral votes, ${result.winner}`);
  });
}

function updateResultCounter() {
  const partial = { carpter: 0, vale: 0, goldberg: 0 };
  ensureElection().results.slice(0, revealCount).forEach(({ winner, ev }) => { partial[winner] += ev; });
  Object.entries(partial).forEach(([candidate, total]) => {
    const node = app.querySelector(`[data-score="${candidate}"]`);
    if (node) node.textContent = total;
  });
}

function startElectionReveal() {
  revealTimer = setInterval(() => {
    revealCount = Math.min(51, revealCount + 3);
    styleMapStates(scenes[state.sceneId]);
    updateResultCounter();
    if (revealCount >= 51) {
      clearInterval(revealTimer);
      render();
    }
  }, 120);
}

function focusMap(point, instant = false) {
  const viewport = app.querySelector("#mapViewport");
  const world = app.querySelector("#mapWorld");
  if (!viewport || !world) return;
  const rect = viewport.getBoundingClientRect();
  const base = Math.min(rect.width / 959, rect.height / 593);
  mapView.scale = Math.max(0.55, Math.min(2.4, base * (point.zoom || 1)));
  mapView.x = rect.width / 2 - point.x * mapView.scale;
  mapView.y = rect.height / 2 - point.y * mapView.scale;
  world.style.transition = instant ? "transform 450ms ease" : "";
  applyMapTransform();
}

function applyMapTransform() {
  const world = app.querySelector("#mapWorld");
  if (world) world.style.transform = `translate(${mapView.x}px, ${mapView.y}px) scale(${mapView.scale})`;
}

function attachMapInteraction(scene) {
  const viewport = app.querySelector("#mapViewport");
  let dragging = false;
  let last = null;
  viewport?.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    dragging = true;
    last = { x: event.clientX, y: event.clientY };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport?.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    mapView.x += event.clientX - last.x;
    mapView.y += event.clientY - last.y;
    last = { x: event.clientX, y: event.clientY };
    applyMapTransform();
  });
  viewport?.addEventListener("pointerup", () => { dragging = false; });
  viewport?.addEventListener("wheel", (event) => {
    event.preventDefault();
    mapView.scale = Math.max(0.55, Math.min(2.4, mapView.scale + (event.deltaY < 0 ? 0.12 : -0.12)));
    applyMapTransform();
  }, { passive: false });
  app.querySelectorAll("[data-map-action]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.mapAction === "focus") return focusMap(scene.map);
    mapView.scale = Math.max(0.55, Math.min(2.4, mapView.scale + (button.dataset.mapAction === "in" ? 0.15 : -0.15)));
    applyMapTransform();
  }));
}

function attachEvents(scene) {
  attachMapInteraction(scene);
  app.querySelectorAll("[data-choice-id]").forEach((button) => button.addEventListener("click", () => {
    let choice = scene.choices.find((item) => item.id === button.dataset.choiceId);
    if (choice.reset) return resetGame();
    if (scene.id === "election_results" && ensureElection().totals.carpter < 270) {
      choice = { ...choice, nextScene: "gameover_election" };
    }
    state = applyChoice(state, choice);
    state.special.uiRoadStage = 0;
    if (state.sceneId === "election_results") revealCount = 0;
    viewedSceneId = null;
    sidePanel = null;
    saveState();
    render();
  }));
  app.querySelectorAll("[data-panel]").forEach((button) => button.addEventListener("click", () => {
    sidePanel = button.dataset.panel;
    render();
  }));
  app.querySelectorAll("[data-pin]").forEach((button) => button.addEventListener("click", () => {
    const currentScene = scenes[state.sceneId];
    if (currentScene?.type === "road" && currentScene.targetScene === button.dataset.pin) {
      state.special.uiRoadStage = 1;
      saveState();
      render();
      return;
    }
    if (button.classList.contains("active")) {
      viewedSceneId = null;
    } else if (button.classList.contains("completed")) {
      viewedSceneId = button.dataset.pin;
    }
    render();
  }));
  app.querySelector("[data-action='continue-dialogue']")?.addEventListener("click", () => {
    dialogueStep += 1;
    render();
  });
  app.querySelector("[data-action='road-next']")?.addEventListener("click", () => {
    state.special.uiRoadStage += 1;
    saveState();
    render();
  });
  app.querySelectorAll("[data-news]").forEach((button) => button.addEventListener("click", () => {
    sidePanel = "news";
    render();
  }));
  app.querySelectorAll(".state-shape[data-state]").forEach((shape) => shape.addEventListener("click", () => {
    if (scene.type !== "results" && scene.type !== "ending") return;
    selectedState = shape.dataset.state;
    sidePanel = "state";
    render();
  }));
  app.querySelector("[data-action='close-view']")?.addEventListener("click", () => { viewedSceneId = null; render(); });
  app.querySelector("[data-action='close-panel']")?.addEventListener("click", () => { sidePanel = null; render(); });
  app.querySelector("[data-action='reset']")?.addEventListener("click", resetGame);
}

render();
loadAssets();
