(function (root, factory) {
  const api = factory();
  root.WPH = Object.assign(root.WPH || {}, api);
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const LANGUAGE_KEYS = ["en", "de", "fr"];

  const TRANSLATIONS = {
    en: {
      appTitle: "Warhammer Paint Helper",
      ui: {
        language: "Language",
        system: "Game system",
        eyebrow: "Miniature Palette Tool",
        title: "Warhammer Paint Helper",
        subtitle: "Pick a main color and generate a miniature-ready palette with model roles, base ideas, paint steps, and Citadel paint matches.",
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
        extraMaterials: "Extra materials",
        copyPalette: "Copy palette",
        copied: "Copied",
        randomColor: "Random color",
        miniPreview: "Miniature preview",
        paintingNotes: "Painting notes",
        rolePlannerDescription: "Concrete assignments for surfaces, materials, focus accents, and base details.",
        baseAdviceDescription: "Base concepts with contrast logic, mood, material colors, and a short build recipe.",
        modelRoles: "Model roles",
        modelRolesDescription: "Short overview of the generated main colors.",
        paintLadderDescription: "Practical paint steps for shadows, basecoat, layers, edge highlights, and focus light.",
        citadelMatches: "Citadel paint matches",
        accessoryMaterials: "Accessory and material colors",
        accessoryMaterialsDescription: "Disabled by default.",
        noMaterials: "No extra materials selected.",
        why: "Why",
        build: "Build",
        debug: "Debug: main color {hex} | first palette card {firstHex} | HSL({h}, {s}%, {l}%) | finish {finish}",
        citadelJsonHint: "Drop the full paint list into data/citadel-colours.json when it is ready."
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
        weathering: "Use in exhausts, chips, oil marks, heat staining, and dirt buildup."
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
        cloth: "Highlight folds wider than hard armor edges."
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
        groups: {
          woods: { label: "Wood and leather", description: "For grips, bows, bags, straps, shields, and bases." },
          neutrals: { label: "White, bone, and cloth", description: "For parchment, skulls, teeth, cloaks, ropes, and bright contrast." },
          metals: { label: "Metals", description: "Silver, iron, bronze, and gold for weapons, jewelry, and fittings." }
        },
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
        loaded: "Loaded {count} Citadel paints from JSON.",
        sample: "Using {count} sample Citadel paints until the full JSON is added.",
        missing: "No Citadel paint data available yet.",
        closest: "Closest matches",
        distance: "distance {distance}"
      },
      copy: {
        palette: "Palette",
        roles: "Role planner",
        bases: "Base environment suggestions",
        ladder: "Shade / Layer / Highlight",
        citadel: "Citadel paint matches",
        materials: "Accessory materials"
      }
    },
    de: {
      appTitle: "Warhammer Paint Helper",
      ui: {
        language: "Sprache",
        system: "Spielsystem",
        eyebrow: "Miniaturen-Paletten-Tool",
        title: "Warhammer Paint Helper",
        subtitle: "Wähle eine Hauptfarbe und erzeuge eine miniaturentaugliche Palette mit Modellrollen, Base-Ideen, Malstufen und Citadel-Farbtreffern.",
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
        extraMaterials: "Zusatzmaterialien",
        copyPalette: "Palette kopieren",
        copied: "Kopiert",
        randomColor: "Zufallsfarbe",
        miniPreview: "Miniaturen-Vorschau",
        paintingNotes: "Bemalhinweise",
        rolePlannerDescription: "Konkrete Zuordnung für Flächen, Materialien, Fokusakzente und Base-Details.",
        baseAdviceDescription: "Base-Konzepte mit Kontrastlogik, Stimmung, Materialfarben und kurzem Bau-Rezept.",
        modelRoles: "Rollen am Modell",
        modelRolesDescription: "Kurzüberblick der generierten Hauptfarben.",
        paintLadderDescription: "Praktische Malstufen für Schatten, Basecoat, Layer, Kantenhighlights und Fokuslicht.",
        citadelMatches: "Citadel-Farbtreffer",
        accessoryMaterials: "Zubehör- und Materialfarben",
        accessoryMaterialsDescription: "Standardmäßig deaktiviert.",
        noMaterials: "Keine Zusatzmaterialien ausgewählt.",
        why: "Warum",
        build: "Bau",
        debug: "Debug: Hauptfarbe {hex} | erste Palettenkarte {firstHex} | HSL({h}, {s}%, {l}%) | Finish {finish}",
        citadelJsonHint: "Lege die vollständige Farbliste in data/citadel-colours.json ab, sobald sie bereit ist."
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
        subtitle: "Choisis une couleur principale et génère une palette pour figurines avec rôles, idées de socle, étapes de peinture et correspondances Citadel.",
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
        extraMaterials: "Matériaux supplémentaires",
        copyPalette: "Copier la palette",
        copied: "Copié",
        randomColor: "Couleur aléatoire",
        miniPreview: "Aperçu de figurine",
        paintingNotes: "Notes de peinture",
        rolePlannerDescription: "Assignations concrètes pour surfaces, matériaux, accents et détails de socle.",
        baseAdviceDescription: "Concepts de socle avec logique de contraste, ambiance, couleurs de matériaux et recette courte.",
        modelRoles: "Rôles sur le modèle",
        modelRolesDescription: "Aperçu court des couleurs principales générées.",
        paintLadderDescription: "Étapes pratiques pour ombres, basecoat, layers, edge highlights et lumière focale.",
        citadelMatches: "Correspondances Citadel",
        accessoryMaterials: "Couleurs d'accessoires et de matériaux",
        accessoryMaterialsDescription: "Désactivé par défaut.",
        noMaterials: "Aucun matériau supplémentaire sélectionné.",
        why: "Pourquoi",
        build: "Construction",
        debug: "Debug : couleur principale {hex} | première carte {firstHex} | HSL({h}, {s}%, {l}%) | finition {finish}",
        citadelJsonHint: "Dépose la liste complète dans data/citadel-colours.json quand elle sera prête."
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
    }
  };

  inherit("de", [
    "placements", "roleAreas", "roleUses", "roleTips", "ladder", "materials", "bases", "citadel", "copy"
  ]);
  inherit("fr", [
    "placements", "roleAreas", "roleUses", "roleTips", "ladder", "materials", "bases", "citadel", "copy"
  ]);

  function base(title, use, tip, recipe) {
    return { title, use, tip, recipe };
  }

  function inherit(language, keys) {
    keys.forEach(key => {
      TRANSLATIONS[language][key] = TRANSLATIONS.en[key];
    });
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
