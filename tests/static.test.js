const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");

test("static HTML references the prepared app assets", () => {
  const html = fs.readFileSync(path.join(root, "WarhammerPaintHelper.html"), "utf8");

  assert.match(html, /<link rel="stylesheet" href="styles\.css"/);
  assert.match(html, /<script src="src\/core\.js"><\/script>/);
  assert.match(html, /<script src="src\/i18n\.js"><\/script>/);
  assert.match(html, /<script src="src\/citadel\.js"><\/script>/);
  assert.match(html, /<script src="src\/app\.js"><\/script>/);
  assert.match(html, /id="languageSelect"/);
  assert.match(html, /<option value="es">Español<\/option>/);
  assert.match(html, /id="systemSelect"/);
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
