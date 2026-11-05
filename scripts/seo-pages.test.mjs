import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildLocations,
  escapeHtml,
  renderCityPage,
  renderDirectoryPage,
  renderSitemap,
  renderStatePage,
} from "./seo-pages.mjs";

const TODAY = "2026-11-04";

const listing = (overrides = {}) => ({
  id: 1,
  title: "Multi-family sale",
  description: "Call 555-0100 for details",
  status: "Expired",
  type: "Garage",
  transaction_id: "txn-secret",
  category: [{ name: "Books" }],
  available_time_slots: [{ date: "2026-05-02", start_time: "08:00:00", end_time: "14:30:00" }],
  location: {
    locality: "Austin",
    admin_area: "TX",
    throughfare: "123 Private Street",
    zip_code: "78701",
    latitude: 30.27,
    longitude: -97.74,
  },
  ...overrides,
});

const many = (count, overrides = {}) =>
  Array.from({ length: count }, (_, index) => listing({ id: index + 1, ...overrides }));

const atPlace = (locality, admin_area) => ({
  location: { locality, admin_area, latitude: 30, longitude: -97 },
});

test("city with enough listings gets a page", () => {
  const [texas] = buildLocations(many(5), TODAY);
  assert.equal(texas.name, "Texas");
  assert.equal(texas.cities[0].path, "/garage-sales/texas/austin/");
});

test("city below the threshold gets no page, but counts toward its state", () => {
  const [texas] = buildLocations(many(4), TODAY);
  assert.equal(texas.summary.total, 4);
  assert.deepEqual(texas.cities, []);
});

test("state below the threshold gets no page", () => {
  assert.deepEqual(buildLocations(many(2), TODAY), []);
});

test("one upcoming sale is enough for a page", () => {
  const upcoming = listing({
    status: "Active",
    available_time_slots: [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }],
  });
  const [texas] = buildLocations([upcoming], TODAY);
  assert.equal(texas.cities.length, 1);
  assert.equal(texas.summary.upcoming.length, 1);
});

test("a past date or expired status is not upcoming", () => {
  const pastActive = listing({ status: "Active" });
  const futureExpired = listing({
    available_time_slots: [{ date: "2026-12-01", start_time: "08:00:00", end_time: "12:00:00" }],
  });
  const [texas] = buildLocations([...many(3), pastActive, futureExpired], TODAY);
  assert.equal(texas.summary.upcoming.length, 0);
});

test("non-US places and bad city values are left out", () => {
  const states = buildLocations(
    [...many(9, atPlace("Bhaktapur", "BHaktapur")), ...many(9, atPlace("33565", "FL"))],
    TODAY
  );
  assert.equal(states.length, 1);
  assert.equal(states[0].name, "Florida");
  assert.deepEqual(states[0].cities, []);
});

test("different spellings of a city combine into one page", () => {
  const listings = [
    ...many(3, atPlace("rio rancho", "NM")),
    ...many(2, atPlace("Rio Rancho", "NM")),
  ];
  const [newMexico] = buildLocations(listings, TODAY);
  assert.equal(newMexico.cities.length, 1);
  assert.equal(newMexico.cities[0].summary.total, 5);
  assert.equal(newMexico.cities[0].name, "Rio Rancho");
});

test("pages show upcoming addresses but not past addresses or other private data", () => {
  const upcoming = listing({
    status: "Active",
    available_time_slots: [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }],
    location: {
      locality: "Austin",
      admin_area: "TX",
      throughfare: "500 Public Road",
      zip_code: "78702",
      apartment_number: "Unit 9",
      latitude: 30.27,
      longitude: -97.74,
    },
  });
  const states = buildLocations([...many(5), upcoming], TODAY);
  const html = renderCityPage(states[0].cities[0], states, TODAY) + renderStatePage(states[0], TODAY);
  assert.ok(html.includes("500 Public Road, Austin, TX"));
  assert.ok(html.includes('"streetAddress":"500 Public Road"'));
  assert.ok(html.includes('"postalCode":"78702"'));
  assert.ok(html.includes('"GeoCoordinates"'));
  for (const secret of ["123 Private Street", "78701", "555-0100", "txn-secret", "Unit 9"]) {
    assert.ok(!html.includes(secret), `page contains ${secret}`);
  }
});

