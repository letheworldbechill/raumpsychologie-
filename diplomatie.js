import { el, container } from "./ui.js";

export function renderDiplomatie(){
  const btnPrint = el("button",{ class:"cta", onclick:openPrint },"Als PDF drucken");
  const intro = el("p",{ class:"note" },"Einseitige, druckbare Anleitung in 5 Phasen.");
  const preview = el("div",{ class:"list" },
    step("1. Innerer Reset","Selbstvalidierung + Grey Rock. ‚Ich muss mich nicht erklären, um Grenzen zu haben.‘"),
    step("2. Vorbereitung","Strategische Empathie: Bedürfnisse anerkennen, Zeitpunkt wählen."),
    step("3. Carnegie-Moment","Freundlich + klar: Entscheidung mitteilen, nicht verhandeln."),
    step("4. Exit-Schleuse","Grey Rock Antworten: ‚Ich bleibe bei meiner Entscheidung.‘"),
    step("5. Nachsorge","Self-Compassion + Mini-Reset + Archiv.")
  );
  return container("🕊 Diplomatie statt Drama – Carnegie-Exit-Strategie", el("div",{}, intro, btnPrint, el("hr",{class:"s"}), preview));
}
function step(t,d){ return el("div",{class:"item"}, el("strong",{},t), el("div",{}, d)); }

function openPrint(){
  const w = window.open("", "_blank", "noopener,noreferrer");
  const html = `<!doctype html>
<html><head>
<meta charset="utf-8"><title>Diplomatie statt Drama – Carnegie-Exit</title>
<link rel="stylesheet" href="styles.css">
<style>body{background:#fff;color:#111;font:14px/1.5 system-ui} @media print {.print-foot{display:none}}</style>
</head><body>
<div class="print-wrap">
  <h1>🕊 Diplomatie statt Drama – Carnegie-Exit-Strategie</h1>
  <p><em>Sanft in der Form · Klar in der Grenze · Ruhig im Nachhall</em></p>
  <div class="print-step"><strong>1. Innerer Reset</strong><br>Selbstvalidierung + Grey Rock. „Ich muss mich nicht erklären, um Grenzen zu haben.“</div>
  <div class="print-step"><strong>2. Vorbereitung</strong><br>Strategische Empathie: Bedürfnisse anerkennen, Zeitpunkt wählen.</div>
  <div class="print-step"><strong>3. Carnegie-Moment</strong><br>Freundlich + klar: Entscheidung mitteilen, nicht verhandeln.</div>
  <div class="print-step"><strong>4. Exit-Schleuse</strong><br>Grauer Stein: „Ich bleibe bei meiner Entscheidung.“</div>
  <div class="print-step"><strong>5. Nachsorge</strong><br>Self-Compassion, Mini-Reset, Muster-Archiv.</div>
  <p><strong>Beispielsätze:</strong><br>
  – „Ich habe gemerkt, dass mir unsere Dynamik nicht guttut. Ich ziehe mich zurück und wünsche dir alles Gute.“<br>
  – „Ich schätze einiges an dir, und gleichzeitig brauche ich jetzt Abstand, um für mich zu sorgen.“<br>
  – „Ich verstehe, dass dich das überrascht. Meine Entscheidung steht.“<br>
  – „Ich möchte das Thema nicht weiter diskutieren.“</p>
</div>
<div class="print-foot" style="text-align:center;padding:1rem;">
  <button onclick="window.print()">PDF drucken</button>
</div>
</body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
    }
