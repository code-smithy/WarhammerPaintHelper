# Changelog

## v0.11.0

- Added PaintRack CSV import for owned-colour collection exports, including matched
  catalogue paints and owned entries for colours that are not in the catalogue.
- Added an import report popover showing which PaintRack colours matched the catalogue,
  which were kept as owned custom entries, and which rows were skipped.
- Removed the select-all-visible owned-colours control.
- Added a Shopping list action to mark a colour as owned, automatically removing it from
  the shopping list.
- Bumped the static app version and cache-buster from `v0.10` to `v0.11`.

## v0.10.0

- Removed the 80-colour cap from the Shopping list add-colour selector so all unowned
  catalogue colours can be chosen.
- Added regression coverage for the shopping-list search result count.
- Bumped the static app version and cache-buster from `v0.9` to `v0.10`.

## v0.9.0

- Added collapse/expand controls to the generated main-window output sections: painting
  notes, role planner, base advice, model roles, paint ladder, and catalogue matches.
- Persisted generated-section collapse preferences in saved browser settings and named
  profiles so users can customize their view.
- Bumped the static app version and cache-buster from `v0.8` to `v0.9`.

## v0.8.0

- Added a collapsible Shopping list section at the bottom of the app for tracking
  unowned catalogue colours to buy.
- Added shopping-list actions to hover/focus paint tooltips for unowned closest matches.
- Added catalogue search and remove controls for shopping-list entries while keeping owned
  paints excluded from the list.
- Persisted shopping-list entries, search text, and collapse state in saved browser
  settings and named profiles.
- Bumped the static app version and cache-buster from `v0.7` to `v0.8`.

## v0.7.0

- Fixed owned-only closest-match filtering so unowned colours are excluded from both
  generated palette match cards and hover/focus paint tooltips.
- Added regression tests covering owned-only candidate filtering before closest-match
  calculations.
- Bumped the static app version and cache-buster from `v0.6` to `v0.7`.

## v0.6.0

- Added an Owned badge to hover/focus paint tooltips for closest catalogue
  matches that are already marked as owned.
- Added a bottom-of-page legend explaining the owned-paint tooltip badge.
- Bumped the static app version and cache-buster from `v0.5` to `v0.6`.

## v0.5.0

- Added a separate Owned colours panel for tracking catalogue paints already in a
  collection.
- Added select-all-visible support with status text that indicates when every currently
  visible colour is selected.
- Added an owned-only closest-match toggle and Owned badges for closest matches that are
  in the marked collection.
- Persisted owned paint selections and the owned-only matching preference in saved
  browser settings and named profiles.
- Bumped the static app version and cache-buster from `v0.4` to `v0.5`.

## v0.4.0

- Added beginner, speedpaint, battle-ready, and display-painting recipe modes.
- Updated paint ladders so each mode uses workflow-appropriate steps.
- Preserved recipe mode in random palettes, saved profiles, and share links.
- Bumped the static app version and cache-buster from `v0.3` to `v0.4`.

## v0.3.0

- Added Zorn limited palette support.
- Expanded random palette coverage across game systems, faction schemes, heraldic
  options, role planners, base themes, catalogue colours, finish style, and producer
  filters.
- Added shareable palette links and named browser-local profiles.
- Improved paint catalogue loading, manufacturer grouping, producer filtering, match
  metadata, and hover/focus paint tooltips.
- Added static asset version checks and browser smoke test coverage.
- Expanded the unofficial project disclaimer to cover miniature and paint manufacturers.

## v0.2.0

- Introduced versioned static assets and README versioning guidance.
- Added broader test coverage for static wiring, share links, catalogue normalization,
  producer selection, base suggestions, factions, translations, and core palettes.
