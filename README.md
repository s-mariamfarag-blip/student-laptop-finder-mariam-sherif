# Student Laptop Finder

A small web application that helps students browse laptop models, review specifications, save favorites, and compare selected laptops.

Repository: https://github.com/s-mariamfarag-blip/student-laptop-finder-mariam-sherif

The project uses HTML, JavaScript ES modules, JSON, LocalStorage, and Tailwind CSS 4. Laptop prices are displayed in Egyptian pounds (EGP). The listed prices are approximate example prices for the project and should not be treated as live store quotations.

## Install and build

```bash
npm install
npm run build
```

To rebuild the CSS automatically while editing:

```bash
npm run watch
```

## Run

Open the project folder in VS Code and start Live Server from `index.html`. A local server is required because the application loads `data/laptops.json` with `fetch()`.

## Pages

- `index.html` - home page and laptop statistics
- `laptops.html` - laptop catalogue, search, filters, and sorting
- `details.html?id=1` - details for a selected laptop
- `favorites.html` - saved laptops and price summary
- `compare.html` - compare two to four selected laptops

## Main files

- `data/laptops.json` - laptop information and approximate EGP prices
- `src/js/api.js` - loads the JSON data
- `src/js/storage.js` - manages favorites, comparison choices, and theme using LocalStorage
- `src/js/ui.js` - shared interface elements, laptop cards, icons, and theme controls
- `src/js/compare.js` - comparison table and best-value indicators
- `src/js/home.js`, `laptops.js`, `details.js`, `favorites.js`, and `comparePage.js` - page-specific behavior
- `src/input.css` - Tailwind CSS setup, themes, and reusable component styles
- `dist/output.css` - generated stylesheet

## Features

- Search laptops by name or brand
- Filter by category, maximum price, and RAM
- Sort by price, battery life, and weight
- Save and remove favorite laptops
- Compare up to four laptops
- Light and dark themes
