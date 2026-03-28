# Production Deployment – Live Server

## Privacy policy URL (Google Play)

Play Console’s checker often **does not run JavaScript**. The React app only shows the policy **after** JS runs, so Google may report “could not find” the policy even when the URL works in your browser.

This project ships **`/privacy-policy.html`** as a **static HTML** file (full policy text in the first response). Configure your host so **`/privacy-policy`** and **`/privacy-policy/`** serve that file (Netlify/Vercel configs in the repo already do this). On **nginx**, add **before** the generic SPA `try_files`:

```nginx
location = /privacy-policy {
  try_files /privacy-policy.html =404;
}
location = /privacy-policy/ {
  return 301 /privacy-policy.html;
}
```

(Adjust `root` so `privacy-policy.html` resolves from your `dist` folder.)

---

## 1. Fix 404 on direct URLs (/sales, /sale/123, etc.)

This is a Single Page App. Routes like `/sales` and `/sale/433` don’t exist as files. The server must serve `index.html` for those paths so the React app can load and handle routing.

### nginx

```nginx
server {
    listen 80;
    server_name findgarageandyardsale.com;
    root /var/www/garage_web/dist;   # or wherever your built files are
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass https://api.findgarageandyardsale.com/api/;
        proxy_http_version 1.1;
        proxy_ssl_server_name on;
        proxy_set_header Host api.findgarageandyardsale.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /media/ {
        proxy_pass https://api.findgarageandyardsale.com/media/;
        proxy_ssl_server_name on;
        proxy_set_header Host api.findgarageandyardsale.com;
    }
}
```

`try_files $uri $uri/ /index.html` means: if the requested file exists, serve it; otherwise serve `index.html` (so the SPA can route).

### Apache

A `.htaccess` file is in `public/` and is copied to `dist/` on build. Ensure `mod_rewrite` is enabled on your server. The contents:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

For API proxy on Apache, add to your vhost (requires `mod_proxy`):

```apache
ProxyPass /api https://api.findgarageandyardsale.com/api
ProxyPassReverse /api https://api.findgarageandyardsale.com/api
ProxyPass /media https://api.findgarageandyardsale.com/media
ProxyPassReverse /media https://api.findgarageandyardsale.com/media
```

---

## 2. API proxy (avoiding CORS)

The app uses `/api/v1/...` (relative paths). Configure your server to proxy `/api` and `/media` to the backend at `https://api.findgarageandyardsale.com` (nginx example above).

---

## Alternative: Use direct API URL (no proxy)

If the backend has **CORS** enabled for your domain, you can skip the proxy and call the API directly. Set at build time:

```bash
VITE_API_BASE_URL=https://api.findgarageandyardsale.com npm run build
```

Or in your host's environment: `VITE_API_BASE_URL=https://api.findgarageandyardsale.com`

### Enabling CORS on the API server

Configure the API (Django/Flask/etc.) to allow requests from your site, e.g.:

```python
# Django example – add to settings.py or CORS config
CORS_ALLOWED_ORIGINS = [
    "https://findgarageandyardsale.com",
    "https://www.findgarageandyardsale.com",
]
# Or allow all (less secure):
# CORS_ALLOW_ALL_ORIGINS = True
```

Then use the full API URL in production:

```bash
VITE_API_BASE_URL=https://api.findgarageandyardsale.com
```

Or rely on the default in `src/common/constants/index.js` (same URL in production).

---


### Quick check

After deploying, open DevTools → Network. If API requests fail, look for:

- CORS errors mentioning `Access-Control-Allow-Origin`, or  
- Status 0 / failed / blocked requests  

Those indicate CORS or mixed content (HTTP vs HTTPS). Fix using Option 1 or Option 2 above.
