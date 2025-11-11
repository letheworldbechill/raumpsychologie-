import { el, container, showModal, closeModal } from "./ui.js";
import { t } from "./i18n.js";

export function renderIntro() {
  const content = el("div", { class:"grid" },
    el("p", { class:"big" },
      "Eine App für innere und äußere Ordnung, emotionale Selbstführung und friedliche Abgrenzung."),
    el("div", { class:"list" },
      item("🧭 Grundidee"),
      item("Beobachten statt bewerten · Ordnen statt analysieren · Verlassen statt kämpfen"),
      item("Kein Tracking, keine Cloud, lokal & offline")
    ),
    el("hr", { class:"s" }),
    el("h3", {}, "„Realität oder Reaktion?“ – Vor jedem Beziehungs-Check"),
    el("div", { class:"list" },
      item("1️⃣ Atme ruhig."),
      item("2️⃣ Spüre: Reagiere ich auf die Person – oder auf ein altes Gefühl?"),
      item("3️⃣ Ich darf prüfen, ohne anzugreifen."),
      item("4️⃣ Ich darf fühlen, ohne mich zu rechtfertigen.")
    ),
    el("div", { class:"center" },
      el("button", { class:"cta", onclick: chooseStart }, t("ready"))
    )
  );
  return container("🌿 Raumpsychologie v3 – Klarheit ohne Kampf", content,
    "Minimalistisch · Offline-fähig · Zwei Sprachen · Light/Dark");
}
function item(text){ return el("div", { class:"item" }, text); }
function chooseStart(){
  showModal(el("div", {},
    el("h3", {}, "Wähle deinen Start"),
    el("div", { class:"grid cols-2" },
      el("button", { class:"cta", onclick: () => go("/resonanz") }, "Resonanz-Check"),
      el("button", { class:"cta", onclick: () => go("/bindung") }, "Bindungs-Reality-Check")
    ),
    el("p", { class:"note" }, "Du kannst jederzeit zu den anderen Modulen wechseln.")
  ));
}
function go(path){ closeModal(); history.pushState({}, "", path); dispatchEvent(new PopStateEvent("popstate")); }
