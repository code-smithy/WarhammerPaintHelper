# Warhammer Paint Helper

Warhammer Paint Helper is a static color scheme generator for miniature painting. It is
aimed at Warhammer Age of Sigmar and Warhammer 40,000 hobbyists, but it can also be used
for any miniature, model, or tabletop painting project that needs a quick palette idea.

## What It Does

The app lets you pick a main color from a color wheel, enter a HEX value directly, or
roll a random color, then generates painting-friendly palettes around it.

It currently supports:

- Age of Sigmar and Warhammer 40,000 modes.
- English, German, French, and Spanish language selection.
- Multiple color scheme types, including complementary, split-complementary, triadic,
  tetradic, analogous, monochrome, zenithal, warm/cool contrast, grimdark, AoS realm,
  and 40K chapter/squad schemes.
- A clean-to-grimdark finish slider that adjusts generated support colors and paint
  ladder advice.
- Model role planning for armor, robes, fatigues, default material colors, weapons,
  magic effects, lenses, plasma, bases, and accent areas.
- Base environment suggestions for fantasy realms and 40K battlefields.
- Shade, wash, basecoat, layer, edge highlight, and focus-light steps.
- Paint catalogue matching across manufacturer color groups. The catalogue lives at
  `data/paint-catalogue.json` and uses `manufacturers[].colors[]` entries.
- Match metadata for manufacturer, collection, range, finish, status, and distance.
- A copy button for exporting the generated palette, role plan, base ideas, paint ladder,
  and catalogue matches.

## How To Use

Open `WarhammerPaintHelper.html` in a browser.

The core app works as a static page. Catalogue JSON loading works best when the project is
served by a simple static server, because some browsers block local JSON loading from
`file://` URLs. If the JSON cannot be loaded, the app falls back to a small sample paint
set so the UI remains usable.

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
- `src/i18n.js` - English, German, French, and Spanish translation scaffolding.
- `src/citadel.js` - paint catalogue normalization and nearest-color matching.
- `src/app.js` - browser UI controller.
- `data/paint-catalogue.json` - manufacturer-grouped paint catalogue.
- `data/paint-catalogue.default.json` - example catalogue structure and field guide.
- `tests/` - Node unit tests.

## Tests

No npm packages are required. Run:

```sh
npm test
```

The tests use Node's built-in test runner and cover color generation, system data,
translation lookup, catalogue mapping, and static asset wiring.

## Vibe Coded Notice

This project has been completely vibe coded. That means it was built through an
AI-assisted, exploratory coding process rather than a traditional planned software
engineering workflow. Please treat it as a hobby tool: useful, fun, and open to
improvement, but not guaranteed to be perfect.

## Disclaimer

This is an unofficial hobby project. It is not affiliated with, endorsed by, or
connected to Games Workshop.
