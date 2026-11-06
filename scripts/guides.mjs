// How-to guides built with the location pages. Steps match the current app and
// website, and the numbers come from real listings at build time.

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  absolute,
  breadcrumbSchema,
  escapeHtml,
  faqHtml,
  faqSchema,
  heroHtml,
  layout,
  saleDates,
} from "./seo-pages.mjs";

export const GUIDES_PUBLISHED = "2026-11-06";
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

const percent = (part, whole) => Math.round((part / whole) * 100);

const listText = (items) =>
  items.length < 3 ? items.join(" and ") : `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;

const ranked = (counts) => [...counts.entries()].sort((a, b) => b[1] - a[1]);

const tally = (values) => {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return counts;
};

const hourLabel = (hour) => `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;

export const nationalStats = (listings) => {
  const slots = listings.flatMap((listing) => listing.available_time_slots || []);
  const dates = listings.flatMap(saleDates);
  const days = ranked(tally(dates.map((date) => DAY_NAMES[new Date(`${date}T00:00:00Z`).getUTCDay()])));
  const months = ranked(tally(dates.map((date) => MONTH_NAMES[Number(date.slice(5, 7)) - 1])));
  const startHours = ranked(
    tally(slots.map((slot) => Number(/^(\d{1,2}):/.exec(slot.start_time || "")?.[1])).filter(Number.isFinite))
  );
  const totalStarts = startHours.reduce((sum, [, count]) => sum + count, 0);
  const multiDay = listings.filter((listing) => saleDates(listing).length > 1).length;
  return {
    listings: listings.length,
    saleDays: dates.length,
    days: days.map(([day, count]) => ({ day, share: percent(count, dates.length) })),
    busiestMonths: months.slice(0, 3).map(([month]) => month),
    topStartHours: startHours.slice(0, 2).map(([hour]) => hourLabel(hour)),
    earlyStartShare: percent(
      startHours.filter(([hour]) => hour <= 9).reduce((sum, [, count]) => sum + count, 0),
      totalStarts || 1
    ),
    multiDayShare: percent(multiDay, listings.length || 1),
  };
};

const statsSentence = (stats) => {
  const [first, second, third] = stats.days;
  return `In ${stats.listings} sales listed on Find Garage and Yard Sale, ${first.share}% of sale days were on a ${first.day}, ${second.share}% on a ${second.day}, and ${third.share}% on a ${third.day}.`;
};

const articleSchema = (guide, today) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.title,
  description: guide.answer,
  url: absolute(guide.path),
  datePublished: GUIDES_PUBLISHED,
  dateModified: today,
  image: [absolute("/logo.png")],
  author: { "@type": "Organization", name: "Find Garage and Yard Sale", url: absolute("/") },
  publisher: {
    "@type": "Organization",
    name: "Find Garage and Yard Sale",
    logo: { "@type": "ImageObject", url: absolute("/logo.png") },
  },
});

const appButtons = `<p><a class="btn" href="${escapeHtml(APP_STORE_URL)}">Get it on iPhone</a> <a class="btn" href="${escapeHtml(PLAY_STORE_URL)}">Get it on Android</a></p>`;

const topStateLinks = (states, limit = 8) =>
  [...states]
    .sort((a, b) => b.summary.total - a.summary.total)
    .slice(0, limit)
    .map((state) => `<a href="${state.path}">${escapeHtml(state.name)}</a>`)
    .join("");

const postGuide = (stats) => ({
  slug: "how-to-post-a-garage-sale-online-free",
  title: "How to Post a Garage Sale Online for Free",
  answer:
    "Download the free Find Garage and Yard Sale app, create an account, open My Sales, and add your sale's title, description, address, dates, times, and up to 4 photos. Posting is free, and buyers can find your sale in the app and on the website.",
  body: () => `<div class="prose">
<nav class="toc" aria-label="On this page"><strong>On this page</strong><ul>
<li><a href="#steps">Step by step</a></li><li><a href="#timing">When to hold your sale</a></li><li><a href="#tips">Tips for a listing that gets visitors</a></li></ul></nav>
<h2 id="steps">Step by step</h2>
<ol>
<li><strong>Get the app.</strong> Find Garage and Yard Sale is free on iPhone and Android.</li>
<li><strong>Create an account</strong> with your email and a password.</li>
<li><strong>Open My Sales</strong> and start a new sale.</li>
<li><strong>Choose the sale type</strong>, garage or yard.</li>
<li><strong>Add a title and a short description.</strong> Say what you're selling and anything buyers should know.</li>
<li><strong>Pick categories</strong> such as clothes, books, or furniture, so buyers searching for those items find you.</li>
<li><strong>Enter the address</strong>: street, apartment or suite if you have one, city, state, and ZIP code.</li>
<li><strong>Set the dates and times.</strong> You can add up to 7 sale dates, each with its own start and end time.</li>
<li><strong>Add photos.</strong> You can upload up to 4 images.</li>
<li><strong>Submit your sale.</strong> It's free, and buyers can then find it in the app and on <a href="/sales">Find Sales</a>.</li>
</ol>
${appButtons}
<p>You can't post a sale from the website yet, so use the app for this part. Once your sale is live, you can share its link from the app.</p>
<h2 id="timing">When to hold your sale</h2>
<p>${escapeHtml(statsSentence(stats))} The most common start times are ${stats.topStartHours.join(" and ")}, and ${stats.earlyStartShare}% of sales start at 9 AM or earlier.</p>
<p>The busiest months for listings have been ${listText(stats.busiestMonths)}. ${stats.multiDayShare}% of sales run over more than one day, which gives more people a chance to stop by.</p>
<h2 id="tips">Tips for a listing that gets visitors</h2>
<ul>
<li><strong>Lead with your best items.</strong> A title like "Multi-family sale: furniture, tools, kids' clothes" tells buyers more than "Garage sale".</li>
<li><strong>Use clear photos</strong> of your bigger or more unusual items.</li>
<li><strong>Double-check the address and times</strong>, so buyers arrive at the right place when you're open.</li>
<li><strong>Check local rules.</strong> Some cities and homeowners' associations require a permit or limit signs, so check with yours before the day.</li>
<li><strong>Post a few days early</strong>, so buyers planning their weekend can find you.</li>
</ul>
</div>`,
  faq: [
    {
      question: "Is it free to post a garage sale on Find Garage and Yard Sale?",
      answer: "Yes. Posting a sale and browsing sales are both free.",
    },
    {
      question: "Can I post my sale from the website?",
      answer: "Not yet. Posting is in the Find Garage and Yard Sale app for iPhone and Android.",
    },
    {
      question: "How many photos and dates can I add?",
      answer: "You can add up to 4 photos and up to 7 sale dates, each with its own start and end time.",
    },
    {
      question: "What's the best day for a garage sale?",
      answer: `${statsSentence(stats)} Most sales start at ${stats.topStartHours.join(" or ")}.`,
    },
  ],
});

