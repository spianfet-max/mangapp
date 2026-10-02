"use strict";

/* ---------- tiny line-art toolkit ---------- */
let D = 0; // animation delay counter, reset per panel
const el = (tag, attrs, cls = "s") =>
  `<${tag} class="${cls}" pathLength="1" style="animation-delay:${(D += 0.07).toFixed(2)}s" ${attrs}/>`;
const circle = (x, y, r, c) => el("circle", `cx="${x}" cy="${y}" r="${r}"`, c);
const line = (x1, y1, x2, y2, c) => el("line", `x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`, c);
const path = (d, c) => el("path", `d="${d}"`, c);
const ell = (x, y, rx, ry, c) => el("ellipse", `cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"`, c);
const rect = (x, y, w, h, r = 0, c) => el("rect", `x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"`, c);
const dot = (x, y, r = 1.8) => `<circle class="f" cx="${x}" cy="${y}" r="${r}"/>`;
const g = (cls, inner, tf = "") => `<g class="${cls}" ${tf ? `style="transform:${tf}"` : ""}>${inner}</g>`;

const P = {
  ground: (y = 108) => line(0, y, 200, y),
  sun: (x, y) => circle(x, y, 10) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
    const a = i * Math.PI / 4;
    return line(x + Math.cos(a) * 14, y + Math.sin(a) * 14, x + Math.cos(a) * 19, y + Math.sin(a) * 19);
  }).join(""),
  moon: (x, y) => path(`M${x} ${y - 14} A14 14 0 1 0 ${x + 14} ${y + 8} A11 11 0 1 1 ${x} ${y - 14}`),
  star: (x, y, r = 5) => g("twinkle", line(x - r, y, x + r, y) + line(x, y - r, x, y + r)),
  cloud: (x, y) => g("drift", path(`M${x} ${y} h30 a7 7 0 0 0 -3 -12 a9 9 0 0 0 -17 -3 a8 8 0 0 0 -10 15`)),
  tree: (x, y) => line(x, y, x, y - 28) + circle(x, y - 40, 15) + path(`M${x} ${y - 14} l8 -7`),
  flower: (x, y, s = 1) => line(x, y, x, y - 22 * s) + [0, 1, 2, 3, 4].map(i => {
    const a = i * Math.PI * 2 / 5;
    return circle(x + Math.cos(a) * 6 * s, y - 22 * s + Math.sin(a) * 6 * s, 4 * s);
  }).join("") + circle(x, y - 22 * s, 2.5 * s),
  hole: (x, y) => ell(x, y, 22, 6) + path(`M${x - 18} ${y + 2} q18 10 36 0`),
  door: (x, y) => rect(x - 12, y - 34, 24, 34, 12) + circle(x + 6, y - 16, 1.5) + line(x - 20, y, x + 20, y),
  house: (x, y) => rect(x - 18, y - 24, 36, 24) + path(`M${x - 22} ${y - 24} L${x} ${y - 42} L${x + 22} ${y - 24} Z`) + rect(x - 4, y - 14, 8, 14),
  mountain: (x, y) => path(`M${x - 40} ${y} L${x} ${y - 46} L${x + 40} ${y}`) + path(`M${x - 9} ${y - 36} l9 6 l7 -4`),
  cave: (x, y) => path(`M${x - 34} ${y} Q${x - 30} ${y - 46} ${x} ${y - 46} Q${x + 30} ${y - 46} ${x + 34} ${y}`) + path(`M${x - 14} ${y} Q${x - 12} ${y - 24} ${x} ${y - 24} Q${x + 12} ${y - 24} ${x + 14} ${y}`),
  boat: (x, y) => g("bob", path(`M${x - 24} ${y - 8} h48 l-8 12 h-32 Z`) + line(x, y - 8, x, y - 38) + path(`M${x} ${y - 38} l18 22 h-18`)),
  waves: (y = 110) => g("wave", [0, 1, 2, 3, 4].map(i => path(`M${i * 44 - 10} ${y} q8 -7 16 0 t16 0`)).join("")),
  fish: (x, y) => g("bob2", ell(x, y, 10, 6) + path(`M${x + 10} ${y} l8 -6 v12 Z`) + dot(x - 5, y - 1, 1.3)),
  balloon: (x, y) => g("bob", ell(x, y - 14, 10, 13) + path(`M${x - 3} ${y} h6`) + line(x, y, x, y + 22)),
  glow: (x, y) => [0, 1, 2, 3, 4, 5].map(i => {
    const a = i * Math.PI / 3 + .3;
    return line(x + Math.cos(a) * 10, y + Math.sin(a) * 10, x + Math.cos(a) * 15, y + Math.sin(a) * 15);
  }).join(""),
  gadget: (x, y) => g("bob2", rect(x - 8, y - 6, 16, 12, 3, "s b") + circle(x, y, 2.5, "s b") + P.glow(x, y)),
  blanket: (x, y) => path(`M${x - 28} ${y} h56`) + path(`M${x - 24} ${y} l4 -4 h40 l4 4`),
  lantern: (x, y) => g("bob", rect(x - 5, y - 9, 10, 14, 3) + path(`M${x - 3} ${y - 9} q3 -7 6 0`) + P.glow(x, y - 2)),
  rocket: (x, y) => g("bob", path(`M${x} ${y - 36} q10 12 8 30 h-16 q-2 -18 8 -30`) + circle(x, y - 22, 3) + path(`M${x - 8} ${y - 10} l-6 8 l6 -2 M${x + 8} ${y - 10} l6 8 l-6 -2`)),
};

