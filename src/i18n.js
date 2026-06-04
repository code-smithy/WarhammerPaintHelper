(function (root, factory) {
  const api = factory();
  root.WPH = Object.assign(root.WPH || {}, api);
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const LANGUAGE_KEYS = ["en", "fr", "de", "es"];

  const TRANSLATIONS = {
    en: {
      appTitle: "Warhammer Paint Helper",
      ui: {
        language: "Language",
        system: "Game system",
        eyebrow: "Miniature Palette Tool",
        title: "Warhammer Paint Helper",
        subtitle: "Pick a main color and generate a miniature-ready palette with model roles, base ideas, paint steps, and paint catalogue matches.",
        mainColor: "Main color",
        hexInput: "Enter HEX color directly",
        scheme: "Color scheme",
        rolePlanner: "Role planner",
        baseEnvironment: "Base environment",
        saturation: "Saturation",
        lightness: "Lightness",
        finishStyle: "Finish style",
        grimdark: "Grimdark / weathered",
        clean: "Clean / vibrant",
        copyPalette: "Copy palette",
        copied: "Copied",
        randomColor: "Random color",
        paintingNotes: "Painting notes",
        rolePlannerDescription: "Concrete assignments for surfaces, materials, focus accents, and base details.",
        baseAdviceDescription: "Base concepts with contrast logic, mood, material colors, and a short build recipe.",
        modelRoles: "Model roles",
        modelRolesDescription: "Short overview of the generated main colors.",
        paintLadderDescription: "Practical paint steps for shadows, basecoat, layers, edge highlights, and focus light.",
        citadelMatches: "Paint catalogue matches",
        why: "Why",
        build: "Build",
        debug: "Debug: main color {hex} | first palette card {firstHex} | HSL({h}, {s}%, {l}%) | finish {finish}",
        citadelJsonHint: "Source: data/paint-catalogue.json."
      },
      systems: {
        aos: "Age of Sigmar",
        k40: "Warhammer 40,000"
      },
      systemCopy: {
        aos: {
          rolePlannerTitle: "AoS role planner",
          baseAdviceTitle: "AoS base environment suggestions",
          paintLadderTitle: "AoS Shade / Layer / Highlight",
          finishPrefix: "AoS finish"
        },
        k40: {
          rolePlannerTitle: "40K role planner",
          baseAdviceTitle: "40K battlefield base suggestions",
          paintLadderTitle: "40K Shade / Layer / Highlight",
          finishPrefix: "40K finish"
        }
      },
      finish: {
        grimdark: "Grimdark",
        weathered: "Weathered",
        balanced: "Balanced",
        clean: "Clean",
        vibrant: "Vibrant",
        summary: {
          grimdark: "Desaturates support colors, deepens shadows, and keeps the brightest points small.",
          weathered: "Mutes support colors slightly and favors dirtier shades with restrained highlights.",
          balanced: "Keeps the selected hue exact and leaves derived colors, recipes, and suggestions balanced.",
          clean: "Adds saturation and brighter layers for clean armor, cloth, and heraldry.",
          vibrant: "Pushes support colors and highlights toward high-contrast display readability."
        }
      },
      profiles: {
        aos: {
          balanced: "General Age of Sigmar model",
          stormcast: "Stormcast Eternals",
          death: "Death: Soulblight / Nighthaunt / Ossiarch",
          destruction: "Destruction: Orruks / Ogors / Gloomspite",
          chaos: "Chaos warband or daemon",
          wizard: "Wizard or magic-focus hero",
          beast: "Monster, mount, Seraphon, or beast"
        },
        k40: {
          balanced: "General 40K model",
          spaceMarines: "Space Marines / power armor",
          guard: "Astra Militarum / infantry",
          chaosMarines: "Chaos Space Marines",
          xenos: "Xenos infantry or elite",
          tyranids: "Tyranids / organic swarm",
          vehicle: "Vehicle, walker, or tank"
        }
      },
      baseOptions: {
        auto: "Auto: contrast + faction/profile"
      },
      schemes: {
        complementary: {
          title: "Complementary",
          desc: "Strong contrast: the main color plus its opposite for accents, lenses, runes, plasma, or weapon energy.",
          note: "Use the main color for most visible surfaces. The complementary color works best on focal points such as eyes, weapons, shields, heraldry, or energy effects."
        },
        split: {
          title: "Split-complementary",
          desc: "Contrast-rich, but easier to control than a pure complementary pair.",
          note: "Keep the main color dominant. The two split accents can separate cloth, banners, squad markings, or magical effects."
        },
        triadic: {
          title: "Triadic",
          desc: "Three evenly spaced colors for heroic models, banners, squads, and faction identity.",
          note: "Let one color lead, use the second for larger secondary surfaces, and reserve the third for details."
        },
        tetradic: {
          title: "Tetradic",
          desc: "Four colors in two complementary pairs. Powerful, but it needs clear color hierarchy.",
          note: "Use the extra colors for accents, base details, weapons, shields, banners, or squad markings."
        },
        analogous: {
          title: "Analogous",
          desc: "Neighboring colors for a harmonious, organic, less aggressive scheme.",
          note: "Excellent for monsters, robes, spirits, forest themes, skin, scales, and naturalistic armies."
        },
        analogousWide: {
          title: "Wide analogous",
          desc: "Five related hues for soft transitions, monster skin, cloth layers, and large surfaces.",
          note: "The outer tones work well as glazes, shadows, or subtle edge variation."
        },
        monochrome: {
          title: "Monochromatic",
          desc: "One hue in several values for clean regiments, grimdark armor, or disciplined squads.",
          note: "Use the dark variant as shade, the main color as basecoat, and the lighter variants as layers and edge highlights."
        },
        zenithal: {
          title: "Zenithal / shade / highlight",
          desc: "A practical work palette: main color plus shadow, layer, and edge highlight.",
          note: "Use the cool shadow in recesses, the main color on surfaces, and the edge highlight only on sharp shapes."
        },
        accented: {
          title: "Analogous with accent",
          desc: "A calm base palette with a strong opposite accent for lenses, runes, plasma, or heraldry.",
          note: "The analogous colors carry the body. Keep the opposite accent small and bright."
        },
        compound: {
          title: "Compound / double split",
          desc: "Main color, a neighbor, and two opposing accents. Good for complex heroes.",
          note: "Works on character models with many materials. Keep the main color dominant."
        },
        warmCool: {
          title: "Warm-cool contrast",
          desc: "Warm and cool areas for high readability at tabletop distance.",
          note: "Separate warm and cool zones clearly, for example a warm robe against cold armor."
        },
        grimdark: {
          title: "Muted / grimdark",
          desc: "Desaturated, darker variants with a controlled accent for dirty or realistic models.",
          note: "Washes, sponge chipping, pigments, and selective bright edges will matter more than large saturated areas."
        },
        realm: {
          title: "AoS realm contrast",
          desc: "Main color plus realm glow, supernatural accent, and a grounded shadow.",
          note: "Built for Age of Sigmar armies that need a realm mood without losing the miniature's main read."
        },
        chapter: {
          title: "40K chapter / squad scheme",
          desc: "Armor color, panel shade, company marking, and lens or plasma accent.",
          note: "Designed for 40K armor panels, helmets, shoulder pads, weapon casings, and squad identifiers."
        }
      },
      schemeRoles: {
        primary: "Main color",
        contrast: "Contrast color",
        leftAccent: "Left accent",
        rightAccent: "Right accent",
        secondary: "Secondary color",
        accent: "Accent color",
        shadow: "Shadow color",
        highlight: "Highlight color",
        darkNeighbor: "Dark neighbor",
        lightNeighbor: "Light neighbor",
        layer: "Layer color",
        deepShadow: "Deep shadow",
        edgeHighlight: "Edge highlight",
        basecoat: "Basecoat",
        coolShadow: "Cool shadow",
        warmLayer: "Warm layer",
        strongAccent: "Strong accent",
        neighbor: "Neighbor color",
        secondaryAccent: "Secondary accent",
        coolCounter: "Cool counter-color",
        coolAccent: "Cool accent",
        darkBase: "Dark base tone",
        dustyLayer: "Dusty layer",
        dirtyAccent: "Dirty accent",
        realmGlow: "Realm glow",
        realmAccent: "Realm accent",
        realmShadow: "Realm shadow",
        armor: "Armor color",
        panelShade: "Panel shade",
        companyMarking: "Company marking",
        lensAccent: "Lens accent"
      },
      placements: {
        dominant: "Dominant surface: armor, robe, skin, hull, fatigues, or main cloth.",
        secondary: "Secondary surface: shield, cloak, panel, shoulder pad, cloth, or alternate armor.",
        contrast: "Contrast area: heraldry, gems, weapon glow, runes, lenses, plasma, or champion details.",
        small: "Small accent: trim, squad marks, spell effects, purity seals, or base details."
      },
      roleAreas: {
        dominantSurface: "Armor, skin, robe, or main cloth",
        secondarySurface: "Cloth, shield, panel, or secondary armor",
        focusAccent: "Focus accent",
        leatherStraps: "Leather, straps, and pouches",
        woodWeapons: "Wood, spears, bows, and hafts",
        metalDetails: "Metal details",
        baseDetails: "Base and rim",
        plateArmor: "Plate armor",
        clothAndShield: "Cloth, shield, or heraldry",
        insignia: "Insignia and trim",
        weapon: "Weapon",
        magicEyes: "Magic, eyes, or gems",
        boneGhostRobe: "Bone, ghost skin, or robe",
        tornCloth: "Torn cloth or old armor",
        etherealGlow: "Ethereal glow",
        bonesTrophies: "Bones and trophies",
        agedMetal: "Aged metal",
        leatherScraps: "Leather scraps",
        graveBase: "Grave or cursed base",
        skinScalesArmor: "Skin, scales, or rough armor",
        warPaintCloth: "War paint, cloth, or shield",
        glyphFocus: "Glyph or warpaint focus",
        hidesFurs: "Hides and furs",
        clubsShafts: "Clubs and shafts",
        roughMetal: "Rough metal",
        dustyBase: "Dusty base",
        darkArmorMutation: "Dark armor or mutation",
        cloakShieldFur: "Cloak, shield, fur, or skin",
        daemonicFocus: "Daemonic focus",
        brassTrim: "Brass trim",
        leatherTrophies: "Leather and trophies",
        robeMantle: "Robe or mantle",
        innerRobe: "Inner robe or sash",
        spellEffect: "Spell effect",
        parchmentTrim: "Parchment or pale trim",
        staffWood: "Staff wood",
        jewelry: "Jewelry",
        mysticBase: "Mystic base",
        skinFurScales: "Skin, fur, or scales",
        bellyWingsPlates: "Belly, wing membrane, or plates",
        eyesMouthMagic: "Eyes, mouth, poison, or magic",
        clawsHornsTeeth: "Claws, horns, and teeth",
        saddleStraps: "Saddle and straps",
        chainsArmor: "Chains and armor scraps",
        naturalBase: "Natural base",
        powerArmorFatigues: "Power armor, fatigues, or main suit",
        secondaryPanels: "Secondary panels",
        lensesPlasma: "Lenses, plasma, and sensors",
        weaponCasing: "Weapon casing",
        gunmetal: "Gunmetal",
        pouchesStraps: "Pouches and straps",
        battlefieldBase: "Battlefield base",
        chapterArmor: "Chapter armor",
        pauldronsKnees: "Pauldrons, helmets, and knees",
        companyMarkings: "Company markings",
        aquilaTrim: "Aquila, trim, and honors",
        fatiguesCoat: "Fatigues or greatcoat",
        armorPlates: "Armor plates",
        unitMarkings: "Unit markings",
        traitorArmor: "Traitor armor",
        trimMutations: "Trim or mutations",
        warpGlow: "Warp glow",
        boneTrophies: "Bone trophies",
        carapaceArmor: "Carapace or armor",
        clothPanels: "Cloth panels",
        alienEnergy: "Alien energy",
        boneClaws: "Bone claws",
        smoothMetal: "Smooth metal",
        alienBase: "Alien base",
        fleshSkin: "Flesh or skin",
        bioWeapons: "Bio-weapons",
        tongueSacs: "Tongue or sacs",
        hullArmor: "Hull armor",
        panelsMarkings: "Panels and markings",
        exhaustDamage: "Exhaust damage and soot",
        ashWasteBase: "Ash-waste base"
      },
      roleUses: {
        dominant: "Use for the largest readable area so the scheme has a clear identity.",
        secondary: "Use on medium surfaces to separate forms without stealing the focal point.",
        focus: "Use sparingly near faces, weapons, lenses, gems, magic, or plasma.",
        leather: "Use for practical kit such as belts, holsters, straps, boots, and saddles.",
        wood: "Use for hafts, bows, shields, crates, ruins, and battlefield texture.",
        metal: "Use for blades, trim, chains, weapons, vents, buckles, and mechanical detail.",
        base: "Keep the base supportive so the model remains the loudest object.",
        bone: "Use for teeth, skulls, horns, claws, parchment, and trophies.",
        cloth: "Use on folds, robes, coats, banners, wraps, tabards, and soft equipment.",
        weapon: "Use on bolters, lasguns, casings, grips, cables, and hard housings.",
        weathering: "Use in exhausts, chips, oil marks, heat staining, and dirt buildup.",
        extraPalette: "Use as an extra scheme color for accents, markings, effects, heraldry, or special details."
      },
      roleTips: {
        dominant: "Aim for roughly two thirds of the visible miniature.",
        secondary: "Keep it below the main color in surface area.",
        focus: "Small and bright reads better than everywhere and loud.",
        neutral: "Neutrals help the palette breathe.",
        metal: "Shade it dark, then finish with a tiny bright point.",
        base: "Repeat one model color very subtly on the base if it needs unity.",
        heroic: "Sharp edge highlights make elite armor read from distance.",
        grim: "Lower saturation and stronger shadows sell the mood.",
        organic: "Use softer transitions on skin, fur, scales, and membranes.",
        weather: "Add scratches, grime, pigments, or stains after the base colors.",
        bone: "Start warmer at the root and highlight toward the tip.",
        cloth: "Highlight folds wider than hard armor edges.",
        extraPalette: "Keep it intentional and smaller than the assigned main and secondary areas."
      },
      ladder: {
        steps: {
          deepShade: "Deep shade",
          shadeWash: "Shade / wash",
          basecoat: "Basecoat",
          layer: "Layer",
          edgeHighlight: "Edge highlight",
          focusLight: "Focus light"
        },
        hints: {
          deepShade: "Deep recesses and undersides",
          shadeWash: "Controlled wash, not a flood",
          basecoat: "Opaque main layer",
          layer: "Raised volumes and broad light",
          edgeHighlight: "Edges, corners, and hard contours",
          focusLight: "Only face, lenses, runes, gems, plasma, or key weapons"
        },
        note: "{system} use: armor, cloth, skin, scales, vehicles, cloaks, or energy effects. {finish} finish: keep focus light selective."
      },
      materials: {
        items: {
          darkWood: { name: "Dark wood", use: "Hafts, bows, crates, shield backs, and base rims" },
          warmWood: { name: "Warm wood", use: "Wood grain, shields, boxes, and terrain bits" },
          darkLeather: { name: "Dark leather", use: "Belts, holsters, boots, bags, and straps" },
          redLeather: { name: "Reddish leather", use: "Leather armor, grips, saddles, and pouches" },
          offWhite: { name: "Off-white", use: "Cloth, robes, parchment, ropes, and heraldry" },
          bone: { name: "Bone", use: "Skulls, teeth, horns, claws, parchment, and trophies" },
          coldWhite: { name: "Cold white", use: "Light points, gems, snow, and glow highlights" },
          blackGrey: { name: "Black grey", use: "Undersuits, weapon casings, shadows, and vents" },
          iron: { name: "Iron", use: "Blades, chains, bolts, gunmetal, and hard fittings" },
          silver: { name: "Silver", use: "Bright metal edges, jewelry, and clean machinery" },
          bronze: { name: "Bronze", use: "Old armor, trim, idols, machinery, and fittings" },
          gold: { name: "Gold", use: "Insignia, honors, jewelry, trim, and hero details" },
          baseEarth: { name: "Earth / rubble", use: "Base ground, dust, ruins, and battlefield texture" }
        }
      },
      bases: {
        city: base("Free City cobbles", "Paved streets, frontier roads, flagstones, timber debris, and powder-stained masonry.", "Best for disciplined infantry, artillery, cavalry, and urban campaigns.", ["Base: dark grey-brown", "Texture: stones, sand, broken timber", "Drybrush: pale grey", "Accent: dust, posters, grass tufts"]),
        ruins: base("Realmgate temple ruins", "Ancient steps, broken statues, temple slabs, marble chips, and cracked realmstone.", "Works for heroes, elite units, and models that need a clean heroic plinth.", ["Base: cool grey stone", "Texture: slate, cork, cracked slabs", "Drybrush: light grey", "Accent: tiny moss or glowing cracks"]),
        graveyard: base("Graveyard / cursed soil", "Cold earth, tombstones, dead grass, bones, mist, and dark ruined masonry.", "Strong fit for undead, cursed armies, and cold grim palettes.", ["Base: dark soil", "Texture: grit, skulls, broken stone", "Drybrush: cold grey-brown", "Accent: dead grass or bone"]),
        forest: base("Forest floor, roots, and moss", "Roots, moss, leaves, damp earth, fallen branches, and living-realm vegetation.", "Good for beasts, hunters, Sylvaneth, and naturalistic schemes.", ["Base: dark earth", "Texture: roots, bark, leaves", "Drybrush: tan or moss green", "Accent: grass tufts"]),
        swamp: base("Swamp / marsh", "Wet mud, reeds, stagnant water, algae, bones, and half-sunken stones.", "Useful for filthy, undead, monster, or Nurgle-adjacent moods.", ["Base: dark olive-brown", "Texture: mud, reeds, stones", "Gloss: water pools", "Accent: sickly grass"]),
        desert: base("Desert, steppe, or ochre dust", "Dry sand, cracked earth, warm dust, sun-bleached rocks, and sparse scrub.", "Excellent for blue, green, purple, or cold schemes.", ["Base: ochre brown", "Texture: sand and rocks", "Drybrush: bone or pale sand", "Accent: dry grass"]),
        snow: base("Snow, frost, and pale stone", "Snow patches, icy stones, frost grass, pale ash, and cold marble fragments.", "Use with dark models for silhouette contrast.", ["Base: dark rock", "Drybrush: pale grey", "Snow: add in patches", "Accent: ice crystals"]),
        volcanic: base("Ash, lava, and burned ground", "Black ash, cracked lava, charred earth, soot, skulls, and scorched stone.", "Good for Chaos, fire moods, monsters, and bright warm accents.", ["Base: black-brown ash", "Texture: cracked paste", "Drybrush: grey ash", "Accent: lava cracks"]),
        arcane: base("Arcane runes / crystals", "Runed stone, spell circles, crystals, books, smoke, and magical terrain fragments.", "Best for wizards, champions, and strong magical accent colors.", ["Base: neutral stone", "Texture: carved lines", "Glow: repeat focus accent", "Accent: crystals"]),
        ghur: base("Ghurish badlands", "Dust, dry earth, rocks, cracked mud, bones, trophy debris, and hunting ground.", "Strong fit for Destruction, monsters, and beasts.", ["Base: reddish earth", "Texture: rocks and bones", "Drybrush: tan dust", "Accent: dry tufts"]),
        coastal: base("Coastal, reef, or wet stone", "Wet rocks, tide pools, shells, broken docks, coral fragments, and sea-slick ruins.", "Use for sea-themed forces, wet ruins, and aquatic monsters.", ["Base: blue-grey rock", "Texture: sand, shells, slate", "Gloss: tide pools", "Accent: coral"]),
        neutral: base("Neutral rubble", "Brown-grey rubble, broken masonry, dirt, roots, and small stones.", "Safe default because it supports warm and cool palettes.", ["Base: brown-grey earth", "Texture: grit and stone", "Drybrush: tan-grey", "Accent: muted tufts"]),
        darkMud: base("Dark mud / blackened earth", "Wet soil, burned ground, grave dirt, swamp muck, or churned battlefield.", "Keeps bright models grounded.", ["Base: dark umber", "Texture: mud and grit", "Gloss: wet patches", "Accent: dead grass"]),
        lightAsh: base("Light ash, snow, or pale stone", "Ash waste, snow patches, marble chips, bleached stone, or dry sand.", "Raises silhouette contrast for dark models.", ["Base: pale grey-beige", "Texture: fine grit", "Drybrush: off-white", "Accent: dark stones"]),
        darkRim: base("Dark rim and controlled edge", "Black-brown rim, quiet texture, and restrained weathering around the model.", "Keeps the base visually contained.", ["Rim: black-brown", "Keep texture inside", "Avoid bright rim colors", "Dust lower legs"]),
        urban: base("Urban rubble", "Concrete, rebar, dust, broken road, metal scraps, and shell damage.", "Classic 40K battlefield framing for infantry and armor.", ["Base: dark concrete", "Texture: rubble and grit", "Drybrush: cold grey", "Accent: hazard stripe or dust"]),
        ashWaste: base("Ash waste", "Grey dust, pale dirt, shell craters, rusted debris, and burned ground.", "Works with most 40K armies and supports bright armor.", ["Base: grey-brown ash", "Texture: fine grit", "Drybrush: pale dust", "Accent: rust or spent casings"]),
        hive: base("Hive deck / undercity", "Dark metal floor, grime, cables, vents, hazard markings, and oil stains.", "Great for industrial 40K, Necromunda moods, and vehicle bases.", ["Base: dark metal", "Texture: mesh or plates", "Weather: oil and rust", "Accent: hazard color"]),
        jungle: base("Death world jungle", "Dense mud, vines, roots, wet leaves, alien plants, and broken stone.", "Good for xenos, Tyranids, scouts, and overgrown battlefields.", ["Base: dark mud", "Texture: roots and leaves", "Gloss: wet areas", "Accent: bright plant"]),
        alien: base("Alien world growth", "Purple soil, strange crystals, spores, chitin, and unnatural vegetation.", "Supports xenos and bio-organic palettes.", ["Base: muted alien soil", "Texture: crystals or spores", "Drybrush: pale violet", "Accent: toxic glow"]),
        shipDeck: base("Ship deck", "Cold metal plating, rivets, cables, hazard lines, and machine grime.", "Useful for boarding actions, vehicles, and naval 40K scenes.", ["Base: dark steel", "Texture: plates and rivets", "Weather: grime", "Accent: warning stripe"])
      },
      citadel: {
        loaded: "Loaded {count} catalogue paints from JSON.",
        sample: "Using {count} sample catalogue paints until the JSON loads.",
        missing: "No catalogue paint data available yet.",
        closest: "Closest matches",
        distance: "distance {distance}"
      },
      copy: {
        palette: "Palette",
        roles: "Role planner",
        bases: "Base environment suggestions",
        ladder: "Shade / Layer / Highlight",
        citadel: "Paint catalogue matches"
      }
    },
    de: {
      appTitle: "Warhammer Paint Helper",
      ui: {
        language: "Sprache",
        system: "Spielsystem",
        eyebrow: "Miniaturen-Paletten-Tool",
        title: "Warhammer Paint Helper",
        subtitle: "Wähle eine Hauptfarbe und erzeuge eine miniaturentaugliche Palette mit Modellrollen, Base-Ideen, Malstufen und Farbkatalog-Treffern.",
        mainColor: "Hauptfarbe",
        hexInput: "HEX-Farbe direkt eingeben",
        scheme: "Farbschema",
        rolePlanner: "Rollenplaner",
        baseEnvironment: "Base-Umgebung",
        saturation: "Sättigung",
        lightness: "Helligkeit",
        finishStyle: "Finish-Stil",
        grimdark: "Grimdark / verwittert",
        clean: "Sauber / leuchtend",
        copyPalette: "Palette kopieren",
        copied: "Kopiert",
        randomColor: "Zufallsfarbe",
        paintingNotes: "Bemalhinweise",
        rolePlannerDescription: "Konkrete Zuordnung für Flächen, Materialien, Fokusakzente und Base-Details.",
        baseAdviceDescription: "Base-Konzepte mit Kontrastlogik, Stimmung, Materialfarben und kurzem Bau-Rezept.",
        modelRoles: "Rollen am Modell",
        modelRolesDescription: "Kurzüberblick der generierten Hauptfarben.",
        paintLadderDescription: "Praktische Malstufen für Schatten, Basecoat, Layer, Kantenhighlights und Fokuslicht.",
        citadelMatches: "Farbkatalog-Treffer",
        why: "Warum",
        build: "Bau",
        debug: "Debug: Hauptfarbe {hex} | erste Palettenkarte {firstHex} | HSL({h}, {s}%, {l}%) | Finish {finish}",
        citadelJsonHint: "Quelle: data/paint-catalogue.json."
      },
      systems: {
        aos: "Age of Sigmar",
        k40: "Warhammer 40.000"
      },
      systemCopy: {
        aos: { rolePlannerTitle: "AoS-Rollenplaner", baseAdviceTitle: "AoS-Base-Vorschläge", paintLadderTitle: "AoS Shade / Layer / Highlight", finishPrefix: "AoS-Finish" },
        k40: { rolePlannerTitle: "40K-Rollenplaner", baseAdviceTitle: "40K-Schlachtfeld-Base-Vorschläge", paintLadderTitle: "40K Shade / Layer / Highlight", finishPrefix: "40K-Finish" }
      },
      finish: {
        grimdark: "Grimdark",
        weathered: "Verwittert",
        balanced: "Ausgewogen",
        clean: "Sauber",
        vibrant: "Leuchtend",
        summary: {
          grimdark: "Entsättigt Nebenfarben, vertieft Schatten und hält die hellsten Punkte klein.",
          weathered: "Dämpft Nebenfarben leicht und bevorzugt schmutzigere Schatten mit kontrollierten Highlights.",
          balanced: "Hält die gewählte Farbe exakt und lässt abgeleitete Farben, Rezepte und Vorschläge ausgewogen.",
          clean: "Erhöht Sättigung und hellere Layer für saubere Rüstung, Stoffe und Heraldik.",
          vibrant: "Schiebt Nebenfarben und Highlights in Richtung hoher Display-Lesbarkeit."
        }
      },
      profiles: {
        aos: {
          balanced: "Allgemeines Age-of-Sigmar-Modell",
          stormcast: "Stormcast Eternals",
          death: "Death: Soulblight / Nighthaunt / Ossiarch",
          destruction: "Destruction: Orruks / Ogors / Gloomspite",
          chaos: "Chaos-Kriegerschar oder Dämon",
          wizard: "Zauberer oder magischer Held",
          beast: "Monster, Reittier, Seraphon oder Bestie"
        },
        k40: {
          balanced: "Allgemeines 40K-Modell",
          spaceMarines: "Space Marines / Servorüstung",
          guard: "Astra Militarum / Infanterie",
          chaosMarines: "Chaos Space Marines",
          xenos: "Xenos-Infanterie oder Elite",
          tyranids: "Tyraniden / organischer Schwarm",
          vehicle: "Fahrzeug, Walker oder Panzer"
        }
      },
      baseOptions: { auto: "Auto: Kontrast + Fraktion/Profil" },
      schemes: {
        complementary: { title: "Komplementär", desc: "Starker Kontrast: Hauptfarbe plus Gegenfarbe für Akzente, Linsen, Runen, Plasma oder Waffenenergie.", note: "Nutze die Hauptfarbe für den Großteil der sichtbaren Flächen. Die Komplementärfarbe funktioniert am besten auf Fokuspunkten." },
        split: { title: "Split-Komplementär", desc: "Kontrastreich, aber leichter kontrollierbar als ein reines Komplementärpaar.", note: "Halte die Hauptfarbe dominant. Die Split-Akzente trennen Stoff, Banner, Markierungen oder Magieeffekte." },
        triadic: { title: "Triadisch", desc: "Drei gleichmäßig verteilte Farben für Helden, Banner, Trupps und Fraktionsidentität.", note: "Eine Farbe führt, die zweite trägt Nebenflächen, die dritte bleibt Detail." },
        tetradic: { title: "Tetradisch", desc: "Vier Farben in zwei Komplementärpaaren. Stark, aber es braucht klare Hierarchie.", note: "Nutze zusätzliche Farben für Akzente, Bases, Waffen, Schilde, Banner oder Truppmarkierungen." },
        analogous: { title: "Analog", desc: "Benachbarte Farben für ein harmonisches, organisches und weniger aggressives Schema.", note: "Sehr gut für Monster, Roben, Geister, Waldthemen, Haut, Schuppen und natürliche Armeen." },
        analogousWide: { title: "Breit analog", desc: "Fünf verwandte Farbtöne für weiche Übergänge, Monsterhaut, Stofflagen und große Flächen.", note: "Die äußeren Töne funktionieren gut als Lasur, Schatten oder leichte Kantenvariation." },
        monochrome: { title: "Monochromatisch", desc: "Eine Farbe in mehreren Helligkeiten für saubere Regimenter, Grimdark-Rüstung oder disziplinierte Trupps.", note: "Dunkel als Shade, Hauptfarbe als Basecoat, helle Varianten als Layer und Kantenhighlight." },
        zenithal: { title: "Zenithal / Shade / Highlight", desc: "Eine praktische Arbeitspalette: Hauptfarbe plus Schatten, Layer und Kantenhighlight.", note: "Kalter Schatten in Vertiefungen, Hauptfarbe auf Flächen, Kantenhighlight nur auf scharfen Formen." },
        accented: { title: "Analog mit Akzent", desc: "Ruhige Grundpalette mit starkem Gegenakzent für Linsen, Runen, Plasma oder Heraldik.", note: "Analoge Farben tragen den Körper. Der Gegenakzent bleibt klein und hell." },
        compound: { title: "Compound / Double Split", desc: "Hauptfarbe, Nachbarfarbe und zwei Gegenakzente. Gut für komplexe Helden.", note: "Funktioniert bei Charaktermodellen mit vielen Materialien. Hauptfarbe dominant halten." },
        warmCool: { title: "Warm-Kalt-Kontrast", desc: "Warme und kalte Bereiche für hohe Lesbarkeit auf Spieltischdistanz.", note: "Trenne warme und kalte Zonen klar, etwa warme Robe gegen kalte Rüstung." },
        grimdark: { title: "Gedämpft / Grimdark", desc: "Entsättigte, dunklere Varianten mit kontrolliertem Akzent für schmutzige oder realistischere Modelle.", note: "Washes, Schwamm-Chipping, Pigmente und selektive helle Kanten zählen mehr als große gesättigte Flächen." },
        realm: { title: "AoS-Realm-Kontrast", desc: "Hauptfarbe plus Realm-Glow, übernatürlicher Akzent und geerdeter Schatten.", note: "Für Age-of-Sigmar-Armeen, die Realm-Stimmung brauchen, ohne die Hauptlesbarkeit zu verlieren." },
        chapter: { title: "40K-Chapter / Truppschema", desc: "Rüstungsfarbe, Panel-Schatten, Kompaniemarkierung und Linsen- oder Plasmaakzent.", note: "Für 40K-Rüstungspanel, Helme, Schulterpanzer, Waffen und Truppkennzeichen." }
      },
      schemeRoles: {
        primary: "Hauptfarbe", contrast: "Kontrastfarbe", leftAccent: "Akzent links", rightAccent: "Akzent rechts", secondary: "Sekundärfarbe", accent: "Akzentfarbe", shadow: "Schattenfarbe", highlight: "Highlightfarbe", darkNeighbor: "Dunkler Nebenton", lightNeighbor: "Heller Nebenton", layer: "Layerfarbe", deepShadow: "Tiefer Schatten", edgeHighlight: "Kantenhighlight", basecoat: "Basecoat", coolShadow: "Kalter Schatten", warmLayer: "Warmer Layer", strongAccent: "Starker Akzent", neighbor: "Nebenton", secondaryAccent: "Sekundärakzent", coolCounter: "Kalte Gegenfarbe", coolAccent: "Kalter Akzent", darkBase: "Dunkler Grundton", dustyLayer: "Staubiger Layer", dirtyAccent: "Schmutziger Akzent", realmGlow: "Realm-Glow", realmAccent: "Realm-Akzent", realmShadow: "Realm-Schatten", armor: "Rüstungsfarbe", panelShade: "Panel-Schatten", companyMarking: "Kompaniemarkierung", lensAccent: "Linsenakzent"
      }
    },
    fr: {
      appTitle: "Warhammer Paint Helper",
      ui: {
        language: "Langue",
        system: "Système de jeu",
        eyebrow: "Outil de palette miniature",
        title: "Warhammer Paint Helper",
        subtitle: "Choisis une couleur principale et génère une palette pour figurines avec rôles, idées de socle, étapes de peinture et correspondances du catalogue.",
        mainColor: "Couleur principale",
        hexInput: "Entrer une couleur HEX",
        scheme: "Schéma de couleurs",
        rolePlanner: "Planificateur de rôles",
        baseEnvironment: "Environnement de socle",
        saturation: "Saturation",
        lightness: "Luminosité",
        finishStyle: "Style de finition",
        grimdark: "Grimdark / usé",
        clean: "Propre / vibrant",
        copyPalette: "Copier la palette",
        copied: "Copié",
        randomColor: "Couleur aléatoire",
        paintingNotes: "Notes de peinture",
        rolePlannerDescription: "Assignations concrètes pour surfaces, matériaux, accents et détails de socle.",
        baseAdviceDescription: "Concepts de socle avec logique de contraste, ambiance, couleurs de matériaux et recette courte.",
        modelRoles: "Rôles sur le modèle",
        modelRolesDescription: "Aperçu court des couleurs principales générées.",
        paintLadderDescription: "Étapes pratiques pour ombres, basecoat, layers, edge highlights et lumière focale.",
        citadelMatches: "Catalogue de peintures",
        why: "Pourquoi",
        build: "Construction",
        debug: "Debug : couleur principale {hex} | première carte {firstHex} | HSL({h}, {s}%, {l}%) | finition {finish}",
        citadelJsonHint: "Source : data/paint-catalogue.json."
      },
      systems: {
        aos: "Age of Sigmar",
        k40: "Warhammer 40,000"
      },
      systemCopy: {
        aos: { rolePlannerTitle: "Planificateur de rôles AoS", baseAdviceTitle: "Suggestions de socles AoS", paintLadderTitle: "AoS Shade / Layer / Highlight", finishPrefix: "Finition AoS" },
        k40: { rolePlannerTitle: "Planificateur de rôles 40K", baseAdviceTitle: "Suggestions de socles 40K", paintLadderTitle: "40K Shade / Layer / Highlight", finishPrefix: "Finition 40K" }
      },
      finish: {
        grimdark: "Grimdark",
        weathered: "Usé",
        balanced: "Équilibré",
        clean: "Propre",
        vibrant: "Vibrant",
        summary: {
          grimdark: "Désature les couleurs secondaires, renforce les ombres et garde les points lumineux petits.",
          weathered: "Atténue légèrement les couleurs secondaires et favorise des ombres plus sales.",
          balanced: "Garde la couleur choisie exacte et conserve des suggestions équilibrées.",
          clean: "Ajoute saturation et layers plus clairs pour armures, tissus et héraldique propres.",
          vibrant: "Pousse les couleurs et highlights vers une forte lisibilité de vitrine."
        }
      },
      profiles: {
        aos: {
          balanced: "Modèle Age of Sigmar général",
          stormcast: "Stormcast Eternals",
          death: "Death : Soulblight / Nighthaunt / Ossiarch",
          destruction: "Destruction : Orruks / Ogors / Gloomspite",
          chaos: "Bande du Chaos ou démon",
          wizard: "Sorcier ou héros magique",
          beast: "Monstre, monture, Seraphon ou bête"
        },
        k40: {
          balanced: "Modèle 40K général",
          spaceMarines: "Space Marines / armure énergétique",
          guard: "Astra Militarum / infanterie",
          chaosMarines: "Chaos Space Marines",
          xenos: "Infanterie ou élite xenos",
          tyranids: "Tyranides / essaim organique",
          vehicle: "Véhicule, marcheur ou char"
        }
      },
      baseOptions: { auto: "Auto : contraste + faction/profil" },
      schemes: {
        complementary: { title: "Complémentaire", desc: "Contraste fort : couleur principale plus opposée pour accents, lentilles, runes, plasma ou énergie.", note: "Utilise la couleur principale sur la majorité des surfaces. La complémentaire fonctionne mieux sur les points focaux." },
        split: { title: "Complémentaire divisée", desc: "Riche en contraste, mais plus facile à contrôler qu'un couple complémentaire pur.", note: "Garde la couleur principale dominante. Les deux accents séparent tissus, bannières, marquages ou magie." },
        triadic: { title: "Triadique", desc: "Trois couleurs espacées pour héros, bannières, escouades et identité de faction.", note: "Une couleur dirige, la deuxième sert les surfaces secondaires, la troisième reste en détail." },
        tetradic: { title: "Tétradique", desc: "Quatre couleurs en deux paires complémentaires. Puissant, mais demande une hiérarchie claire.", note: "Utilise les couleurs en plus pour accents, socles, armes, boucliers, bannières ou marquages." },
        analogous: { title: "Analogue", desc: "Couleurs voisines pour un schéma harmonieux, organique et moins agressif.", note: "Excellent pour monstres, robes, esprits, thèmes forestiers, peau, écailles et armées naturelles." },
        analogousWide: { title: "Analogue large", desc: "Cinq teintes liées pour transitions douces, peau de monstre, tissus et grandes surfaces.", note: "Les teintes extérieures fonctionnent comme glacis, ombres ou variations de bord." },
        monochrome: { title: "Monochrome", desc: "Une teinte en plusieurs valeurs pour régiments propres, armures grimdark ou escouades disciplinées.", note: "Foncé comme shade, couleur principale comme basecoat, variantes claires comme layers et edge highlights." },
        zenithal: { title: "Zénithal / shade / highlight", desc: "Palette de travail : couleur principale plus ombre, layer et edge highlight.", note: "Ombre froide dans les creux, couleur principale sur les surfaces, highlight seulement sur les formes nettes." },
        accented: { title: "Analogue avec accent", desc: "Palette calme avec accent opposé fort pour lentilles, runes, plasma ou héraldique.", note: "Les couleurs analogues portent le corps. L'accent opposé reste petit et lumineux." },
        compound: { title: "Compound / double split", desc: "Couleur principale, voisine et deux accents opposés. Bon pour héros complexes.", note: "Fonctionne sur les personnages avec beaucoup de matériaux. Garde la principale dominante." },
        warmCool: { title: "Contraste chaud-froid", desc: "Zones chaudes et froides pour une bonne lisibilité à distance de jeu.", note: "Sépare clairement les zones, par exemple robe chaude contre armure froide." },
        grimdark: { title: "Atténué / grimdark", desc: "Variantes plus sombres et désaturées avec accent contrôlé pour modèles sales ou réalistes.", note: "Washes, chipping à l'éponge, pigments et bords clairs sélectifs comptent plus que de grandes zones saturées." },
        realm: { title: "Contraste de royaume AoS", desc: "Couleur principale plus lueur de royaume, accent surnaturel et ombre ancrée.", note: "Pour armées AoS qui veulent une ambiance de royaume sans perdre la lecture principale." },
        chapter: { title: "Chapitre / escouade 40K", desc: "Couleur d'armure, ombre de panneau, marquage de compagnie et accent lentille ou plasma.", note: "Pour panneaux d'armure 40K, casques, épaulières, armes et identifiants d'escouade." }
      },
      schemeRoles: {
        primary: "Couleur principale", contrast: "Couleur de contraste", leftAccent: "Accent gauche", rightAccent: "Accent droit", secondary: "Couleur secondaire", accent: "Couleur d'accent", shadow: "Couleur d'ombre", highlight: "Couleur de highlight", darkNeighbor: "Voisine sombre", lightNeighbor: "Voisine claire", layer: "Couleur de layer", deepShadow: "Ombre profonde", edgeHighlight: "Edge highlight", basecoat: "Basecoat", coolShadow: "Ombre froide", warmLayer: "Layer chaud", strongAccent: "Accent fort", neighbor: "Couleur voisine", secondaryAccent: "Accent secondaire", coolCounter: "Contre-couleur froide", coolAccent: "Accent froid", darkBase: "Base sombre", dustyLayer: "Layer poussiéreux", dirtyAccent: "Accent sale", realmGlow: "Lueur de royaume", realmAccent: "Accent de royaume", realmShadow: "Ombre de royaume", armor: "Couleur d'armure", panelShade: "Ombre de panneau", companyMarking: "Marquage de compagnie", lensAccent: "Accent de lentille"
      }
    },
    es: {
      appTitle: "Warhammer Paint Helper",
      ui: {
        language: "Idioma",
        system: "Sistema de juego",
        eyebrow: "Herramienta de paletas para miniaturas",
        title: "Warhammer Paint Helper",
        subtitle: "Elige un color principal y genera una paleta lista para miniaturas con roles del modelo, ideas de peana, pasos de pintura y equivalencias del catálogo.",
        mainColor: "Color principal",
        hexInput: "Introducir color HEX directamente",
        scheme: "Esquema de color",
        rolePlanner: "Planificador de roles",
        baseEnvironment: "Entorno de peana",
        saturation: "Saturación",
        lightness: "Luminosidad",
        finishStyle: "Estilo de acabado",
        grimdark: "Grimdark / envejecido",
        clean: "Limpio / vibrante",
        copyPalette: "Copiar paleta",
        copied: "Copiado",
        randomColor: "Color aleatorio",
        paintingNotes: "Notas de pintura",
        rolePlannerDescription: "Asignaciones concretas para superficies, materiales, acentos focales y detalles de peana.",
        baseAdviceDescription: "Conceptos de peana con lógica de contraste, ambiente, colores de materiales y una receta breve.",
        modelRoles: "Roles del modelo",
        modelRolesDescription: "Resumen breve de los colores principales generados.",
        paintLadderDescription: "Pasos prácticos para sombras, capa base, capas, luces de borde y luz focal.",
        citadelMatches: "Catálogo de pinturas",
        why: "Por qué",
        build: "Construcción",
        debug: "Depuración: color principal {hex} | primera tarjeta de paleta {firstHex} | HSL({h}, {s}%, {l}%) | acabado {finish}",
        citadelJsonHint: "Fuente: data/paint-catalogue.json."
      },
      systems: {
        aos: "Age of Sigmar",
        k40: "Warhammer 40,000"
      },
      systemCopy: {
        aos: { rolePlannerTitle: "Planificador de roles AoS", baseAdviceTitle: "Sugerencias de peanas AoS", paintLadderTitle: "AoS Sombra / Capa / Luz", finishPrefix: "Acabado AoS" },
        k40: { rolePlannerTitle: "Planificador de roles 40K", baseAdviceTitle: "Sugerencias de peanas de batalla 40K", paintLadderTitle: "40K Sombra / Capa / Luz", finishPrefix: "Acabado 40K" }
      },
      finish: {
        grimdark: "Grimdark",
        weathered: "Envejecido",
        balanced: "Equilibrado",
        clean: "Limpio",
        vibrant: "Vibrante",
        summary: {
          grimdark: "Desatura los colores de apoyo, profundiza las sombras y mantiene pequeños los puntos más brillantes.",
          weathered: "Apaga ligeramente los colores de apoyo y favorece sombras más sucias con luces contenidas.",
          balanced: "Mantiene exacto el tono elegido y deja equilibrados los colores derivados, recetas y sugerencias.",
          clean: "Añade saturación y capas más claras para armaduras, telas y heráldica limpias.",
          vibrant: "Empuja colores de apoyo y luces hacia una lectura de alto contraste en vitrina."
        }
      },
      profiles: {
        aos: {
          balanced: "Modelo general de Age of Sigmar",
          stormcast: "Stormcast Eternals",
          death: "Muerte: Soulblight / Nighthaunt / Ossiarch",
          destruction: "Destrucción: Orruks / Ogors / Gloomspite",
          chaos: "Banda del Caos o demonio",
          wizard: "Mago o héroe centrado en magia",
          beast: "Monstruo, montura, Seraphon o bestia"
        },
        k40: {
          balanced: "Modelo general de 40K",
          spaceMarines: "Space Marines / servoarmadura",
          guard: "Astra Militarum / infantería",
          chaosMarines: "Chaos Space Marines",
          xenos: "Infantería xenos o élite",
          tyranids: "Tiránidos / enjambre orgánico",
          vehicle: "Vehículo, andador o tanque"
        }
      },
      baseOptions: { auto: "Auto: contraste + facción/perfil" },
      schemes: {
        complementary: { title: "Complementario", desc: "Contraste fuerte: el color principal más su opuesto para acentos, lentes, runas, plasma o energía de armas.", note: "Usa el color principal en la mayoría de superficies visibles. El complementario funciona mejor en puntos focales como ojos, armas, escudos, heráldica o efectos de energía." },
        split: { title: "Complementario dividido", desc: "Rico en contraste, pero más fácil de controlar que una pareja complementaria pura.", note: "Mantén dominante el color principal. Los dos acentos divididos pueden separar telas, estandartes, marcas de escuadra o efectos mágicos." },
        triadic: { title: "Triádico", desc: "Tres colores espaciados uniformemente para héroes, estandartes, escuadras e identidad de facción.", note: "Deja que un color lidere, usa el segundo para superficies secundarias más grandes y reserva el tercero para detalles." },
        tetradic: { title: "Tetrádico", desc: "Cuatro colores en dos parejas complementarias. Potente, pero necesita una jerarquía clara.", note: "Usa los colores extra para acentos, detalles de peana, armas, escudos, estandartes o marcas de escuadra." },
        analogous: { title: "Análogo", desc: "Colores vecinos para un esquema armonioso, orgánico y menos agresivo.", note: "Excelente para monstruos, túnicas, espíritus, temas forestales, piel, escamas y ejércitos naturalistas." },
        analogousWide: { title: "Análogo amplio", desc: "Cinco tonos relacionados para transiciones suaves, piel de monstruo, capas de tela y superficies grandes.", note: "Los tonos exteriores funcionan bien como veladuras, sombras o variación sutil de bordes." },
        monochrome: { title: "Monocromático", desc: "Un tono en varios valores para regimientos limpios, armaduras grimdark o escuadras disciplinadas.", note: "Usa la variante oscura como sombra, el color principal como capa base y las variantes claras como capas y luces de borde." },
        zenithal: { title: "Cenital / sombra / luz", desc: "Una paleta práctica de trabajo: color principal más sombra, capa y luz de borde.", note: "Usa la sombra fría en recovecos, el color principal en superficies y la luz de borde solo en formas afiladas." },
        accented: { title: "Análogo con acento", desc: "Una paleta base tranquila con un acento opuesto fuerte para lentes, runas, plasma o heráldica.", note: "Los colores análogos llevan el cuerpo. Mantén el acento opuesto pequeño y brillante." },
        compound: { title: "Compuesto / doble dividido", desc: "Color principal, un vecino y dos acentos opuestos. Bueno para héroes complejos.", note: "Funciona en personajes con muchos materiales. Mantén dominante el color principal." },
        warmCool: { title: "Contraste cálido-frío", desc: "Zonas cálidas y frías para alta legibilidad a distancia de mesa.", note: "Separa claramente las zonas cálidas y frías, por ejemplo una túnica cálida contra una armadura fría." },
        grimdark: { title: "Apagado / grimdark", desc: "Variantes más oscuras y desaturadas con un acento controlado para modelos sucios o realistas.", note: "Los lavados, desconchones con esponja, pigmentos y bordes brillantes selectivos importan más que grandes áreas saturadas." },
        realm: { title: "Contraste de reino AoS", desc: "Color principal más brillo de reino, acento sobrenatural y una sombra asentada.", note: "Creado para ejércitos de Age of Sigmar que necesitan ambiente de reino sin perder la lectura principal de la miniatura." },
        chapter: { title: "Capítulo 40K / esquema de escuadra", desc: "Color de armadura, sombra de panel, marca de compañía y acento de lentes o plasma.", note: "Diseñado para paneles de armadura 40K, cascos, hombreras, carcasas de armas e identificadores de escuadra." }
      },
      schemeRoles: {
        primary: "Color principal", contrast: "Color de contraste", leftAccent: "Acento izquierdo", rightAccent: "Acento derecho", secondary: "Color secundario", accent: "Color de acento", shadow: "Color de sombra", highlight: "Color de luz", darkNeighbor: "Vecino oscuro", lightNeighbor: "Vecino claro", layer: "Color de capa", deepShadow: "Sombra profunda", edgeHighlight: "Luz de borde", basecoat: "Capa base", coolShadow: "Sombra fría", warmLayer: "Capa cálida", strongAccent: "Acento fuerte", neighbor: "Color vecino", secondaryAccent: "Acento secundario", coolCounter: "Contracolor frío", coolAccent: "Acento frío", darkBase: "Tono base oscuro", dustyLayer: "Capa polvorienta", dirtyAccent: "Acento sucio", realmGlow: "Brillo de reino", realmAccent: "Acento de reino", realmShadow: "Sombra de reino", armor: "Color de armadura", panelShade: "Sombra de panel", companyMarking: "Marca de compañía", lensAccent: "Acento de lente"
      }
    }
  };

  Object.assign(TRANSLATIONS.de, {
    placements: {
      dominant: "Dominante Fläche: Rüstung, Robe, Haut, Rumpf, Uniform oder Hauptstoff.",
      secondary: "Sekundäre Fläche: Schild, Umhang, Panel, Schulterpanzer, Stoff oder zweite Rüstung.",
      contrast: "Kontrastbereich: Heraldik, Edelsteine, Waffenglühen, Runen, Linsen, Plasma oder Championdetails.",
      small: "Kleiner Akzent: Besatz, Truppmarkierungen, Zaubereffekte, Reinheitssiegel oder Base-Details."
    },
    roleAreas: {
      dominantSurface: "Rüstung, Haut, Robe oder Hauptstoff",
      secondarySurface: "Stoff, Schild, Panel oder sekundäre Rüstung",
      focusAccent: "Fokusakzent",
      leatherStraps: "Leder, Riemen und Taschen",
      woodWeapons: "Holz, Speere, Bögen und Schäfte",
      metalDetails: "Metalldetails",
      baseDetails: "Base und Rand",
      plateArmor: "Plattenrüstung",
      clothAndShield: "Stoff, Schild oder Heraldik",
      insignia: "Insignien und Besatz",
      weapon: "Waffe",
      magicEyes: "Magie, Augen oder Edelsteine",
      boneGhostRobe: "Knochen, Geisterhaut oder Robe",
      tornCloth: "Zerrissener Stoff oder alte Rüstung",
      etherealGlow: "Ätherisches Leuchten",
      bonesTrophies: "Knochen und Trophäen",
      agedMetal: "Gealtertes Metall",
      leatherScraps: "Lederreste",
      graveBase: "Grab- oder Fluchbase",
      skinScalesArmor: "Haut, Schuppen oder grobe Rüstung",
      warPaintCloth: "Kriegsbemalung, Stoff oder Schild",
      glyphFocus: "Glyphen- oder Kriegsbemalungsfokus",
      hidesFurs: "Häute und Felle",
      clubsShafts: "Keulen und Schäfte",
      roughMetal: "Raues Metall",
      dustyBase: "Staubige Base",
      darkArmorMutation: "Dunkle Rüstung oder Mutation",
      cloakShieldFur: "Umhang, Schild, Fell oder Haut",
      daemonicFocus: "Dämonischer Fokus",
      brassTrim: "Messingbesatz",
      leatherTrophies: "Leder und Trophäen",
      robeMantle: "Robe oder Mantel",
      innerRobe: "Innere Robe oder Schärpe",
      spellEffect: "Zaubereffekt",
      parchmentTrim: "Pergament oder heller Besatz",
      staffWood: "Stabholz",
      jewelry: "Schmuck",
      mysticBase: "Mystische Base",
      skinFurScales: "Haut, Fell oder Schuppen",
      bellyWingsPlates: "Bauch, Flügelmembran oder Platten",
      eyesMouthMagic: "Augen, Maul, Gift oder Magie",
      clawsHornsTeeth: "Klauen, Hörner und Zähne",
      saddleStraps: "Sattel und Riemen",
      chainsArmor: "Ketten und Rüstungsreste",
      naturalBase: "Natürliche Base",
      powerArmorFatigues: "Servorüstung, Uniform oder Hauptanzug",
      secondaryPanels: "Sekundäre Panels",
      lensesPlasma: "Linsen, Plasma und Sensoren",
      weaponCasing: "Waffengehäuse",
      gunmetal: "Gunmetal",
      pouchesStraps: "Taschen und Riemen",
      battlefieldBase: "Schlachtfeldbase",
      chapterArmor: "Ordensrüstung",
      pauldronsKnees: "Schulterpanzer, Helme und Knie",
      companyMarkings: "Kompaniemarkierungen",
      aquilaTrim: "Aquila, Besatz und Ehrenzeichen",
      fatiguesCoat: "Uniform oder Mantel",
      armorPlates: "Rüstungsplatten",
      unitMarkings: "Einheitenmarkierungen",
      traitorArmor: "Verräterrüstung",
      trimMutations: "Besatz oder Mutationen",
      warpGlow: "Warp-Leuchten",
      boneTrophies: "Knochentrophäen",
      carapaceArmor: "Carapax oder Rüstung",
      clothPanels: "Stoffbahnen",
      alienEnergy: "Alien-Energie",
      boneClaws: "Knochenklauen",
      smoothMetal: "Glattes Metall",
      alienBase: "Alien-Base",
      fleshSkin: "Fleisch oder Haut",
      bioWeapons: "Biowaffen",
      tongueSacs: "Zunge oder Säcke",
      hullArmor: "Rumpfpanzerung",
      panelsMarkings: "Panels und Markierungen",
      exhaustDamage: "Abgasschäden und Ruß",
      ashWasteBase: "Aschewüstenbase"
    },
    roleUses: {
      dominant: "Für die größte lesbare Fläche nutzen, damit das Schema eine klare Identität hat.",
      secondary: "Auf mittleren Flächen einsetzen, um Formen zu trennen, ohne den Fokus zu stehlen.",
      focus: "Sparsam nahe Gesichtern, Waffen, Linsen, Edelsteinen, Magie oder Plasma verwenden.",
      leather: "Für praktische Ausrüstung wie Gürtel, Holster, Riemen, Stiefel und Sättel nutzen.",
      wood: "Für Schäfte, Bögen, Schilde, Kisten, Ruinen und Schlachtfeldstruktur verwenden.",
      metal: "Für Klingen, Besatz, Ketten, Waffen, Lüftungen, Schnallen und mechanische Details nutzen.",
      base: "Die Base unterstützend halten, damit das Modell das lauteste Objekt bleibt.",
      bone: "Für Zähne, Schädel, Hörner, Klauen, Pergament und Trophäen nutzen.",
      cloth: "Auf Falten, Roben, Mänteln, Bannern, Wickeln, Wappenröcken und weicher Ausrüstung verwenden.",
      weapon: "Auf Boltern, Lasguns, Gehäusen, Griffen, Kabeln und harten Abdeckungen nutzen.",
      weathering: "Für Auspuffspuren, Kratzer, Ölmarken, Hitzefärbung und Schmutzaufbau verwenden.",
      extraPalette: "Als zusätzliche Schemafarbe für Akzente, Markierungen, Effekte, Heraldik oder Sonderdetails nutzen."
    },
    roleTips: {
      dominant: "Ziele auf ungefähr zwei Drittel der sichtbaren Miniatur.",
      secondary: "Unter der Hauptfarbe in der Flächenwirkung halten.",
      focus: "Klein und hell liest sich besser als überall und laut.",
      neutral: "Neutrale Töne lassen die Palette atmen.",
      metal: "Dunkel schattieren und mit einem winzigen hellen Punkt abschließen.",
      base: "Eine Modellfarbe sehr subtil auf der Base wiederholen, wenn Einheit fehlt.",
      heroic: "Scharfe Kantenhighlights lassen Eliterüstung aus Entfernung lesen.",
      grim: "Niedrigere Sättigung und stärkere Schatten verkaufen die Stimmung.",
      organic: "Weichere Übergänge auf Haut, Fell, Schuppen und Membranen nutzen.",
      weather: "Kratzer, Schmutz, Pigmente oder Flecken nach den Grundfarben ergänzen.",
      bone: "An der Wurzel wärmer beginnen und zur Spitze hin aufhellen.",
      cloth: "Falten breiter highlighten als harte Rüstungskanten.",
      extraPalette: "Bewusst einsetzen und kleiner halten als die zugewiesenen Haupt- und Sekundärflächen."
    },
    ladder: {
      steps: {
        deepShade: "Tiefe Schatten",
        shadeWash: "Shade / Wash",
        basecoat: "Grundschicht",
        layer: "Layer",
        edgeHighlight: "Kantenhighlight",
        focusLight: "Fokuslicht"
      },
      hints: {
        deepShade: "Tiefe Vertiefungen und Unterseiten",
        shadeWash: "Kontrollierter Wash, keine Flutung",
        basecoat: "Deckende Hauptschicht",
        layer: "Erhöhte Volumen und breites Licht",
        edgeHighlight: "Kanten, Ecken und harte Konturen",
        focusLight: "Nur Gesicht, Linsen, Runen, Edelsteine, Plasma oder Schlüsselwaffen"
      },
      note: "{system}-Einsatz: Rüstung, Stoff, Haut, Schuppen, Fahrzeuge, Umhänge oder Energieeffekte. {finish}-Finish: Fokuslicht selektiv halten."
    },
    materials: {
      items: {
        darkWood: { name: "Dunkles Holz", use: "Schäfte, Bögen, Kisten, Schildrücken und Baseränder" },
        warmWood: { name: "Warmes Holz", use: "Holzmaserung, Schilde, Boxen und Geländeteile" },
        darkLeather: { name: "Dunkles Leder", use: "Gürtel, Holster, Stiefel, Taschen und Riemen" },
        redLeather: { name: "Rötliches Leder", use: "Lederrüstung, Griffe, Sättel und Beutel" },
        offWhite: { name: "Gebrochenes Weiß", use: "Stoff, Roben, Pergament, Seile und Heraldik" },
        bone: { name: "Knochen", use: "Schädel, Zähne, Hörner, Klauen, Pergament und Trophäen" },
        coldWhite: { name: "Kaltes Weiß", use: "Lichtpunkte, Edelsteine, Schnee und Glanzlichter" },
        blackGrey: { name: "Schwarzgrau", use: "Unteranzüge, Waffengehäuse, Schatten und Lüftungen" },
        iron: { name: "Eisen", use: "Klingen, Ketten, Bolzen, Gunmetal und harte Beschläge" },
        silver: { name: "Silber", use: "Helle Metallkanten, Schmuck und saubere Maschinen" },
        bronze: { name: "Bronze", use: "Alte Rüstung, Besatz, Idole, Maschinen und Beschläge" },
        gold: { name: "Gold", use: "Insignien, Ehrenzeichen, Schmuck, Besatz und Heldendetails" },
        baseEarth: { name: "Erde / Geröll", use: "Baseboden, Staub, Ruinen und Schlachtfeldstruktur" }
      }
    },
    bases: {
      city: base("Pflaster der Freien Stadt", "Gepflasterte Straßen, Grenzwege, Steinplatten, Holztrümmer und pulverbeschmutztes Mauerwerk.", "Am besten für disziplinierte Infanterie, Artillerie, Kavallerie und urbane Kampagnen.", ["Basis: dunkles Graubraun", "Textur: Steine, Sand, gebrochenes Holz", "Trockenbürsten: helles Grau", "Akzent: Staub, Plakate, Grasbüschel"]),
      ruins: base("Realmgate-Tempelruinen", "Alte Stufen, zerbrochene Statuen, Tempelplatten, Marmorsplitter und rissiger Reichstein.", "Funktioniert für Helden, Eliteeinheiten und Modelle, die einen sauberen heroischen Sockel brauchen.", ["Basis: kühler grauer Stein", "Textur: Schiefer, Kork, rissige Platten", "Trockenbürsten: helles Grau", "Akzent: etwas Moos oder leuchtende Risse"]),
      graveyard: base("Friedhof / verfluchte Erde", "Kalte Erde, Grabsteine, totes Gras, Knochen, Nebel und dunkles Ruinenmauerwerk.", "Starke Wahl für Untote, verfluchte Armeen und kalte Grimdark-Paletten.", ["Basis: dunkle Erde", "Textur: Grit, Schädel, gebrochener Stein", "Trockenbürsten: kaltes Graubraun", "Akzent: totes Gras oder Knochen"]),
      forest: base("Waldboden, Wurzeln und Moos", "Wurzeln, Moos, Blätter, feuchte Erde, gefallene Äste und Vegetation des Lebensreichs.", "Gut für Bestien, Jäger, Sylvaneth und naturalistische Schemata.", ["Basis: dunkle Erde", "Textur: Wurzeln, Rinde, Blätter", "Trockenbürsten: Tan oder Moosgrün", "Akzent: Grasbüschel"]),
      swamp: base("Sumpf / Marschland", "Nasser Schlamm, Schilf, stehendes Wasser, Algen, Knochen und halb versunkene Steine.", "Nützlich für schmutzige, untote, monströse oder Nurgle-nahe Stimmungen.", ["Basis: dunkles Olivbraun", "Textur: Schlamm, Schilf, Steine", "Glanz: Wasserpfützen", "Akzent: kränkliches Gras"]),
      desert: base("Wüste, Steppe oder Ockerstaub", "Trockener Sand, rissige Erde, warmer Staub, sonnengebleichte Felsen und karger Bewuchs.", "Ausgezeichnet für blaue, grüne, violette oder kalte Schemata.", ["Basis: Ockerbraun", "Textur: Sand und Felsen", "Trockenbürsten: Knochen oder heller Sand", "Akzent: trockenes Gras"]),
      snow: base("Schnee, Frost und heller Stein", "Schneeflecken, eisige Steine, Frostgras, helle Asche und kalte Marmorstücke.", "Mit dunklen Modellen für Silhouettenkontrast verwenden.", ["Basis: dunkler Fels", "Trockenbürsten: helles Grau", "Schnee: in Flecken auftragen", "Akzent: Eiskristalle"]),
      volcanic: base("Asche, Lava und verbrannter Boden", "Schwarze Asche, rissige Lava, verkohlte Erde, Ruß, Schädel und verbrannter Stein.", "Gut für Chaos, Feuerstimmungen, Monster und helle warme Akzente.", ["Basis: schwarzbraune Asche", "Textur: Crackle-Paste", "Trockenbürsten: graue Asche", "Akzent: Lavarisse"]),
      arcane: base("Arkane Runen / Kristalle", "Runenstein, Zauberkreise, Kristalle, Bücher, Rauch und magische Geländefragmente.", "Am besten für Zauberer, Champions und starke magische Akzentfarben.", ["Basis: neutraler Stein", "Textur: eingeritzte Linien", "Leuchten: Fokusakzent wiederholen", "Akzent: Kristalle"]),
      ghur: base("Ghurische Badlands", "Staub, trockene Erde, Felsen, rissiger Schlamm, Knochen, Trophäenreste und Jagdgrund.", "Starke Wahl für Destruction, Monster und Bestien.", ["Basis: rötliche Erde", "Textur: Felsen und Knochen", "Trockenbürsten: Tan-Staub", "Akzent: trockene Büschel"]),
      coastal: base("Küste, Riff oder nasser Stein", "Nasse Felsen, Gezeitentümpel, Muscheln, gebrochene Stege, Korallenstücke und meeresglatte Ruinen.", "Für Seestreitkräfte, nasse Ruinen und aquatische Monster verwenden.", ["Basis: blaugrauer Fels", "Textur: Sand, Muscheln, Schiefer", "Glanz: Gezeitentümpel", "Akzent: Koralle"]),
      neutral: base("Neutrales Geröll", "Braungraues Geröll, gebrochenes Mauerwerk, Erde, Wurzeln und kleine Steine.", "Sichere Vorgabe, weil sie warme und kalte Paletten unterstützt.", ["Basis: braungraue Erde", "Textur: Grit und Stein", "Trockenbürsten: Tan-Grau", "Akzent: gedeckte Büschel"]),
      darkMud: base("Dunkler Schlamm / geschwärzte Erde", "Nasser Boden, verbrannter Grund, Graberde, Sumpfschlamm oder aufgewühltes Schlachtfeld.", "Hält helle Modelle geerdet.", ["Basis: dunkler Umbra", "Textur: Schlamm und Grit", "Glanz: nasse Stellen", "Akzent: totes Gras"]),
      lightAsh: base("Helle Asche, Schnee oder heller Stein", "Aschewüste, Schneeflecken, Marmorsplitter, gebleichter Stein oder trockener Sand.", "Erhöht den Silhouettenkontrast für dunkle Modelle.", ["Basis: helles Graubeige", "Textur: feiner Grit", "Trockenbürsten: gebrochenes Weiß", "Akzent: dunkle Steine"]),
      darkRim: base("Dunkler Rand und kontrollierte Kante", "Schwarzbrauner Rand, ruhige Textur und zurückhaltende Verwitterung um das Modell.", "Hält die Base visuell eingefasst.", ["Rand: schwarzbraun", "Textur innen halten", "Helle Randfarben vermeiden", "Untere Beine bestauben"]),
      urban: base("Urbanes Geröll", "Beton, Armierung, Staub, gebrochene Straße, Metallschrott und Granatschäden.", "Klassische 40K-Schlachtfeldrahmung für Infanterie und Panzerung.", ["Basis: dunkler Beton", "Textur: Geröll und Grit", "Trockenbürsten: kaltes Grau", "Akzent: Warnstreifen oder Staub"]),
      ashWaste: base("Aschewüste", "Grauer Staub, helle Erde, Granattrichter, rostige Trümmer und verbrannter Boden.", "Funktioniert mit den meisten 40K-Armeen und unterstützt helle Rüstung.", ["Basis: graubraune Asche", "Textur: feiner Grit", "Trockenbürsten: heller Staub", "Akzent: Rost oder leere Hülsen"]),
      hive: base("Makropoldeck / Unterstadt", "Dunkler Metallboden, Schmutz, Kabel, Lüftungen, Warnmarkierungen und Ölflecken.", "Großartig für industrielle 40K-, Necromunda-Stimmungen und Fahrzeugbases.", ["Basis: dunkles Metall", "Textur: Gitter oder Platten", "Weathering: Öl und Rost", "Akzent: Warnfarbe"]),
      jungle: base("Todeswelt-Dschungel", "Dichter Schlamm, Ranken, Wurzeln, nasse Blätter, Alien-Pflanzen und gebrochener Stein.", "Gut für Xenos, Tyraniden, Scouts und überwucherte Schlachtfelder.", ["Basis: dunkler Schlamm", "Textur: Wurzeln und Blätter", "Glanz: nasse Bereiche", "Akzent: helle Pflanze"]),
      alien: base("Alienwelt-Bewuchs", "Violetter Boden, fremde Kristalle, Sporen, Chitin und unnatürliche Vegetation.", "Unterstützt Xenos- und bioorganische Paletten.", ["Basis: gedeckter Alienboden", "Textur: Kristalle oder Sporen", "Trockenbürsten: helles Violett", "Akzent: toxisches Leuchten"]),
      shipDeck: base("Schiffsdeck", "Kalte Metallplatten, Nieten, Kabel, Warnlinien und Maschinenschmutz.", "Nützlich für Enteraktionen, Fahrzeuge und maritime 40K-Szenen.", ["Basis: dunkler Stahl", "Textur: Platten und Nieten", "Weathering: Schmutz", "Akzent: Warnstreifen"])
    },
    citadel: {
      loaded: "{count} Farben aus dem Katalog-JSON geladen.",
      sample: "{count} Beispielfarben werden genutzt, bis das Katalog-JSON geladen ist.",
      missing: "Noch keine Farbkatalogdaten verfügbar.",
      closest: "Nächste Treffer",
      distance: "Abstand {distance}"
    },
    copy: {
      palette: "Palette",
      roles: "Rollenplaner",
      bases: "Base-Umgebungsvorschläge",
      ladder: "Shade / Layer / Highlight",
      citadel: "Farbkatalog-Treffer"
    }
  });

  Object.assign(TRANSLATIONS.fr, {
    placements: {
      dominant: "Surface dominante : armure, robe, peau, coque, treillis ou tissu principal.",
      secondary: "Surface secondaire : bouclier, cape, panneau, épaulière, tissu ou armure alternative.",
      contrast: "Zone de contraste : héraldique, gemmes, lueur d'arme, runes, lentilles, plasma ou détails de champion.",
      small: "Petit accent : bordure, marques d'escouade, effets de sort, sceaux de pureté ou détails de socle."
    },
    roleAreas: {
      dominantSurface: "Armure, peau, robe ou tissu principal",
      secondarySurface: "Tissu, bouclier, panneau ou armure secondaire",
      focusAccent: "Accent focal",
      leatherStraps: "Cuir, sangles et sacoches",
      woodWeapons: "Bois, lances, arcs et hampes",
      metalDetails: "Détails métalliques",
      baseDetails: "Socle et bord",
      plateArmor: "Armure de plates",
      clothAndShield: "Tissu, bouclier ou héraldique",
      insignia: "Insignes et bordures",
      weapon: "Arme",
      magicEyes: "Magie, yeux ou gemmes",
      boneGhostRobe: "Os, peau spectrale ou robe",
      tornCloth: "Tissu déchiré ou vieille armure",
      etherealGlow: "Lueur éthérée",
      bonesTrophies: "Os et trophées",
      agedMetal: "Métal vieilli",
      leatherScraps: "Chutes de cuir",
      graveBase: "Socle de tombe ou maudit",
      skinScalesArmor: "Peau, écailles ou armure rugueuse",
      warPaintCloth: "Peinture de guerre, tissu ou bouclier",
      glyphFocus: "Glyphe ou focus de peinture de guerre",
      hidesFurs: "Peaux et fourrures",
      clubsShafts: "Massues et manches",
      roughMetal: "Métal brut",
      dustyBase: "Socle poussiéreux",
      darkArmorMutation: "Armure sombre ou mutation",
      cloakShieldFur: "Cape, bouclier, fourrure ou peau",
      daemonicFocus: "Focus démoniaque",
      brassTrim: "Bordure en laiton",
      leatherTrophies: "Cuir et trophées",
      robeMantle: "Robe ou manteau",
      innerRobe: "Robe intérieure ou écharpe",
      spellEffect: "Effet de sort",
      parchmentTrim: "Parchemin ou bord clair",
      staffWood: "Bois du bâton",
      jewelry: "Bijoux",
      mysticBase: "Socle mystique",
      skinFurScales: "Peau, fourrure ou écailles",
      bellyWingsPlates: "Ventre, membrane d'aile ou plaques",
      eyesMouthMagic: "Yeux, bouche, poison ou magie",
      clawsHornsTeeth: "Griffes, cornes et dents",
      saddleStraps: "Selle et sangles",
      chainsArmor: "Chaînes et fragments d'armure",
      naturalBase: "Socle naturel",
      powerArmorFatigues: "Armure énergétique, treillis ou combinaison principale",
      secondaryPanels: "Panneaux secondaires",
      lensesPlasma: "Lentilles, plasma et capteurs",
      weaponCasing: "Carcasse d'arme",
      gunmetal: "Métal sombre",
      pouchesStraps: "Sacoches et sangles",
      battlefieldBase: "Socle de champ de bataille",
      chapterArmor: "Armure de chapitre",
      pauldronsKnees: "Épaulières, casques et genoux",
      companyMarkings: "Marquages de compagnie",
      aquilaTrim: "Aquila, bordures et honneurs",
      fatiguesCoat: "Treillis ou manteau",
      armorPlates: "Plaques d'armure",
      unitMarkings: "Marquages d'unité",
      traitorArmor: "Armure de traître",
      trimMutations: "Bordures ou mutations",
      warpGlow: "Lueur warp",
      boneTrophies: "Trophées d'os",
      carapaceArmor: "Carapace ou armure",
      clothPanels: "Panneaux de tissu",
      alienEnergy: "Énergie alien",
      boneClaws: "Griffes d'os",
      smoothMetal: "Métal lisse",
      alienBase: "Socle alien",
      fleshSkin: "Chair ou peau",
      bioWeapons: "Bio-armes",
      tongueSacs: "Langue ou sacs",
      hullArmor: "Blindage de coque",
      panelsMarkings: "Panneaux et marquages",
      exhaustDamage: "Dégâts d'échappement et suie",
      ashWasteBase: "Socle de désert de cendres"
    },
    roleUses: {
      dominant: "À utiliser sur la plus grande zone lisible pour donner une identité claire au schéma.",
      secondary: "À utiliser sur les surfaces moyennes pour séparer les formes sans voler le point focal.",
      focus: "À utiliser avec parcimonie près des visages, armes, lentilles, gemmes, magie ou plasma.",
      leather: "À utiliser pour l'équipement pratique comme ceintures, holsters, sangles, bottes et selles.",
      wood: "À utiliser pour hampes, arcs, boucliers, caisses, ruines et texture de champ de bataille.",
      metal: "À utiliser pour lames, bordures, chaînes, armes, évents, boucles et détails mécaniques.",
      base: "Garder le socle en soutien pour que le modèle reste l'objet le plus fort.",
      bone: "À utiliser pour dents, crânes, cornes, griffes, parchemin et trophées.",
      cloth: "À utiliser sur plis, robes, manteaux, bannières, bandages, tabards et équipement souple.",
      weapon: "À utiliser sur bolters, fusils laser, carcasses, poignées, câbles et boîtiers rigides.",
      weathering: "À utiliser dans les échappements, éclats, traces d'huile, coloration thermique et accumulation de saleté.",
      extraPalette: "À utiliser comme couleur de schéma supplémentaire pour accents, marquages, effets, héraldique ou détails spéciaux."
    },
    roleTips: {
      dominant: "Vise environ deux tiers de la figurine visible.",
      secondary: "Garde-la sous la couleur principale en surface.",
      focus: "Petit et lumineux se lit mieux que partout et criard.",
      neutral: "Les neutres aident la palette à respirer.",
      metal: "Ombre-le sombre, puis termine avec un minuscule point clair.",
      base: "Répète très subtilement une couleur du modèle sur le socle si l'ensemble manque d'unité.",
      heroic: "Des éclaircissements de bord nets rendent l'armure d'élite lisible à distance.",
      grim: "Une saturation plus basse et des ombres plus fortes vendent l'ambiance.",
      organic: "Utilise des transitions plus douces sur peau, fourrure, écailles et membranes.",
      weather: "Ajoute rayures, crasse, pigments ou taches après les couleurs de base.",
      bone: "Commence plus chaud à la racine et éclaircis vers la pointe.",
      cloth: "Éclaircis les plis plus largement que les arêtes d'armure dure.",
      extraPalette: "Garde-la intentionnelle et plus petite que les zones principales et secondaires assignées."
    },
    ladder: {
      steps: {
        deepShade: "Ombre profonde",
        shadeWash: "Shade / lavis",
        basecoat: "Couche de base",
        layer: "Couche",
        edgeHighlight: "Éclaircissement de bord",
        focusLight: "Lumière focale"
      },
      hints: {
        deepShade: "Creux profonds et dessous",
        shadeWash: "Lavis contrôlé, pas une inondation",
        basecoat: "Couche principale opaque",
        layer: "Volumes relevés et lumière large",
        edgeHighlight: "Arêtes, coins et contours durs",
        focusLight: "Seulement visage, lentilles, runes, gemmes, plasma ou armes clés"
      },
      note: "Usage {system} : armure, tissu, peau, écailles, véhicules, capes ou effets d'énergie. Finition {finish} : garder la lumière focale sélective."
    },
    materials: {
      items: {
        darkWood: { name: "Bois sombre", use: "Hampes, arcs, caisses, dos de boucliers et bords de socle" },
        warmWood: { name: "Bois chaud", use: "Veines du bois, boucliers, boîtes et éléments de terrain" },
        darkLeather: { name: "Cuir sombre", use: "Ceintures, holsters, bottes, sacs et sangles" },
        redLeather: { name: "Cuir rougeâtre", use: "Armure de cuir, poignées, selles et sacoches" },
        offWhite: { name: "Blanc cassé", use: "Tissu, robes, parchemin, cordes et héraldique" },
        bone: { name: "Os", use: "Crânes, dents, cornes, griffes, parchemin et trophées" },
        coldWhite: { name: "Blanc froid", use: "Points de lumière, gemmes, neige et reflets de lueur" },
        blackGrey: { name: "Gris noir", use: "Sous-combinaisons, carcasses d'armes, ombres et évents" },
        iron: { name: "Fer", use: "Lames, chaînes, boulons, métal sombre et garnitures dures" },
        silver: { name: "Argent", use: "Arêtes métalliques claires, bijoux et machines propres" },
        bronze: { name: "Bronze", use: "Vieilles armures, bordures, idoles, machines et garnitures" },
        gold: { name: "Or", use: "Insignes, honneurs, bijoux, bordures et détails de héros" },
        baseEarth: { name: "Terre / gravats", use: "Sol du socle, poussière, ruines et texture de champ de bataille" }
      }
    },
    bases: {
      city: base("Pavés de Cité Franche", "Rues pavées, routes de frontière, dalles, débris de bois et maçonnerie tachée de poudre.", "Idéal pour infanterie disciplinée, artillerie, cavalerie et campagnes urbaines.", ["Base : gris-brun sombre", "Texture : pierres, sable, bois brisé", "Brossage à sec : gris pâle", "Accent : poussière, affiches, touffes d'herbe"]),
      ruins: base("Ruines de temple de portail de royaume", "Anciennes marches, statues brisées, dalles de temple, éclats de marbre et pierre de royaume fissurée.", "Fonctionne pour héros, unités d'élite et modèles qui demandent un socle héroïque propre.", ["Base : pierre grise froide", "Texture : ardoise, liège, dalles fissurées", "Brossage à sec : gris clair", "Accent : un peu de mousse ou fissures lumineuses"]),
      graveyard: base("Cimetière / sol maudit", "Terre froide, pierres tombales, herbe morte, os, brume et maçonnerie sombre en ruine.", "Très adapté aux morts-vivants, armées maudites et palettes grimdark froides.", ["Base : terre sombre", "Texture : gravier, crânes, pierre brisée", "Brossage à sec : gris-brun froid", "Accent : herbe morte ou os"]),
      forest: base("Sol forestier, racines et mousse", "Racines, mousse, feuilles, terre humide, branches tombées et végétation de royaume vivant.", "Bon pour bêtes, chasseurs, Sylvaneth et schémas naturalistes.", ["Base : terre sombre", "Texture : racines, écorce, feuilles", "Brossage à sec : tan ou vert mousse", "Accent : touffes d'herbe"]),
      swamp: base("Marais / zone humide", "Boue mouillée, roseaux, eau stagnante, algues, os et pierres à moitié englouties.", "Utile pour ambiances sales, mortes-vivantes, monstrueuses ou proches de Nurgle.", ["Base : brun olive sombre", "Texture : boue, roseaux, pierres", "Brillant : flaques d'eau", "Accent : herbe maladive"]),
      desert: base("Désert, steppe ou poussière ocre", "Sable sec, terre craquelée, poussière chaude, rochers blanchis au soleil et broussailles rares.", "Excellent avec schémas bleus, verts, violets ou froids.", ["Base : brun ocre", "Texture : sable et rochers", "Brossage à sec : os ou sable pâle", "Accent : herbe sèche"]),
      snow: base("Neige, givre et pierre pâle", "Plaques de neige, pierres glacées, herbe givrée, cendre pâle et fragments de marbre froid.", "À utiliser avec des modèles sombres pour le contraste de silhouette.", ["Base : roche sombre", "Brossage à sec : gris pâle", "Neige : ajouter par plaques", "Accent : cristaux de glace"]),
      volcanic: base("Cendre, lave et sol brûlé", "Cendre noire, lave craquelée, terre carbonisée, suie, crânes et pierre brûlée.", "Bon pour Chaos, ambiances de feu, monstres et accents chauds brillants.", ["Base : cendre brun-noir", "Texture : pâte craquelée", "Brossage à sec : cendre grise", "Accent : fissures de lave"]),
      arcane: base("Runes / cristaux arcaniques", "Pierre runique, cercles de sort, cristaux, livres, fumée et fragments de terrain magique.", "Idéal pour sorciers, champions et couleurs d'accent magique fortes.", ["Base : pierre neutre", "Texture : lignes gravées", "Lueur : répéter l'accent focal", "Accent : cristaux"]),
      ghur: base("Badlands ghurites", "Poussière, terre sèche, rochers, boue craquelée, os, débris de trophées et terrain de chasse.", "Très bon pour Destruction, monstres et bêtes.", ["Base : terre rougeâtre", "Texture : rochers et os", "Brossage à sec : poussière tan", "Accent : touffes sèches"]),
      coastal: base("Côte, récif ou pierre mouillée", "Rochers humides, flaques de marée, coquillages, docks brisés, fragments de corail et ruines lissées par la mer.", "À utiliser pour forces marines, ruines mouillées et monstres aquatiques.", ["Base : roche bleu-gris", "Texture : sable, coquillages, ardoise", "Brillant : flaques de marée", "Accent : corail"]),
      neutral: base("Gravats neutres", "Gravats brun-gris, maçonnerie brisée, terre, racines et petites pierres.", "Choix sûr car il soutient les palettes chaudes et froides.", ["Base : terre brun-gris", "Texture : gravier et pierre", "Brossage à sec : tan-gris", "Accent : touffes atténuées"]),
      darkMud: base("Boue sombre / terre noircie", "Sol mouillé, terrain brûlé, terre de tombe, vase de marais ou champ de bataille retourné.", "Garde les modèles lumineux bien ancrés.", ["Base : ombre brûlée sombre", "Texture : boue et gravier", "Brillant : zones humides", "Accent : herbe morte"]),
      lightAsh: base("Cendre claire, neige ou pierre pâle", "Désert de cendres, plaques de neige, éclats de marbre, pierre blanchie ou sable sec.", "Augmente le contraste de silhouette pour modèles sombres.", ["Base : gris-beige pâle", "Texture : gravier fin", "Brossage à sec : blanc cassé", "Accent : pierres sombres"]),
      darkRim: base("Bord sombre et contour contrôlé", "Bord brun-noir, texture discrète et vieillissement retenu autour du modèle.", "Garde le socle visuellement contenu.", ["Bord : brun-noir", "Garder la texture à l'intérieur", "Éviter les couleurs de bord vives", "Poussiérer le bas des jambes"]),
      urban: base("Gravats urbains", "Béton, barres d'armature, poussière, route brisée, ferraille et dégâts d'obus.", "Cadre de champ de bataille 40K classique pour infanterie et blindés.", ["Base : béton sombre", "Texture : gravats et gravier", "Brossage à sec : gris froid", "Accent : bande de danger ou poussière"]),
      ashWaste: base("Désert de cendres", "Poussière grise, terre pâle, cratères d'obus, débris rouillés et sol brûlé.", "Fonctionne avec la plupart des armées 40K et soutient les armures brillantes.", ["Base : cendre gris-brun", "Texture : gravier fin", "Brossage à sec : poussière pâle", "Accent : rouille ou douilles tirées"]),
      hive: base("Pont de ruche / sous-cité", "Sol métallique sombre, crasse, câbles, évents, marquages de danger et taches d'huile.", "Excellent pour 40K industriel, ambiances Necromunda et socles de véhicules.", ["Base : métal sombre", "Texture : grille ou plaques", "Vieillissement : huile et rouille", "Accent : couleur de danger"]),
      jungle: base("Jungle de monde mortel", "Boue dense, lianes, racines, feuilles mouillées, plantes aliens et pierre brisée.", "Bon pour xenos, Tyranides, éclaireurs et champs de bataille envahis.", ["Base : boue sombre", "Texture : racines et feuilles", "Brillant : zones humides", "Accent : plante vive"]),
      alien: base("Croissance de monde alien", "Sol violet, cristaux étranges, spores, chitine et végétation surnaturelle.", "Soutient les palettes xenos et bio-organiques.", ["Base : sol alien atténué", "Texture : cristaux ou spores", "Brossage à sec : violet pâle", "Accent : lueur toxique"]),
      shipDeck: base("Pont de vaisseau", "Plaques de métal froides, rivets, câbles, lignes de danger et crasse mécanique.", "Utile pour abordages, véhicules et scènes navales 40K.", ["Base : acier sombre", "Texture : plaques et rivets", "Vieillissement : crasse", "Accent : bande d'avertissement"])
    },
    citadel: {
      loaded: "{count} peintures du catalogue chargées depuis le JSON.",
      sample: "{count} peintures d'exemple utilisées jusqu'au chargement du JSON.",
      missing: "Aucune donnée de catalogue de peintures disponible pour le moment.",
      closest: "Correspondances les plus proches",
      distance: "distance {distance}"
    },
    copy: {
      palette: "Palette",
      roles: "Planificateur de rôles",
      bases: "Suggestions d'environnements de socle",
      ladder: "Shade / Layer / Highlight",
      citadel: "Correspondances du catalogue"
    }
  });

  Object.assign(TRANSLATIONS.es, {
    placements: {
      dominant: "Superficie dominante: armadura, túnica, piel, casco, uniforme o tela principal.",
      secondary: "Superficie secundaria: escudo, capa, panel, hombrera, tela o armadura alternativa.",
      contrast: "Zona de contraste: heráldica, gemas, brillo de arma, runas, lentes, plasma o detalles de campeón.",
      small: "Acento pequeño: ribetes, marcas de escuadra, efectos de hechizo, sellos de pureza o detalles de peana."
    },
    roleAreas: {
      dominantSurface: "Armadura, piel, túnica o tela principal",
      secondarySurface: "Tela, escudo, panel o armadura secundaria",
      focusAccent: "Acento focal",
      leatherStraps: "Cuero, correas y bolsas",
      woodWeapons: "Madera, lanzas, arcos y astiles",
      metalDetails: "Detalles metálicos",
      baseDetails: "Peana y borde",
      plateArmor: "Armadura de placas",
      clothAndShield: "Tela, escudo o heráldica",
      insignia: "Insignias y ribetes",
      weapon: "Arma",
      magicEyes: "Magia, ojos o gemas",
      boneGhostRobe: "Hueso, piel espectral o túnica",
      tornCloth: "Tela rasgada o armadura vieja",
      etherealGlow: "Brillo etéreo",
      bonesTrophies: "Huesos y trofeos",
      agedMetal: "Metal envejecido",
      leatherScraps: "Retales de cuero",
      graveBase: "Peana de tumba o maldita",
      skinScalesArmor: "Piel, escamas o armadura rugosa",
      warPaintCloth: "Pintura de guerra, tela o escudo",
      glyphFocus: "Glifo o foco de pintura de guerra",
      hidesFurs: "Pieles y pelajes",
      clubsShafts: "Mazas y astiles",
      roughMetal: "Metal tosco",
      dustyBase: "Peana polvorienta",
      darkArmorMutation: "Armadura oscura o mutación",
      cloakShieldFur: "Capa, escudo, pelaje o piel",
      daemonicFocus: "Foco demoníaco",
      brassTrim: "Ribete de latón",
      leatherTrophies: "Cuero y trofeos",
      robeMantle: "Túnica o manto",
      innerRobe: "Túnica interior o fajín",
      spellEffect: "Efecto de hechizo",
      parchmentTrim: "Pergamino o ribete pálido",
      staffWood: "Madera del báculo",
      jewelry: "Joyería",
      mysticBase: "Peana mística",
      skinFurScales: "Piel, pelaje o escamas",
      bellyWingsPlates: "Vientre, membrana de ala o placas",
      eyesMouthMagic: "Ojos, boca, veneno o magia",
      clawsHornsTeeth: "Garras, cuernos y dientes",
      saddleStraps: "Silla y correas",
      chainsArmor: "Cadenas y restos de armadura",
      naturalBase: "Peana natural",
      powerArmorFatigues: "Servoarmadura, uniforme o traje principal",
      secondaryPanels: "Paneles secundarios",
      lensesPlasma: "Lentes, plasma y sensores",
      weaponCasing: "Carcasa del arma",
      gunmetal: "Metal oscuro",
      pouchesStraps: "Bolsas y correas",
      battlefieldBase: "Peana de campo de batalla",
      chapterArmor: "Armadura de capítulo",
      pauldronsKnees: "Hombreras, cascos y rodillas",
      companyMarkings: "Marcas de compañía",
      aquilaTrim: "Aquila, ribetes y honores",
      fatiguesCoat: "Uniforme o abrigo",
      armorPlates: "Placas de armadura",
      unitMarkings: "Marcas de unidad",
      traitorArmor: "Armadura traidora",
      trimMutations: "Ribetes o mutaciones",
      warpGlow: "Brillo de la disformidad",
      boneTrophies: "Trofeos de hueso",
      carapaceArmor: "Caparazón o armadura",
      clothPanels: "Paneles de tela",
      alienEnergy: "Energía alienígena",
      boneClaws: "Garras de hueso",
      smoothMetal: "Metal liso",
      alienBase: "Peana alienígena",
      fleshSkin: "Carne o piel",
      bioWeapons: "Bioarmas",
      tongueSacs: "Lengua o sacos",
      hullArmor: "Blindaje del casco",
      panelsMarkings: "Paneles y marcas",
      exhaustDamage: "Daño de escape y hollín",
      ashWasteBase: "Peana de yermo de ceniza"
    },
    roleUses: {
      dominant: "Úsalo en la zona legible más grande para que el esquema tenga una identidad clara.",
      secondary: "Úsalo en superficies medianas para separar formas sin robar el punto focal.",
      focus: "Úsalo con moderación cerca de caras, armas, lentes, gemas, magia o plasma.",
      leather: "Úsalo para equipo práctico como cinturones, pistoleras, correas, botas y sillas.",
      wood: "Úsalo para astiles, arcos, escudos, cajas, ruinas y textura de campo de batalla.",
      metal: "Úsalo para hojas, ribetes, cadenas, armas, respiraderos, hebillas y detalle mecánico.",
      base: "Mantén la peana como apoyo para que el modelo siga siendo el objeto más llamativo.",
      bone: "Úsalo para dientes, cráneos, cuernos, garras, pergamino y trofeos.",
      cloth: "Úsalo en pliegues, túnicas, abrigos, estandartes, vendas, tabardos y equipo blando.",
      weapon: "Úsalo en bolters, rifles láser, carcasas, empuñaduras, cables y cubiertas rígidas.",
      weathering: "Úsalo en escapes, desconchones, marcas de aceite, manchas de calor y acumulación de suciedad.",
      extraPalette: "Úsalo como color extra del esquema para acentos, marcas, efectos, heráldica o detalles especiales."
    },
    roleTips: {
      dominant: "Apunta a unos dos tercios de la miniatura visible.",
      secondary: "Mantén su superficie por debajo del color principal.",
      focus: "Pequeño y brillante se lee mejor que grande y estridente.",
      neutral: "Los neutros ayudan a que la paleta respire.",
      metal: "Sombréalo oscuro y termina con un punto claro diminuto.",
      base: "Repite muy sutilmente un color del modelo en la peana si necesita unidad.",
      heroic: "Las luces de borde afiladas hacen que la armadura de élite se lea a distancia.",
      grim: "Menos saturación y sombras más fuertes venden el ambiente.",
      organic: "Usa transiciones más suaves en piel, pelaje, escamas y membranas.",
      weather: "Añade arañazos, mugre, pigmentos o manchas después de los colores base.",
      bone: "Empieza más cálido en la raíz e ilumina hacia la punta.",
      cloth: "Ilumina los pliegues más ancho que los bordes duros de armadura.",
      extraPalette: "Mantenlo intencional y más pequeño que las zonas principales y secundarias asignadas."
    },
    ladder: {
      steps: {
        deepShade: "Sombra profunda",
        shadeWash: "Sombra / lavado",
        basecoat: "Capa base",
        layer: "Capa",
        edgeHighlight: "Luz de borde",
        focusLight: "Luz focal"
      },
      hints: {
        deepShade: "Recesos profundos y partes inferiores",
        shadeWash: "Lavado controlado, no inundado",
        basecoat: "Capa principal opaca",
        layer: "Volúmenes elevados y luz amplia",
        edgeHighlight: "Bordes, esquinas y contornos duros",
        focusLight: "Solo cara, lentes, runas, gemas, plasma o armas clave"
      },
      note: "Uso en {system}: armadura, tela, piel, escamas, vehículos, capas o efectos de energía. Acabado {finish}: mantén selectiva la luz focal."
    },
    materials: {
      items: {
        darkWood: { name: "Madera oscura", use: "Astiles, arcos, cajas, reversos de escudos y bordes de peana" },
        warmWood: { name: "Madera cálida", use: "Veta de madera, escudos, cajas y piezas de terreno" },
        darkLeather: { name: "Cuero oscuro", use: "Cinturones, pistoleras, botas, bolsas y correas" },
        redLeather: { name: "Cuero rojizo", use: "Armadura de cuero, empuñaduras, sillas y bolsas" },
        offWhite: { name: "Blanco roto", use: "Tela, túnicas, pergamino, cuerdas y heráldica" },
        bone: { name: "Hueso", use: "Cráneos, dientes, cuernos, garras, pergamino y trofeos" },
        coldWhite: { name: "Blanco frío", use: "Puntos de luz, gemas, nieve y luces de brillo" },
        blackGrey: { name: "Gris negro", use: "Trajes interiores, carcasas de armas, sombras y respiraderos" },
        iron: { name: "Hierro", use: "Hojas, cadenas, pernos, metal oscuro y herrajes duros" },
        silver: { name: "Plata", use: "Bordes metálicos brillantes, joyería y maquinaria limpia" },
        bronze: { name: "Bronce", use: "Armadura vieja, ribetes, ídolos, maquinaria y herrajes" },
        gold: { name: "Oro", use: "Insignias, honores, joyería, ribetes y detalles de héroe" },
        baseEarth: { name: "Tierra / escombros", use: "Suelo de peana, polvo, ruinas y textura de campo de batalla" }
      }
    },
    bases: {
      city: base("Adoquines de Ciudad Libre", "Calles pavimentadas, caminos fronterizos, losas, restos de madera y mampostería manchada de pólvora.", "Ideal para infantería disciplinada, artillería, caballería y campañas urbanas.", ["Base: gris marrón oscuro", "Textura: piedras, arena, madera rota", "Pincel seco: gris pálido", "Acento: polvo, carteles, matojos de hierba"]),
      ruins: base("Ruinas de templo de portal de reino", "Escalones antiguos, estatuas rotas, losas de templo, astillas de mármol y piedra de reino agrietada.", "Funciona para héroes, unidades de élite y modelos que necesitan un pedestal heroico limpio.", ["Base: piedra gris fría", "Textura: pizarra, corcho, losas agrietadas", "Pincel seco: gris claro", "Acento: un poco de musgo o grietas brillantes"]),
      graveyard: base("Cementerio / suelo maldito", "Tierra fría, lápidas, hierba muerta, huesos, niebla y mampostería oscura en ruinas.", "Encaja muy bien con no muertos, ejércitos malditos y paletas grimdark frías.", ["Base: tierra oscura", "Textura: gravilla, cráneos, piedra rota", "Pincel seco: gris marrón frío", "Acento: hierba muerta o hueso"]),
      forest: base("Suelo de bosque, raíces y musgo", "Raíces, musgo, hojas, tierra húmeda, ramas caídas y vegetación de reino vivo.", "Bueno para bestias, cazadores, Sylvaneth y esquemas naturalistas.", ["Base: tierra oscura", "Textura: raíces, corteza, hojas", "Pincel seco: tostado o verde musgo", "Acento: matojos de hierba"]),
      swamp: base("Pantano / marisma", "Barro húmedo, juncos, agua estancada, algas, huesos y piedras medio hundidas.", "Útil para ambientes sucios, no muertos, monstruosos o cercanos a Nurgle.", ["Base: marrón oliva oscuro", "Textura: barro, juncos, piedras", "Brillo: charcos de agua", "Acento: hierba enfermiza"]),
      desert: base("Desierto, estepa o polvo ocre", "Arena seca, tierra agrietada, polvo cálido, rocas blanqueadas por el sol y matorral escaso.", "Excelente para esquemas azules, verdes, morados o fríos.", ["Base: marrón ocre", "Textura: arena y rocas", "Pincel seco: hueso o arena pálida", "Acento: hierba seca"]),
      snow: base("Nieve, escarcha y piedra pálida", "Parches de nieve, piedras heladas, hierba escarchada, ceniza pálida y fragmentos de mármol frío.", "Úsalo con modelos oscuros para contraste de silueta.", ["Base: roca oscura", "Pincel seco: gris pálido", "Nieve: añadir en parches", "Acento: cristales de hielo"]),
      volcanic: base("Ceniza, lava y suelo quemado", "Ceniza negra, lava agrietada, tierra carbonizada, hollín, cráneos y piedra chamuscada.", "Bueno para Caos, ambientes de fuego, monstruos y acentos cálidos brillantes.", ["Base: ceniza marrón negra", "Textura: pasta agrietada", "Pincel seco: ceniza gris", "Acento: grietas de lava"]),
      arcane: base("Runas / cristales arcanos", "Piedra rúnica, círculos de hechizo, cristales, libros, humo y fragmentos de terreno mágico.", "Ideal para magos, campeones y colores de acento mágico fuertes.", ["Base: piedra neutra", "Textura: líneas talladas", "Brillo: repetir el acento focal", "Acento: cristales"]),
      ghur: base("Yermos de Ghur", "Polvo, tierra seca, rocas, barro agrietado, huesos, restos de trofeos y terreno de caza.", "Encaja muy bien con Destrucción, monstruos y bestias.", ["Base: tierra rojiza", "Textura: rocas y huesos", "Pincel seco: polvo tostado", "Acento: matojos secos"]),
      coastal: base("Costa, arrecife o piedra húmeda", "Rocas mojadas, charcas de marea, conchas, muelles rotos, fragmentos de coral y ruinas pulidas por el mar.", "Úsalo para fuerzas marinas, ruinas húmedas y monstruos acuáticos.", ["Base: roca azul gris", "Textura: arena, conchas, pizarra", "Brillo: charcas de marea", "Acento: coral"]),
      neutral: base("Escombros neutros", "Escombros marrón gris, mampostería rota, tierra, raíces y piedras pequeñas.", "Opción segura porque apoya paletas cálidas y frías.", ["Base: tierra marrón gris", "Textura: gravilla y piedra", "Pincel seco: tostado gris", "Acento: matojos apagados"]),
      darkMud: base("Barro oscuro / tierra ennegrecida", "Suelo mojado, terreno quemado, tierra de tumba, fango de pantano o campo de batalla removido.", "Mantiene asentados los modelos brillantes.", ["Base: sombra tostada oscura", "Textura: barro y gravilla", "Brillo: zonas húmedas", "Acento: hierba muerta"]),
      lightAsh: base("Ceniza clara, nieve o piedra pálida", "Yermo de ceniza, parches de nieve, astillas de mármol, piedra blanqueada o arena seca.", "Aumenta el contraste de silueta para modelos oscuros.", ["Base: gris beige pálido", "Textura: gravilla fina", "Pincel seco: blanco roto", "Acento: piedras oscuras"]),
      darkRim: base("Borde oscuro y contorno controlado", "Borde marrón negro, textura tranquila y desgaste contenido alrededor del modelo.", "Mantiene la peana visualmente contenida.", ["Borde: marrón negro", "Mantener la textura dentro", "Evitar colores de borde brillantes", "Empolvar las piernas inferiores"]),
      urban: base("Escombros urbanos", "Hormigón, barras de refuerzo, polvo, carretera rota, restos metálicos y daños de proyectil.", "Enmarcado clásico de campo de batalla 40K para infantería y blindados.", ["Base: hormigón oscuro", "Textura: escombros y gravilla", "Pincel seco: gris frío", "Acento: franja de peligro o polvo"]),
      ashWaste: base("Yermo de ceniza", "Polvo gris, tierra pálida, cráteres de proyectil, restos oxidados y suelo quemado.", "Funciona con la mayoría de ejércitos 40K y apoya armaduras brillantes.", ["Base: ceniza gris marrón", "Textura: gravilla fina", "Pincel seco: polvo pálido", "Acento: óxido o casquillos gastados"]),
      hive: base("Cubierta de colmena / subciudad", "Suelo de metal oscuro, mugre, cables, respiraderos, marcas de peligro y manchas de aceite.", "Excelente para 40K industrial, ambientes Necromunda y peanas de vehículos.", ["Base: metal oscuro", "Textura: rejilla o placas", "Desgaste: aceite y óxido", "Acento: color de peligro"]),
      jungle: base("Jungla de mundo letal", "Barro denso, enredaderas, raíces, hojas húmedas, plantas alienígenas y piedra rota.", "Bueno para xenos, Tiránidos, exploradores y campos de batalla invadidos por vegetación.", ["Base: barro oscuro", "Textura: raíces y hojas", "Brillo: zonas húmedas", "Acento: planta brillante"]),
      alien: base("Crecimiento de mundo alienígena", "Suelo púrpura, cristales extraños, esporas, quitina y vegetación antinatural.", "Apoya paletas xenos y bioorgánicas.", ["Base: suelo alienígena apagado", "Textura: cristales o esporas", "Pincel seco: violeta pálido", "Acento: brillo tóxico"]),
      shipDeck: base("Cubierta de nave", "Placas de metal frío, remaches, cables, líneas de peligro y mugre de maquinaria.", "Útil para abordajes, vehículos y escenas navales 40K.", ["Base: acero oscuro", "Textura: placas y remaches", "Desgaste: mugre", "Acento: franja de advertencia"])
    },
    citadel: {
      loaded: "Se han cargado {count} pinturas del catálogo desde el JSON.",
      sample: "Usando {count} pinturas de muestra hasta que se cargue el JSON.",
      missing: "Aún no hay datos del catálogo de pinturas.",
      closest: "Coincidencias más cercanas",
      distance: "distancia {distance}"
    },
    copy: {
      palette: "Paleta",
      roles: "Planificador de roles",
      bases: "Sugerencias de entornos de peana",
      ladder: "Sombra / Capa / Luz",
      citadel: "Equivalencias del catálogo"
    }
  });

  function base(title, use, tip, recipe) {
    return { title, use, tip, recipe };
  }

  function getByPath(source, path) {
    return path.split(".").reduce((value, part) => {
      if (value && Object.prototype.hasOwnProperty.call(value, part)) {
        return value[part];
      }
      return undefined;
    }, source);
  }

  function interpolate(value, params) {
    if (typeof value !== "string" || !params) {
      return value;
    }
    return value.replace(/\{(\w+)\}/g, (match, key) => (
      Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match
    ));
  }

  function createTranslator(language) {
    const lang = LANGUAGE_KEYS.includes(language) ? language : "en";
    return function translate(path, params) {
      const translated = getByPath(TRANSLATIONS[lang], path);
      const fallback = getByPath(TRANSLATIONS.en, path);
      const value = translated === undefined ? fallback : translated;
      return interpolate(value === undefined ? path : value, params);
    };
  }

  function hasLanguage(language) {
    return LANGUAGE_KEYS.includes(language);
  }

  return {
    LANGUAGE_KEYS,
    TRANSLATIONS,
    createTranslator,
    hasLanguage
  };
}));
