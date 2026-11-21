// home.js - the home page (statistics + featured laptops)

import { getLaptops } from "./api.js";
import { setupHeader, formatPrice, makeCard, listenFavButtons, showSkeletons, showMessage } from "./ui.js";
import { getFavorites } from "./storage.js";

const featured = document.getElementById("featured");

function showFavoriteStat() {
  document.getElementById("statFav").textContent = getFavorites().length;
}

async function start() {
  setupHeader();
  showFavoriteStat();
  listenFavButtons(featured, showFavoriteStat);
  showSkeletons(featured, 4);

  const laptops = await getLaptops();
  if (!laptops) {
    document.getElementById("statCount").textContent = "-";
    document.getElementById("statLowest").textContent = "-";
    showMessage(featured, "Sorry, the laptop data could not be loaded. Run the site with a local server (Live Server).");
    return;
  }
  // reduce: find the lowest price
  const lowest = laptops.reduce((min, l) => (l.price < min ? l.price : min), Infinity);

  document.getElementById("statCount").textContent = laptops.length;
  document.getElementById("statLowest").textContent = formatPrice(lowest);
  featured.innerHTML = laptops.slice(0, 4).map((l) => makeCard(l)).join("");
}
start();
