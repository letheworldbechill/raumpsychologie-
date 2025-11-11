import { el, container, Badge } from "./ui.js";
import { State } from "./state.js";

const QS = ["Boden","Licht","Luft","Klang","Ordnung"];

export function renderRaumScan(){
  const s = State.currentSession();
  const list = el("div",{ class:"grid cols-2" }, ...QS.map((q,i)=>meter(q,s,`rs.q${i}`)));
  const fb = feedback(s);
  return container("RaumScan – tägliches Stimmungsbarometer", el("div",{}, list, el("hr",{class:"s"}), fb, history7(s)));
}
function meter(label, s, key){
  const val = s.notes[key] ?? 5;
  const rng = el("input",{ type:"range", min:0, max:10, value: val, oninput:(e)=>save(s,key,Number(e.target.value)) });
  return el("div",{ class:"item" }, el("label",{},label), rng);
}
function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
function feedback(s){
  const vals = QS.map((_,i)=> Number(s.notes[`rs.q${i}`] ?? 5));
  const avg = Math.round(vals.reduce((a,b)=>a+b,0)/QS.length);
  const tone = avg>=8? Badge.green("🟢 Klarheit"): avg>=6? Badge.yellow("🟡 Achtsamkeit") :
               avg>=4? Badge.orange("🟠 Spannung"): Badge.red("🔴 Alarm");
  const txt = avg>=8? "Raum unterstützt dich."
           : avg>=6? "Kleine Justierungen – Lüften, Licht, Fläche."
           : avg>=4? "Mini-Reset + eine Ecke ordnen."
           : "Notfall-Routine: Wasser, Fenster, 3 Dinge wegräumen.";
  return el("p",{}, tone, " ", txt);
}
function history7(s){
  const btn = el("button",{ class:"cta", onclick:()=>storeDay(s) },"Heute speichern");
  const days = s.results["rs.days"] || [];
  const items = days.slice(0,7).map(d=> el("div",{class:"item"}, new Date(d.ts).toLocaleDateString(), " · ", d.avg));
  return el("div",{}, btn, el("div",{class:"list"}, ...items));
}
function storeDay(s){
  const vals = QS.map((_,i)=> Number(s.notes[`rs.q${i}`] ?? 5));
  const avg = Math.round(vals.reduce((a,b)=>a+b,0)/QS.length);
  s.results["rs.days"] = s.results["rs.days"] || [];
  s.results["rs.days"].unshift({ ts: Date.now(), avg });
  localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data));
  alert("Gespeichert.");
                                                            }
