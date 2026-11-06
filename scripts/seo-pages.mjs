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

export const saleDates = (listing) =>
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

// Sellers sometimes mark a cancelled sale only in its title or address
const isCancelled = (listing) =>
  /\bcancell?ed\b/i.test(
    [listing.title, listing.location?.throughfare, listing.location?.address_line].filter(Boolean).join(" ")
  );

export const isUpcoming = (listing, today) =>
  listing.status === "Active" &&
  !isCancelled(listing) &&
  saleDates(listing).some((date) => date >= today);

const streetAddress = (listing) => {
  const location = listing.location || {};
  return [location.address_line, location.sub_throughfare, location.throughfare]
    .map((part) => (part || "").trim())
    .filter(Boolean)
    .join(" ");
};

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

export const absolute = (path) => `${SITE_URL}${path}`;

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

const ICONS = {
  calendar: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  pin: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
};

const saleImage = (listing, { full = false } = {}) => {
  const image = (listing.images || [])[0];
  const url = full ? image?.file || image?.thumbnail : image?.thumbnail || image?.file;
  return /^https:\/\//.test(url || "") ? url : null;
};

const saleImageHtml = (listing) => {
  const url = saleImage(listing);
  return url
    ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(listing.title)}" width="640" height="400" loading="lazy" decoding="async">`
    : `<img class="placeholder" src="/logo.png" alt="" width="96" height="96" loading="lazy">`;
};

// Only upcoming sales are listed, so past sales' addresses stay off these pages
const upcomingHtml = (summary, today) => {
  if (!summary.upcoming.length) {
    return `<div class="card empty"><h3>No upcoming sales here right now</h3><p>New sales are added often. You can <a href="/sales">browse sales in other areas</a> or post your own for free.</p></div>`;
  }
  const cards = summary.upcoming.slice(0, MAX_UPCOMING_SHOWN).map((listing) => {
    const place = listLocation(listing);
    const street = streetAddress(listing);
    const town = place?.city ? `${place.city}, ${place.stateCode}` : place?.stateCode;
    const address = escapeHtml([street, town].filter(Boolean).join(", "));
    return `<a class="card sale" href="/sale/${encodeURIComponent(listing.id)}"><div class="sale-image">${saleImageHtml(listing)}<span class="chip chip-green">${escapeHtml(listing.type)}</span></div><div class="sale-body"><h3>${escapeHtml(listing.title)}</h3><p class="line line-red">${ICONS.calendar}<span>${escapeHtml(saleTime(listing, today))}</span></p><p class="line line-green">${ICONS.pin}<span>${address}</span></p></div></a>`;
  });
  return `<div class="grid">${cards.join("")}</div>`;
};

const eventSchema = (listing, stateCode) => {
  const dates = saleDates(listing);
  const place = listLocation(listing);
  const street = streetAddress(listing);
  const zip = (listing.location?.zip_code || "").trim();
  const latitude = Number(listing.location?.latitude);
  const longitude = Number(listing.location?.longitude);
  return {
    "@type": "Event",
    name: listing.title,
    startDate: dates[0],
    endDate: dates.at(-1),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absolute(`/sale/${listing.id}`),
    ...(saleImage(listing, { full: true }) ? { image: [saleImage(listing, { full: true })] } : {}),
    location: {
      "@type": "Place",
      name: place?.city ? `${place.city}, ${stateCode}` : stateCode,
      ...(latitude && longitude ? { geo: { "@type": "GeoCoordinates", latitude, longitude } } : {}),
      address: {
        "@type": "PostalAddress",
        ...(street ? { streetAddress: street } : {}),
        ...(zip ? { postalCode: zip } : {}),
        ...(place?.city ? { addressLocality: place.city } : {}),
        addressRegion: stateCode,
        addressCountry: "US",
      },
    },
  };
};

export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});

