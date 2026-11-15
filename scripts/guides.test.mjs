import assert from "node:assert/strict";
import { test } from "node:test";
import { buildGuides, nationalStats, pricingStats, renderGuidePage, renderGuidesIndex } from "./guides.mjs";
import { buildLocations, renderNotFoundPage } from "./seo-pages.mjs";

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
    // The pricing guide talks about item prices, but no guide should suggest posting costs money
    if (!guide.slug.includes("price")) assert.ok(!html.includes("$"), "guides shouldn't mention prices");
    assert.ok(!/\$\d+ to post|posting (costs|fee)/i.test(html));
    assert.ok(!html.includes("1 Private Lane"));
    assert.ok(!html.includes("undefined") && !html.includes("NaN"));
    if (!guide.slug.includes("price")) {
      assert.ok(/have been [A-Z][a-z]+(, [A-Z][a-z]+)*,? and [A-Z][a-z]+\./.test(html) || /have been [A-Z][a-z]+\./.test(html));
    }
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

const priced = (id, description) => ({ ...listing(id, "2026-10-03"), description });

test("pricing stats come from what sellers wrote", () => {
  const stats = pricingStats([
    priced(1, "Most items $1, fill a bag for $5. Venmo accepted"),
    priced(2, "Clothes $1, furniture negotiable, everything must go"),
    priced(3, "Bikes $5 to $15, cash only"),
    priced(4, "Baseball cards and a cardigan, no prices listed"),
    priced(5, "Kids books 50 cents each"),
  ]);
  assert.equal(stats.listings, 5);
  assert.equal(stats.priced, 3);
  assert.equal(stats.topPrice, "1");
  assert.equal(stats.oneDollarShare, 67);
  assert.equal(stats.fillABag, 1);
  assert.equal(stats.haggling, 1);
  assert.equal(stats.mustGo, 1);
  assert.equal(stats.digital, 1, "cards and cardigans aren't payment methods");
});

test("pricing guide uses listing numbers and links to posting", () => {
  const withPrices = [...LISTINGS, priced(6, "Everything $1"), priced(7, "Tools $5, toys $1")];
  const guides = buildGuides(withPrices, buildLocations(withPrices, TODAY));
  const guide = guides.find((g) => g.slug === "how-to-price-garage-sale-items");
  const html = renderGuidePage(guide, TODAY);
  assert.equal(guide.path, "/guides/how-to-price-garage-sale-items/");
  assert.ok(html.includes("Of 7 sales listed on Find Garage and Yard Sale, 2 mention prices"));
  assert.ok(html.includes("$1 is the most common price"));
  assert.ok(html.includes("<table>") && html.includes("Furniture"));
  assert.ok(html.includes('href="/guides/how-to-post-a-garage-sale-online-free/"'));
});

test("not found page is noindexed and links back into the site", () => {
  const html = renderNotFoundPage();
  assert.ok(html.includes('<meta name="robots" content="noindex, follow">'));
  assert.ok(!html.includes('rel="canonical"'));
  for (const path of ["/sales", "/garage-sales/", "/guides/", "/"]) assert.ok(html.includes(`href="${path}"`));
});
