export const SITE_URL = "https://findgarageandyardsale.com";

// Use relative path (empty) for proxy - works with Netlify/Vercel/nginx proxy to avoid CORS.
// In dev: Vite proxy forwards /api to backend. In prod: set up proxy (see DEPLOYMENT.md).
// To hit API directly instead, set VITE_API_BASE_URL=http://18.232.33.127:8000 (backend must allow CORS).
const API_HOST = import.meta.env.VITE_API_BASE_URL ?? "";
export const API_BASE_URL = `${API_HOST.replace(/\/$/, "")}/api/v1`;
export const MEDIA_BASE_URL = API_HOST.replace(/\/api\/v1.*$/, "").replace(/\/$/, "") || API_HOST;
export const GARAGE_YARD_SALES_LIST = "/garage/yard/sales/";
export const GARAGE_YARD_SALES_BY_ID = (id) => `/garage/yard/sales/${id}/`;

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/find-garage-yard-sale/id6737464722?utm_source=website&utm_medium=web";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.garageyard.garageyardsale&utm_source=website&utm_medium=web";