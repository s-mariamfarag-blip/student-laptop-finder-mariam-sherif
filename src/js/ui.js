import { isFavorite, toggleFavorite, getFavorites, getTheme, saveTheme } from "./storage.js";

const paths = {
  laptop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  heart: '<path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"/>',
  scale: '<path d="M12 3v18M5 21h14M5 7h14"/><path d="M5 7l-3 7a3 3 0 0 0 6 0z"/><path d="M19 7l-3 7a3 3 0 0 0 6 0z"/>',
  tag: '<path d="M3 12V3h9l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  ram: '<rect x="2" y="7" width="20" height="10" rx="1"/><path d="M6 11v2M10 11v2M14 11v2M18 11v2"/>',
  storage: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M6 10v4"/>',
  weight: '<rect x="5" y="9" width="14" height="12" rx="2"/><path d="M9 9a3 3 0 0 1 6 0"/>',
  screen: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v7M14 10v7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  coins: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  chart: '<path d="M5 21V12M12 21V5M19 21V9"/>',
};

export const icon = (name, size = "w-5 h-5") => {
  const filled = name === "heartFill" || name === "crown";
  const key = name === "heartFill" ? "heart" : name;
  return `<svg class="${size} shrink-0" viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[key]}</svg>`;
};

export const formatPrice = (n) => "$" + n.toLocaleString();

export const showMessage = (box, text) => {
  box.innerHTML = `<p class="card text-center col-span-full">${text}</p>`;
};

const categoryColors = {
  ultrabook: "bg-sky-700",
  gaming: "bg-orange-700",
  "2-in-1": "bg-teal-700",
  creator: "bg-pink-700",
  budget: "bg-violet-700",
};
export const categoryClass = (category) => categoryColors[category] || "bg-gray-700";

const makeSkeleton = () => `
  <div class="card p-0 overflow-hidden animate-pulse">
    <div class="h-44 bg-line"></div>
    <div class="p-4">
      <div class="h-5 bg-line rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-line rounded w-1/3 mb-4"></div>
      <div class="h-16 bg-line rounded mb-4"></div>
      <div class="h-9 bg-line rounded"></div>
    </div>
  </div>`;

export function showSkeletons(box, count = 6) {
  box.innerHTML = Array.from({ length: count }, makeSkeleton).join("");
}


export function favInner(id, kind) {
  const saved = isFavorite(id);
  if (kind === "heart") return icon(saved ? "heartFill" : "heart");
  if (kind === "remove") return icon("trash", "w-4 h-4") + " Remove";
  return icon(saved ? "heartFill" : "heart", "w-4 h-4") + (saved ? " Remove favorite" : " Add to favorites");
}

const spec = (name, text) =>
  `<span class="flex items-center gap-2"><span class="text-accent">${icon(name, "w-4 h-4")}</span>${text}</span>`;


export function makeCard(laptop, mode) {
  const id = laptop.id;
  const lastButton =
    mode === "remove"
      ? `<button class="btn-red favBtn flex-1" data-id="${id}" data-kind="remove">${favInner(id, "remove")}</button>`
      : "";
  const detailsClass = mode === "remove" ? "btn-line" : "btn";
  return `
    <div class="card p-0 overflow-hidden flex flex-col">
      <div class="relative bg-slate-900">
        <img src="${laptop.image}" alt="${laptop.name}" class="h-44 w-full object-cover">
        <span class="absolute top-3 left-3 rounded px-2 py-1 text-xs font-bold text-white ${categoryClass(laptop.category)}">${laptop.category}</span>
        <button class="favBtn absolute top-3 right-3 rounded-full bg-card p-2 text-accent transition hover:scale-110 cursor-pointer" data-id="${id}" data-kind="heart" aria-label="Favorite">${favInner(id, "heart")}</button>
      </div>
      <div class="p-4 flex flex-col flex-1">
        <div class="flex justify-between gap-2">
          <div>
            <h3 class="font-bold text-lg leading-tight">${laptop.name}</h3>
            <p class="text-sm opacity-70">${laptop.brand}</p>
          </div>
          <p class="text-xl font-bold text-accent">${formatPrice(laptop.price)}</p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm border-t border-line mt-3 pt-3">
          ${spec("cpu", laptop.cpu)}
          ${spec("screen", laptop.screenInches + '"')}
          ${spec("ram", laptop.ramGB + " GB RAM")}
          ${spec("battery", laptop.batteryHours + " hours")}
          ${spec("storage", laptop.storageGB + " GB SSD")}
          ${spec("weight", laptop.weightKg + " kg")}
        </div>
        <div class="mt-auto pt-4 flex gap-2">
          <a href="details.html?id=${id}" class="${detailsClass} flex-1">View Details ${icon("arrow", "w-4 h-4")}</a>
          ${lastButton}
        </div>
      </div>
    </div>`;
}

