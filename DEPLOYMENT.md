# Production Deployment – API / CORS

## Default behavior

The app uses **relative paths** (`/api/v1/...`) by default. Requests go to your domain and must be **proxied** to the backend. `netlify.toml` and `vercel.json` are configured to proxy `/api` and `/media` to `http://18.232.33.127:8000`.

**Netlify / Vercel**: Redeploy after pulling these changes. No extra config needed.

**Other hosts (nginx, Apache, etc.)**: Add proxy rules (see Option 2 below).

---

## Alternative: Use direct API URL

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

## Manual proxy setup (self-hosted, custom server)

If you’re not on Netlify/Vercel, configure your server to proxy `/api` and `/media` to the backend. Examples:

**nginx:**
```nginx
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
```

**Netlify** (`netlify.toml`):
```toml
[[redirects]]
  from = "/api/*"
  to = "http://18.232.33.127:8000/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/media/*"
  to = "http://18.232.33.127:8000/media/:splat"
  status = 200
  force = true
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "http://18.232.33.127:8000/api/:path*" },
    { "source": "/media/:path*", "destination": "http://18.232.33.127:8000/media/:path*" }
  ]
}
```

---

### Quick check

After deploying, open DevTools → Network. If API requests fail, look for:

- CORS errors mentioning `Access-Control-Allow-Origin`, or  
- Status 0 / failed / blocked requests  

Those indicate CORS or mixed content (HTTP vs HTTPS). Fix using Option 1 or Option 2 above.
