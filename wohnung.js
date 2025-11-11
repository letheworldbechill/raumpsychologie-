import { el, container } from "./ui.js";
import { State } from "./state.js";

const ROOMS = ["Schlafzimmer","Wohnzimmer","Küche","Bad"];
const ASPECTS = ["Boden","Flächen","Atmosphäre"]; // 0..10

export function renderWohnung(){
  const s = State.currentSession();
  const grid = el("div", { class:"grid cols-2" },
    ...ROOMS.map(r => panelRoom(r, s))
  );
  return container("Wohnung Check – äußere Ordnung", el("div", {}, grid, hint(), history(s)));
}
function panelRoom(room, s){
  const wrap = el("div", { class:"panel" },
    el("h3", {}, room),
    ...ASPECTS.map(a => meter(a, s, key(room,a))),
    el("label", {}, "Wenn dieser Raum sprechen könnte …"),
    txt(s, key(room,"voice")),
    summary(room, s)
  );
  return wrap;
}
function key(room, aspect){ return `wh.${room}.${aspect}`; }
function get(s, key, def=""){ return s.notes[key] ?? def; }
function set(s, key, val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }

function meter(label, s, k){
  const rng = el("input",{ type:"range", min:0, max:10, value:get(s,k,5), oninput:(e)=>set(s,k,Number(e.target.value)) });
  return el("div", { class:"item" }, el("label",{},label), rng);
}
function txt(s, k){
  const area = el("textarea",{ rows:3, oninput:(e)=>set(s,k,e.target.value) });
  area.value = get(s,k,"");
  return area;
}
function color(total){
  if (total >= 24) return "green";
  if (total >= 16) return "yellow";
  if (total >= 9)  return "orange";
  return "red";
}
function summary(room, s){
  const total = ASPECTS.reduce((acc,a)=> acc + Number(get(s, key(room,a), 5)), 0); // 0..30
  const label = total>=24 ? "Der Raum kann atmen." : total>=16 ? "Fast frei – kleine Inseln ordnen." :
                total>=9 ? "Staupunkte lösen – minimal beginnen." : "Alarm: Mikro-Ordnung an einer Stelle.";
  const badge = el("span", { class:`pill ${color(total)}` }, label);
  return el("p", {}, badge);
}
function hint(){ return el("p",{ class:"note" },"Vier Räume · je drei Skalen: Boden, Flächen, Atmosphäre. Verlauf wird lokal gespeichert."); }
function history(s){
  const btn = el("button",{ class:"cta", onclick:()=>saveSnapshot(s) },"Heutigen Zustand speichern");
  return el("div", {}, el("hr",{class:"s"}), btn);
}
function saveSnapshot(s){
  const snap = { ts: Date.now(), wh: {} };
  ROOMS.forEach(r => { ASPECTS.forEach(a => snap.wh[`${r}.${a}`] = Number(get(s, key(r,a), 5))); });
  s.results["wh.snapshots"] = s.results["wh.snapshots"] || [];
  s.results["wh.snapshots"].unshift(snap);
  localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data));
  alert("Gespeichert.");
                                                                                          }
