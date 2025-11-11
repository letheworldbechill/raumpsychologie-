import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderBindung(){
  const s = State.currentSession();
  const sections = [ lovebombing(s), spiegel(s), tenCore(s), ynBlocks(s), reflect(s) ];
  return container("Bindungs-Reality-Check", el("div",{class:"grid"}, ...sections));
}

// Lovebombing / Spiegel
function lovebombing(s){
  const q = [
    "Tempo: geht Nähe sehr schnell?",
    "Konsistenz: passen Worte und Taten?",
    "Authentizität: sind kleine Unsicherheiten sichtbar?",
    "Über-Spiegeln: werde ich ‚perfekt verstanden‘ bei wenig Input?",
    "Selbstanpassung: passe ich mich zu stark an?"
  ];
  return section("Lovebombing & Spiegel", q, s, "lb");
}
function spiegel(s){
  const q = [
    "Werden Grenzen elegant überlaufen?",
    "Wechsel von Überwärme zu Kühle?",
    "Fokus verschiebt sich rasch zu Vorteilen der Person?"
  ];
  return section("Spiegelungsmuster", q, s, "sp");
}
function section(title, qs, s, ns){
  const list = el("div",{class:"list"}, ...qs.map((t,i)=> row3(t,s,`${ns}.q${i}`)));
  return el("section",{class:"panel"}, el("h3",{}, title), list);
}
function row3(text, s, key){
  const sel = el("select",{onchange:(e)=>save(s,key,e.target.value)},
    opt("","—"), opt("+","+ ja"), opt("?","? unsicher"), opt("-","- nein")
  ); sel.value = s.notes[key] || "";
  return el("div",{class:"item"}, el("label",{},text), sel);
}
function opt(v,txt){ return el("option",{value:v},txt); }

// 10 Hauptfragen (1..5)
function tenCore(s){
  const q = [
    "Respektiert die Person meine Grenzen aktiv?",
    "Gibt es unterschwellige Verachtung?",
    "Wie werden Konflikte gelöst (Win-Win)?",
    "Trägt die Beziehung zu beidseitigem Wachstum bei?",
    "Ist Verantwortung für eigenes Erleben vorhanden?",
    "Echte Zukunftsperspektive statt Versprechen?",
    "Wird Kritik aufgenommen, ohne Strafe?",
    "Kann Nähe ohne Druck entstehen?",
    "Ist Loyalität nicht abhängig von Leistung?",
    "Bleibt die Person kongruent bei Stress?"
  ];
  const list = el("div",{class:"list"}, ...q.map((t,i)=> row5(t,s,`bd.10.${i}`)));
  return el("section",{class:"panel"}, el("h3",{},"10 Hauptfragen"), list);
}
function row5(text,s,key){
  const sel = el("select",{onchange:(e)=>save(s,key,Number(e.target.value))},
    opt("","— 1..5 —"), ...[1,2,3,4,5].map(n=> opt(String(n),String(n)))
  ); sel.value = s.notes[key] ?? "";
  return el("div",{class:"item"}, el("label",{},text), sel);
}

// 15 Ja/Nein (3 pro Block)
function ynBlocks(s){
  const blocks = {
    Grenzen: ["Wird mein ‚Nein‘ akzeptiert?","Muss ich oft erklären?","Gibt es Nachtestungen?"],
    Verantwortung: ["Übernimmt die Person Verantwortung?","Kein Gaslighting?","Keine Umkehr der Schuld?"],
    Respekt: ["Werde ich nicht klein gemacht?","Kein Abwertungs-Humor?","Kein Drohen mit Entzug?"],
    Zeit: ["Tempo darf niedrig sein?","Keine Eile zu Exklusivität?","Kein Druck bei Nähe?"],
    Integrität: ["Widersprüche werden geklärt?","Fehler werden benannt?","Kein Doppelstandard?"]
  };
  const list = Object.entries(blocks).map(([title, qs])=>{
    const rows = el("div",{class:"list"}, ...qs.map((t,i)=> rowYN(t,s,`bd.yn.${title}.${i}`)));
    return el("section",{class:"panel"}, el("h3",{}, title), rows);
  });
  return el("div",{}, ...list);
}
function rowYN(text,s,key){
  const sel = el("select",{onchange:(e)=>save(s,key,e.target.value)}, opt("","—"), opt("y","Ja"), opt("n","Nein"));
  sel.value = s.notes[key] || "";
  return el("div",{class:"item"}, el("label",{},text), sel);
}

// Freitext
function reflect(s){
  const area = el("textarea",{ rows:4, placeholder:"Was hast du in einer schwierigen Zeit gelernt?", oninput:(e)=>save(s,"bd.ref",e.target.value) });
  area.value = s.notes["bd.ref"] || "";
  return el("section",{class:"panel"}, el("h3",{},"Reflexion"), area);
}

function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