export function updateFavCount() {
  const span = document.getElementById("favCount");
  if (span) span.textContent = getFavorites().length;
}


export function listenFavButtons(box, onChange) {
  box.addEventListener("click", (event) => {
    const button = event.target.closest(".favBtn");
    if (!button) return;
    const id = Number(button.dataset.id);
    toggleFavorite(id);
    
    document.querySelectorAll(`.favBtn[data-id="${id}"]`).forEach((b) => {
      b.innerHTML = favInner(id, b.dataset.kind);
    });
    updateFavCount();
    if (onChange) onChange();
  });
}


export function applyTheme(name) {
  const performance = name === "performance";
  document.documentElement.dataset.theme = name;
  document.getElementById("themeLabel").textContent = performance ? "Performance Mode" : "Battery Saver Mode";
  document.getElementById("themeKnob").classList.toggle("translate-x-5", performance);
}

const pages = [
  ["index.html", "Home", "home"],
  ["laptops.html", "Laptops", "laptop"],
  ["favorites.html", "Favorites", "heart"],
  ["compare.html", "Compare", "scale"],
];

export function setupHeader() {
  const current = location.pathname.split("/").pop() || "index.html";
  const links = pages
    .map(([file, name, iconName]) => {
      const active = file === current || (current === "details.html" && file === "laptops.html");
      const count = file === "favorites.html" ? ` (<span id="favCount">0</span>)` : "";
      return `<a href="${file}" class="flex items-center gap-2 rounded-lg px-3 py-2 transition ${active ? "bg-accent text-white" : "hover:text-accent"}">${icon(iconName)}${name}${count}</a>`;
    })
    .join("");

  document.getElementById("header").innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
      <a href="index.html" class="flex items-center gap-2 text-xl font-bold">
        <span class="text-accent">${icon("laptop", "w-8 h-8")}</span>Student Laptop Finder
      </a>
      <button id="menuBtn" class="btn-line lg:hidden">Menu</button>
      <nav id="menu" class="hidden w-full pt-3 lg:flex lg:w-auto lg:items-center lg:gap-1 lg:pt-0">
        ${links}
        <button id="themeBtn" class="flex items-center gap-3 mt-3 px-3 lg:mt-0 lg:ml-3 cursor-pointer" aria-label="Switch theme">
          <span id="themeLabel" class="text-sm"></span>
          <span class="w-11 h-6 rounded-full bg-accent flex items-center px-1">
            <span id="themeKnob" class="w-4 h-4 rounded-full bg-white transition duration-200"></span>
          </span>
        </button>
      </nav>
    </div>`;

  document.getElementById("footer").innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center gap-3 text-sm">
      <span class="flex items-center gap-2 font-bold"><span class="text-accent">${icon("laptop")}</span>Student Laptop Finder</span>
      <span class="opacity-70">A simple tool to help students find, save, and compare laptops.</span>
    </div>`;

  applyTheme(getTheme());
  updateFavCount();

  document.getElementById("themeBtn").addEventListener("click", () => {
    const next = getTheme() === "performance" ? "battery" : "performance";
    saveTheme(next);
    applyTheme(next);
  });
  document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("hidden");
  });
}