test("a sale marked cancelled isn't upcoming", () => {
  const slot = [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }];
  for (const overrides of [
    { title: "Yard sale CANCELLED" },
    { location: { locality: "Austin", admin_area: "TX", throughfare: "Canceled" } },
  ]) {
    const states = buildLocations([...many(3), listing({ status: "Active", available_time_slots: slot, ...overrides })], TODAY);
    assert.equal(states[0].summary.upcoming.length, 0);
  }
});

test("past sale titles aren't shown", () => {
  const states = buildLocations(many(5, { title: "Past sale title" }), TODAY);
  assert.ok(!renderCityPage(states[0].cities[0], states, TODAY).includes("Past sale title"));
});

test("listing text is escaped in HTML and JSON-LD", () => {
  const upcoming = listing({
    status: "Active",
    title: "</script><script>alert(1)</script>",
    available_time_slots: [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }],
  });
  const states = buildLocations([upcoming], TODAY);
  assert.ok(!renderCityPage(states[0].cities[0], states, TODAY).includes("<script>alert(1)"));
  assert.equal(escapeHtml(`<a href="x">'`), "&lt;a href=&quot;x&quot;&gt;&#39;");
});

test("JSON-LD is valid and upcoming sales become events", () => {
  const upcoming = listing({
    status: "Active",
    available_time_slots: [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }],
  });
  const states = buildLocations([upcoming], TODAY);
  const html = renderCityPage(states[0].cities[0], states, TODAY);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1])
  );
  assert.deepEqual(blocks.map((b) => b["@type"]), ["BreadcrumbList", "CollectionPage", "FAQPage"]);
  assert.equal(blocks[1].mainEntity.itemListElement[0].item["@type"], "Event");
  assert.equal(blocks[1].mainEntity.itemListElement[0].item.startDate, "2026-11-08");
});

test("page says when nothing is upcoming and that posting is free", () => {
  const states = buildLocations(many(5), TODAY);
  const html = renderCityPage(states[0].cities[0], states, TODAY);
  assert.ok(html.includes("No upcoming sales are listed in Austin, TX right now."));
  assert.ok(html.includes("Browsing and posting are free."));
  assert.ok(!html.includes("$10"));
  assert.ok(html.includes('rel="canonical" href="https://findgarageandyardsale.com/garage-sales/texas/austin/"'));
});

test("one sale reads correctly and a future sale isn't the most recent", () => {
  const upcoming = listing({
    status: "Active",
    available_time_slots: [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }],
  });
  const states = buildLocations([upcoming], TODAY);
  const html = renderCityPage(states[0].cities[0], states, TODAY);
  assert.ok(html.includes("has listed 1 sale here."));
  assert.ok(html.includes("Sale listed"));
  assert.ok(!html.includes("Most recent sale"));
  assert.ok(!html.includes("The most recent was"));
});

test("upcoming sale cards show the listing image", () => {
  const upcoming = (images) =>
    listing({
      status: "Active",
      images,
      available_time_slots: [{ date: "2026-11-08", start_time: "08:00:00", end_time: "12:00:00" }],
    });
  const render = (images) => {
    const states = buildLocations([upcoming(images)], TODAY);
    return renderCityPage(states[0].cities[0], states, TODAY);
  };
  const withThumbnail = render([{ file: "https://cdn.example/full.jpg", thumbnail: "https://cdn.example/thumb.jpg" }]);
  assert.ok(withThumbnail.includes('src="https://cdn.example/thumb.jpg"'));
  assert.ok(withThumbnail.includes('"image":["https://cdn.example/full.jpg"]'));
  assert.ok(render([{ file: "https://cdn.example/full.jpg", thumbnail: null }]).includes('src="https://cdn.example/full.jpg"'));
  assert.ok(render([]).includes('class="placeholder"'));
  assert.ok(render([{ file: "javascript:alert(1)" }]).includes('class="placeholder"'));
});

test("directory links to states and sitemap lists full URLs", () => {
  const states = buildLocations(many(5), TODAY);
  assert.ok(renderDirectoryPage(states, TODAY).includes('href="/garage-sales/texas/"'));
  assert.ok(renderSitemap(["/garage-sales/texas/"]).includes(
    "<loc>https://findgarageandyardsale.com/garage-sales/texas/</loc>"
  ));
});
