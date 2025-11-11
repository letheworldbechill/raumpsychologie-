import { el, container, Badge } from "./ui.js";
import { State } from "./state.js";

const QS = [
  "Interessiere ich mich wirklich für die Person – oder für ihr Bild von mir?",
  "Gebe ich Energie, ohne auf Rückgabe zu achten?",
  "Zeigt die andere Person echtes Interesse an mir?",
  "Reagiere ich auf das, was ist – oder auf meine Vorstellung?",
  "Kann ich meine Meinung äußern, ohne Angst vor Ablehnung?",
  "Handle ich aus Verbindung oder aus Pflichtgefühl?"
]; // 1..5

export function renderResonanz(){
  const s = State.currentSession();
  const list = el("div",{class:"list"}, ...QS.map((q,i)=>row(q,s,`rz.q${i}`)));
  const res = result(s);
  return container("Resonanz-Check – Wie echt ist die Verbindung?", el("div",{}, list, el("hr",{class:"s"}), res));
}
function row(text, s, key){
  const sel = el("select",{ onchange:(e)=>save(s,key,Number(e.target.value)) },
    el("option",{value:""},"— 1..5 —"),
    ...[1,2,3,4,5].map(n=> el("option",{value:String(n)}, String(n)))
  );
  sel.value = s.notes[key] ?? "";
  return el("div",{class:"item"}, el("label",{}, text), sel);
}
function save(s,k,v){ s.notes[k]=v; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
function result(s){
  const vals = QS.map((_,i)=> Number(s.notes[`rz.q${i}`]||0)).filter(Boolean);
  if (!vals.length) return el("p",{class:"note"},"Bewerte 1–5 je Frage.");
  const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
  const tone = avg>=4.2? Badge.green("🟢 Resonanz")
             : avg>=2.8? Badge.yellow("🟡 Reaktion")
             : Badge.red("🔴 Eigenfilm");
  const tip = avg>=4.2? "Bleib bei dir, pflege die Wechselseitigkeit."
           : avg>=2.8? "Kehre zu Beobachtung zurück, verlangsame Tempo, sprich mini-konkret."
           : "Stop – Mini-Reset, kein Beziehungs-Entschluss in Erregung.";
  return el("p",{}, tone, " ", tip);
  }
