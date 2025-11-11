import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderRahmung(){
  const s = State.currentSession();
  const pub = el("textarea",{ rows:4, placeholder:"Öffentliche Rahmung …", oninput:(e)=>save(s,"frame.pub",e.target.value) });
  const priv= el("textarea",{ rows:6, placeholder:"Private Rahmung …", oninput:(e)=>save(s,"frame.priv",e.target.value) });
  pub.value = s.notes["frame.pub"] || ""; priv.value = s.notes["frame.priv"] || "";

  const ethic = el("div",{class:"item"},
    "Diese App dient nicht dazu, Menschen zu entlarven. Sie hilft, Energie zu schützen und sich ruhig zu distanzieren – ohne Feindbilder, ohne Drama. Klarheit ersetzt Konfrontation."
  );

  const vow = el("div",{class:"item"},
    "Ich will keine Masken zerreißen, sondern meine eigene Ruhe schützen. Ich wähle Distanz ohne Schuld, Klarheit ohne Härte, Frieden ohne Zeugen."
  );

  return container("Rahmung & Ethik", el("div",{class:"grid cols-2"},
    el("div",{}, el("label",{},"Öffentlich"), pub, el("hr",{class:"s"}), ethic),
    el("div",{}, el("label",{},"Privat"),    priv, el("hr",{class:"s"}), vow)
  ));
}
function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