/* the player: a round-headed kid; Mochi: round blue buddy with whiskers and a pocket */
function hero(x, y, s = 1) {
  const t = (n) => n * s;
  return g("bob",
    circle(x, y - t(34), t(13)) +
    path(`M${x - t(4)} ${y - t(47)} q${t(4)} ${-t(8)} ${t(9)} ${-t(2)}`) +
    dot(x - t(4), y - t(35), 1.5) + dot(x + t(4), y - t(35), 1.5) +
    path(`M${x - t(3)} ${y - t(29)} q${t(3)} ${t(3)} ${t(6)} 0`) +
    rect(x - t(9), y - t(21), t(18), t(15), t(5)) +
    line(x - t(9), y - t(17), x - t(15), y - t(10)) + line(x + t(9), y - t(17), x + t(15), y - t(10)) +
    line(x - t(4), y - t(6), x - t(4), y) + line(x + t(4), y - t(6), x + t(4), y));
}
function mochi(x, y, s = 1) {
  const t = (n) => n * s;
  const b = "s b";
  return g("bob2",
    circle(x, y - t(28), t(17), b) +
    ell(x, y - t(24), t(11), t(9), b) +
    `<g class="blink">${circle(x - t(6), y - t(34), t(4.5), b)}${circle(x + t(6), y - t(34), t(4.5), b)}</g>` +
    dot(x - t(5), y - t(34), 1.3) + dot(x + t(5), y - t(34), 1.3) +
    circle(x, y - t(29), t(1.8), b) +
    path(`M${x - t(5)} ${y - t(22)} q${t(5)} ${t(5)} ${t(10)} 0`, b) +
    line(x - t(17), y - t(28), x - t(25), y - t(31), b) + line(x - t(17), y - t(24), x - t(25), y - t(23), b) +
    line(x + t(17), y - t(28), x + t(25), y - t(31), b) + line(x + t(17), y - t(24), x + t(25), y - t(23), b) +
    circle(x, y - t(11), t(2.5), b) +
    ell(x, y - t(5), t(12), t(9), b) +
    path(`M${x - t(6)} ${y - t(7)} q${t(6)} ${t(9)} ${t(12)} 0`, b));
}

/* ---------- adventures ---------- */
const buddyWord = "Mochi";
const A = (...o) => o; // readability

