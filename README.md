# Warhammer Paint Helper

Warhammer Paint Helper is a static color scheme generator for miniature painting. It is
aimed at Warhammer Age of Sigmar and Warhammer 40,000 hobbyists, but it can also be used
for any miniature, model, or tabletop painting project that needs a quick palette idea.

## What It Does

The app lets you pick a main color from a color wheel, enter a HEX value directly, choose
a paint from the catalogue, select a fixed faction scheme, or roll a random color, then
generates painting-friendly palettes around it.

It currently supports:

- Age of Sigmar and Warhammer 40,000 modes.
- English, German, French, and Spanish language selection.
- Fixed faction and subfaction schemes, kept separate by game system. The included data
  currently covers 60 Age of Sigmar schemes and 67 Warhammer 40,000 schemes.
- Excel-derived faction scheme data with labelled roles for dominant color, secondary
  color, dark neutral, light neutral, and two accents.
- Multiple color scheme types, including complementary, split-complementary, triadic,
  tetradic, analogous, monochrome, zenithal, warm/cool contrast, grimdark, AoS realm,
  and 40K chapter/squad schemes.
- Heraldic two-color mode with field and charge colors, shield layouts, color balance,
  automatic accent choices, and a small heraldic preview.
- A clean-to-grimdark finish slider that adjusts generated support colors and paint
  ladder advice.
- Model role planning for armor, robes, fatigues, default material colors, weapons,
  magic effects, lenses, plasma, bases, and accent areas.
- Base environment suggestions for fantasy realms and 40K battlefields.
- Shade, wash, basecoat, layer, edge highlight, and focus-light steps.
- Paint catalogue search, direct paint selection for the main color, and producer
  filters for limiting nearest-paint matches by manufacturer.
- Paint catalogue matching across manufacturer color groups. The catalogue lives at
  `data/paint-catalogue.json` and uses `manufacturers[].colors[]` entries.
- Match metadata for manufacturer, collection, range, finish, status, and distance.
- Hover/focus paint tooltips for generated colors, showing the closest catalogue
  matches without leaving the palette view.
- A copy button for exporting the generated palette, role plan, base ideas, paint ladder,
  fixed faction notes, paint equivalents, and catalogue matches.

## How To Use

Open `WarhammerPaintHelper.html` in a browser.

The core app works as a static page. The bundled fixed faction schemes are available even
when opening the HTML file directly. Catalogue JSON loading works best when the project is
served by a simple static server, because some browsers block local JSON loading from
`file://` URLs. If the paint catalogue JSON cannot be loaded, the app falls back to a
small sample paint set so the UI remains usable.

If you can't use it locally, just use the [online version hosted here on github](https://code-smithy.github.io/WarhammerPaintHelper/WarhammerPaintHelper.html).

Typical workflow:

1. Pick `Age of Sigmar` or `Warhammer 40,000`.
2. Either use the color wheel and scheme controls, or choose a faction and subfaction for
   a fixed recipe.
3. Adjust finish, role planner, base environment, and paint producer filters.
4. Use the generated palette, role plan, paint ladder, base advice, and catalogue matches
   as a painting plan.

## Fixed Faction Schemes

Fixed schemes live in two generated files:

- `data/faction-schemes.json` - normalized source data for review and editing.
- `src/factions.js` - static browser bundle used by the app so fixed schemes work without
  runtime Excel parsing.

The source data was derived from `faction colours.xlsx`. Each scheme includes:

- `system`: `aos` or `k40`.
- `faction` and `subfaction`.
- `schemeName`.
- `roles`: labelled HEX colors using these role codes:
  - `D` - dominant color.
  - `S` - secondary color.
  - `ND` - near-dark neutral.
  - `NL` - near-light neutral.
  - `A1` - first accent.
  - `A2` - second accent.
- `paintEquivalents`: named paint suggestions when available.
- `notes`: markings, finish, and faction-specific painting guidance.

The app filters faction and subfaction choices by the selected game system, so AoS and 40K
schemes do not mix.

## Paint Catalogue JSON

The live catalogue file is `data/paint-catalogue.json`; use it as the starting point for new catalogues
or new manufacturers.

The app expects this shape:

```json
{
  "manufacturers": [
    {
      "name": "Example Manufacturer",
      "source_urls": ["https://example.com/paint-range"],
      "colors": [
        {
          "name": "Example Base Red",
          "hex": "#B21E28",
          "manufacturer_code": "EX-001",
          "collection": "Example Range",
          "range": "Base",
          "finish": "matte",
          "status": "confirmed",
          "source_url": "https://example.com/paint-range/example-base-red",
          "notes": "Optional note."
        }
      ]
    }
  ]
}
```

Required fields for matching are `name` and a valid six-digit `hex` value. Manufacturer
`name` is strongly recommended because it is shown in the match metadata. Entries with
`hex: null` or an invalid hex value can stay in the catalogue for documentation, but they
are skipped by nearest-colour matching. Optional fields such as `manufacturer_code`,
`collection`, `range`, `finish`, `status`, `source_url`, and `notes` are preserved by the
loader and shown or copied where useful.

## Project Structure

- `WarhammerPaintHelper.html` - static page shell.
- `styles.css` - app styling.
- `src/core.js` - color math, palette generation, system profiles, base suggestions.
- `src/factions.js` - bundled fixed faction/subfaction scheme data.
- `src/i18n.js` - English, German, French, and Spanish translation scaffolding.
- `src/citadel.js` - paint catalogue normalization and nearest-color matching.
- `src/app.js` - browser UI controller.
- `data/faction-schemes.json` - normalized fixed faction/subfaction scheme data.
- `data/paint-catalogue.json` - manufacturer-grouped paint catalogue.
- `data/paint-catalogue.default.json` - example catalogue structure and field guide.
- `tests/` - Node unit tests.

## Tests

No npm packages are required. Run:

```sh
npm test
```

The tests use Node's built-in test runner and cover color generation, fixed faction
palette generation, system data separation, translation lookup, catalogue mapping, and
static asset wiring.

## Vibe Coded Notice

This project has been completely vibe coded. That means it was built through an
AI-assisted, exploratory coding process rather than a traditional planned software
engineering workflow. Please treat it as a hobby tool: useful, fun, and open to
improvement, but not guaranteed to be perfect.

## Disclaimer

This is an unofficial hobby project. It is not affiliated with, endorsed by, or
connected to Games Workshop.
