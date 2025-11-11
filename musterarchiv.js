import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderMusterArchiv(){
  const s = State.currentSession();
  const area = el("textarea",{ rows:8, placeholder:"Welche Muster erkenne ich (kurz + datiert)?", oninput:(e)=>savenote(s,"ma.text",e.target.value) });
  area.value = s.notes["ma.text"] || "";
  const btn = el("button",{ class:"cta", onclick: ()=>toArchive(s) },"In Archiv übernehmen");
  return container("Muster-Archiv", el("div",{class:"kv"}, area, btn, list()));
}
function list(){
  const items = (State.data.archive||[]).map(a => el("div",{class:"item"}, `${new Date(a.ts).toLocaleDateString()} · ${a.text}`));
  return el("div",{class:"list"}, ...items);
}
function toArchive(s){
  const txt = s.notes["ma.text"]?.trim();
  if (!txt) return;
  State.data.archive.unshift({ id: crypto.randomUUID(), ts: Date.now(), text: txt });
  State.save(); alert("Archiviert."); location.reload();
}
function savenote(s,key,val){ s.notes[key]=val; State.save(); }