const ADVENTURES = [
  {
    id: "garden", title: "The Hole in the Garden", blurb: "Something is under the grass.",
    bg: () => [P.ground(), P.sun(165, 26), P.tree(28, 108)],
    beats: [
      { span: 3, scene: () => [P.hole(115, 108), hero(65, 108)],
        ask: "A round hole opens in the garden. What do you do?",
        options: A(
          { t: "Peek inside", line: "{name} leaned over the hole and peeked in. Something glowed below." },
          { t: "Drop a pebble", line: "{name} dropped a pebble. Plink… plink… plink… a very long fall." },
          { t: "Say hello", line: "“Hello?” said {name}. The hole said hello back." }) },
      { span: 3, scene: () => [P.hole(120, 108), mochi(120, 100), hero(55, 108)],
        word: { label: "A round blue friend pops out, starving! What snack do they dream of?", key: "snack", ph: "e.g. moon pancakes" },
        line: "Out hopped Mochi. “I would do anything for {snack}!”" },
      { span: 2, scene: () => [P.gadget(100, 52), mochi(70, 108), hero(140, 108)],
        word: { label: "Mochi digs in the belly pocket. Name the gadget they pull out.", key: "gadget", ph: "e.g. Brave Spoon" },
        line: "Out came the {gadget}. It hummed softly." },
      { span: 4, scene: () => [P.gadget(100, 40), mochi(60, 108), hero(150, 108)],
        ask: "What should the {gadget} do?",
        options: A(
          { t: "Make us tiny", tag: "tiny", line: "Click! {name} and Mochi shrank to the size of bees." },
          { t: "Make us fly", tag: "fly", line: "Click! Their shoes lifted off the ground." },
          { t: "Open a door", tag: "door", line: "Click! A little door appeared in the air." }) },
      { span: 3, scene: st => st.has("tiny") ? [P.flower(110, 108, 2.4), hero(45, 108, .5), mochi(75, 108, .5)]
                      : st.has("fly") ? [P.cloud(40, 40), P.balloon(150, 70), hero(90, 80, .8), mochi(130, 80, .8)]
                      : [P.door(110, 108), hero(60, 108), mochi(150, 108)],
        ask: "A new place. What now?",
        options: A(
          { t: "Walk forward bravely", line: "{name} walked forward. Mochi followed, humming." },
          { t: "Stop and listen", line: "They stopped. Far away, something giggled." },
          { t: "Make a wish", line: "{name} closed both eyes and made a very small wish." }) },
      { span: 3, scene: () => [P.star(60, 40, 7), P.star(150, 55, 5), hero(80, 108), mochi(125, 108)],
        word: { label: "Write the last line of the story.", key: "end", ph: "e.g. And they ate {snack} until sunrise.", free: true },
        line: "{end}" },
    ],
  },
  {
    id: "moon", title: "Picnic on the Moon", blurb: "Bring snacks. Mind the gravity.",
    bg: () => [P.ground(112), P.star(30, 25), P.star(95, 18, 4), P.star(170, 40), P.moon(160, 28)],
    beats: [
      { span: 3, scene: () => [P.rocket(110, 108), hero(60, 108)],
        ask: "A tiny rocket lands beside you. What do you pack?",
        options: A(
          { t: "A big blanket", tag: "blanket", line: "{name} packed a big blanket. Soft is important." },
          { t: "A lantern", tag: "lantern", line: "{name} packed a lantern, just in case." },
          { t: "Nothing at all", line: "{name} packed nothing. Light travel is the best travel." }) },
      { span: 3, scene: () => [P.rocket(60, 108), mochi(130, 100)],
        word: { label: "The pilot is Mochi! Where do they say the moon picnic should be?", key: "place", ph: "e.g. the cheese crater" },
        line: "“To {place}!” cried Mochi, and the rocket lit up." },
      { span: 2, scene: () => [P.moon(100, 50), P.rocket(140, 108), P.star(40, 40)],
        ask: "Blast off! How is the ride?",
        options: A(
          { t: "Quiet and floaty", line: "The ride was quiet and floaty. Earth got small." },
          { t: "Bumpy and giggly", line: "The ride was bumpy. They giggled the whole way." },
          { t: "Spinning!", line: "Spin, spin, spin! Even the stars looked dizzy." }) },
      { span: 4, scene: st => [P.blanket(100, 108), st.has("lantern") ? P.lantern(60, 100) : "", hero(75, 108), mochi(135, 108)],
        word: { label: "You land at {place}. What do you name the picnic food?", key: "food", ph: "e.g. star noodles" },
        line: "They unpacked a feast of {food}." },
      { span: 3, scene: () => [P.moon(150, 40), P.star(40, 40), P.star(80, 70, 4), hero(70, 108), mochi(120, 108)],
        ask: "Something rustles behind a crater.",
        options: A(
          { t: "Share the {food}", line: "{name} shared the {food}. A shy moon rabbit hopped out." },
          { t: "Hide and watch", line: "They hid. A tiny moon rabbit tiptoed past." },
          { t: "Wave hello", line: "{name} waved. The moon rabbit waved back, twice." }) },
      { span: 3, scene: () => [P.moon(100, 40), hero(70, 108), mochi(125, 108)],
        word: { label: "Write the last line of the story.", key: "end", ph: "e.g. Home never felt so far, or so close.", free: true },
        line: "{end}" },
    ],
  },
  {
    id: "sea", title: "The Sleepy Sea", blurb: "Don't wake the waves.",
    bg: () => [P.sun(40, 30), P.cloud(100, 36), P.waves(112)],
    beats: [
      { span: 3, scene: () => [P.boat(100, 108), hero(100, 95, .6)],
        ask: "You float alone on a very quiet sea. What do you do?",
        options: A(
          { t: "Whisper good morning", line: "“Good morning,” whispered {name}. The sea yawned." },
          { t: "Tap the water", line: "{name} tapped the water. Ripples said hi." },
          { t: "Just float", line: "{name} floated. Nothing happened, and that was nice." }) },
      { span: 3, scene: () => [P.boat(70, 108), P.fish(150, 90), mochi(150, 112, .8)],
        word: { label: "A round blue fish-friend swims up. What is their wish?", key: "wish", ph: "e.g. to see the sunset" },
        line: "Mochi bobbed up beside the boat. “I only wish {wish}.”" },
      { span: 2, scene: () => [P.boat(100, 108), P.gadget(100, 40)],
        word: { label: "Mochi hands you a gadget. What is it called?", key: "gadget", ph: "e.g. Sleepy Compass" },
        line: "The {gadget} pointed one way: onward." },
      { span: 4, scene: () => [P.mountain(150, 108), P.boat(60, 108), P.fish(110, 98)],
        ask: "An island rises out of the mist. How do you reach it?",
        options: A(
          { t: "Row slowly", tag: "row", line: "They rowed slowly. The island slid closer." },
          { t: "Follow the fish", tag: "fish", line: "They followed the fish. It knew a shortcut." },
          { t: "Use the {gadget}", tag: "gad", line: "The {gadget} glowed, and the sea made a little road." }) },
      { span: 3, scene: () => [P.cave(110, 108), hero(55, 108), mochi(155, 108)],
        ask: "On the island, a cave breathes softly.",
        options: A(
          { t: "Go inside", line: "They tiptoed inside. It smelled like warm bread." },
          { t: "Knock politely", line: "Knock, knock. “Come in,” said something sleepy." },
          { t: "Sing a song", line: "{name} sang. The cave hummed along, off-key." }) },
      { span: 3, scene: () => [P.star(60, 40, 7), P.star(150, 50), hero(80, 108), mochi(125, 108)],
        word: { label: "Write the last line of the story.", key: "end", ph: "e.g. The sea slept on, and so did we.", free: true },
        line: "{end}" },
    ],
  },
];

