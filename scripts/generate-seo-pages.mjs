import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  buildLocations,
  renderCityPage,
  renderDirectoryPage,
  renderSitemap,
  renderStatePage,
} from "./seo-pages.mjs";
import { buildGuides, renderGuidePage, renderGuidesIndex } from "./guides.mjs";

const API_URL = process.env.SEO_API_URL || "https://api.findgarageandyardsale.com/api/v1/garage/yard/sales/";
const PER_PAGE = 100;
// A failed build keeps the current site live, which beats publishing pages from partial data
const MIN_EXPECTED_LISTINGS = 100;
const CORE_PATHS = ["/", "/sales", "/privacy-policy", "/terms-and-conditions"];

const fetchListings = async () => {
  const listings = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const response = await fetch(`${API_URL}?page=${page}&per_page=${PER_PAGE}`);
    if (!response.ok) throw new Error(`Listings API returned ${response.status} on page ${page}`);
    const json = await response.json();
    listings.push(...json.data);
    totalPages = json.pagination?.total_pages ?? 1;
    page += 1;
  }
  return listings;
};

const writePage = async (outDir, path, html) => {
  const file = join(outDir, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
};

const main = async () => {
  const outDir = process.argv[2] || "dist";
  const today = new Date().toISOString().slice(0, 10);
  const listings = await fetchListings();
  if (listings.length < MIN_EXPECTED_LISTINGS) {
    throw new Error(`Expected at least ${MIN_EXPECTED_LISTINGS} listings but got ${listings.length}`);
  }

  // Amplify redirects extensionless files, but Apple needs this one served directly.
  // A rewrite rule points the original path at this copy.
  const appleFile = join(outDir, ".well-known/apple-app-site-association");
  await copyFile(appleFile, `${appleFile}.json`);

  const states = buildLocations(listings, today);
  const paths = ["/garage-sales/"];
  await writePage(outDir, "/garage-sales/", renderDirectoryPage(states, today));
  for (const state of states) {
    await writePage(outDir, state.path, renderStatePage(state, today));
    paths.push(state.path);
    for (const city of state.cities) {
      await writePage(outDir, city.path, renderCityPage(city, states, today));
      paths.push(city.path);
    }
  }

  const guides = buildGuides(listings, states);
  await writePage(outDir, "/guides/", renderGuidesIndex(guides, today));
  paths.push("/guides/");
  for (const guide of guides) {
    await writePage(outDir, guide.path, renderGuidePage(guide, today));
    paths.push(guide.path);
  }
  await writeFile(join(outDir, "sitemap.xml"), renderSitemap([...CORE_PATHS, ...paths]));

  const cityCount = states.reduce((sum, state) => sum + state.cities.length, 0);
  console.log(`SEO pages: ${listings.length} listings, ${states.length} states, ${cityCount} cities, ${guides.length} guides`);
};

main().catch((error) => {
  console.error(`SEO page generation failed: ${error.message}`);
  process.exit(1);
});
