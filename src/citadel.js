(function (root, factory) {
  const api = factory();
  root.WPH = Object.assign(root.WPH || {}, api);
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DEFAULT_CITADEL_PAINTS = [
    { name: "Abaddon Black", hex: "#111111", range: "Base" },
    { name: "White Scar", hex: "#F5F7F2", range: "Layer" },
    { name: "Mephiston Red", hex: "#A31C22", range: "Base" },
    { name: "Caledor Sky", hex: "#245B9E", range: "Base" },
    { name: "Macragge Blue", hex: "#1F3F85", range: "Base" },
    { name: "Warpstone Glow", hex: "#168A45", range: "Layer" },
    { name: "Averland Sunset", hex: "#F2B233", range: "Base" },
    { name: "Leadbelcher", hex: "#6D7378", range: "Base" },
    { name: "Retributor Armour", hex: "#C99635", range: "Base" },
    { name: "Rakarth Flesh", hex: "#B9AE92", range: "Base" },
    { name: "XV-88", hex: "#8C5A2B", range: "Base" },
    { name: "Naggaroth Night", hex: "#3E275E", range: "Base" }
  ];
  const DEFAULT_PAINT_CATALOGUE = DEFAULT_CITADEL_PAINTS;

  function normalizeHex(hex) {
    const clean = String(hex || "").trim().replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      return null;
    }
    return ("#" + clean).toUpperCase();
  }

  function hexToRgb(hex) {
    const normalized = normalizeHex(hex);
    if (!normalized) {
      return null;
    }
    return {
      r: parseInt(normalized.slice(1, 3), 16),
      g: parseInt(normalized.slice(3, 5), 16),
      b: parseInt(normalized.slice(5, 7), 16)
    };
  }

  function collectCatalogueEntries(input) {
    if (Array.isArray(input)) {
      return input.map(paint => ({ paint }));
    }

    if (Array.isArray(input && input.manufacturers)) {
      return input.manufacturers.flatMap(manufacturer => {
        const colors = Array.isArray(manufacturer && manufacturer.colors) ? manufacturer.colors : [];
        return colors.map(paint => ({ paint, manufacturer }));
      });
    }

    const paints = Array.isArray(input && input.paints)
      ? input.paints
      : Array.isArray(input && input.colors)
        ? input.colors
        : [];

    return paints.map(paint => ({ paint }));
  }

  function normalizePaintEntry(paint, index, manufacturer) {
    if (!paint || typeof paint !== "object") {
      return null;
    }

    const hex = normalizeHex(paint.hex || paint.color || paint.colour || paint.rgbHex);
    if (!hex) {
      return null;
    }

    const manufacturerName = String(
      (manufacturer && manufacturer.name) || paint.manufacturer || paint.brand || ""
    );
    const name = String(paint.name || paint.paint || paint.label || `Paint ${index + 1}`);
    const manufacturerCode = paint.manufacturer_code || paint.manufacturerCode || paint.code || "";
    const id = paint.id || paint.slug || manufacturerCode || (manufacturerName ? `${manufacturerName}:${name}` : String(index));

    return {
      id: String(id),
      name,
      hex,
      range: paint.range || paint.type || paint.category || "",
      finish: paint.finish || paint.medium || "",
      manufacturer: manufacturerName,
      collection: paint.collection || paint.line || paint.series || "",
      status: paint.status || "",
      sourceUrl: paint.source_url || paint.sourceUrl || "",
      notes: paint.notes || "",
      manufacturerCode
    };
  }

  function normalizeCitadelPaints(input) {
    return collectCatalogueEntries(input)
      .map((entry, index) => normalizePaintEntry(entry.paint, index, entry.manufacturer))
      .filter(Boolean);
  }

  function normalizePaintCatalogue(input) {
    return normalizeCitadelPaints(input);
  }

  function colorDistance(hexA, hexB) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    if (!a || !b) {
      return Number.POSITIVE_INFINITY;
    }
    const dr = a.r - b.r;
    const dg = a.g - b.g;
    const db = a.b - b.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  function findClosestPaints(hex, paints, limit) {
    const max = Math.max(1, Number(limit) || 3);
    return normalizeCitadelPaints(paints)
      .map(paint => ({
        ...paint,
        distance: Math.round(colorDistance(hex, paint.hex))
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, max);
  }

  function mapPaletteToCatalogue(palette, paints, options) {
    const limit = options && options.limit ? options.limit : 3;
    const normalized = normalizeCitadelPaints(paints);
    return (palette || []).map(color => ({
      ...color,
      matches: normalized.length ? findClosestPaints(color.hex, normalized, limit) : []
    }));
  }

  function mapPaletteToCitadel(palette, paints, options) {
    return mapPaletteToCatalogue(palette, paints, options);
  }

  async function loadPaintCatalogue(url, fallbackPaints) {
    const fallback = normalizeCitadelPaints(fallbackPaints || DEFAULT_PAINT_CATALOGUE);
    if (typeof fetch !== "function") {
      return { paints: fallback, source: "sample" };
    }

    try {
      const response = await fetch(url || "data/paint-catalogue.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      const paints = normalizeCitadelPaints(data);
      return paints.length
        ? { paints, source: "json" }
        : { paints: fallback, source: "sample" };
    } catch (error) {
      return { paints: fallback, source: "sample", error: error.message };
    }
  }

  function loadCitadelPaints(url, fallbackPaints) {
    return loadPaintCatalogue(url, fallbackPaints);
  }

  return {
    DEFAULT_CITADEL_PAINTS,
    DEFAULT_PAINT_CATALOGUE,
    normalizeHex,
    normalizeCitadelPaints,
    normalizePaintCatalogue,
    colorDistance,
    findClosestPaints,
    mapPaletteToCatalogue,
    mapPaletteToCitadel,
    loadPaintCatalogue,
    loadCitadelPaints
  };
}));
