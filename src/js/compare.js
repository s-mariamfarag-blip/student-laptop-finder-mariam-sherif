import { formatPrice, icon, categoryClass } from "./ui.js";


export const rows = [
  { label: "Price", key: "price", icon: "tag", best: "low", badge: "Best Price", show: (v) => formatPrice(v) },
  { label: "CPU", key: "cpu", icon: "cpu", best: "none", show: (v) => v },
  { label: "RAM", key: "ramGB", icon: "ram", best: "high", badge: "Highest", show: (v) => v + " GB" },
  { label: "Storage", key: "storageGB", icon: "storage", best: "high", badge: "Highest", show: (v) => v + " GB SSD" },
  { label: "Battery Life", key: "batteryHours", icon: "battery", best: "high", badge: "Longest", show: (v) => v + " hours" },
  { label: "Weight", key: "weightKg", icon: "weight", best: "low", badge: "Lightest", show: (v) => v + " kg" },
  { label: "Screen Size", key: "screenInches", icon: "screen", best: "none", show: (v) => v + " inches" },
  { label: "Category", key: "category", icon: "layers", best: "none", show: (v) => v },
];


export const bestValue = (list, key, rule) => {
  const values = list.map((laptop) => laptop[key]);
  return rule === "low" ? Math.min(...values) : Math.max(...values);
};

export function makeCompareTable(list) {
  const head = list
    .map(
      (l) => `
      <th class="p-1 align-bottom">
        <div class="card p-0 overflow-hidden text-left">
          <img src="${l.image}" alt="${l.name}" class="h-32 w-full object-cover bg-slate-900">
          <div class="p-3"><p class="font-bold text-lg leading-tight">${l.name}</p><p class="text-sm font-normal opacity-70">${l.brand}</p></div>
        </div>
      </th>`
    )
    .join("");

  const body = rows
    .map((row) => {
     
      const allSame = list.every((l) => l[row.key] === list[0][row.key]);
      const best = row.best === "none" || allSame ? null : bestValue(list, row.key, row.best);

      const cells = list
        .map((l) => {
          const winner = l[row.key] === best;
          let content = row.show(l[row.key]);
          if (row.key === "category") {
            content = `<span class="rounded-full px-3 py-1 text-sm font-bold text-white ${categoryClass(l.category)}">${l.category}</span>`;
          }
          if (winner) {
            content += ` <span class="ml-2 inline-flex items-center gap-1 text-sm">${icon("crown", "w-4 h-4")}${row.badge}</span>`;
          }
          
          const style = winner ? "bg-best text-besttext font-bold" : row.key === "price" ? "text-accent font-bold text-lg" : "";
          return `<td class="p-3 border-t border-l border-line ${style}">${content}</td>`;
        })
        .join("");

      return `<tr><th class="p-3 text-left whitespace-nowrap border-t border-line"><span class="flex items-center gap-2"><span class="text-accent">${icon(row.icon)}</span>${row.label}</span></th>${cells}</tr>`;
    })
    .join("");

  return `<table class="w-full min-w-[700px] border-collapse"><thead><tr><th></th>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
