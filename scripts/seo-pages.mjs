// Builds static state and city pages from public listings, so search engines and
// AI tools can read them without running JavaScript.

export const SITE_URL = "https://findgarageandyardsale.com";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/find-garage-yard-sale/id6737464722?utm_source=website&utm_medium=web";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.garageyard.garageyardsale&utm_source=website&utm_medium=web";

export const MIN_STATE_LISTINGS = 3;
export const MIN_CITY_LISTINGS = 5;
const MAX_UPCOMING_SHOWN = 20;
const NEARBY_CITIES_SHOWN = 5;

export const US_STATES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

export const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const escapeHtml = (text) =>
  String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// "<" is escaped so listing text can't close the surrounding script tag
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const titleCase = (text) => text.toLowerCase().replace(/(^|[\s\-'.])([a-z])/g, (m, sep, c) => sep + c.toUpperCase());

const saleDates = (listing) =>
  (listing.available_time_slots || [])
    .map((slot) => slot.date)
    .filter((date) => /^\d{4}-\d{2}-\d{2}/.test(date || ""))
    .map((date) => date.slice(0, 10))
    .sort();

const parseDate = (isoDate) => new Date(`${isoDate}T00:00:00Z`);

export const formatDate = (isoDate) => {
  const date = parseDate(isoDate);
  return `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

const formatTime = (time) => {
  const match = /^(\d{1,2}):(\d{2})/.exec(time || "");
  if (!match) return null;
  const hours = Number(match[1]);
  return `${hours % 12 || 12}:${match[2]} ${hours < 12 ? "AM" : "PM"}`;
};

export const isUpcoming = (listing, today) =>
  listing.status === "Active" && saleDates(listing).some((date) => date >= today);

const topCounts = (values, limit) => {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
    .slice(0, limit)
    .map(([value]) => value);
};

const listLocation = (listing) => {
  const location = listing.location || {};
  const stateCode = (location.admin_area || "").trim().toUpperCase();
  const cityRaw = (location.locality || "").trim();
  if (!US_STATES[stateCode]) return null;
  // Skips bad data such as a ZIP code entered as the city
  const city = /^[A-Za-z][A-Za-z .'-]*$/.test(cityRaw) ? titleCase(cityRaw) : null;
  return { stateCode, city };
};

const summarize = (listings, today) => {
  const upcoming = listings
    .filter((listing) => isUpcoming(listing, today))
    .sort((a, b) => saleDates(a)[0].localeCompare(saleDates(b)[0]));
  const dates = listings.flatMap(saleDates);
  return {
    total: listings.length,
    upcoming,
    lastSaleDate: dates.filter((date) => date <= today).sort().at(-1) ?? null,
    commonDays: topCounts(dates.map((date) => DAY_NAMES[parseDate(date).getUTCDay()]), 2),
    topCategories: topCounts(
      listings.flatMap((listing) => (listing.category || []).map((c) => c?.name).filter(Boolean)),
      4
    ),
  };
};

const center = (listings) => {
  const points = listings
    .map((listing) => [Number(listing.location?.latitude), Number(listing.location?.longitude)])
    .filter(([lat, lon]) => Number.isFinite(lat) && Number.isFinite(lon) && (lat !== 0 || lon !== 0));
  if (!points.length) return null;
  return [
    points.reduce((sum, p) => sum + p[0], 0) / points.length,
    points.reduce((sum, p) => sum + p[1], 0) / points.length,
  ];
};

const distanceSquared = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

// Groups listings and applies the quality gate: a page needs enough real listings or an upcoming sale
export const buildLocations = (listings, today) => {
  const byState = new Map();
  listings.forEach((listing) => {
    const place = listLocation(listing);
    if (!place) return;
    if (!byState.has(place.stateCode)) byState.set(place.stateCode, { listings: [], cities: new Map() });
    const state = byState.get(place.stateCode);
    state.listings.push(listing);
    if (!place.city) return;
    const key = slugify(place.city);
    if (!state.cities.has(key)) state.cities.set(key, { name: place.city, listings: [] });
    state.cities.get(key).listings.push(listing);
  });

  const states = [];
  byState.forEach((state, code) => {
    const summary = summarize(state.listings, today);
    if (summary.total < MIN_STATE_LISTINGS && !summary.upcoming.length) return;
    const name = US_STATES[code];
    const stateSlug = slugify(name);
    const cities = [];
    state.cities.forEach((city, citySlug) => {
      const citySummary = summarize(city.listings, today);
      if (citySummary.total < MIN_CITY_LISTINGS && !citySummary.upcoming.length) return;
      cities.push({
        name: city.name,
        stateCode: code,
        stateName: name,
        path: `/garage-sales/${stateSlug}/${citySlug}/`,
        statePath: `/garage-sales/${stateSlug}/`,
        center: center(city.listings),
        summary: citySummary,
      });
    });
    cities.sort((a, b) => a.name.localeCompare(b.name));
    states.push({ code, name, path: `/garage-sales/${stateSlug}/`, cities, summary });
  });
  return states.sort((a, b) => a.name.localeCompare(b.name));
};

const absolute = (path) => `${SITE_URL}${path}`;

const nearbyCities = (city, states) => {
  const candidates = states.flatMap((state) => state.cities).filter((other) => other.path !== city.path);
  if (!city.center) return candidates.filter((c) => c.stateCode === city.stateCode).slice(0, NEARBY_CITIES_SHOWN);
  return candidates
    .filter((other) => other.center)
    .sort((a, b) => distanceSquared(city.center, a.center) - distanceSquared(city.center, b.center))
    .slice(0, NEARBY_CITIES_SHOWN);
};

const salesCount = (count) => `${count} ${count === 1 ? "sale" : "sales"}`;

const quickAnswer = (place, summary) => {
  const parts = [];
  if (summary.upcoming.length) {
    const count = summary.upcoming.length;
    parts.push(
      `${count} upcoming ${count === 1 ? "sale is" : "sales are"} listed in ${place}, starting ${formatDate(
        saleDates(summary.upcoming[0])[0]
      )}.`
    );
  } else {
    parts.push(`No upcoming sales are listed in ${place} right now.`);
  }
  parts.push(`Find Garage and Yard Sale has listed ${salesCount(summary.total)} here.`);
  if (summary.lastSaleDate) parts.push(`The most recent was on ${formatDate(summary.lastSaleDate)}.`);
  parts.push("Browsing and posting are free.");
  return parts.join(" ");
};

const faqItems = (place, summary) => {
  const items = [];
  if (summary.commonDays.length) {
    items.push({
      question: `What day are most garage sales in ${place}?`,
      answer: `Most sales listed in ${place} on Find Garage and Yard Sale run on ${summary.commonDays.join(" and ")}.`,
    });
  }
  if (summary.topCategories.length) {
    items.push({
      question: `What can I find at garage sales in ${place}?`,
      answer: `The most common categories in ${place} listings are ${summary.topCategories.join(", ")}.`,
    });
  }
  items.push(
    {
      question: `How do I post a garage sale in ${place}?`,
      answer: "Download the Find Garage and Yard Sale app for iPhone or Android, then add your sale's details and photos. Posting is free.",
    },
    {
      question: `Where can I see all sales near ${place}?`,
      answer: "Open the Find Sales page on this site or use the mobile app to browse listings and filter them by date or type.",
    }
  );
  return items;
};

const saleTime = (listing, today) => {
  const slot = (listing.available_time_slots || [])
    .filter((s) => (s.date || "").slice(0, 10) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  if (!slot) return "";
  const start = formatTime(slot.start_time);
  const end = formatTime(slot.end_time);
  const hours = start && end ? `, ${start} to ${end}` : "";
  return `${formatDate(slot.date.slice(0, 10))}${hours}`;
};

// Street addresses and descriptions stay on the sale's own page
const upcomingHtml = (summary, today) => {
  if (!summary.upcoming.length) {
    return `<p>No upcoming sales are listed here right now. <a href="/sales">See sales in other areas</a> or post your own for free.</p>`;
  }
  const rows = summary.upcoming.slice(0, MAX_UPCOMING_SHOWN).map((listing) => {
    const place = listLocation(listing);
    const town = place?.city ? ` in ${escapeHtml(place.city)}` : "";
    return `<li><a href="/sale/${encodeURIComponent(listing.id)}">${escapeHtml(listing.title)}</a><br><span class="meta">${escapeHtml(listing.type)} sale${town} · ${escapeHtml(saleTime(listing, today))}</span></li>`;
  });
  return `<ul class="sales">${rows.join("")}</ul>`;
};

const eventSchema = (listing, stateCode) => {
  const dates = saleDates(listing);
  const place = listLocation(listing);
  return {
    "@type": "Event",
    name: listing.title,
    startDate: dates[0],
    endDate: dates.at(-1),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absolute(`/sale/${listing.id}`),
    location: {
      "@type": "Place",
      name: place?.city ? `${place.city}, ${stateCode}` : stateCode,
      address: {
        "@type": "PostalAddress",
        ...(place?.city ? { addressLocality: place.city } : {}),
        addressRegion: stateCode,
        addressCountry: "US",
      },
    },
  };
};

const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});

const faqSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

const STYLES = `
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1A1A1A;background:#fff;line-height:1.6}
a{color:#255099}
header,footer{background:#255099;color:#fff;padding:16px}
header a,footer a{color:#fff}
.brand{font-weight:700;text-decoration:none}
.wrap{max-width:760px;margin:0 auto}
main{padding:16px}
nav.crumbs{font-size:14px;margin-bottom:8px}
h1{font-size:30px;line-height:1.25;margin:8px 0 16px;color:#262437}
h2{font-size:22px;margin:32px 0 8px;color:#262437}
h3{font-size:17px;margin:16px 0 4px}
.answer{background:#F2FFF4;border-left:4px solid #368841;padding:12px 16px;margin:0 0 16px}
.sales,.links{padding-left:20px}
.sales li{margin-bottom:12px}
.meta{font-size:14px;color:#524342}
.cta{display:inline-block;background:#BC2032;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;margin:4px 8px 4px 0}
footer{margin-top:32px;font-size:14px}
`;

const layout = ({ title, description, path, crumbs, body, schemas }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${absolute(path)}">
<link rel="icon" href="/favicon.ico">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Find Garage and Yard Sale">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${absolute(path)}">
<meta property="og:image" content="${absolute("/logo.png")}">
<meta name="twitter:card" content="summary">
${schemas.map(jsonLd).join("\n")}
<style>${STYLES}</style>
</head>
<body>
<header><div class="wrap"><a class="brand" href="/">Find Garage and Yard Sale</a></div></header>
<main><div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbs
  .map((crumb, index) =>
    index === crumbs.length - 1 ? escapeHtml(crumb.name) : `<a href="${crumb.path}">${escapeHtml(crumb.name)}</a>`
  )
  .join(" › ")}</nav>
${body}
</div></main>
<footer><div class="wrap"><a href="/sales">Find Sales</a> · <a href="/garage-sales/">Browse by location</a> · <a href="/privacy-policy">Privacy Policy</a> · <a href="/terms-and-conditions">Terms of Use</a></div></footer>
</body>
</html>
`;

const postSaleHtml = `<h2>Post your own sale for free</h2>
<p>Add your sale in the Find Garage and Yard Sale app.</p>
<p><a class="cta" href="${escapeHtml(APP_STORE_URL)}">Get it on iPhone</a><a class="cta" href="${escapeHtml(PLAY_STORE_URL)}">Get it on Android</a></p>`;

const statsHtml = (place, summary) => {
  const facts = [`<li>${salesCount(summary.total)} listed in ${escapeHtml(place)} on this site</li>`];
  if (summary.lastSaleDate) facts.push(`<li>Most recent sale: ${formatDate(summary.lastSaleDate)}</li>`);
  if (summary.commonDays.length) facts.push(`<li>Most common days: ${summary.commonDays.join(" and ")}</li>`);
  if (summary.topCategories.length) facts.push(`<li>Popular categories: ${escapeHtml(summary.topCategories.join(", "))}</li>`);
  return `<h2>Garage sale activity in ${escapeHtml(place)}</h2><ul>${facts.join("")}</ul>`;
};

const faqHtml = (items) =>
  `<h2>Frequently asked questions</h2>${items
    .map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`)
    .join("")}`;

const itemListSchema = (name, path, upcoming, stateCode) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  url: absolute(path),
  ...(upcoming.length
    ? {
        mainEntity: {
          "@type": "ItemList",
          itemListElement: upcoming.slice(0, MAX_UPCOMING_SHOWN).map((listing, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: eventSchema(listing, stateCode),
          })),
        },
      }
    : {}),
});

const updatedHtml = (today) => `<p class="meta">Last updated ${formatDate(today)}.</p>`;

export const renderCityPage = (city, states, today) => {
  const place = `${city.name}, ${city.stateCode}`;
  const { summary } = city;
  const faq = faqItems(place, summary);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Garage Sales", path: "/garage-sales/" },
    { name: city.stateName, path: city.statePath },
    { name: city.name, path: city.path },
  ];
  const nearby = nearbyCities(city, states);
  const body = `<h1>Garage Sales in ${escapeHtml(place)}</h1>
<p class="answer">${escapeHtml(quickAnswer(place, summary))}</p>
${updatedHtml(today)}
<h2>Upcoming sales</h2>
${upcomingHtml(summary, today)}
<p><a class="cta" href="/sales">Browse all sales</a></p>
${statsHtml(place, summary)}
${nearby.length ? `<h2>More cities to browse</h2><ul class="links">${nearby
    .map((other) => `<li><a href="${other.path}">Garage sales in ${escapeHtml(other.name)}, ${other.stateCode}</a></li>`)
    .join("")}</ul>` : ""}
<p><a href="${city.statePath}">All garage sales in ${escapeHtml(city.stateName)}</a></p>
${postSaleHtml}
${faqHtml(faq)}`;
  const title = `Garage Sales in ${place} | Find Garage and Yard Sale`;
  return layout({
    title,
    description: `${quickAnswer(place, summary)}`.slice(0, 300),
    path: city.path,
    crumbs,
    body,
    schemas: [breadcrumbSchema(crumbs), itemListSchema(title, city.path, summary.upcoming, city.stateCode), faqSchema(faq)],
  });
};

export const renderStatePage = (state, today) => {
  const { summary } = state;
  const faq = faqItems(state.name, summary);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Garage Sales", path: "/garage-sales/" },
    { name: state.name, path: state.path },
  ];
  const body = `<h1>Garage Sales in ${escapeHtml(state.name)}</h1>
<p class="answer">${escapeHtml(quickAnswer(state.name, summary))}</p>
${updatedHtml(today)}
<h2>Upcoming sales</h2>
${upcomingHtml(summary, today)}
<p><a class="cta" href="/sales">Browse all sales</a></p>
${state.cities.length ? `<h2>Cities in ${escapeHtml(state.name)}</h2><ul class="links">${state.cities
    .map((city) => `<li><a href="${city.path}">Garage sales in ${escapeHtml(city.name)}</a></li>`)
    .join("")}</ul>` : ""}
${statsHtml(state.name, summary)}
${postSaleHtml}
${faqHtml(faq)}`;
  const title = `Garage Sales in ${state.name} | Find Garage and Yard Sale`;
  return layout({
    title,
    description: quickAnswer(state.name, summary).slice(0, 300),
    path: state.path,
    crumbs,
    body,
    schemas: [breadcrumbSchema(crumbs), itemListSchema(title, state.path, summary.upcoming, state.code), faqSchema(faq)],
  });
};

export const renderDirectoryPage = (states, today) => {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Garage Sales", path: "/garage-sales/" },
  ];
  const description =
    "Find garage and yard sales by state and city across the United States. Browsing and posting your own sale are free.";
  const body = `<h1>Garage Sales by Location</h1>
<p class="answer">${escapeHtml(description)}</p>
${updatedHtml(today)}
<h2>Browse by state</h2>
<ul class="links">${states.map((state) => `<li><a href="${state.path}">${escapeHtml(state.name)}</a></li>`).join("")}</ul>
${postSaleHtml}`;
  const title = "Garage Sales by State and City | Find Garage and Yard Sale";
  return layout({
    title,
    description,
    path: "/garage-sales/",
    crumbs,
    body,
    schemas: [breadcrumbSchema(crumbs), itemListSchema(title, "/garage-sales/", [], "US")],
  });
};

export const renderSitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${escapeHtml(absolute(path))}</loc></url>`).join("\n")}
</urlset>
`;
