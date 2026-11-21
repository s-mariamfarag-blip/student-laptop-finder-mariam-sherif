// storage.js - everything that is saved in localStorage

const read = (key, fallback) => {
  try {
    const text = localStorage.getItem(key);
    return text ? JSON.parse(text) : fallback;
  } catch (error) {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ----- favorites (a list of laptop ids) -----
export const getFavorites = () => read("favorites", []);
export const isFavorite = (id) => getFavorites().includes(id);

export function toggleFavorite(id) {
  let list = getFavorites();
  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
    write("compareIds", getCompareIds().filter((x) => x !== id));
  } else {
    list.push(id);
  }
  write("favorites", list);
}

export function clearFavorites() {
  write("favorites", []);
  write("compareIds", []);
}

// ----- compare (ids picked for the compare page, max 4) -----
export const getCompareIds = () => read("compareIds", []).filter((id) => getFavorites().includes(id));
export const saveCompareIds = (ids) => write("compareIds", ids);

// Returns false when 4 laptops are already chosen
export function addToCompare(id) {
  if (!isFavorite(id)) toggleFavorite(id);
  const ids = getCompareIds();
  if (ids.includes(id)) return true;
  if (ids.length >= 4) return false;
  ids.push(id);
  saveCompareIds(ids);
  return true;
}

// ----- theme: "battery" or "performance" -----
export const getTheme = () => read("theme", "battery");
export const saveTheme = (name) => write("theme", name);
