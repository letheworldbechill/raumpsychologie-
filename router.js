const routes = new Map();
export function route(path, render) { routes.set(path, render); }
export function navigate(path) { history.pushState({}, "", path); renderRoute(); }
export function renderRoute() {
  const view = document.getElementById("view");
  const path = location.pathname === "/" ? "/intro" : location.pathname;
  const render = routes.get(path) || routes.get("/intro");
  view.innerHTML = "";
  view.append(render());
  document.querySelectorAll("[data-route]").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-route") === path);
  });
}
window.addEventListener("popstate", renderRoute);
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-route]");
  if (btn) { e.preventDefault(); navigate(btn.getAttribute("data-route")); }
});
