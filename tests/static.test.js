const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");

test("static HTML references the prepared app assets", () => {
  const html = fs.readFileSync(path.join(root, "WarhammerPaintHelper.html"), "utf8");

  assert.match(html, /<link rel="stylesheet" href="styles\.css"/);
  assert.match(html, /<script src="src\/core\.js"><\/script>/);
  assert.match(html, /<script src="src\/factions\.js"><\/script>/);
  assert.match(html, /<script src="src\/i18n\.js"><\/script>/);
  assert.match(html, /<script src="src\/citadel\.js"><\/script>/);
  assert.match(html, /<script src="src\/app\.js"><\/script>/);
  assert.match(html, /id="languageSelect"/);
  assert.match(html, /<option value="es">Español<\/option>/);
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
  assert.match(html, /id="producerFilters"/);
  assert.doesNotMatch(html, /ui\.extraMaterials/);
  assert.doesNotMatch(html, /class="material-toggle"/);
  assert.doesNotMatch(html, /id="materialPalette"/);
  assert.doesNotMatch(html, /ui\.miniPreview/);
  assert.doesNotMatch(html, /class="mini-preview"/);
  assert.doesNotMatch(html, /class="mini"/);
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
