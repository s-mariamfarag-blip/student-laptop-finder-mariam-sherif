// details.js - one laptop, chosen by ?id=7 in the address

import { getLaptops } from "./api.js";
import { setupHeader, showMessage, formatPrice, favInner, listenFavButtons, updateFavCount, icon, categoryClass } from "./ui.js";
import { addToCompare } from "./storage.js";

async function start() {
  setupHeader();
  const box = document.getElementById("detail");
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const laptops = await getLaptops();
  if (!laptops) {
    showMessage(box, "Sorry, the laptop data could not be loaded.");
    return;
  }
  const laptop = laptops.find((l) => l.id === id);
  if (!laptop) {
    showMessage(box, "Laptop not found. Please go back to the catalogue and choose one.");
    return;
  }

  // every field of the laptop becomes a table row
  const fields = [
    ["ID", laptop.id, "list"], ["Name", laptop.name, "laptop"], ["Brand", laptop.brand, "layers"],
    ["Category", laptop.category, "layers"], ["Price", formatPrice(laptop.price), "tag"],
    ["CPU", laptop.cpu, "cpu"], ["RAM", laptop.ramGB + " GB", "ram"],
    ["Storage", laptop.storageGB + " GB SSD", "storage"], ["Battery life", laptop.batteryHours + " hours", "battery"],
    ["Weight", laptop.weightKg + " kg", "weight"], ["Screen size", laptop.screenInches + " inches", "screen"],
  ];
  const tableRows = fields
    .map(([name, value, iconName]) => `
      <tr class="border-t border-line">
        <th class="p-3 text-left"><span class="flex items-center gap-2"><span class="text-accent">${icon(iconName)}</span>${name}</span></th>
        <td class="p-3">${value}</td>
      </tr>`)
    .join("");

  box.innerHTML = `
    <div class="card grid gap-6 md:grid-cols-2">
      <div class="bg-slate-900 rounded-lg overflow-hidden">
        <img src="${laptop.image}" alt="${laptop.name}" class="w-full h-full object-cover">
      </div>
      <div>
        <span class="rounded px-2 py-1 text-xs font-bold text-white ${categoryClass(laptop.category)}">${laptop.category}</span>
        <h1 class="text-3xl font-bold mt-2">${laptop.name}</h1>
        <p class="opacity-70">${laptop.brand}</p>
        <p class="text-3xl font-bold text-accent my-3">${formatPrice(laptop.price)}</p>
        <p class="mb-4">${laptop.description}</p>
        <div id="buttons" class="flex flex-col sm:flex-row gap-2">
          <button class="btn favBtn" data-id="${laptop.id}" data-kind="text">${favInner(laptop.id, "text")}</button>
          <button id="compareBtn" class="btn-line">${icon("scale", "w-4 h-4")} Add to comparison</button>
        </div>
        <p id="compareMsg" class="text-sm mt-3 min-h-5"></p>
      </div>
    </div>
    <div class="card mt-4 overflow-x-auto">
      <h2 class="text-xl font-bold mb-2">Full specifications</h2>
      <table class="w-full">${tableRows}</table>
    </div>`;

  listenFavButtons(document.getElementById("buttons"));
  document.getElementById("compareBtn").addEventListener("click", () => {
    const ok = addToCompare(laptop.id);
    document.getElementById("compareMsg").textContent = ok
      ? "Added to the comparison (it is also saved in favorites)."
      : "You can compare only 4 laptops. Remove one on the compare page first.";
    document.querySelector(".favBtn").innerHTML = favInner(laptop.id, "text");
    updateFavCount();
  });
}
start();
