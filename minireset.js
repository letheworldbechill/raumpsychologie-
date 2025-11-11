import { el, container } from "./ui.js";

export function renderMiniReset(){
  return container("Mini-Reset", el("div",{class:"grid"},
    step("1️⃣ Atmung (4-7-8)","4 Sekunden ein, 7 halten, 8 aus – 3 Runden."),
    step("2️⃣ Blick","Fixiere ein ruhiges Objekt im Raum – beschreibe es nüchtern."),
    step("3️⃣ Körper","Schultern senken, Kiefer lösen, Füße spüren."),
    step("4️⃣ Satz","Ich darf prüfen, ohne anzugreifen.")
  ), "Beruhigt Herzrhythmus, stärkt Vagusnerv.");
}
function step(t,d){ return el("div",{class:"item"}, el("strong",{},t), el("div",{},d)); }
