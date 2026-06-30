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

Current app version: `v0.11` (`package.json` version `0.11.0`). The static HTML uses the
major/minor version as a cache-buster on local CSS and JavaScript assets so deployed
updates on GitHub Pages are less likely to reuse stale browser-cached files.

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
- Paint catalogue search, direct paint selection for the main color, producer filters
  for limiting nearest-paint matches by manufacturer, owned-colour tooltip badges,
  PaintRack CSV import for owned collection exports, an owned-colours checklist for
  tracking paints already in your collection, and a shopping list for unowned colours you
  want to buy.
- A random palette button that can vary game system, custom or faction schemes, colors,
  scheme type, finish, role planner, base environment, heraldic settings, and producer
  filters.
- Collapsible generated-output sections so you can hide painting notes, role plans, base
  advice, model roles, paint ladders, or catalogue matches and keep the main window focused.
- Automatic browser-local restore of the last used settings, plus named local profiles
  for keeping multiple miniature paint plans, including collapsed section preferences.
- Shareable palette links that encode the current Warhammer paint scheme settings in
  the URL for bookmarking or sending to another hobbyist.
- Paint catalogue matching across manufacturer color groups, useful for finding close
  alternatives to Citadel, Vallejo, Army Painter, and other miniature paints. The
  catalogue lives at `data/paint-catalogue.json` and uses `manufacturers[].colors[]`
  entries.
- Owned-paint filtering for closest matches, including badges on matches that are in
  your marked collection.
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
5. In `Owned colours`, tick the paints you own or import a PaintRack CSV export, then
   enable owned-only closest matches if you want suggestions restricted to your
   collection.
6. Add unowned tooltip matches or searched catalogue paints to `Shopping list`, then
   mark them owned when you buy them or remove them when you no longer need them.
7. Collapse any generated-output sections you do not need in the main window; the app
   remembers that view locally and in named profiles.
8. Save a named profile or copy a share link if you want to keep or send the scheme.
9. Use the generated palette, role plan, paint ladder, base advice, and catalogue matches
   as a painting plan.

## Saved Settings and Profiles

The app automatically stores the last-used settings in the browser with `localStorage`,
so returning to the same browser and device restores the previous palette setup, including
which generated-output sections are collapsed. Named profiles use the same browser-local
storage and are useful for keeping separate army,
faction, unit, or test schemes without needing an account or backend.

The `Copy share link` button creates a URL with the current system, colors, scheme,
finish, role planner, base theme, faction scheme, heraldic options, search text, producer
filters, and the owned-only matching toggle, including an explicitly empty producer
selection. Opening a share link applies those URL settings first, then continues to
auto-save changes locally as normal. Owned paint checklists and shopping lists stay
browser-local through last-used settings and named profiles rather than being embedded in
share URLs.

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
finish, and distance; catalogue status stays internal. Use the Owned colours panel to
mark paints you have on hand, highlight those paints in closest matches, and optionally
limit closest-match calculations to owned paints only. Use the Shopping list panel or
tooltip buttons to collect unowned colours you want to buy.

## Project Structure

- `WarhammerPaintHelper.html` - static page shell.
- `styles.css` - app styling.
- `src/core.js` - color math, palette generation, system profiles, base suggestions.
- `src/factions.js` - bundled fixed faction/subfaction scheme data.
- `src/i18n.js` - English, German, French, Spanish, and Italian translation scaffolding.
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
and matching, PaintRack import parsing, producer filter restore behavior, owned-paint and
shopping-list UI wiring, share-link serialization guards, base suggestion behavior, and
static asset/version wiring.

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

## Release Notes

### v0.11.0

This release adds PaintRack collection import and makes the shopping list easier to clear
when paints become part of your owned collection:

- Added PaintRack CSV import for files with `Brand`, `SKU`, `Paint Name`, `Paint Class`,
  `Size`, and `Count` columns.
- Marked matched PaintRack catalogue colours as owned and kept unmatched colours as owned
  PaintRack-only entries without pretending they have catalogue colour data.
- Added a short import report popover for matched, not-in-catalogue, and skipped rows.
- Removed the old select-all-visible owned-colours checkbox.
- Added a `Mark owned` action to shopping-list rows so bought paints leave the shopping
  list and join owned colours in one click.
