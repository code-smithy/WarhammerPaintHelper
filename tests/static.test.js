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
  assert.match(html, /id="systemSelect"/);
});

test("placeholder Citadel JSON is valid and has a paints array", () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, "data", "citadel-colours.json"), "utf8"));
  assert.ok(Array.isArray(data.paints));
});
