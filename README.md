# Student Laptop Finder

A simple website to browse, filter, save and compare laptops.
Built with JavaScript (ES modules) and Tailwind CSS 4 (installed locally with npm).

GitHub repo: [https://github.com/s-mariamfarag-blip/student-laptop-finder-mariam-sherif](https://github.com/s-mariamfarag-blip/student-laptop-finder-mariam-sherif) 

## Install and build
```
npm install
npm run build
```
`npm run build` makes `dist/output.css` from `src/input.css`.
While you work, use `npm run watch` to rebuild automatically.

## Run
Open the folder in VS Code and start **Live Server** on `index.html`.
(`fetch()` and modules do not work if you double click the HTML files.)

## Files
- `index.html, laptops.html, details.html, favorites.html, compare.html` - the 5 pages
- `src/input.css` - Tailwind setup, 2 themes (`@theme`), forms plugin (`@plugin`), component classes (`.card`, `.btn`, `.btn-line`, `.btn-red`, `.field`)
- `src/js/api.js` - loads the JSON with fetch
- `src/js/storage.js` - favorites, compare list and theme in localStorage
- `src/js/ui.js` - icons, card, skeleton, header, footer and theme
- `src/js/compare.js` - comparison table and best values
- `src/js/home.js, laptops.js, details.js, favorites.js, comparePage.js` - one file per page
- `data/laptops.json` - 21 laptops, `assets/` - laptop images (SVG drawings; you can replace them with real photos)
