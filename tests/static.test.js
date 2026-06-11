const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");

test("static HTML references the prepared app assets", () => {
  const html = fs.readFileSync(path.join(root, "WarhammerPaintHelper.html"), "utf8");
  const assetVersion = packageMajorMinorVersion();

  assert.match(html, /http-equiv="Cache-Control"/);
  assert.match(html, assetPattern(`styles.css?v=${assetVersion}`));
  assert.match(html, assetPattern(`src/core.js?v=${assetVersion}`));
  assert.match(html, assetPattern(`src/factions.js?v=${assetVersion}`));
  assert.match(html, assetPattern(`src/i18n.js?v=${assetVersion}`));
  assert.match(html, assetPattern(`src/citadel.js?v=${assetVersion}`));
  assert.match(html, assetPattern(`src/app.js?v=${assetVersion}`));
  assert.match(html, new RegExp(`class="app-version"[^>]*>v${escapeRegExp(assetVersion)}</p>`));
  assert.match(html, /id="languageSelect"/);
  assert.match(html, /<option value="es">Español<\/option>/);
  assert.match(html, /<option value="it">Italiano<\/option>/);
  assert.match(html, /id="systemSelect"/);
  assert.match(html, /id="modeSelect"/);
  assert.match(html, /id="factionSelect"/);
  assert.match(html, /id="subfactionSelect"/);
  assert.match(html, /id="factionSchemeMeta"/);
  assert.match(html, /id="secondaryHexInput"/);
  assert.match(html, /id="heraldicLayoutSelect"/);
  assert.match(html, /id="heraldicPreview"/);
  assert.match(html, /id="paintSearchInput"/);
  assert.match(html, /id="paintSelect"/);
  assert.match(html, /id="recipeModeSelect"/);
  assert.match(html, /id="producerFilters"/);
  assert.match(html, /id="ownedOnlyMatchesToggle"/);
  assert.match(html, /id="ownedSelectAllVisible"/);
  assert.match(html, /id="ownedPaintStatus"/);
  assert.match(html, /id="ownedPaintList"/);
  assert.match(html, /data-collapsible-section="paintingNotes"/);
  assert.match(html, /data-collapsible-section="rolePlanner"/);
  assert.match(html, /data-collapsible-section="baseAdvice"/);
  assert.match(html, /data-collapsible-section="modelRoles"/);
  assert.match(html, /data-collapsible-section="paintLadder"/);
  assert.match(html, /data-collapsible-section="catalogueMatches"/);
  assert.match(html, /data-section-collapse="paintingNotes"/);
  assert.match(html, /id="shoppingListPanel"/);
  assert.match(html, /id="shoppingListCollapseBtn"/);
  assert.match(html, /id="shoppingSearchInput"/);
  assert.match(html, /id="shoppingAddSelect"/);
  assert.match(html, /id="addShoppingPaintBtn"/);
  assert.match(html, /id="shoppingListStatus"/);
  assert.match(html, /id="shoppingList"/);
  assert.match(html, /class="tooltip-legend"/);
  assert.match(html, /ui\.ownedBadgeLegend/);
  assert.match(html, /id="profileNameInput"/);
  assert.match(html, /id="savedProfilesSelect"/);
  assert.match(html, /id="copyShareLinkBtn"/);
  assert.match(html, /id="randomBtn"/);
  assert.doesNotMatch(html, /id="copyPaletteBtn"/);
  assert.doesNotMatch(html, /ui\.extraMaterials/);
  assert.doesNotMatch(html, /class="material-toggle"/);
  assert.doesNotMatch(html, /id="materialPalette"/);
  assert.doesNotMatch(html, /ui\.miniPreview/);
  assert.doesNotMatch(html, /class="mini-preview"/);
  assert.doesNotMatch(html, /class="mini"/);
});

test("asset cache buster matches package major and minor version", () => {
  const html = fs.readFileSync(path.join(root, "WarhammerPaintHelper.html"), "utf8");
  const majorMinor = packageMajorMinorVersion();
  const localAssets = Array.from(html.matchAll(/(?:href|src)="([^":#]+?\.(?:css|js)(?:\?[^"]*)?)"/g), match => match[1]);

  assert.deepEqual(localAssets, [
    `styles.css?v=${majorMinor}`,
    `src/core.js?v=${majorMinor}`,
    `src/factions.js?v=${majorMinor}`,
    `src/i18n.js?v=${majorMinor}`,
    `src/citadel.js?v=${majorMinor}`,
    `src/app.js?v=${majorMinor}`
  ]);
  localAssets.forEach(asset => assert.match(asset, new RegExp(`\\?v=${escapeRegExp(majorMinor)}$`)));
  assert.match(html, new RegExp(`>v${majorMinor}<`));
});


test("application scripts are valid JavaScript", () => {
  const html = fs.readFileSync(path.join(root, "WarhammerPaintHelper.html"), "utf8");
  const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g), match => match[1].split("?")[0]);

  scripts.forEach(script => {
    execFileSync(process.execPath, ["--check", path.join(root, script)], { stdio: "pipe" });
  });
});

