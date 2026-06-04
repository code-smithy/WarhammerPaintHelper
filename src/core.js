(function (root, factory) {
  const api = factory();
  root.WPH = Object.assign(root.WPH || {}, api);
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SCHEMES = {
    complementary: {
      colors: [[0, 0, 0, "primary"], [180, 0, 8, "contrast"]]
    },
    split: {
      colors: [[0, 0, 0, "primary"], [150, 0, 8, "leftAccent"], [210, 0, -8, "rightAccent"]]
    },
    triadic: {
      colors: [[0, 0, 0, "primary"], [120, 0, 8, "secondary"], [240, 0, -8, "accent"]]
    },
    tetradic: {
      colors: [[0, 0, 0, "primary"], [90, 0, 8, "secondary"], [180, 0, -8, "contrast"], [270, 8, 14, "accent"]]
    },
    limitedPalette: {
      colors: [[0, 0, 0, "primary"], [35, -10, 8, "secondary"], [180, -6, 4, "accent"]]
    },
    highContrast: {
      colors: [[0, 0, 0, "primary"], [0, -10, -34, "deepShadow"], [0, -18, 34, "edgeHighlight"], [180, 16, 10, "strongAccent"]]
    },
    lowContrast: {
      colors: [[0, 0, 0, "primary"], [-18, -24, -8, "shadow"], [18, -26, 8, "dustyLayer"], [45, -32, 4, "dirtyAccent"]]
    },
    analogous: {
      colors: [[0, 0, 0, "primary"], [-35, -4, -10, "shadow"], [35, -4, 12, "highlight"]]
    },
    analogousWide: {
      colors: [[0, 0, 0, "primary"], [-60, -10, -14, "darkNeighbor"], [-30, -4, -6, "shadow"], [30, -4, 10, "layer"], [60, -10, 18, "lightNeighbor"]]
    },
    monochrome: {
      colors: [[0, 0, 0, "primary"], [0, 0, -28, "deepShadow"], [0, -4, 18, "layer"], [0, -12, 34, "edgeHighlight"]]
    },
    zenithal: {
      colors: [[0, 0, 0, "basecoat"], [-12, -18, -28, "coolShadow"], [8, -6, 18, "warmLayer"], [15, -18, 34, "edgeHighlight"]]
    },
    accented: {
      colors: [[0, 0, 0, "primary"], [-30, -4, -8, "darkNeighbor"], [30, -4, 10, "lightNeighbor"], [180, 8, 8, "strongAccent"]]
    },
    compound: {
      colors: [[0, 0, 0, "primary"], [30, -5, 10, "neighbor"], [180, 0, -4, "contrast"], [210, -8, 8, "secondaryAccent"]]
    },
    warmCool: {
      colors: [[0, 0, 0, "primary"], [22, -2, 12, "warmLayer"], [190, -5, -5, "coolCounter"], [215, -10, 10, "coolAccent"]]
    },
    boxArt: {
      colors: [[0, 0, 0, "armor"], [0, -18, -28, "panelShade"], [40, -6, 14, "companyMarking"], [180, 16, 10, "lensAccent"]]
    },
    eavyMetal: {
      colors: [[0, 0, 0, "basecoat"], [0, -8, -30, "deepShadow"], [0, -12, 36, "edgeHighlight"], [180, 18, 12, "strongAccent"]]
    },
    grimdark: {
      colors: [[0, 0, 0, "primary"], [0, -32, -22, "darkBase"], [35, -25, 10, "dustyLayer"], [180, -28, 0, "dirtyAccent"]]
    },
    blanchitsu: {
      colors: [[0, -26, -6, "primary"], [28, -38, 8, "dustyLayer"], [0, -42, -26, "darkBase"], [180, -34, -2, "dirtyAccent"]]
    },
    comicBook: {
      colors: [[0, 14, 0, "primary"], [0, -2, -34, "deepShadow"], [0, 8, 32, "edgeHighlight"], [120, 14, 10, "accent"]]
    },
    military: {
      colors: [[0, -42, -4, "primary"], [32, -48, 10, "dustyLayer"], [-28, -48, -12, "shadow"], [180, -56, -6, "dirtyAccent"]]
    },
    paradeReady: {
      colors: [[0, 0, 0, "primary"], [30, -6, 10, "secondary"], [0, -8, 24, "edgeHighlight"], [180, 8, 8, "accent"]]
    },
    battleReady: {
      colors: [[0, -8, -2, "primary"], [0, -18, -20, "shadow"], [35, -18, 8, "secondary"]]
    },
    display: {
      colors: [[0, 0, 0, "primary"], [0, -4, -36, "deepShadow"], [0, -8, 38, "edgeHighlight"], [180, 14, 10, "strongAccent"], [35, -4, 12, "highlight"]]
    },
    muted: {
      colors: [[0, -30, -2, "primary"], [-25, -36, -8, "shadow"], [30, -34, 10, "dustyLayer"], [180, -40, 0, "dirtyAccent"]]
    },
    saturated: {
      colors: [[0, 18, 0, "primary"], [120, 16, 8, "secondary"], [240, 18, -4, "accent"], [180, 18, 10, "strongAccent"]]
    },
    pastel: {
      colors: [[0, -30, 26, "primary"], [35, -34, 24, "secondary"], [180, -26, 28, "accent"], [-35, -36, 20, "highlight"]]
    },
    neon: {
      colors: [[0, 20, 8, "primary"], [180, 24, 18, "strongAccent"], [120, 22, 14, "accent"], [0, -10, -30, "darkBase"]]
    },
    realm: {
      colors: [[0, 0, 0, "primary"], [42, -8, 16, "realmGlow"], [180, 12, 8, "realmAccent"], [-35, -14, -16, "realmShadow"]]
    },
    chapter: {
      colors: [[0, 0, 0, "armor"], [0, -16, -24, "panelShade"], [38, -8, 16, "companyMarking"], [180, 10, 6, "lensAccent"]]
    }
  };

  const HERALDIC_LAYOUTS = {
    split: {},
    quartered: {},
    diagonal: {},
    stripe: {},
    border: {}
  };

  const HERALDIC_RATIOS = {
    dominant: { primary: 70, secondary: 30 },
    balanced: { primary: 50, secondary: 50 },
    secondary: { primary: 40, secondary: 60 }
  };

  const HERALDIC_ACCENTS = {
    auto: {},
    autoTrim: {},
    autoFocal: {},
    autoMetal: {},
    gold: { h: 43, s: 72, l: 52, hex: "#D2A13D" },
    red: { h: 4, s: 74, l: 48, hex: "#D03A2E" },
    black: { h: 220, s: 12, l: 10, hex: "#151821" },
    silver: { h: 205, s: 14, l: 76, hex: "#B9C0C5" },
    lens: {}
  };

  const MATERIAL_FALLBACKS = {
    darkLeather: { key: "darkLeather", hex: "#4B2E1F" },
    redLeather: { key: "redLeather", hex: "#7A3B25" },
    darkWood: { key: "darkWood", hex: "#4A2F1B" },
    bone: { key: "bone", hex: "#CBB889" },
    offWhite: { key: "offWhite", hex: "#E8E0CF" },
    iron: { key: "iron", hex: "#6D7478" },
    silver: { key: "silver", hex: "#B9C0C5" },
    bronze: { key: "bronze", hex: "#9B6332" },
    gold: { key: "gold", hex: "#D2A13D" },
    baseEarth: { key: "baseEarth", hex: "#66513C" }
  };

  const ROLE_PROFILES = {
    aos: {
      balanced: [
        role("dominantSurface", palette(0), "dominant", "dominant"),
        role("secondarySurface", palette(1), "secondary", "secondary"),
        role("focusAccent", palette(2), "focus", "focus"),
        role("leatherStraps", material("darkLeather"), "leather", "neutral"),
        role("woodWeapons", material("darkWood"), "wood", "neutral"),
        role("metalDetails", material("iron"), "metal", "metal"),
        role("baseDetails", material("baseEarth"), "base", "base")
      ],
      stormcast: [
        role("plateArmor", palette(0), "dominant", "heroic"),
        role("clothAndShield", palette(1), "secondary", "secondary"),
        role("insignia", material("gold"), "metal", "metal"),
        role("weapon", material("iron"), "metal", "metal"),
        role("magicEyes", palette(2), "focus", "focus"),
        role("leatherStraps", material("darkLeather"), "leather", "neutral"),
        role("baseDetails", material("baseEarth"), "base", "base")
      ],
      death: [
        role("boneGhostRobe", palette(0), "dominant", "grim"),
        role("tornCloth", palette(1), "secondary", "grim"),
        role("etherealGlow", palette(2), "focus", "focus"),
        role("bonesTrophies", material("bone"), "bone", "bone"),
        role("agedMetal", material("bronze"), "metal", "weather"),
        role("leatherScraps", material("darkLeather"), "leather", "neutral"),
        role("graveBase", material("baseEarth"), "base", "base")
      ],
      destruction: [
        role("skinScalesArmor", palette(0), "dominant", "organic"),
        role("warPaintCloth", palette(1), "secondary", "secondary"),
        role("glyphFocus", palette(2), "focus", "focus"),
        role("hidesFurs", material("redLeather"), "leather", "weather"),
        role("clubsShafts", material("darkWood"), "wood", "neutral"),
        role("roughMetal", material("iron"), "metal", "weather"),
        role("dustyBase", material("baseEarth"), "base", "base")
      ],
      chaos: [
        role("darkArmorMutation", palette(0), "dominant", "grim"),
        role("cloakShieldFur", palette(1), "secondary", "grim"),
        role("daemonicFocus", palette(2), "focus", "focus"),
        role("brassTrim", material("bronze"), "metal", "weather"),
        role("leatherTrophies", material("darkLeather"), "leather", "weather"),
        role("bonesTrophies", material("bone"), "bone", "bone"),
        role("ashBase", material("baseEarth"), "base", "base")
      ],
      wizard: [
        role("robeMantle", palette(0), "dominant", "cloth"),
        role("innerRobe", palette(1), "secondary", "cloth"),
        role("spellEffect", palette(2), "focus", "focus"),
        role("parchmentTrim", material("offWhite"), "cloth", "bone"),
        role("staffWood", material("darkWood"), "wood", "neutral"),
        role("jewelry", material("gold"), "metal", "metal"),
        role("mysticBase", material("baseEarth"), "base", "base")
      ],
      beast: [
        role("skinFurScales", palette(0), "dominant", "organic"),
        role("bellyWingsPlates", palette(1), "secondary", "organic"),
        role("eyesMouthMagic", palette(2), "focus", "focus"),
        role("clawsHornsTeeth", material("bone"), "bone", "bone"),
        role("saddleStraps", material("redLeather"), "leather", "neutral"),
        role("chainsArmor", material("iron"), "metal", "weather"),
        role("naturalBase", material("baseEarth"), "base", "base")
      ]
    },
    k40: {
      balanced: [
        role("powerArmorFatigues", palette(0), "dominant", "dominant"),
        role("secondaryPanels", palette(1), "secondary", "secondary"),
        role("lensesPlasma", palette(2), "focus", "focus"),
        role("weaponCasing", material("blackGrey"), "weapon", "neutral"),
        role("gunmetal", material("iron"), "metal", "metal"),
        role("pouchesStraps", material("darkLeather"), "leather", "neutral"),
        role("battlefieldBase", material("baseEarth"), "base", "base")
      ],
      spaceMarines: [
        role("chapterArmor", palette(0), "dominant", "heroic"),
        role("pauldronsKnees", palette(1), "secondary", "secondary"),
        role("companyMarkings", palette(2), "focus", "focus"),
        role("weaponCasing", material("blackGrey"), "weapon", "neutral"),
        role("aquilaTrim", material("gold"), "metal", "metal"),
        role("lensesPlasma", palette(3), "focus", "focus"),
        role("battlefieldBase", material("baseEarth"), "base", "base")
      ],
      guard: [
        role("fatiguesCoat", palette(0), "dominant", "cloth"),
        role("armorPlates", palette(1), "secondary", "secondary"),
        role("unitMarkings", palette(2), "focus", "focus"),
        role("weaponCasing", material("blackGrey"), "weapon", "neutral"),
        role("gunmetal", material("iron"), "metal", "metal"),
        role("pouchesStraps", material("darkLeather"), "leather", "neutral"),
        role("battlefieldBase", material("baseEarth"), "base", "base")
      ],
      chaosMarines: [
        role("traitorArmor", palette(0), "dominant", "grim"),
        role("trimMutations", palette(1), "secondary", "grim"),
        role("warpGlow", palette(2), "focus", "focus"),
        role("brassTrim", material("bronze"), "metal", "weather"),
        role("boneTrophies", material("bone"), "bone", "bone"),
        role("weaponCasing", material("blackGrey"), "weapon", "neutral"),
        role("ashWasteBase", material("baseEarth"), "base", "base")
      ],
      xenos: [
        role("carapaceArmor", palette(0), "dominant", "organic"),
        role("clothPanels", palette(1), "secondary", "secondary"),
        role("alienEnergy", palette(2), "focus", "focus"),
        role("boneClaws", material("bone"), "bone", "bone"),
        role("smoothMetal", material("silver"), "metal", "metal"),
        role("pouchesStraps", material("darkLeather"), "leather", "neutral"),
        role("alienBase", material("baseEarth"), "base", "base")
      ],
      tyranids: [
        role("fleshSkin", palette(0), "dominant", "organic"),
        role("carapaceArmor", palette(1), "secondary", "organic"),
        role("bioWeapons", palette(2), "focus", "focus"),
        role("clawsHornsTeeth", material("bone"), "bone", "bone"),
        role("tongueSacs", palette(3), "focus", "focus"),
        role("naturalBase", material("baseEarth"), "base", "base")
      ],
      vehicle: [
        role("hullArmor", palette(0), "dominant", "dominant"),
        role("panelsMarkings", palette(1), "secondary", "secondary"),
        role("lensesPlasma", palette(2), "focus", "focus"),
        role("gunmetal", material("iron"), "metal", "metal"),
        role("exhaustDamage", material("blackGrey"), "weathering", "weather"),
        role("battlefieldBase", material("baseEarth"), "base", "base")
      ]
    }
  };

  const SYSTEMS = {
    aos: {
      schemeKeys: ["monochrome", "analogous", "complementary", "split", "triadic", "tetradic", "limitedPalette", "highContrast", "lowContrast", "analogousWide", "zenithal", "accented", "compound", "warmCool", "boxArt", "eavyMetal", "grimdark", "blanchitsu", "comicBook", "military", "paradeReady", "battleReady", "display", "muted", "saturated", "pastel", "neon", "realm"],
      roleProfileKeys: ["balanced", "stormcast", "death", "destruction", "chaos", "wizard", "beast"],
      baseThemeKeys: ["auto", "city", "ruins", "graveyard", "forest", "swamp", "desert", "snow", "volcanic", "arcane", "ghur", "coastal"],
      profileBaseKeys: {
        balanced: ["neutral"],
        stormcast: ["ruins"],
        death: ["graveyard"],
        destruction: ["ghur"],
        chaos: ["volcanic"],
        wizard: ["arcane"],
        beast: ["ghur", "forest"]
      }
    },
    k40: {
      schemeKeys: ["chapter", "monochrome", "analogous", "complementary", "split", "triadic", "tetradic", "limitedPalette", "highContrast", "lowContrast", "zenithal", "accented", "warmCool", "boxArt", "eavyMetal", "grimdark", "blanchitsu", "comicBook", "military", "paradeReady", "battleReady", "display", "muted", "saturated", "pastel", "neon"],
      roleProfileKeys: ["balanced", "spaceMarines", "guard", "chaosMarines", "xenos", "tyranids", "vehicle"],
      baseThemeKeys: ["auto", "urban", "ashWaste", "hive", "jungle", "desert", "snow", "volcanic", "alien", "shipDeck"],
      profileBaseKeys: {
        balanced: ["urban"],
        spaceMarines: ["urban", "ashWaste"],
        guard: ["ashWaste", "hive"],
        chaosMarines: ["volcanic", "ashWaste"],
        xenos: ["alien", "jungle"],
        tyranids: ["alien", "jungle"],
        vehicle: ["urban", "ashWaste"]
      }
    }
  };

  const BASE_CATALOG = {
    city: { hex: "#6C6B65" },
    ruins: { hex: "#777A83" },
    graveyard: { hex: "#3A332D" },
    forest: { hex: "#4F5D3F" },
    swamp: { hex: "#3F4A34" },
    desert: { hex: "#A07845" },
    snow: { hex: "#D8D9D2" },
    volcanic: { hex: "#2E2B28" },
    arcane: { hex: "#4B4658" },
    ghur: { hex: "#80613B" },
    coastal: { hex: "#4E6870" },
    neutral: { hex: "#66513C" },
    darkMud: { hex: "#2D251F" },
    lightAsh: { hex: "#C9C2B2" },
    darkRim: { hex: "#1E1B18" },
    urban: { hex: "#555C63" },
    ashWaste: { hex: "#6D665B" },
    hive: { hex: "#343941" },
    jungle: { hex: "#3E5533" },
    alien: { hex: "#5A416B" },
    shipDeck: { hex: "#40474D" }
  };

  const FACTION_SCHEME_ROLE_KEYS = {
    D: "factionDominant",
    S: "factionSecondary",
    ND: "factionDarkNeutral",
    NL: "factionLightNeutral",
    A1: "factionAccentOne",
    A2: "factionAccentTwo"
  };

  function role(areaKey, colorRef, useKey, tipKey) {
    return { areaKey, colorRef, useKey, tipKey };
  }

  function palette(index) {
    return { type: "palette", index };
  }

  function material(key) {
    return { type: "material", key };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function normHue(value) {
    return ((value % 360) + 360) % 360;
  }

  function hslToRgb(h, s, l) {
    h = normHue(h);
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  function rgbToHex(r, g, b) {
    const part = value => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
    return ("#" + part(r) + part(g) + part(b)).toUpperCase();
  }

  function hslToHex(h, s, l) {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  function hexToRgb(hex) {
    const clean = String(hex).replace("#", "").trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      return null;
    }
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > .5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }
      h *= 60;
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function styleLabelKey(style) {
    if (style <= -65) return "grimdark";
    if (style < -20) return "weathered";
    if (style <= 20) return "balanced";
    if (style < 65) return "clean";
    return "vibrant";
  }

  function styleFactor(style) {
    return clamp(Number(style) || 0, -100, 100) / 100;
  }

  function primaryHex(state) {
    return hslToHex(state.h, state.s, state.l);
  }

  function colorFromHsl(h, s, l, roleKey) {
    const nh = normHue(h);
    const ns = clamp(s, 5, 100);
    const nl = clamp(l, 6, 96);
    return {
      h: nh,
      s: ns,
      l: nl,
      roleKey,
      hex: hslToHex(nh, ns, nl)
    };
  }

  function normalizeFactionSchemes(input) {
    const schemes = Array.isArray(input)
      ? input
      : Array.isArray(input && input.schemes)
        ? input.schemes
        : [];

    return schemes.map((scheme, index) => {
      const roles = Array.isArray(scheme && scheme.roles)
        ? scheme.roles.map(role => {
          const hex = String(role.hex || "").trim().toUpperCase();
          return /^#[0-9A-F]{6}$/.test(hex)
            ? {
              code: String(role.code || ""),
              name: String(role.name || role.code || ""),
              hex
            }
            : null;
        }).filter(Boolean)
        : [];

      if (!scheme || !scheme.system || !scheme.faction || !scheme.subfaction || !roles.length) {
        return null;
      }

      return {
        id: String(scheme.id || `${scheme.system}-${index}`),
        system: String(scheme.system),
        faction: String(scheme.faction),
        subfaction: String(scheme.subfaction),
        schemeName: String(scheme.schemeName || scheme.subfaction),
        roles,
        paintEquivalents: String(scheme.paintEquivalents || ""),
        notes: String(scheme.notes || "")
      };
    }).filter(Boolean);
  }

  function getFactionSchemesForSystem(schemes, systemKey) {
    const normalized = normalizeFactionSchemes(schemes);
    return normalized
      .filter(scheme => scheme.system === systemKey)
      .sort((a, b) => (
        a.faction.localeCompare(b.faction) ||
        a.subfaction.localeCompare(b.subfaction)
      ));
  }

  function buildFactionSchemePalette(scheme) {
    const normalized = normalizeFactionSchemes([scheme])[0];
    if (!normalized) {
      return [];
    }

    return normalized.roles.map(role => {
      const rgb = hexToRgb(role.hex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        roleKey: FACTION_SCHEME_ROLE_KEYS[role.code] || "factionAccentOne",
        roleCode: role.code,
        roleLabel: role.name,
        hex: role.hex
      };
    });
  }

  function applyFinishToColor(h, s, l, index, style) {
    const f = styleFactor(style);
    if (index === 0) {
      return { h, s, l, hex: hslToHex(h, s, l) };
    }

    let ns = s;
    let nl = l;
    if (f < 0) {
      const g = -f;
      ns -= 18 * g;
      nl -= 7 * g;
      if (index >= 2) {
        ns -= 8 * g;
        nl -= 5 * g;
      }
    } else if (f > 0) {
      ns += 14 * f;
      nl += 5 * f;
      if (index >= 2) {
        ns += 8 * f;
        nl += 3 * f;
      }
    }

    ns = clamp(ns, 5, 100);
    nl = clamp(nl, 6, 96);
    return { h, s: ns, l: nl, hex: hslToHex(h, ns, nl) };
  }

  function buildPalette(state, schemeKey) {
    const scheme = SCHEMES[schemeKey] || SCHEMES.complementary;
    return scheme.colors.map((color, index) => {
      if (index === 0) {
        return {
          h: state.h,
          s: state.s,
          l: state.l,
          roleKey: color[3],
          hex: primaryHex(state)
        };
      }

      const h = normHue(state.h + color[0]);
      const baseS = clamp(state.s + color[1], 5, 100);
      const baseL = clamp(state.l + color[2], 8, 96);
      const styled = applyFinishToColor(h, baseS, baseL, index, state.style);
      return {
        h: styled.h,
        s: styled.s,
        l: styled.l,
        roleKey: color[3],
        hex: styled.hex
      };
    });
  }

  function ladderForColor(color, style) {
    const f = styleFactor(style);
    const g = Math.max(0, -f);
    const v = Math.max(0, f);
    const shadeBoost = 8 * g;
    const cleanBoost = 7 * v;
    const satMute = 10 * g;
    const h = color.h;
    const s = color.s;
    const l = color.l;

    return [
      { key: "deepShade", hex: hslToHex(h, clamp(s - 18 - satMute, 5, 100), clamp(l - 30 - shadeBoost, 4, 92)) },
      { key: "shadeWash", hex: hslToHex(h, clamp(s - 10 - satMute * .6, 5, 100), clamp(l - 18 - shadeBoost * .6, 5, 94)) },
      { key: "basecoat", hex: color.hex },
      { key: "layer", hex: hslToHex(h, clamp(s - 4 + 6 * v - 5 * g, 5, 100), clamp(l + 14 + cleanBoost * .5 - 3 * g, 8, 96)) },
      { key: "edgeHighlight", hex: hslToHex(h, clamp(s - 12 + 9 * v - 8 * g, 5, 100), clamp(l + 28 + cleanBoost - 6 * g, 10, 98)) },
      { key: "focusLight", hex: hslToHex(h, clamp(s - 22 + 12 * v - 10 * g, 5, 100), clamp(l + 40 + cleanBoost - 8 * g, 12, 99)) }
    ];
  }

  function isWarmHue(h) {
    h = normHue(h);
    return h <= 75 || h >= 300;
  }

  function contrastBaseKeys(palette, state, systemKey) {
    const primary = palette[0] || { h: state.h, l: state.l };
    const warm = isWarmHue(primary.h);
    const dark = primary.l < 38;
    const bright = primary.l > 62;
    const keys = [];

    if (systemKey === "k40") {
      keys.push(warm ? "urban" : "ashWaste");
    } else {
      keys.push(warm ? "ruins" : "desert");
    }

    if (dark) {
      keys.push("lightAsh");
    } else if (bright) {
      keys.push("darkMud");
    } else {
      keys.push(systemKey === "k40" ? "hive" : "neutral");
    }
    return keys;
  }

  function finishBaseKeys(systemKey, style) {
    if (style < -55) {
      return systemKey === "k40" ? ["darkRim", "ashWaste", "hive"] : ["darkRim", "swamp", "graveyard"];
    }
    if (style > 55) {
      return systemKey === "k40" ? ["urban", "snow", "shipDeck"] : ["ruins", "snow", "city"];
    }
    return [systemKey === "k40" ? "urban" : "neutral"];
  }

  function baseSuggestions(options) {
    const systemKey = SYSTEMS[options.systemKey] ? options.systemKey : "aos";
    const system = SYSTEMS[systemKey];
    const roleProfileKey = options.roleProfileKey || "balanced";
    const baseThemeKey = options.baseThemeKey || "auto";
    const palette = options.palette || [];
    const state = options.state || { h: 220, l: 46, style: 0 };
    const profileKeys = system.profileBaseKeys[roleProfileKey] || system.profileBaseKeys.balanced || [];
    let keys;

    if (baseThemeKey && baseThemeKey !== "auto") {
      keys = [baseThemeKey, ...contrastBaseKeys(palette, state, systemKey), ...profileKeys];
    } else {
      keys = [...contrastBaseKeys(palette, state, systemKey), ...profileKeys, ...finishBaseKeys(systemKey, state.style)];
    }

    const seen = new Set();
    const result = [];
    keys.forEach(key => {
      if (BASE_CATALOG[key] && !seen.has(key)) {
        seen.add(key);
        result.push({ key, hex: BASE_CATALOG[key].hex });
      }
    });

    return result.slice(0, 5);
  }

  function getMaterialFallback(key) {
    return MATERIAL_FALLBACKS[key] || MATERIAL_FALLBACKS.baseEarth;
  }

  function buildHeraldicPalette(state, options) {
    const secondary = state.secondary || { h: 45, s: 16, l: 92 };
    const accentKey = options && options.accentKey ? options.accentKey : "auto";
    const primary = colorFromHsl(state.h, state.s, state.l, "fieldColor");
    const charge = colorFromHsl(secondary.h, secondary.s, secondary.l, "chargeColor");
    const whiteLikeCharge = charge.s <= 24 && charge.l >= 72;
    const chargeShadeHue = whiteLikeCharge ? primary.h : charge.h;
    const accent = heraldicAccent(primary, charge, accentKey);

    return [
      primary,
      charge,
      colorFromHsl(primary.h, primary.s - 12, primary.l - 26, "fieldShadow"),
      colorFromHsl(chargeShadeHue, charge.s + (whiteLikeCharge ? 18 : -8), charge.l - 24, "chargeShade"),
      colorFromHsl(primary.h, primary.s - 8, primary.l + 24, "fieldHighlight"),
      colorFromHsl(charge.h, charge.s - 8, charge.l + 12, "chargeHighlight"),
      accent
    ];
  }

  function heraldicAccent(primary, charge, accentKey) {
    const preset = accentKey === "lens"
      ? lensAccent(primary, charge)
      : HERALDIC_ACCENTS[accentKey] && HERALDIC_ACCENTS[accentKey].hex
      ? HERALDIC_ACCENTS[accentKey]
      : autoHeraldicAccent(primary, charge, accentKey);
    return {
      h: preset.h,
      s: preset.s,
      l: preset.l,
      roleKey: "heraldicAccent",
      hex: preset.hex
    };
  }

  function lensAccent(primary, charge) {
    const base = primary.s >= charge.s ? primary : charge;
    const h = normHue(base.h + 180);
    const s = clamp(Math.max(primary.s, charge.s) + 18, 58, 100);
    const l = clamp(Math.min(Math.max(primary.l, charge.l) + 8, 48), 42, 78);
    return { h, s, l, hex: hslToHex(h, s, l) };
  }

  function autoHeraldicAccent(primary, charge, accentKey) {
    const profile = autoAccentProfile(accentKey);
    const candidates = heraldicAccentCandidates(primary, charge);
    return candidates
      .map(candidate => ({
        ...candidate,
        score: scoreHeraldicAccent(candidate, primary, charge, profile)
      }))
      .sort((a, b) => b.score - a.score)[0];
  }

  function autoAccentProfile(accentKey) {
    const key = accentKey || "auto";
    if (key === "autoMetal") {
      return { preferred: ["gold", "silver"], avoid: ["lens"], metal: 26, focal: 0, trim: 14 };
    }
    if (key === "autoFocal") {
      return { preferred: ["red", "lens", "gold"], avoid: ["black"], metal: 0, focal: 28, trim: 0 };
    }
    if (key === "autoTrim") {
      return { preferred: ["gold", "silver", "black"], avoid: ["lens"], metal: 14, focal: 0, trim: 24 };
    }
    return { preferred: ["gold", "silver", "red", "black", "lens"], avoid: [], metal: 10, focal: 8, trim: 8 };
  }

  function heraldicAccentCandidates(primary, charge) {
    return [
      { key: "gold", ...HERALDIC_ACCENTS.gold },
      { key: "silver", ...HERALDIC_ACCENTS.silver },
      { key: "black", ...HERALDIC_ACCENTS.black },
      { key: "red", ...HERALDIC_ACCENTS.red },
      { key: "lens", ...lensAccent(primary, charge) }
    ];
  }

  function scoreHeraldicAccent(candidate, primary, charge, profile) {
    const contrast = Math.min(valueContrast(candidate, primary), valueContrast(candidate, charge));
    const hueGap = accentHueGap(candidate, primary, charge);
    const duplicatePenalty = colorSimilarityPenalty(candidate, primary) + colorSimilarityPenalty(candidate, charge);
    const lightPenalty = candidate.l > 68 && (primary.l > 70 || charge.l > 70) ? 18 : 0;
    const darkPenalty = candidate.l < 18 && (primary.l < 28 || charge.l < 28) ? 18 : 0;
    const preferred = profile.preferred.includes(candidate.key) ? 16 - profile.preferred.indexOf(candidate.key) * 2 : 0;
    const avoided = profile.avoid.includes(candidate.key) ? 28 : 0;
    const metalBonus = (candidate.key === "gold" || candidate.key === "silver") ? profile.metal : 0;
    const focalBonus = (candidate.key === "red" || candidate.key === "lens") ? profile.focal : 0;
    const trimBonus = (candidate.key === "gold" || candidate.key === "silver" || candidate.key === "black") ? profile.trim : 0;

    return contrast * 1.15 + hueGap * .35 + preferred + metalBonus + focalBonus + trimBonus
      - duplicatePenalty - lightPenalty - darkPenalty - avoided;
  }

  function valueContrast(a, b) {
    return Math.abs(a.l - b.l);
  }

  function hueDistance(a, b) {
    const diff = Math.abs(normHue(a) - normHue(b));
    return Math.min(diff, 360 - diff);
  }

  function accentHueGap(candidate, primary, charge) {
    const chromaticAnchors = [primary, charge].filter(color => color.s > 28 && color.l < 82);
    if (!chromaticAnchors.length) {
      return 90;
    }
    return Math.min(...chromaticAnchors.map(color => hueDistance(candidate.h, color.h)));
  }

  function colorSimilarityPenalty(a, b) {
    const closeHue = hueDistance(a.h, b.h) < 24;
    const closeSat = Math.abs(a.s - b.s) < 18;
    const closeLight = Math.abs(a.l - b.l) < 18;
    return closeHue && closeSat && closeLight ? 34 : 0;
  }

  function getSystem(systemKey) {
    return SYSTEMS[systemKey] || SYSTEMS.aos;
  }

  function getSchemeKeysForSystem(systemKey) {
    return getSystem(systemKey).schemeKeys.slice();
  }

  function getRoleProfileKeys(systemKey) {
    return getSystem(systemKey).roleProfileKeys.slice();
  }

  function getBaseThemeKeys(systemKey) {
    return getSystem(systemKey).baseThemeKeys.slice();
  }

  function getRoleProfile(systemKey, profileKey) {
    const profiles = ROLE_PROFILES[systemKey] || ROLE_PROFILES.aos;
    return profiles[profileKey] || profiles.balanced;
  }

  return {
    SCHEMES,
    HERALDIC_LAYOUTS,
    HERALDIC_RATIOS,
    HERALDIC_ACCENTS,
    SYSTEMS,
    BASE_CATALOG,
    FACTION_SCHEME_ROLE_KEYS,
    MATERIAL_FALLBACKS,
    clamp,
    normHue,
    hslToRgb,
    rgbToHex,
    hslToHex,
    hexToRgb,
    rgbToHsl,
    styleLabelKey,
    styleFactor,
    primaryHex,
    applyFinishToColor,
    normalizeFactionSchemes,
    getFactionSchemesForSystem,
    buildPalette,
    buildFactionSchemePalette,
    buildHeraldicPalette,
    ladderForColor,
    baseSuggestions,
    getMaterialFallback,
    getSchemeKeysForSystem,
    getRoleProfileKeys,
    getBaseThemeKeys,
    getRoleProfile
  };
}));