/* ---------- game state & flow ---------- */
const $ = (id) => document.getElementById(id);
const screen = $("screen"), pageEl = $("page"), askEl = $("ask"), homeBtn = $("home");
let state;

const fill = (txt, st) => txt.replace(/\{(\w+)\}/g, (_, k) => (k === "name" ? st.name : st.words[k] ?? "…"));
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function menu() {
  state = null;
  homeBtn.hidden = true;
  pageEl.hidden = askEl.hidden = true;
  pageEl.innerHTML = askEl.innerHTML = "";
  screen.innerHTML = `
    <div class="fade">
      <h2>Write your own little adventure.</h2>
      <p class="sub">Pick a story. Make choices. Fill in the blanks. It becomes a manga page.</p>
      <div class="row" style="margin-bottom:18px">
        <input id="name" maxlength="14" placeholder="Your hero's name" value="${esc(localStorage.getItem("mangapp-name") || "")}">
      </div>
      <div class="menu">
        ${ADVENTURES.map((a, i) => `<button data-i="${i}"><b>${a.title}</b><span>${a.blurb} · ${a.beats.length} panels</span></button>`).join("")}
      </div>
    </div>`;
  screen.querySelectorAll(".menu button").forEach((b) => (b.onclick = () => {
    const name = ($("name").value.trim() || "Nobi").slice(0, 14);
    try { localStorage.setItem("mangapp-name", name); } catch (e) {}
    start(ADVENTURES[+b.dataset.i], name);
  }));
}

