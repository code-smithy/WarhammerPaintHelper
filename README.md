# Warhammer Paint Helper

Warhammer Paint Helper is a static miniature paint scheme generator for planning
tabletop color palettes. It is aimed at Warhammer Age of Sigmar and Warhammer 40,000
hobbyists looking for quick faction colors, paint recipes, or palette ideas, but it can
also be used for any miniature, model, or tabletop painting project.

## What It Does

The app lets you pick a main color from a color wheel, enter a HEX value directly, choose
a paint from the catalogue, select a fixed faction scheme, or roll a full random palette.
It then generates painting-friendly color schemes with role suggestions, paint matches,
and steps you can turn into a practical miniature painting plan.

Current app version: `v0.3` (`package.json` version `0.3.0`). The static HTML uses the
major/minor version as a cache-buster on local CSS and JavaScript assets so deployed
updates on GitHub Pages are less likely to reuse stale browser-cached files.

## Release Notes

### v0.3.0

This release consolidates the recent feature and polish work into a new public app
version:

- Added Zorn limited palette support for warm, painterly miniature schemes.
- Expanded random palette generation so it can vary systems, factions, heraldic settings,
  catalogue colours, producer filters, base advice, and role planning in one click.
- Added shareable palette URLs and browser-local named profiles for keeping and sending
  paint plans.
- Improved paint catalogue handling with manufacturer-grouped JSON, producer filters,
  match metadata, hover/focus tooltips, and safer fallback behavior while catalogue JSON
  loads.
- Added static asset version checks and a browser smoke test for the deployed-style
  static HTML page.
- Clarified project disclaimers around Warhammer, paint ranges, paint manufacturers, and
  unofficial hobby-project status.

It currently supports:

- Age of Sigmar and Warhammer 40,000 color scheme modes.
- English, German, French, Spanish, and Italian language selection.
- Fixed faction and subfaction schemes, kept separate by game system. The included data
  currently covers 60 Age of Sigmar schemes and 67 Warhammer 40,000 schemes.
- Excel-derived faction scheme data with labelled roles for dominant color, secondary
  color, dark neutral, light neutral, and two accents.
- Multiple color scheme types, including complementary, split-complementary, triadic,
  tetradic, analogous, monochrome, zenithal, warm/cool contrast, Zorn limited palette,
  grimdark, AoS realm, and 40K chapter/squad schemes.
- Heraldic two-color mode with field and charge colors, shield layouts, color balance,
  automatic accent choices, and a small heraldic preview.
- A clean-to-grimdark finish slider that adjusts generated support colors and paint
  ladder advice.
- Model role planning for armor, robes, fatigues, default material colors, weapons,
  magic effects, lenses, plasma, bases, and accent areas.
- Base environment suggestions for fantasy realms and 40K battlefields.
- Recipe depth modes for beginner, speedpaint, battle-ready, and display-painting workflows.
- Shade, wash, basecoat, layer, edge highlight, and focus-light steps.
- Paint catalogue search, direct paint selection for the main color, and producer
  filters for limiting nearest-paint matches by manufacturer.
- A random palette button that can vary game system, custom or faction schemes, colors,
  scheme type, finish, role planner, base environment, heraldic settings, and producer
  filters.
- Automatic browser-local restore of the last used settings, plus named local profiles
  for keeping multiple miniature paint plans.
- Shareable palette links that encode the current Warhammer paint scheme settings in
  the URL for bookmarking or sending to another hobbyist.
- Paint catalogue matching across manufacturer color groups, useful for finding close
  alternatives to Citadel, Vallejo, Army Painter, and other miniature paints. The
  catalogue lives at `data/paint-catalogue.json` and uses `manufacturers[].colors[]`
  entries.
- Match metadata for manufacturer, collection, range, finish, and distance.
- Hover/focus paint tooltips for generated colors, showing the closest catalogue
  matches without leaving the palette view.
- Click-to-copy HEX values for generated colors and paint ladder steps.

## How To Use

Open `WarhammerPaintHelper.html` in a browser.

The core app works as a static page. The bundled fixed faction schemes are available even
when opening the HTML file directly. Catalogue JSON loading works best when the project is
served by a simple static server, because some browsers block local JSON loading from
`file://` URLs. If the paint catalogue JSON cannot be loaded, the app falls back to a
small sample paint set so the UI remains usable.

If you can't use it locally, just use the [online version hosted on GitHub Pages](https://code-smithy.github.io/WarhammerPaintHelper/WarhammerPaintHelper.html).

Typical workflow:

1. Pick `Age of Sigmar` or `Warhammer 40,000`.
2. Either use the color wheel and scheme controls, or choose a faction and subfaction for
   a fixed Warhammer paint scheme.
3. Use `Random palette` when you want the app to explore across systems, schemes, colors,
   faction data, finish styles, and planning options for you.
4. Adjust finish, recipe mode, role planner, base environment, and paint producer filters.
5. Save a named profile or copy a share link if you want to keep or send the scheme.
6. Use the generated palette, role plan, paint ladder, base advice, and catalogue matches
   as a painting plan.

## Saved Settings and Profiles

The app automatically stores the last-used settings in the browser with `localStorage`,
so returning to the same browser and device restores the previous palette setup. Named
profiles use the same browser-local storage and are useful for keeping separate army,
faction, unit, or test schemes without needing an account or backend.

The `Copy share link` button creates a URL with the current system, colors, scheme,
finish, role planner, base theme, faction scheme, heraldic options, search text, and
producer filters, including an explicitly empty producer selection. Opening a share link
applies those URL settings first, then continues to auto-save changes locally as normal.

## Faction Paint Schemes

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

The app filters faction and subfaction choices by the selected game system, so Age of
Sigmar and Warhammer 40,000 schemes do not mix.

## Paint Catalogue JSON

The live catalogue file is `data/paint-catalogue.json`; use it as the starting point for new catalogues
or new manufacturers. The catalogue is designed for miniature paint matching, paint range
comparison, and nearest-colour lookup from generated palettes.

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
loader. The visible colour match information shows manufacturer, collection, range,
finish, and distance; catalogue status stays internal.

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
palette generation, system data separation, translation lookup, catalogue normalization
and matching, producer filter restore behavior, share-link serialization guards, base
suggestion behavior, and static asset/version wiring.

For a real browser smoke test, install Playwright Core and run:

```sh
npm install
npm run test:browser
```

The browser smoke test serves the static app locally, launches an installed Edge or
Chrome browser, clicks `Random palette`, and fails on page or console errors. If your
browser is not in a standard Windows install path, set `PLAYWRIGHT_BROWSER_EXECUTABLE`
to the browser executable before running the test.

## Vibe Coded Notice

This project has been vibe coded, which is the highly rigorous engineering discipline
of asking an AI for help, squinting at the result, running tests, clicking around in a
browser, and then declaring that the machine spirit seems mostly appeased.

In keeping with the tradition, this sarcastic notice is itself being written by vibe
code, because apparently the only thing better than a vibe-coded hobby tool is a
vibe-coded disclaimer about the vibe-coded hobby tool. Please treat the app as useful,
fun, and open to improvement, not as a sacred artifact handed down from the mountaintop
by a certified committee of paint-swatch auditors.

## Disclaimer

This is an unofficial hobby project. It is not affiliated with, endorsed by, or
connected to Games Workshop, Citadel, Vallejo, Army Painter, or any other paint
manufacturer, paint range, miniature company, or hobby brand mentioned in the app.
