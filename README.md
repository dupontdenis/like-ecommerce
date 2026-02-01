# Like E-commerce (Student Project)

A simple, educational e‑commerce web application intended for students to learn front-end and basic client-side data handling.

- Purpose: demo app for learning HTML/JS/CSS and simple cart flows.
- Data storage: there is no database — product and cart data are stored in JSON files in the repository (for example [backend/products.json](backend/products.json) and the cart is persisted to `localStorage` and seeded from [data/cart.json](data/cart.json) where used).
- How to run: open `index.html` or serve the folder from a static server (recommended for fetch/XHR to work):

```bash
# from the project root
python -m http.server 8000
# then visit http://localhost:8000
```

- Notes:
  - The app demonstrates loading product data from JSON, listing products, selecting quantities, and storing the cart in `localStorage`.
  - This is not production-ready and does not implement server-side validation or a real database.

Contributions and fixes are welcome — keep changes small and focused for learning.

Developer tip: to remove all saved items from `localStorage` (for example to clear the cart during development), open the browser console and run:

```javascript
localStorage.clear();
```