function start(adv, name) {
  state = { adv, name, words: {}, tags: new Set(), i: 0, lines: [], has(t) { return this.tags.has(t); } };
  screen.innerHTML = "";
  homeBtn.hidden = false;
  pageEl.hidden = false;
  pageEl.innerHTML = `<div class="title">${adv.title.toUpperCase()}</div>`;
  showBeat();
}

function showBeat() {
  const beat = state.adv.beats[state.i];
  D = 0;
  const svg = `<svg viewBox="0 0 200 130" aria-hidden="true">${state.adv.bg(state).join("")}${beat.scene(state).join("")}</svg>`;
  const fig = document.createElement("figure");
  fig.className = "panel empty";
  fig.style.gridColumn = `span ${beat.span}`;
  fig.innerHTML = `${svg}<figcaption></figcaption>`;
  pageEl.appendChild(fig);
  state.fig = fig;
  renderAsk(beat);
  fig.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderAsk(beat) {
  askEl.hidden = false;
  askEl.className = "fade";
  if (beat.options) {
    askEl.innerHTML = `<h2>${esc(fill(beat.ask, state))}</h2><div class="menu">${beat.options.map((o, i) => `<button data-i="${i}">${esc(fill(o.t, state))}</button>`).join("")}</div>`;
    askEl.querySelectorAll("button").forEach((b) => (b.onclick = () => {
      const o = beat.options[+b.dataset.i];
      if (o.tag) state.tags.add(o.tag);
      answer(fill(o.line, state));
    }));
  } else {
    const w = beat.word;
    askEl.innerHTML = `<h2>${esc(fill(w.label, state))}</h2><div class="row"><input id="w" maxlength="${w.free ? 90 : 24}" placeholder="${esc(fill(w.ph, state))}" autocomplete="off"><button class="solid" id="go">ok</button></div>`;
    const inp = $("w"), submit = () => {
      const v = inp.value.trim();
      if (!v) { inp.focus(); return; }
      state.words[w.key] = v;
      answer(fill(beat.line, state));
    };
    $("go").onclick = submit;
    inp.onkeydown = (e) => { if (e.key === "Enter") submit(); };
    inp.focus({ preventScroll: true });
  }
}

function answer(text) {
  askEl.hidden = true;
  state.lines.push(text);
  typeInto(state.fig, text, () => {
    state.i++;
    if (state.i < state.adv.beats.length) setTimeout(showBeat, 450);
    else finish();
  });
}

function typeInto(fig, text, done) {
  const cap = fig.querySelector("figcaption");
  fig.classList.remove("empty");
  let n = 0;
  const tick = () => {
    cap.textContent = text.slice(0, ++n);
    if (n < text.length) setTimeout(tick, 22); else done();
  };
  tick();
}

function finish() {
  pageEl.insertAdjacentHTML("beforeend", `<div class="the-end fade">END</div>`);
  askEl.hidden = false;
  askEl.className = "fade";
  askEl.innerHTML = `<div class="row"><button class="solid" id="copy">copy story</button><button id="again">another adventure</button></div>`;
  $("copy").onclick = async (e) => {
    const txt = `${state.adv.title}\n\n${state.lines.join("\n")}`;
    try { await navigator.clipboard.writeText(txt); e.target.textContent = "copied"; } catch (err) { e.target.textContent = "copy failed"; }
  };
  $("again").onclick = menu;
  askEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

homeBtn.onclick = menu;
menu();
