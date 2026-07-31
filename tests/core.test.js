const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../src/core.js");
const factions = require("../src/factions.js");

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

test("exposes common colour theory and Warhammer hobby scheme names", () => {
  const requestedSchemes = [
    "monochrome",
    "analogous",
    "complementary",
    "split",
    "triadic",
    "tetradic",
    "limitedPalette",
    "zorn",
    "highContrast",
    "lowContrast",
    "boxArt",
    "eavyMetal",
    "grimdark",
    "adrianSmith",
    "blanchitsu",
    "comicBook",
    "military",
    "paradeReady",
    "battleReady",
    "display",
    "muted",
    "saturated",
    "pastel",
    "neon"
  ];

  for (const systemKey of Object.keys(core.SYSTEMS)) {
    const schemeKeys = core.getSchemeKeysForSystem(systemKey);
    requestedSchemes.forEach(schemeKey => {
      assert.ok(schemeKeys.includes(schemeKey), `${systemKey} should include ${schemeKey}`);
    });
  }
});

test("builds a muted Zorn-inspired limited palette", () => {
  const palette = core.buildPalette({ h: 36, s: 62, l: 46, style: -20 }, "zorn");

  assert.equal(palette.length, 5);
  assert.deepEqual(palette.map(color => color.roleKey), [
    "primary",
    "secondary",
    "darkBase",
    "edgeHighlight",
    "dustyLayer"
  ]);
  assert.ok(palette[2].l < 25, "Zorn dark base should behave like an ivory-black shadow");
  assert.ok(palette[3].l > 70, "Zorn highlight should behave like an ivory highlight");
  palette.forEach(color => {
    assert.match(color.hex, /^#[0-9A-F]{6}$/);
    assert.ok(color.s <= 62, "Zorn palette should stay restrained");
  });
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

test("supports recipe modes with different paint step depths", () => {
  const color = core.buildPalette({ h: 220, s: 70, l: 46, style: 0 }, "zenithal")[0];

  assert.deepEqual(core.getRecipeModeKeys(), ["beginner", "speedpaint", "battle", "display"]);
  assert.deepEqual(core.ladderForColor(color, 0, "beginner").map(step => step.key), [
    "basecoat",
    "shadeWash",
    "edgeHighlight"
  ]);
  assert.deepEqual(core.ladderForColor(color, 0, "speedpaint").map(step => step.key), [
    "darkPrime",
    "zenithalDrybrush",
    "transparentCoat",
    "quickHighlight"
  ]);
  assert.deepEqual(core.ladderForColor(color, 0, "display").map(step => step.key), [
    "deepShade",
    "shadeWash",
    "basecoat",
    "layer",
    "glazeLayer",
    "edgeHighlight",
    "fineHighlight",
    "focusLight"
  ]);
});

test("builds a heraldic two-anchor palette", () => {
  const state = {
    h: 220,
    s: 70,
    l: 46,
    style: 0,
    secondary: { h: 45, s: 16, l: 92 }
  };
  const palette = core.buildHeraldicPalette(state, { accentKey: "gold" });

  assert.equal(palette[0].roleKey, "fieldColor");
  assert.equal(palette[0].hex, core.primaryHex(state));
  assert.equal(palette[1].roleKey, "chargeColor");
  assert.equal(palette[1].hex, core.hslToHex(45, 16, 92));
  assert.equal(palette.at(-1).roleKey, "heraldicAccent");
  palette.forEach(color => assert.match(color.hex, /^#[0-9A-F]{6}$/));
});

test("scores automatic heraldic accents by use case", () => {
  const blueWhite = { h: 220, s: 70, l: 46, secondary: { h: 45, s: 16, l: 92 } };
  const redWhite = { h: 4, s: 74, l: 48, secondary: { h: 45, s: 16, l: 92 } };
  const blackYellow = { h: 220, s: 12, l: 10, secondary: { h: 50, s: 80, l: 55 } };

  assert.equal(core.buildHeraldicPalette(blueWhite, { accentKey: "auto" }).at(-1).hex, "#D2A13D");
  assert.equal(core.buildHeraldicPalette(blackYellow, { accentKey: "autoMetal" }).at(-1).hex, "#B9C0C5");
  assert.notEqual(core.buildHeraldicPalette(redWhite, { accentKey: "autoFocal" }).at(-1).hex, "#D2A13D");
});

test("builds fixed faction palettes separately for AoS and 40K", () => {
  const schemes = core.normalizeFactionSchemes(factions.DEFAULT_FACTION_SCHEMES);
  const aosSchemes = core.getFactionSchemesForSystem(schemes, "aos");
  const k40Schemes = core.getFactionSchemesForSystem(schemes, "k40");
  const ultramarines = k40Schemes.find(scheme => scheme.subfaction === "Ultramarines");

  assert.ok(aosSchemes.length > 0);
  assert.ok(k40Schemes.length > 0);
  assert.ok(aosSchemes.every(scheme => scheme.system === "aos"));
  assert.ok(k40Schemes.every(scheme => scheme.system === "k40"));
  assert.ok(ultramarines);

  const palette = core.buildFactionSchemePalette(ultramarines);
  assert.equal(palette[0].hex, "#184A83");
  assert.equal(palette[0].roleKey, "factionDominant");
  assert.ok(palette.some(color => color.roleKey === "factionAccentOne"));
});

test("resolves producer filters for first render and retained selections", () => {
  const firstRender = core.resolveProducerSelection({
    producerKeys: ["Citadel", "Vallejo", "Army Painter"],
    selectedKeys: [],
    pendingProducerKeys: null,
    catalogueSource: "sample",
    resetSelection: false,
    initialized: false
  });
  const retained = core.resolveProducerSelection({
    producerKeys: ["Citadel", "Vallejo", "Pro Acryl"],
    selectedKeys: ["Citadel", "Army Painter"],
    pendingProducerKeys: null,
    catalogueSource: "json",
    resetSelection: false,
    initialized: true
  });

  assert.deepEqual(firstRender, {
    selectedKeys: ["Citadel", "Vallejo", "Army Painter"],
    pendingProducerKeys: null
  });
  assert.deepEqual(retained, {
    selectedKeys: ["Citadel"],
    pendingProducerKeys: null
  });
});

test("resolves pending producer filters against loaded catalogue keys", () => {
  const sampleResult = core.resolveProducerSelection({
    producerKeys: ["Citadel"],
    selectedKeys: ["Citadel"],
    pendingProducerKeys: ["Vallejo", "Unknown"],
    catalogueSource: "sample",
    resetSelection: true,
    initialized: true
  });
  const jsonResult = core.resolveProducerSelection({
    producerKeys: ["Citadel", "Vallejo", "Army Painter"],
    selectedKeys: sampleResult.selectedKeys,
    pendingProducerKeys: sampleResult.pendingProducerKeys,
    catalogueSource: "json",
    resetSelection: true,
    initialized: true
  });

  assert.deepEqual(sampleResult, {
    selectedKeys: [],
    pendingProducerKeys: ["Vallejo", "Unknown"]
  });
  assert.deepEqual(jsonResult, {
    selectedKeys: ["Vallejo"],
    pendingProducerKeys: null
  });
});

test("base suggestions respect an explicit theme and remove duplicates", () => {
  const state = { h: 220, s: 70, l: 46, style: 0 };
  const palette = core.buildPalette(state, "complementary");
  const suggestions = core.baseSuggestions({
    palette,
    state,
    systemKey: "k40",
    roleProfileKey: "balanced",
    baseThemeKey: "urban"
  });

  assert.equal(suggestions[0].key, "urban");
  assert.equal(new Set(suggestions.map(item => item.key)).size, suggestions.length);
  suggestions.forEach(item => assert.match(item.hex, /^#[0-9A-F]{6}$/));
});
