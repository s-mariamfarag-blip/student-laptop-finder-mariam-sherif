// laptops.js - the catalogue page (search, filters, sorting)

import { getLaptops } from "./api.js";
import { makeCard, showSkeletons, showMessage, setupHeader, listenFavButtons } from "./ui.js";

const list = document.getElementById("list");
const count = document.getElementById("count");
const searchBox = document.getElementById("search");
const categoryBox = document.getElementById("category");
const priceBox = document.getElementById("maxPrice");
const ramBox = document.getElementById("minRam");
const sortBox = document.getElementById("sort");

let allLaptops = [];

// every sort option has its own compare function
const sorters = {
  default: (a, b) => a.id - b.id,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "battery-asc": (a, b) => a.batteryHours - b.batteryHours,
  "battery-desc": (a, b) => b.batteryHours - a.batteryHours,
  "weight-asc": (a, b) => a.weightKg - b.weightKg,
  "weight-desc": (a, b) => b.weightKg - a.weightKg,
};

function showLaptops() {
  const text = searchBox.value.toLowerCase().trim();
  const category = categoryBox.value;
  const maxPrice = Number(priceBox.value) || Infinity; // empty box = no limit
  const minRam = Number(ramBox.value);

  const found = allLaptops.filter((l) => {
    const matchText = (l.name + " " + l.brand).toLowerCase().includes(text);
    const matchCategory = category === "all" || l.category === category;
    return matchText && matchCategory && l.price <= maxPrice && l.ramGB >= minRam;
  });

  // [...found] makes a copy, so the original array is not changed
  const sorted = [...found].sort(sorters[sortBox.value]);

  count.textContent = sorted.length + " laptops found";
  if (sorted.length === 0) {
    showMessage(list, "No laptop matches your search. Try changing the filters.");
  } else {
    list.innerHTML = sorted.map((l) => makeCard(l)).join("");
  }
}

async function start() {
  setupHeader();
  listenFavButtons(list);
  showSkeletons(list, 6);

  const data = await getLaptops();
  if (!data) {
    count.textContent = "";
    showMessage(list, "Sorry, the laptops could not be loaded. Run the site with a local server (Live Server).");
    return;
  }
  allLaptops = data;
  showLaptops();

  // "input" runs while typing, "change" runs for dropdowns
  [searchBox, priceBox].forEach((box) => box.addEventListener("input", showLaptops));
  [categoryBox, ramBox, sortBox].forEach((box) => box.addEventListener("change", showLaptops));
}
start();
