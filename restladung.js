import { el, container, Badge } from "./ui.js";
import { State } from "./state.js";

export function renderRestladung(){
  const s = State.currentSession();
  const area = el("textarea",{ rows:6, placeholder:"Was hängt emotional noch nach? (kurz, sachlich)…", oninput:(e)=>save(s,"rl.text",e.target.value) });
  area.value = s.notes["rl.text"] || "";
  const lvl = el("input",{ type:"range", min:0, max:10, value:s.notes["rl.level"] ?? 3, oninput:(e)=>save(s,"rl.level",Number(e.target.value)) });
  const tip = feedback(Number(s.notes["rl.level"] ?? 3));
  return container("Emotionale Restladung", el("div",{class:"kv"},
    el("label",{},"Beschreibe Restladung in 3 Sätzen"), area,
    el("label",{},"Intensität (0-10)"), lvl,
    el("p",{}, tip)
  ));
}
function feedback(v){
  return v>=8? Badge.red("Nachbeben: 4-7-8 Atmung, kaltes Wasser, 3 Dinge benennen.") :
         v>=5? Badge.orange("Bewege dich 2 Minuten, Licht/Frischluft, Mini-Reset.") :
         v>=2? Badge.yellow("Kleine Ordnung: 3 Gegenstände, dann Tee.") :
               Badge.green("Ruhig. Ressourcen auffüllen.");
}
function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
