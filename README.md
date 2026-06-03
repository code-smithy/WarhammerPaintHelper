# Warhammer Paint Helper

Warhammer Paint Helper is a static color scheme generator for miniature painting. It is
aimed at Warhammer Age of Sigmar and Warhammer 40,000 hobbyists, but it can also be used
for any miniature, model, or tabletop painting project that needs a quick palette idea.

## What It Does

The app lets you pick a main color from a color wheel or enter a HEX value directly,
then generates painting-friendly palettes around it.

It currently supports:

- Age of Sigmar and Warhammer 40,000 modes.
- English, German, and French language selection.
- Multiple color scheme types, including complementary, split-complementary, triadic,
  tetradic, analogous, monochrome, zenithal, warm/cool contrast, grimdark, AoS realm,
  and 40K chapter/squad schemes.
- Model role planning for armor, robes, fatigues, leather, wood, metals, weapons,
  magic effects, lenses, plasma, bases, and accent areas.
- Base environment suggestions for fantasy realms and 40K battlefields.
- Shade, wash, basecoat, layer, edge highlight, and focus-light steps.
- Citadel paint matching hooks. A placeholder file lives at
  `data/citadel-colours.json`; drop in the full paint JSON when it is ready.
- Optional accessory material colors for wood, leather, cloth, bone, white, iron,
  silver, bronze, and gold.
- A copy button for exporting the generated palette and painting notes.

## How To Use

Open `WarhammerPaintHelper.html` in a browser.

The core app works as a static page. Citadel JSON loading works best when the project is
served by a simple static server, because some browsers block local JSON loading from
`file://` URLs. If the JSON cannot be loaded, the app falls back to a small sample paint
set so the UI remains usable.

## Project Structure

- `WarhammerPaintHelper.html` - static page shell.
- `styles.css` - app styling.
- `src/core.js` - color math, palette generation, system profiles, base suggestions.
- `src/i18n.js` - English, German, and French translation scaffolding.
- `src/citadel.js` - Citadel JSON normalization and nearest-color matching.
- `src/app.js` - browser UI controller.
- `data/citadel-colours.json` - placeholder for the future Citadel paint list.
- `tests/` - Node unit tests.

## Tests

No npm packages are required. Run:

```sh
npm test
```

The tests use Node's built-in test runner and cover color generation, system data,
translation lookup, Citadel mapping, and static asset wiring.

## Vibe Coded Notice

This project has been completely vibe coded. That means it was built through an
AI-assisted, exploratory coding process rather than a traditional planned software
engineering workflow. Please treat it as a hobby tool: useful, fun, and open to
improvement, but not guaranteed to be perfect.

## Disclaimer

This is an unofficial hobby project. It is not affiliated with, endorsed by, or
connected to Games Workshop.
