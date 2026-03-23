# Production Deployment – Live Server

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
        proxy_pass http://18.232.33.127:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /media/ {
        proxy_pass http://18.232.33.127:8000/media/;
        proxy_set_header Host $host;
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
ProxyPass /api http://18.232.33.127:8000/api
ProxyPassReverse /api http://18.232.33.127:8000/api
ProxyPass /media http://18.232.33.127:8000/media
ProxyPassReverse /media http://18.232.33.127:8000/media
```

---

## 2. API proxy (avoiding CORS)

The app uses `/api/v1/...` (relative paths). Configure your server to proxy `/api` and `/media` to the backend at `http://18.232.33.127:8000` (nginx example above).

---

## Alternative: Use direct API URL (no proxy)

If the backend has **CORS** enabled for your domain, you can skip the proxy and call the API directly. Set at build time:

```bash
VITE_API_BASE_URL=http://18.232.33.127:8000 npm run build
```

Or in your host's environment: `VITE_API_BASE_URL=http://18.232.33.127:8000`

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
VITE_API_BASE_URL=http://18.232.33.127:8000
```

Or rely on the default in `src/common/constants/index.js` (same URL in production).

---


### Quick check

After deploying, open DevTools → Network. If API requests fail, look for:

- CORS errors mentioning `Access-Control-Allow-Origin`, or  
- Status 0 / failed / blocked requests  

Those indicate CORS or mixed content (HTTP vs HTTPS). Fix using Option 1 or Option 2 above.
