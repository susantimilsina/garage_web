# Find Garage & Yard Sale – Web

Landing page and sales browser for the Find Garage & Yard Sale app.

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS
- React Router (browser history)

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build

## Environment

- `VITE_API_BASE_URL` – Optional API origin override (default production: `https://api.findgarageandyardsale.com`; dev uses Vite proxy)

## Deployment

### Netlify

Uses `netlify.toml` for SPA fallback (serves `index.html` for all routes).

### Vercel

Uses `vercel.json` with rewrites to serve `index.html` for client routes while excluding `/assets/` and static files.

### Other Hosts (nginx, Apache)

Ensure the server returns `index.html` for routes that don't match physical files (SPA fallback). Example nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Sitemap

`public/sitemap.xml` lists static pages. For dynamic `/sale/:id` URLs, extend with a build script that fetches sale IDs from the API and appends them.
