const test = require("node:test");
const assert = require("node:assert/strict");
const citadel = require("../src/citadel.js");

test("normalizes supported paint catalogue JSON shapes", () => {
  const fromArray = citadel.normalizeCitadelPaints([
    { name: "Test Red", hex: "#AA0000", range: "Base" },
    { name: "Invalid", hex: "nope" }
  ]);
  const fromObject = citadel.normalizeCitadelPaints({
    paints: [{ paint: "Test Blue", colour: "0033AA", type: "Layer" }]
  });

  assert.deepEqual(fromArray, [
    {
      id: "0",
      name: "Test Red",
      hex: "#AA0000",
      range: "Base",
      finish: "",
      manufacturer: "",
      collection: "",
      status: "",
      sourceUrl: "",
      notes: "",
      manufacturerCode: ""
    }
  ]);
  assert.deepEqual(fromObject, [
    {
      id: "0",
      name: "Test Blue",
      hex: "#0033AA",
      range: "Layer",
      finish: "",
      manufacturer: "",
      collection: "",
      status: "",
      sourceUrl: "",
      notes: "",
      manufacturerCode: ""
    }
  ]);
});

test("flattens manufacturer colour catalogue entries", () => {
  const paints = citadel.normalizePaintCatalogue({
    manufacturers: [
      {
        name: "Example Paints",
        colors: [
          {
            name: "Catalogue Red",
            hex: "#AA0000",
            collection: "Game Color",
            status: "confirmed",
            source_url: "https://example.test/colors"
          },
          { name: "Missing Hex", hex: null, status: "missing" }
        ]
      }
    ]
  });

  assert.deepEqual(paints, [
    {
      id: "Example Paints:Catalogue Red",
      name: "Catalogue Red",
      hex: "#AA0000",
      range: "",
      finish: "",
      manufacturer: "Example Paints",
      collection: "Game Color",
      status: "confirmed",
      sourceUrl: "https://example.test/colors",
      notes: "",
      manufacturerCode: ""
    }
  ]);
});

test("finds exact and near paint matches", () => {
  const paints = [
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" }
  ];
  const matches = citadel.findClosestPaints("#F80000", paints, 2);

  assert.equal(matches[0].name, "Red");
  assert.equal(matches.length, 2);
  assert.ok(matches[0].distance < matches[1].distance);
});

test("maps generated palette entries to closest paints", () => {
  const palette = [
    { roleKey: "primary", hex: "#FF0000" },
    { roleKey: "contrast", hex: "#0000FF" }
  ];
  const mapped = citadel.mapPaletteToCatalogue(palette, [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" }
  ], { limit: 1 });

  assert.equal(mapped[0].matches[0].name, "Red");
  assert.equal(mapped[1].matches[0].name, "Blue");
});

test("filters closest match candidates to owned paints when requested", () => {
  const paints = [
    { id: "owned-red", name: "Owned Red", hex: "#FF0000" },
    { id: "unowned-blue", name: "Unowned Blue", hex: "#0000FF" },
    { id: "owned-green", name: "Owned Green", hex: "#00FF00" }
  ];
  const ownedPaintKeys = new Set(["owned-red", "owned-green"]);

  const filtered = citadel.filterOwnedPaints(paints, {
    onlyOwnedMatches: true,
    ownedPaintKeys,
    paintKey: paint => paint.id
  });

  assert.deepEqual(filtered.map(paint => paint.name), ["Owned Red", "Owned Green"]);
  assert.deepEqual(citadel.filterOwnedPaints(paints, { onlyOwnedMatches: false, ownedPaintKeys }), paints);
  assert.deepEqual(citadel.filterOwnedPaints(paints), paints);
});

test("filters owned paints with array keys and default id lookup", () => {
  const paints = [
    { id: "first", name: "First Paint", hex: "#111111" },
    { id: "second", name: "Second Paint", hex: "#222222" },
    { id: "third", name: "Third Paint", hex: "#333333" }
  ];

  const filtered = citadel.filterOwnedPaints(paints, {
    onlyOwnedMatches: true,
    ownedPaintKeys: ["second", "third"]
  });

  assert.deepEqual(filtered.map(paint => paint.id), ["second", "third"]);
});

test("owned paint filtering handles empty and malformed inputs", () => {
  const paints = [
    { id: "owned", name: "Owned", hex: "#FFFFFF" },
    { id: "unowned", name: "Unowned", hex: "#000000" }
  ];

  assert.deepEqual(citadel.filterOwnedPaints(null, { onlyOwnedMatches: true, ownedPaintKeys: ["owned"] }), []);
  assert.deepEqual(citadel.filterOwnedPaints(paints, { onlyOwnedMatches: true }), []);
  assert.deepEqual(citadel.filterOwnedPaints(paints, { onlyOwnedMatches: true, ownedPaintKeys: ["missing"] }), []);
});

test("owned-only candidates are applied before closest paint matching", () => {
  const palette = [{ roleKey: "primary", hex: "#0000FE" }];
  const paints = [
    { id: "owned-red", name: "Owned Red", hex: "#FF0000" },
    { id: "unowned-blue", name: "Unowned Blue", hex: "#0000FF" }
  ];
  const ownedPaints = citadel.filterOwnedPaints(paints, {
    onlyOwnedMatches: true,
    ownedPaintKeys: ["owned-red"]
  });

  const mapped = citadel.mapPaletteToCatalogue(palette, ownedPaints, { limit: 3 });

  assert.deepEqual(mapped[0].matches.map(match => match.name), ["Owned Red"]);
});

test("normalizes hex values and rejects malformed colours", () => {
  assert.equal(citadel.normalizeHex("abc123"), "#ABC123");
  assert.equal(citadel.normalizeHex(" #00ffaa "), "#00FFAA");
  assert.equal(citadel.normalizeHex("#12345"), null);
  assert.equal(citadel.normalizeHex("not-a-colour"), null);
  assert.equal(citadel.colorDistance("bad", "#000000"), Infinity);
});

test("catalogue normalization preserves ids and manufacturer codes", () => {
  const paints = citadel.normalizePaintCatalogue({
    manufacturers: [
      {
        name: "Vallejo",
        colors: [
          {
            id: "vgc-72010",
            name: "Bloody Red",
            hex: "A8171A",
            manufacturer_code: "72.010",
            line: "Game Color",
            medium: "Acrylic"
          }
        ]
      }
    ]
  });

  assert.deepEqual(paints, [
    {
      id: "vgc-72010",
      name: "Bloody Red",
      hex: "#A8171A",
      range: "",
      finish: "Acrylic",
      manufacturer: "Vallejo",
      collection: "Game Color",
      status: "",
      sourceUrl: "",
      notes: "",
      manufacturerCode: "72.010"
    }
  ]);
});

test("closest paint matching handles invalid targets and empty catalogues", () => {
  const emptyMatches = citadel.findClosestPaints("#FF0000", [], 3);
  const invalidTargetMatches = citadel.findClosestPaints("bad", [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" }
  ], 2);
  const mapped = citadel.mapPaletteToCatalogue([
    { roleKey: "primary", hex: "#FF0000" }
  ], [], { limit: 2 });

  assert.deepEqual(emptyMatches, []);
  assert.equal(invalidTargetMatches.length, 2);
  invalidTargetMatches.forEach(match => assert.equal(match.distance, Infinity));
  assert.deepEqual(mapped[0].matches, []);
});
