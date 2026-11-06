import assert from "node:assert/strict";
import { test } from "node:test";
import { buildGuides, nationalStats, renderGuidePage, renderGuidesIndex } from "./guides.mjs";
import { buildLocations } from "./seo-pages.mjs";

const TODAY = "2026-11-06";

const listing = (id, date, start_time = "08:00:00", extraDates = []) => ({
  id,
  title: `Sale ${id}`,
  status: "Expired",
  type: "Garage",
  category: [],
  available_time_slots: [date, ...extraDates].map((d) => ({ date: d, start_time, end_time: "14:00:00" })),
  location: { locality: "Austin", admin_area: "TX", throughfare: "1 Private Lane", latitude: 30, longitude: -97 },
});

// 2026-10-03 is a Saturday, 2026-10-04 a Sunday, 2026-10-02 a Friday
const LISTINGS = [
  listing(1, "2026-10-03"),
  listing(2, "2026-10-03", "09:00:00"),
  listing(3, "2026-10-03", "07:00:00", ["2026-10-04"]),
  listing(4, "2026-10-02", "10:00:00"),
  listing(5, "2026-05-04"),
];

test("national stats come from the listings", () => {
  const stats = nationalStats(LISTINGS);
  assert.equal(stats.listings, 5);
  assert.equal(stats.saleDays, 6);
  assert.deepEqual(stats.days[0], { day: "Saturday", share: 50 });
  assert.equal(stats.busiestMonths[0], "October");
  assert.equal(stats.multiDayShare, 20);
  assert.equal(stats.earlyStartShare, 83);
  assert.equal(stats.topStartHours[0], "8 AM");
});

test("guides render with article, FAQ, and breadcrumb data", () => {
  const states = buildLocations(LISTINGS, TODAY);
  for (const guide of buildGuides(LISTINGS, states)) {
    const html = renderGuidePage(guide, TODAY);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.deepEqual(blocks.map((b) => b["@type"]), ["BreadcrumbList", "Article", "FAQPage"]);
    assert.equal(blocks[1].dateModified, TODAY);
    assert.ok(html.includes(`rel="canonical" href="https://findgarageandyardsale.com${guide.path}"`));
    assert.ok(!html.includes("$"), "guides shouldn't mention prices");
    assert.ok(!html.includes("1 Private Lane"));
    assert.ok(!html.includes("undefined") && !html.includes("NaN"));
    assert.ok(/have been [A-Z][a-z]+(, [A-Z][a-z]+)*,? and [A-Z][a-z]+\./.test(html) || /have been [A-Z][a-z]+\./.test(html));
  }
});

test("posting guide matches the app's limits and says posting is free", () => {
  const [post] = buildGuides(LISTINGS, buildLocations(LISTINGS, TODAY));
  const html = renderGuidePage(post, TODAY);
  assert.equal(post.path, "/guides/how-to-post-a-garage-sale-online-free/");
  assert.ok(html.includes("up to 4 photos"));
  assert.ok(html.includes("up to 7 sale dates"));
  assert.ok(html.includes("Posting is free"));
});

test("finding guide links to sales, locations, and states", () => {
  const states = buildLocations(LISTINGS, TODAY);
  const [, find] = buildGuides(LISTINGS, states);
  const html = renderGuidePage(find, TODAY);
  assert.ok(html.includes('href="/sales"'));
  assert.ok(html.includes('href="/garage-sales/"'));
  assert.ok(html.includes('href="/garage-sales/texas/"'));
});

test("guides index links to every guide", () => {
  const guides = buildGuides(LISTINGS, buildLocations(LISTINGS, TODAY));
  const html = renderGuidesIndex(guides, TODAY);
  for (const guide of guides) assert.ok(html.includes(`href="${guide.path}"`));
});
