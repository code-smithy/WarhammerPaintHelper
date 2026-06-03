const test = require("node:test");
const assert = require("node:assert/strict");
const i18n = require("../src/i18n.js");
const core = require("../src/core.js");

test("supports the initial language set", () => {
  assert.deepEqual(i18n.LANGUAGE_KEYS, ["en", "de", "fr"]);
  assert.equal(i18n.hasLanguage("en"), true);
  assert.equal(i18n.hasLanguage("de"), true);
  assert.equal(i18n.hasLanguage("fr"), true);
  assert.equal(i18n.hasLanguage("it"), false);
});

test("translates core UI labels and interpolates values", () => {
  const en = i18n.createTranslator("en");
  const de = i18n.createTranslator("de");
  const fr = i18n.createTranslator("fr");

  assert.equal(en("ui.system"), "Game system");
  assert.equal(de("ui.system"), "Spielsystem");
  assert.equal(fr("ui.system"), "Système de jeu");
  assert.equal(en("citadel.distance", { distance: 12 }), "distance 12");
});

test("has scheme titles for every configured system scheme in each language", () => {
  for (const language of i18n.LANGUAGE_KEYS) {
    const t = i18n.createTranslator(language);
    for (const systemKey of Object.keys(core.SYSTEMS)) {
      for (const schemeKey of core.getSchemeKeysForSystem(systemKey)) {
        assert.notEqual(t(`schemes.${schemeKey}.title`), `schemes.${schemeKey}.title`);
      }
    }
  }
});

test("falls back to English for inherited dictionary sections", () => {
  const de = i18n.createTranslator("de");
  const fr = i18n.createTranslator("fr");

  assert.equal(de("ladder.steps.basecoat"), "Basecoat");
  assert.equal(fr("materials.items.iron.name"), "Iron");
});
