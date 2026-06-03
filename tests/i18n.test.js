const test = require("node:test");
const assert = require("node:assert/strict");
const i18n = require("../src/i18n.js");
const core = require("../src/core.js");

test("supports the configured language set", () => {
  assert.deepEqual(i18n.LANGUAGE_KEYS, ["en", "fr", "de", "es"]);
  assert.equal(i18n.hasLanguage("en"), true);
  assert.equal(i18n.hasLanguage("fr"), true);
  assert.equal(i18n.hasLanguage("de"), true);
  assert.equal(i18n.hasLanguage("es"), true);
  assert.equal(i18n.hasLanguage("it"), false);
});

test("translates core UI labels and interpolates values", () => {
  const en = i18n.createTranslator("en");
  const fr = i18n.createTranslator("fr");
  const de = i18n.createTranslator("de");
  const es = i18n.createTranslator("es");

  assert.equal(en("ui.system"), "Game system");
  assert.equal(fr("ui.system"), "Système de jeu");
  assert.equal(de("ui.system"), "Spielsystem");
  assert.equal(es("ui.system"), "Sistema de juego");
  assert.equal(en("citadel.distance", { distance: 12 }), "distance 12");
});

test("has complete locale key coverage", () => {
  const englishPaths = new Set(leafPaths(i18n.TRANSLATIONS.en));

  for (const language of i18n.LANGUAGE_KEYS) {
    assert.deepEqual(new Set(leafPaths(i18n.TRANSLATIONS[language])), englishPaths);
  }
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

test("translates expanded dictionary sections", () => {
  const de = i18n.createTranslator("de");
  const fr = i18n.createTranslator("fr");
  const es = i18n.createTranslator("es");

  assert.equal(de("materials.items.iron.name"), "Eisen");
  assert.equal(fr("materials.items.iron.name"), "Fer");
  assert.equal(es("materials.items.iron.name"), "Hierro");
  assert.equal(es("bases.city.title"), "Adoquines de Ciudad Libre");
});

function leafPaths(value, prefix = "") {
  if (Array.isArray(value) || value === null || typeof value !== "object") {
    return [prefix];
  }

  return Object.keys(value).flatMap(key => (
    leafPaths(value[key], prefix ? `${prefix}.${key}` : key)
  ));
}
