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