test("application scripts load dependencies before app bootstrap", () => {
  const html = fs.readFileSync(path.join(root, "WarhammerPaintHelper.html"), "utf8");
  const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g), match => match[1].split("?")[0]);

  assert.deepEqual(scripts, [
    "src/core.js",
    "src/factions.js",
    "src/i18n.js",
    "src/citadel.js",
    "src/app.js"
  ]);
});

test("app randomizer uses the loaded faction scheme helpers", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.doesNotMatch(app, /\bfactionSchemesForSystem\b/);
  assert.match(app, /\bfactionSchemesForCurrentSystem\(\)/);
});

test("producer filter restore preserves an explicit empty selection until JSON loads", () => {
  const core = require("../src/core.js");
  const sampleResult = core.resolveProducerSelection({
    producerKeys: ["Citadel"],
    pendingProducerKeys: [],
    selectedKeys: ["Citadel"],
    catalogueSource: "sample",
    resetSelection: true,
    initialized: true
  });
  const jsonResult = core.resolveProducerSelection({
    producerKeys: ["Citadel", "Vallejo"],
    pendingProducerKeys: sampleResult.pendingProducerKeys,
    selectedKeys: sampleResult.selectedKeys,
    catalogueSource: "json",
    resetSelection: true,
    initialized: true
  });

  assert.deepEqual(sampleResult, { selectedKeys: [], pendingProducerKeys: [] });
  assert.deepEqual(jsonResult, { selectedKeys: [], pendingProducerKeys: null });
});

test("share link code preserves explicit empty producer selections", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.match(app, /params\.set\("producers", snapshot\.producerKeys\.join\(","\)\)/);
  assert.doesNotMatch(app, /if \(snapshot\.producerKeys\.length\) \{\s+params\.set\("producers"/);
});

test("random palette preserves the current producer filter selection", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.match(app, /syncControlsFromState\(\{ resetProducerSelection: false \}\)/);
  assert.match(app, /randomCatalogueColor[\s\S]*filteredCataloguePaints\(\)\.filter\(item => item\.hex\)/);
  assert.doesNotMatch(app, /state\.producerKeys = randomProducerKeys/);
});