- Bumped the public app version from `v0.10` to `v0.11` so hosted pages do not reuse
  stale `v0.10` assets that do not include PaintRack import and shopping-list ownership
  actions.

### v0.10.0

This release fixes the shopping-list add-colour dropdown so all unowned catalogue
colours are available instead of only the first 80 sorted matches:

- Removed the 80-colour cap from the shopping-list add-colour selector.
- Added a regression check so the shopping-list search cannot silently reintroduce the
  fixed 80-item limit.
- Bumped the public app version from `v0.9` to `v0.10` so hosted pages do not reuse stale
  `v0.9` assets that still cap shopping-list suggestions.

### v0.9.0

This release makes the generated main-window sections collapsible and refreshes the static
asset cache-buster so browsers fetch the updated UI:

- Added collapse/expand controls for painting notes, role planner, base advice, model
  roles, paint ladder, and catalogue matches.
- Preserved generated-section collapse preferences in browser-local settings and named
  profiles so each user can customize their view.
- Bumped the public app version from `v0.8` to `v0.9` so hosted pages do not reuse stale
  `v0.8` assets that do not include collapsible output sections.

### v0.8.0

This release adds a browser-local shopping list for unowned catalogue colours and
refreshes the static asset cache-buster so browsers fetch the new UI assets:

- Added a collapsible bottom-of-page `Shopping list` section with catalogue search, add,
  status, and remove controls.
- Added tooltip buttons so unowned closest-match paints can be added directly to the
  shopping list.
- Kept owned paints out of the shopping list and removed shopping-list entries when a
  colour is marked as owned.
- Preserved shopping-list entries, search text, and collapsed state in browser-local
  settings and named profiles.
- Bumped the public app version from `v0.7` to `v0.8` so hosted pages do not reuse stale
  `v0.7` assets that do not include the shopping-list controls.

### v0.7.0

This release fixes owned-only closest-match filtering and refreshes the static asset
cache-buster so browsers fetch the corrected UI logic:

- Fixed the owned-only closest-match toggle so unowned colours are excluded from both
  generated palette match cards and hover/focus paint tooltips.
- Added regression tests covering owned-only candidate filtering before closest-match
  calculations.
- Bumped the public app version from `v0.6` to `v0.7` so hosted pages do not reuse stale
  `v0.6` assets that can show unowned closest matches.

### v0.6.0

This release makes owned paints visible directly in hover/focus paint tooltips and
refreshes the static asset cache-buster so browsers fetch the updated UI assets:

- Added an Owned badge beside owned closest-match paints in colour tooltips.
- Added a bottom-of-page legend explaining that the Owned badge means an owned colour.
- Bumped the public app version from `v0.5` to `v0.6` so hosted pages do not reuse stale
  `v0.5` assets that do not include the owned-paint tooltip badge.

### v0.5.0

This release adds owned-paint collection tracking and refreshes the static asset
cache-buster so browsers fetch the matching JavaScript, styling, and translation files
for the new controls:

- Added a separate Owned colours panel for marking catalogue paints that are already in
  your collection.
- Added a select-all-visible control that reflects when every currently filtered
  catalogue colour is selected.
- Added an owned-only closest-match toggle so generated palette matches can be limited
  to paints you own.
- Marked owned closest-match rows with an Owned badge while still allowing full-catalogue
  matching when the owned-only toggle is off.
- Preserved owned paint selections and the owned-only matching preference in browser-local
  saved settings and named profiles.
- Bumped the public app version from `v0.4` to `v0.5` so hosted pages do not reuse stale
  `v0.4` assets that do not include the owned-paint controls.

### v0.4.0

This release adds recipe depth modes and refreshes the static asset cache-buster so
browsers fetch the matching JavaScript and translation files for the new controls:

- Added beginner, speedpaint, battle-ready, and display-painting recipe modes.
- Updated generated paint ladders so each mode uses workflow-appropriate steps.
- Preserved the selected recipe mode in random palettes, saved profiles, and share links.
- Bumped the public app version from `v0.3` to `v0.4` so hosted pages do not reuse stale
  `v0.3` scripts that cannot populate the new recipe mode selector.

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
