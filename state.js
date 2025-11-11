/* =======================================
   🌿 Raumpsychologie v3 – state.js
   ======================================= */

const LS_KEY = "raumpsychologie.v3";

/* ---------- GLOBAL STATE ---------- */
export const State = {
  data: {
    sessions: [],
    archive: [],
    settings: {
      createdAt: Date.now(),
      version: "v3",
      lang: "de",
      theme: "auto" // "auto" | "light" | "dark"
    }
  },

  /* ---------- LOAD ---------- */
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) this.data = JSON.parse(raw);
    } catch (e) {
      console.warn("State load failed", e);
    }
  },

  /* ---------- SAVE ---------- */
  save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(this.data));

      // Trigger UI feedback (💾 + blink)
      if (window.showSaveIndicator) window.showSaveIndicator();
      if (window.showSaveBlink) window.showSaveBlink();
    } catch (e) {
      console.warn("State save failed", e);
    }
  },

  /* ---------- SESSION HANDLING ---------- */
  newSession(kind = "generic") {
    const s = {
      id: crypto.randomUUID(),
      kind,
      createdAt: Date.now(),
      notes: {},
      results: {}
    };
    this.data.sessions.unshift(s);
    this.save();
    return s;
  },

  currentSession() {
    return this.data.sessions[0] || this.newSession();
  }
};

// Load persistent data on startup
State.load();

/* ---------- EXPORT / IMPORT ---------- */
export function exportData() {
  const blob = new Blob([JSON.stringify(State.data, null, 2)], {
    type: "application/json"
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `raumpsychologie-v3-export-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;
  a.click();
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const json = JSON.parse(r.result);
        State.data = json;
        State.save();
        resolve(json);
      } catch (e) {
        reject(e);
      }
    };
    r.onerror = reject;
    r.readAsText(file);
  });
}

/* ---------- THEME HANDLING ---------- */
function applyTheme(theme) {
  const isDark =
    theme === "dark" ||
    (theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  document.body.dataset.theme = theme;
}

export function initThemeUI() {
  applyTheme(State.data.settings.theme || "auto");
}

export function setThemeFromToggle() {
  const cur = State.data.settings.theme || "auto";
  const next = cur === "auto" ? "light" : cur === "light" ? "dark" : "auto";
  State.data.settings.theme = next;
  State.save();
  applyTheme(next);
                     }