test("owned paint controls persist and filter closest catalogue matches", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.match(app, /ownedPaintKeys: Array\.from\(ownedPaintKeys\)/);
  assert.match(app, /state\.onlyOwnedMatches/);
  assert.match(app, /function closestMatchCataloguePaints\(\) \{/);
  assert.match(app, /W\.filterOwnedPaints\(filteredCataloguePaints\(\), \{/);
  assert.match(app, /function renderCitadelMatches\(\) \{\s+const paints = closestMatchCataloguePaints\(\)/);
  assert.match(app, /function showPaintTooltip[\s\S]*const paints = closestMatchCataloguePaints\(\)/);
  assert.match(app, /class="owned-badge"/);
  assert.match(app, /ownedPaintKeys\.has\(paintKey\(match\)\)/);
});


test("collapsible generated sections persist in saved settings", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.match(app, /const DEFAULT_SECTION_COLLAPSE = \{/);
  assert.match(app, /collapsedSections: \{ \.\.\.DEFAULT_SECTION_COLLAPSE \}/);
  assert.match(app, /sectionCollapseButtons: Array\.from\(document\.querySelectorAll\("\[data-section-collapse\]"\)\)/);
  assert.match(app, /function syncCollapsibleSections\(\) \{/);
  assert.match(app, /collapsedSections: \{[\s\S]*\.\.\.DEFAULT_SECTION_COLLAPSE,[\s\S]*\.\.\.state\.collapsedSections/);
  assert.match(app, /state\.collapsedSections = normalizeCollapsedSections\(snapshot\.collapsedSections\)/);
});

test("shopping list controls persist and exclude owned colours", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.match(app, /shoppingPaintKeys: Array\.from\(shoppingPaintKeys\)/);
  assert.match(app, /state\.shoppingListCollapsed/);
  assert.match(app, /state\.shoppingSearch/);
  assert.match(app, /function renderShoppingList\(\) \{/);
  assert.match(app, /function shoppingSearchPaints\(\)[\s\S]*!ownedPaintKeys\.has\(paintKey\(paint\)\)/);
  assert.match(app, /function addShoppingPaintByKey\(key\)[\s\S]*ownedPaintKeys\.has\(key\)/);
  assert.match(app, /function toggleOwnedPaint\(key, checked\)[\s\S]*shoppingPaintKeys\.delete\(key\)/);
  assert.match(app, /data-add-shopping-key/);
  assert.match(app, /data-remove-shopping-key/);
});


test("shopping list controls persist and exclude owned colours", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");

  assert.match(app, /shoppingPaintKeys: Array\.from\(shoppingPaintKeys\)/);
  assert.match(app, /state\.shoppingListCollapsed/);
  assert.match(app, /state\.shoppingSearch/);
  assert.match(app, /function renderShoppingList\(\) \{/);
  assert.match(app, /function shoppingSearchPaints\(\)[\s\S]*!ownedPaintKeys\.has\(paintKey\(paint\)\)/);
  assert.match(app, /function addShoppingPaintByKey\(key\)[\s\S]*ownedPaintKeys\.has\(key\)/);
  assert.match(app, /function toggleOwnedPaint\(key, checked\)[\s\S]*shoppingPaintKeys\.delete\(key\)/);
  assert.match(app, /data-add-shopping-key/);
  assert.match(app, /data-remove-shopping-key/);
});

test("owned paint restore state is initialized before saved settings are applied", () => {
  const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
  const declarationIndex = app.indexOf("let ownedPaintKeys = new Set(state.ownedPaintKeys)");
  const restoreIndex = app.indexOf("applySettingsToState(readSettingsSnapshot");

  assert.notEqual(declarationIndex, -1);
  assert.notEqual(restoreIndex, -1);
  assert.ok(declarationIndex < restoreIndex);
});

test("fixed faction scheme data is separated by game system", () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, "data", "faction-schemes.json"), "utf8"));

  assert.ok(Array.isArray(data.schemes));
  assert.ok(data.schemes.some(scheme => scheme.system === "aos"));
  assert.ok(data.schemes.some(scheme => scheme.system === "k40"));
  assert.ok(data.schemes.some(scheme => scheme.system === "k40" && scheme.faction === "Space Marines"));
  assert.ok(data.schemes.some(scheme => scheme.system === "aos" && scheme.faction === "Stormcast Eternals"));
  data.schemes.forEach(scheme => {
    assert.match(scheme.id, /^(aos|k40)-/);
    assert.ok(Array.isArray(scheme.roles));
    assert.ok(scheme.roles.length >= 4);
    scheme.roles.forEach(role => assert.match(role.hex, /^#[0-9A-F]{6}$/));
  });
});

test("paint catalogue JSON is valid and uses manufacturer color groups", () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, "data", "paint-catalogue.json"), "utf8"));
  assert.ok(Array.isArray(data.manufacturers));
  assert.ok(data.manufacturers.some(manufacturer => manufacturer.name === "Citadel Colours"));
  assert.ok(data.manufacturers.flatMap(manufacturer => manufacturer.colors || []).some(color => color.hex));
});

test("default paint catalogue file documents the expected structure", () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, "data", "paint-catalogue.default.json"), "utf8"));
  const manufacturer = data.manufacturers[0];
  const color = manufacturer.colors[0];

  assert.ok(Array.isArray(data.manufacturers));
  assert.equal(typeof manufacturer.name, "string");
  assert.ok(Array.isArray(manufacturer.source_urls));
  assert.ok(Array.isArray(manufacturer.colors));
  assert.match(color.hex, /^#[0-9A-Fa-f]{6}$/);
  assert.ok(Object.hasOwn(color, "manufacturer_code"));
  assert.ok(Object.hasOwn(color, "collection"));
  assert.ok(Object.hasOwn(color, "range"));
  assert.ok(Object.hasOwn(color, "finish"));
  assert.ok(Object.hasOwn(color, "status"));
  assert.ok(Object.hasOwn(color, "source_url"));
  assert.ok(Object.hasOwn(color, "notes"));
});

function packageMajorMinorVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const [major, minor] = packageJson.version.split(".");
  return `${major}.${minor}`;
}

function assetPattern(assetPath) {
  return new RegExp(`(?:href|src)="${escapeRegExp(assetPath)}"`);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
