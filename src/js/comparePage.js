
import { getLaptops } from "./api.js";
import { setupHeader, showMessage, formatPrice } from "./ui.js";
import { getFavorites, getCompareIds, saveCompareIds } from "./storage.js";
import { makeCompareTable } from "./compare.js";

const picker = document.getElementById("picker");
const message = document.getElementById("message");
const tableBox = document.getElementById("tableBox");
const info = document.getElementById("compareInfo");
let favorites = [];

function showTable() {
  const ids = getCompareIds();
  const chosen = favorites.filter((l) => ids.includes(l.id));
  info.textContent = `Comparing ${chosen.length} laptops (2 – 4 allowed)`;
  if (chosen.length < 2) {
    tableBox.innerHTML = `<p class="text-center">Choose at least 2 laptops to compare.</p>`;
    return;
  }
  tableBox.innerHTML = makeCompareTable(chosen);
}

async function start() {
  setupHeader();
  const laptops = await getLaptops();
  if (!laptops) {
    showMessage(picker, "Sorry, the laptop data could not be loaded.");
    return;
  }
  favorites = laptops.filter((l) => getFavorites().includes(l.id));
  if (favorites.length < 2) {
    info.textContent = "Comparing 0 laptops (2 – 4 allowed)";
    showMessage(picker, `Save at least 2 laptops in <a href="laptops.html" class="text-accent underline">the catalogue</a> first. Then come back here.`);
    tableBox.classList.add("hidden");
    return;
  }

  const ids = getCompareIds();
  picker.innerHTML = favorites
    .map((l) => `
      <label class="card flex items-center gap-3 cursor-pointer">
        <input type="checkbox" class="pick" value="${l.id}" ${ids.includes(l.id) ? "checked" : ""}>
        <span>${l.name} <span class="opacity-70">(${formatPrice(l.price)})</span></span>
      </label>`)
    .join("");

  picker.addEventListener("change", (event) => {
    const box = event.target;
    let chosen = getCompareIds();
    if (box.checked) {
      if (chosen.length >= 4) {
        box.checked = false; 
        message.textContent = "You can compare only 4 laptops. Uncheck one first.";
        return;
      }
      chosen.push(Number(box.value));
    } else {
      chosen = chosen.filter((id) => id !== Number(box.value));
    }
    message.textContent = "";
    saveCompareIds(chosen);
    showTable();
  });
  showTable();
}
start();