export const faqSchema = (items) => ({
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
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#F7F8FA;color:#1A1A1A;font-family:"Rethink Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:16px;line-height:1.6}
a{color:#255099}
h1,h2{font-family:Merriweather,Georgia,serif;color:#262437}
.wrap{max-width:1040px;margin:0 auto;padding:0 16px}
.nav{background:#fff;box-shadow:0 1px 4px rgba(38,36,55,.1)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:64px}
.logo{display:flex;align-items:center;text-decoration:none}
.logo img{display:block;width:48px;height:48px;object-fit:contain}
.nav-links{display:flex;align-items:center;gap:8px;font-weight:500;font-size:15px}
.nav-links a{color:#262437;text-decoration:none;padding:6px 8px}
.nav-links a.pill{background:#255099;color:#fff;border-radius:999px;padding:6px 16px}
.hero{padding:16px 0 8px}
.crumbs{font-size:13px;color:#524342;margin-bottom:8px}
.crumbs a{color:#524342;text-decoration:none}
.crumbs a:hover{text-decoration:underline}
h1{font-size:30px;line-height:1.25;margin:0 0 16px}
h2{font-size:22px;line-height:1.3;margin:0 0 16px}
h3{font-size:17px;line-height:1.35;margin:0}
section{margin-top:32px}
.answer{background:#F2FFF4;border:1px solid #CDEFD3;border-radius:14px;padding:16px;margin:0;font-size:17px}
.updated{font-size:13px;color:#524342;margin:8px 0 0}
.card{display:block;background:#fff;border-radius:14px;padding:16px;box-shadow:0 1px 6px rgba(38,36,55,.1)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
a.card{color:inherit;text-decoration:none}
a.card:hover{box-shadow:0 4px 14px rgba(38,36,55,.16)}
.sale{padding:0;overflow:hidden}
.sale-image{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:16/10;background:#FFF8F7}
.sale-image img{display:block;width:100%;height:100%;object-fit:cover}
.sale-image img.placeholder{width:96px;height:96px;object-fit:contain}
.sale-image .chip{position:absolute;top:10px;left:10px}
.sale-body{padding:12px 16px 16px}
.sale h3{margin:0 0 8px}
.line{display:flex;gap:8px;align-items:flex-start;margin:4px 0 0;font-size:14px;color:#524342}
.icon{flex:none;width:18px;height:18px;margin-top:2px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.line-red .icon{color:#BC2032}
.line-green .icon{color:#368841}
.chip{display:inline-block;border-radius:999px;padding:3px 12px;font-size:13px;font-weight:500;background:#FFE9D9;color:#262437}
.chip-green{background:#B2FFBD}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 0}
.empty h3{margin-bottom:4px}
.empty p{margin:0}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.stat{background:#fff;border-radius:14px;padding:16px;box-shadow:0 1px 6px rgba(38,36,55,.1)}
.stat strong{display:block;font-size:20px;line-height:1.3;color:#255099}
.stat span{font-size:13px;color:#524342}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pills a{background:#fff;border:1px solid #D5DCE8;border-radius:999px;padding:7px 14px;font-size:14px;color:#255099;text-decoration:none}
.pills a:hover{background:#EEF3FB}
.place-count{display:block;font-size:13px;color:#524342;margin-top:2px}
.btn{display:inline-block;background:#255099;color:#fff;border-radius:999px;padding:10px 20px;font-weight:600;text-decoration:none}
.cta-row{margin-top:16px}
.band{background:#255099;color:#fff;border-radius:14px;padding:24px 16px}
.band h2{color:#fff;margin-bottom:8px}
.band p{margin:0 0 16px}
.band .btn{background:#fff;color:#255099;margin:0 8px 8px 0}
details{background:#fff;border-radius:14px;box-shadow:0 1px 6px rgba(38,36,55,.1);margin-bottom:12px}
summary{cursor:pointer;font-weight:600;padding:14px 16px;color:#262437}
details p{margin:0;padding:0 16px 14px;color:#524342}
.foot{background:#255099;color:#fff;margin-top:48px;padding:24px 0;font-size:14px}
.foot a{color:#fff;margin-right:16px;white-space:nowrap;display:inline-block;padding:2px 0}
.foot p{margin:8px 0 0;color:rgba(255,255,255,.85)}
.band-link{color:#fff;text-decoration:underline}
.prose{max-width:720px}
.prose p,.prose li{font-size:17px}
.prose ol,.prose ul{padding-left:22px}
.prose li{margin-bottom:8px}
.prose h2{margin-top:32px}
.toc{background:#fff;border-radius:14px;padding:16px 20px;box-shadow:0 1px 6px rgba(38,36,55,.1);margin-top:24px}
.toc ul{margin:8px 0 0;padding-left:20px}
@media(max-width:480px){h1{font-size:26px}.nav-links .hide-sm{display:none}}
`;

export const layout = ({ title, description, path, crumbs, body, schemas }) => `<!DOCTYPE html>
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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Rethink+Sans:wght@400;500;600&display=swap">
${schemas.map(jsonLd).join("\n")}
<style>${STYLES}</style>
</head>
<body>
<header class="nav"><div class="wrap">
<a class="logo" href="/"><img src="/logo.png" width="48" height="48" alt="Find Garage and Yard Sale"></a>
<nav class="nav-links" aria-label="Main"><a class="hide-sm" href="/">Home</a><a href="/garage-sales/">Locations</a><a class="pill" href="/sales">Find Sales</a></nav>
</div></header>
<main class="wrap">
<div class="hero">
<nav class="crumbs" aria-label="Breadcrumb">${crumbs
  .map((crumb, index) =>
    index === crumbs.length - 1 ? escapeHtml(crumb.name) : `<a href="${crumb.path}">${escapeHtml(crumb.name)}</a>`
  )
  .join(" / ")}</nav>
${body}
</main>
<footer class="foot"><div class="wrap">
<a href="/sales">Find Sales</a><a href="/garage-sales/">Browse by Location</a><a href="/guides/">Guides</a><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms of Use</a>
<p>Find Garage and Yard Sale. Free to browse and free to post.</p>
</div></footer>
</body>
</html>
`;

export const postSaleHtml = `<section class="band"><h2>Post your own sale for free</h2>
<p>Reach local buyers by adding your sale in the Find Garage and Yard Sale app. <a class="band-link" href="/guides/how-to-post-a-garage-sale-online-free/">See how it works</a>.</p>
<a class="btn" href="${escapeHtml(APP_STORE_URL)}">Get it on iPhone</a><a class="btn" href="${escapeHtml(PLAY_STORE_URL)}">Get it on Android</a></section>`;

const statsHtml = (place, summary) => {
  const stat = (value, label) => `<div class="stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`;
  const tiles = [
    stat(summary.upcoming.length, "Upcoming now"),
    stat(summary.total, summary.total === 1 ? "Sale listed" : "Sales listed"),
  ];
  if (summary.lastSaleDate) tiles.push(stat(formatDate(summary.lastSaleDate), "Most recent sale"));
  if (summary.commonDays.length) tiles.push(stat(summary.commonDays.join(" & "), "Most common days"));
  const categories = summary.topCategories.length
    ? `<div class="chips" aria-label="Popular categories">${summary.topCategories
        .map((category) => `<span class="chip">${escapeHtml(category)}</span>`)
        .join("")}</div>`
    : "";
  return `<section><h2>Garage sale activity in ${escapeHtml(place)}</h2><div class="stats">${tiles.join("")}</div>${categories}</section>`;
};

export const faqHtml = (items) =>
  `<section><h2>Frequently asked questions</h2>${items
    .map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`)
    .join("")}</section>`;

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

const updatedHtml = (today) => `<p class="updated">Last updated ${formatDate(today)}</p>`;

export const heroHtml = (heading, answer, today) => `<h1>${escapeHtml(heading)}</h1>
<p class="answer">${escapeHtml(answer)}</p>
${updatedHtml(today)}
</div>`;

const upcomingSection = (summary, today) => `<section><h2>Upcoming sales</h2>
${upcomingHtml(summary, today)}
<p class="cta-row"><a class="btn" href="/sales">Browse all sales</a></p></section>`;

const placesCount = (total) => `<span class="place-count">${salesCount(total)} listed</span>`;

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
  const body = `${heroHtml(`Garage Sales in ${place}`, quickAnswer(place, summary), today)}
${upcomingSection(summary, today)}
${statsHtml(place, summary)}
<section><h2>More cities to browse</h2><div class="pills">${nearby
    .map((other) => `<a href="${other.path}">${escapeHtml(other.name)}, ${other.stateCode}</a>`)
    .join("")}<a href="${city.statePath}">All of ${escapeHtml(city.stateName)}</a></div></section>
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
  const body = `${heroHtml(`Garage Sales in ${state.name}`, quickAnswer(state.name, summary), today)}
${upcomingSection(summary, today)}
${state.cities.length ? `<section><h2>Cities in ${escapeHtml(state.name)}</h2><div class="grid">${state.cities
    .map((city) => `<a class="card" href="${city.path}"><h3>${escapeHtml(city.name)}</h3>${placesCount(city.summary.total)}</a>`)
    .join("")}</div></section>` : ""}
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
  const body = `${heroHtml("Garage Sales by Location", description, today)}
<section><h2>Browse by state</h2><div class="grid">${states
    .map((state) => `<a class="card" href="${state.path}"><h3>${escapeHtml(state.name)}</h3>${placesCount(state.summary.total)}</a>`)
    .join("")}</div></section>
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
