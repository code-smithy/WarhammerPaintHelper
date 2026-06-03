const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../src/core.js");

test("converts basic HSL values to HEX", () => {
  assert.equal(core.hslToHex(0, 100, 50), "#FF0000");
  assert.equal(core.hslToHex(120, 100, 50), "#00FF00");
  assert.equal(core.hslToHex(240, 100, 50), "#0000FF");
});

test("keeps the first generated palette color equal to the chosen main color", () => {
  const state = { h: 220, s: 70, l: 46, style: 0 };
  const palette = core.buildPalette(state, "complementary");

  assert.equal(palette[0].hex, core.primaryHex(state));
  assert.equal(palette[0].roleKey, "primary");
});

test("builds every configured system scheme without invalid colors", () => {
  const state = { h: 32, s: 68, l: 44, style: 25 };

  for (const systemKey of Object.keys(core.SYSTEMS)) {
    for (const schemeKey of core.getSchemeKeysForSystem(systemKey)) {
      const palette = core.buildPalette(state, schemeKey);
      assert.ok(palette.length >= 2, `${systemKey}/${schemeKey} should create multiple colors`);
      palette.forEach(color => {
        assert.match(color.hex, /^#[0-9A-F]{6}$/);
        assert.ok(color.s >= 5 && color.s <= 100);
        assert.ok(color.l >= 6 && color.l <= 96);
      });
    }
  }
});

test("has role profiles and base suggestions for both supported game systems", () => {
  const state = { h: 220, s: 70, l: 46, style: -75 };
  const palette = core.buildPalette(state, "complementary");

  for (const systemKey of Object.keys(core.SYSTEMS)) {
    assert.ok(core.getRoleProfileKeys(systemKey).length > 0);
    assert.ok(core.getBaseThemeKeys(systemKey).includes("auto"));

    const profileKey = core.getRoleProfileKeys(systemKey)[0];
    assert.ok(core.getRoleProfile(systemKey, profileKey).length > 0);
    assert.ok(core.baseSuggestions({
      palette,
      state,
      systemKey,
      roleProfileKey: profileKey,
      baseThemeKey: "auto"
    }).length > 0);
  }
});

test("creates paint ladders with stable step keys", () => {
  const color = core.buildPalette({ h: 220, s: 70, l: 46, style: 0 }, "zenithal")[0];
  const ladder = core.ladderForColor(color, 0);

  assert.deepEqual(ladder.map(step => step.key), [
    "deepShade",
    "shadeWash",
    "basecoat",
    "layer",
    "edgeHighlight",
    "focusLight"
  ]);
  ladder.forEach(step => assert.match(step.hex, /^#[0-9A-F]{6}$/));
});
