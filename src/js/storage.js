const read = (key, fallback) => {
  try {
    const text = localStorage.getItem(key);
    return text ? JSON.parse(text) : fallback;
  } catch (error) {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

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

export const getCompareIds = () => read("compareIds", []).filter((id) => getFavorites().includes(id));
export const saveCompareIds = (ids) => write("compareIds", ids);

export function addToCompare(id) {
  if (!isFavorite(id)) toggleFavorite(id);
  const ids = getCompareIds();
  if (ids.includes(id)) return true;
  if (ids.length >= 4) return false;
  ids.push(id);
  saveCompareIds(ids);
  return true;
}

export const getTheme = () => read("theme", "battery");
export const saveTheme = (name) => write("theme", name);
