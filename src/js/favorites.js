// favorites.js - the saved laptops page

import { getLaptops } from "./api.js";
import { makeCard, showSkeletons, showMessage, setupHeader, listenFavButtons, formatPrice, updateFavCount } from "./ui.js";
import { getFavorites, clearFavorites } from "./storage.js";

const list = document.getElementById("list");
let allLaptops = [];

function showFavorites() {
  const ids = getFavorites();
  const saved = allLaptops.filter((l) => ids.includes(l.id));

  // reduce: add all prices together, then calculate the average
  const total = saved.reduce((sum, l) => sum + l.price, 0);
  const average = saved.length ? Math.round(total / saved.length) : 0;

  document.getElementById("savedNum").textContent = saved.length;
  document.getElementById("totalPrice").textContent = formatPrice(total);
  document.getElementById("avgPrice").textContent = formatPrice(average);
  document.getElementById("listTitle").textContent = `Your Favorite Laptops (${saved.length})`;

  if (saved.length === 0) {
    showMessage(list, "You have no favorites yet. Open the catalogue and save some laptops.");
  } else {
    list.innerHTML = saved.map((l) => makeCard(l, "remove")).join("");
  }
}

async function start() {
  setupHeader();
  listenFavButtons(list, showFavorites); // redraw the list after a remove
  showSkeletons(list, 3);

  const data = await getLaptops();
  if (!data) {
    showMessage(list, "Sorry, the laptop data could not be loaded.");
    return;
  }
  allLaptops = data;
  showFavorites();

  document.getElementById("clearBtn").addEventListener("click", () => {
    clearFavorites();
    showFavorites();
    updateFavCount();
  });
}
start();