const findGuide = (stats, states) => ({
  slug: "how-to-find-garage-sales-near-me",
  title: "How to Find Garage Sales Near You",
  answer:
    "Search Find Sales on findgarageandyardsale.com, or use the free Find Garage and Yard Sale app to see sales near your location. Filter by date and sale type, or browse sales by state and city.",
  body: () => `<div class="prose">
<nav class="toc" aria-label="On this page"><strong>On this page</strong><ul>
<li><a href="#website">On the website</a></li><li><a href="#app">In the app</a></li><li><a href="#location">By state and city</a></li><li><a href="#when">When to look</a></li></ul></nav>
<h2 id="website">On the website</h2>
<ol>
<li>Open <a href="/sales">Find Sales</a>.</li>
<li>Type a city, ZIP code, or item in the search box.</li>
<li>Set the from and to dates to see sales in that window.</li>
<li>Filter by sale type: all, garage, yard, or estate.</li>
<li>Open a sale to see its address, dates, times, and photos.</li>
</ol>
<p><a class="btn" href="/sales">Find sales now</a></p>
<h2 id="app">In the app</h2>
<ol>
<li>Install the free Find Garage and Yard Sale app and allow location access.</li>
<li>Open the Explore tab to see sales around you.</li>
<li>Search by keyword or ZIP code.</li>
<li>Filter by date, such as today, this week, this month, or your own date range, and by category.</li>
<li>Open a sale for directions, or share it with a friend.</li>
</ol>
${appButtons}
<h2 id="location">By state and city</h2>
<p>Each state and city page lists upcoming sales and recent activity, including the most common sale days and popular categories. Start with these states, or <a href="/garage-sales/">see every location</a>.</p>
<div class="pills">${topStateLinks(states)}</div>
<h2 id="when">When to look</h2>
<p>${escapeHtml(statsSentence(stats))} The most common start times are ${stats.topStartHours.join(" and ")}, so going early gives you the best choice.</p>
<p>The busiest months for listings have been ${listText(stats.busiestMonths)}. Fewer sales are listed in winter.</p>
</div>`,
  faq: [
    {
      question: "How do I find garage sales near me today?",
      answer: "In the app, open Explore with location on and filter by Today. On the website, open Find Sales and set both dates to today.",
    },
    {
      question: "Is it free to find garage sales?",
      answer: "Yes. Browsing sales on the website and in the app is free.",
    },
    {
      question: "What day are most garage sales?",
      answer: statsSentence(stats),
    },
    {
      question: "What time do garage sales start?",
      answer: `Most start at ${stats.topStartHours.join(" or ")}, and ${stats.earlyStartShare}% start at 9 AM or earlier.`,
    },
  ],
});

export const buildGuides = (listings, states) => {
  const stats = nationalStats(listings);
  return [postGuide(stats), findGuide(stats, states)].map((guide) => ({
    ...guide,
    path: `/guides/${guide.slug}/`,
  }));
};

export const renderGuidePage = (guide, today) => {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: guide.title, path: guide.path },
  ];
  const body = `${heroHtml(guide.title, guide.answer, today)}
${guide.body()}
${faqHtml(guide.faq)}`;
  return layout({
    title: `${guide.title} | Find Garage and Yard Sale`,
    description: guide.answer,
    path: guide.path,
    crumbs,
    body,
    schemas: [breadcrumbSchema(crumbs), articleSchema(guide, today), faqSchema(guide.faq)],
  });
};

export const renderGuidesIndex = (guides, today) => {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
  ];
  const description = "Step-by-step guides for finding garage and yard sales and posting your own for free.";
  const body = `${heroHtml("Garage Sale Guides", description, today)}
<section><div class="grid">${guides
    .map((guide) => `<a class="card" href="${guide.path}"><h3>${escapeHtml(guide.title)}</h3><span class="place-count">${escapeHtml(guide.answer.split(". ")[0])}.</span></a>`)
    .join("")}</div></section>`;
  return layout({
    title: "Garage Sale Guides | Find Garage and Yard Sale",
    description,
    path: "/guides/",
    crumbs,
    body,
    schemas: [breadcrumbSchema(crumbs)],
  });
};
