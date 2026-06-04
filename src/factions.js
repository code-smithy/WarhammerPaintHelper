(function (root, factory) {
  const api = factory();
  root.WPH = Object.assign(root.WPH || {}, api);
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DEFAULT_FACTION_SCHEME_DATA = {
  "source": "faction colours.xlsx",
  "roleLegend": {
    "D": "Dominant colour",
    "S": "Secondary colour",
    "ND": "Near-dark neutral",
    "NL": "Near-light neutral",
    "A1": "Accent 1",
    "A2": "Accent 2"
  },
  "schemes": [
    {
      "id": "k40-space-marines-ultramarines",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Ultramarines",
      "schemeName": "Macragge Blue",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#184A83"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D4B25A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#12151A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F1F3F5"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C73732"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8A5C34"
        }
      ],
      "paintEquivalents": "Macragge Blue, Retributor Armour, Corax White, Mephiston Red",
      "notes": "White omega badge; gold trim on veterans/characters; black guns; crisp edge highlights, satin armour"
    },
    {
      "id": "k40-space-marines-dark-angels",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Dark Angels",
      "schemeName": "Caliban Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#203F2E"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E8D9B7"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#111316"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EAE7DD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A61F24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A244"
        }
      ],
      "paintEquivalents": "Caliban Green, Zandri Dust, Wraithbone",
      "notes": "Bone robes/Deathwing elements; red weapon details; chapter icon in cream/white; often deep matte green"
    },
    {
      "id": "k40-space-marines-blood-angels",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Blood Angels",
      "schemeName": "Baal Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B32626"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D7B35A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#151517"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3F1EB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#202020"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#F6F6F6"
        }
      ],
      "paintEquivalents": "Mephiston Red, Retributor Armour, Abaddon Black",
      "notes": "Black weapon casings; blood-drop icons; helmets denote role; glossy reds often shaded warm"
    },
    {
      "id": "k40-space-marines-space-wolves",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Space Wolves",
      "schemeName": "Fenris Grey",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7A8797"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D2B44B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#1E2228"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9D6CE"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B23A2C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8C6645"
        }
      ],
      "paintEquivalents": "The Fang / Russ Grey family, Averland-type yellow",
      "notes": "Yellow pack markings; red company markings; pelts, leather, bone trophies; weathered, cold finish"
    },
    {
      "id": "k40-space-marines-black-templars",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Black Templars",
      "schemeName": "Crusade Black",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#111316"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F3F3F0"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E6DED0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A31E24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A046"
        }
      ],
      "paintEquivalents": "Chaos Black, Corax White, Mephiston Red",
      "notes": "White shoulder pads with black cross; red weapons; tabards vary by crusade; strong matte black preferred"
    },
    {
      "id": "k40-space-marines-deathwatch",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Deathwatch",
      "schemeName": "Long Vigil Black",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#121417"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#9FA4AA"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0C"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EDEBE6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A72022"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C39A3F"
        }
      ],
      "paintEquivalents": "Abaddon Black, Leadbelcher/Stormhost Silver",
      "notes": "Silver left arm/pauldron; chapter shoulder retained on right; black armour rewards sharp highlights"
    },
    {
      "id": "k40-space-marines-grey-knights",
      "system": "k40",
      "faction": "Space Marines",
      "subfaction": "Grey Knights",
      "schemeName": "Titan Silver",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#A8ADB3"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C9A24C"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#334050"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F1F1EE"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A02123"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#3B6FA7"
        }
      ],
      "paintEquivalents": "Leadbelcher/grey-silver mix, Retributor Armour",
      "notes": "Silver plate with blue steel shading; red or white heraldry; script, seals, gold trim, force-weapon glow"
    },
    {
      "id": "k40-adepta-sororitas-order-of-our-martyred-lady",
      "system": "k40",
      "faction": "Adepta Sororitas",
      "subfaction": "Order of Our Martyred Lady",
      "schemeName": "Black and Red Ecclesiarchy",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#141519"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8B1D23"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8DEC9"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D3B265"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#F2F2F0"
        }
      ],
      "paintEquivalents": "Abaddon Black, Khorne/Mephiston Red, Rakarth/Wraithbone",
      "notes": "Black power armour; red inner robes; parchment and fleur-de-lis; satin black with bright cream cloth"
    },
    {
      "id": "k40-adepta-sororitas-order-of-the-bloody-rose",
      "system": "k40",
      "faction": "Adepta Sororitas",
      "subfaction": "Order of the Bloody Rose",
      "schemeName": "Crimson Zeal",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8E1F24"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#141519"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DDC6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D2B15A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#F2F2EF"
        }
      ],
      "paintEquivalents": "Mephiston/Khorne Red, Abaddon Black",
      "notes": "More red-heavy than OML; black secondary armour/robes; aggressive gold and parchment details"
    },
    {
      "id": "k40-adepta-sororitas-order-of-the-argent-shroud",
      "system": "k40",
      "faction": "Adepta Sororitas",
      "subfaction": "Order of the Argent Shroud",
      "schemeName": "Argent Silver",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B8BCC2"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8A1A22"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#16181C"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3F3F1"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D1AE55"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6C7076"
        }
      ],
      "paintEquivalents": "Leadbelcher/Stormhost silver, Mephiston Red",
      "notes": "Silver armour with black underlayers; red cloth/iconography; clean metallic finish is most canonical"
    },
    {
      "id": "k40-adeptus-mechanicus-mars",
      "system": "k40",
      "faction": "Adeptus Mechanicus",
      "subfaction": "Mars",
      "schemeName": "Martian Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8F1F1F"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F0E7D7"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#16181A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9D4CA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B79050"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#56A44E"
        }
      ],
      "paintEquivalents": "Mephiston/Khorne Red, Corax White, Abaddon Black",
      "notes": "Red robes, white panels, black undersuits; brass/bronze metals; cog motifs and glowing lenses"
    },
    {
      "id": "k40-adeptus-mechanicus-ryza",
      "system": "k40",
      "faction": "Adeptus Mechanicus",
      "subfaction": "Ryza",
      "schemeName": "Ryza Orange",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D46A24"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F0E8D8"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#171819"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DDD6C8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B78D52"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#4CB6E8"
        }
      ],
      "paintEquivalents": "Ryza/bright orange family, off-white, black",
      "notes": "Officially called out as unusually orange; plasma coils and heat-stained metals suit the lore well"
    },
    {
      "id": "k40-adeptus-mechanicus-lucius",
      "system": "k40",
      "faction": "Adeptus Mechanicus",
      "subfaction": "Lucius",
      "schemeName": "Solar White",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#EFE7D8"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#9C1E22"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#18191B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DAD5CB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B88F50"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#58B4E8"
        }
      ],
      "paintEquivalents": "White Scar, red robe accents, black undersuit",
      "notes": "White-heavy livery; red casing/robes used as contrast; teleport-heavy forge world, usually neat and bright"
    },
    {
      "id": "k40-adeptus-mechanicus-stygies-viii",
      "system": "k40",
      "faction": "Adeptus Mechanicus",
      "subfaction": "Stygies VIII",
      "schemeName": "Shadow Forge",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#18191B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8B1C23"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#0A0B0C"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D2C8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F6A3C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#4CAAB0"
        }
      ],
      "paintEquivalents": "Abaddon Black, dark reds, bronze",
      "notes": "Dark uniforms explicitly emphasized; stealthier look, less white; bronze and muted glow colours fit best"
    },
    {
      "id": "k40-astra-militarum-cadian-shock-troops",
      "system": "k40",
      "faction": "Astra Militarum",
      "subfaction": "Cadian Shock Troops",
      "schemeName": "Cadian 8th",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#5E6A4B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B59C6A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#24272B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D1C7AF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#982B27"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8B7350"
        }
      ],
      "paintEquivalents": "Castellan/Deathworld greens, Zandri-like khaki",
      "notes": "Olive armour with tan fatigues; tanks love weathering; white squad numbers, hazard wear, dust"
    },
    {
      "id": "k40-astra-militarum-death-korps-of-krieg",
      "system": "k40",
      "faction": "Astra Militarum",
      "subfaction": "Death Korps of Krieg",
      "schemeName": "Krieg Blue-Grey",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#6A7887"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#BBAA83"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2C31"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D5CEC2"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#9E2A24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#59616A"
        }
      ],
      "paintEquivalents": "Blue-grey coat palette, tan leathers",
      "notes": "Greatcoats, gas masks, dull steel; mud, pigment weathering, trench grime, chipped helmets are typical"
    },
    {
      "id": "k40-astra-militarum-catachan-jungle-fighters",
      "system": "k40",
      "faction": "Astra Militarum",
      "subfaction": "Catachan Jungle Fighters",
      "schemeName": "Jungle Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#54613E"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#6F8B57"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A24"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#B78F70"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#922823"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#7A5734"
        }
      ],
      "paintEquivalents": "Camo greens, flesh tones, leather browns",
      "notes": "Olive gear, bare arms, heavy leather and grime; less formal markings, more field-worn look"
    },
    {
      "id": "k40-adeptus-custodes-shield-companies",
      "system": "k40",
      "faction": "Adeptus Custodes",
      "subfaction": "Shield Companies",
      "schemeName": "Classic Auramite",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#C59A43"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8A1D24"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#15171A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3EFE7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#3A72A8"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#E7D8BF"
        }
      ],
      "paintEquivalents": "Retributor/auramite gold, rich red cloth",
      "notes": "Official support is strongest for gold auramite as the baseline; shield companies often vary more in plumes, cloaks, gems, and markings than whole-armour colour"
    },
    {
      "id": "k40-imperial-knights-house-terryn",
      "system": "k40",
      "faction": "Imperial Knights",
      "subfaction": "House Terryn",
      "schemeName": "Terryn Blue and Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#18467E"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D0B15A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#191A1D"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3F2EC"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A52024"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#7C5332"
        }
      ],
      "paintEquivalents": "Kantor/Macragge family, gold metallics",
      "notes": "Blue-and-gold is the best-supported box-art household; quartering, heraldic shields, banners, battle scuffs"
    },
    {
      "id": "k40-imperial-knights-house-taranis",
      "system": "k40",
      "faction": "Imperial Knights",
      "subfaction": "House Taranis",
      "schemeName": "Taranis Red and White",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8D1E23"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F1F0EB"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9D4CB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D0B15A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#2A2A2A"
        }
      ],
      "paintEquivalents": "Deep red, white, gold metallics",
      "notes": "Strong heraldic quartering; Mechanicus-aligned feel; house sigils, trim lines, freehand shields common"
    },
    {
      "id": "k40-imperial-knights-house-hawkshroud",
      "system": "k40",
      "faction": "Imperial Knights",
      "subfaction": "House Hawkshroud",
      "schemeName": "Hawkshroud Yellow",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D7B13E"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#0A0B0C"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0ECE2"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A21E22"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B28D4A"
        }
      ],
      "paintEquivalents": "Averland-type yellow, black, white",
      "notes": "GW\u2019s recent dice/accessory support still calls out Hawkshroud yellow; excellent with hazard wear and soot"
    },
    {
      "id": "k40-imperial-agents-no-specific-constraint",
      "system": "k40",
      "faction": "Imperial Agents",
      "subfaction": "No specific constraint",
      "schemeName": "Inquisitorial Black-Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#18191D"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#7E151B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#0A0B0C"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DED0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B6914B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#9DA2AA"
        }
      ],
      "paintEquivalents": "Black, deep crimson, parchment, steel",
      "notes": "Official guidance stresses bespoke task forces; keep Inquisition black/red/parchment as the unifying cue, then mix attached units freely"
    },
    {
      "id": "k40-chaos-space-marines-black-legion",
      "system": "k40",
      "faction": "Chaos Space Marines",
      "subfaction": "Black Legion",
      "schemeName": "Black and Brass",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#131417"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B89245"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E2DDD4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A31E20"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6E6B66"
        }
      ],
      "paintEquivalents": "Abaddon Black, Balthasar/Retributor metallics",
      "notes": "Black plate, brass trim, red icons and eyes; clean trim work defines the scheme"
    },
    {
      "id": "k40-chaos-space-marines-iron-warriors",
      "system": "k40",
      "faction": "Chaos Space Marines",
      "subfaction": "Iron Warriors",
      "schemeName": "Iron and Hazard",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7A7E82"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D0B03E"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#131417"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D7D2C8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A21F22"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8C693C"
        }
      ],
      "paintEquivalents": "Leadbelcher, hazard yellow, black",
      "notes": "Hazard stripes are the signature; weathering, oil streaks, grime, trench wear suit them perfectly"
    },
    {
      "id": "k40-chaos-space-marines-night-lords",
      "system": "k40",
      "faction": "Chaos Space Marines",
      "subfaction": "Night Lords",
      "schemeName": "Midnight Blue",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#1C2E58"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8A6A43"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#0F1116"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E4DC"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A12125"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5BB7F0"
        }
      ],
      "paintEquivalents": "Kantor/Night Lords blue families, bronze",
      "notes": "Bronze trim, skin trophies, lightning motifs, red lenses; satin-to-gloss dark blue often works best"
    },
    {
      "id": "k40-chaos-space-marines-word-bearers",
      "system": "k40",
      "faction": "Chaos Space Marines",
      "subfaction": "Word Bearers",
      "schemeName": "Dark Crimson",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7D2026"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8D8F94"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#131417"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0C4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C9A24C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#2A2A2A"
        }
      ],
      "paintEquivalents": "Crimson reds, silver trim",
      "notes": "Red armour with dark metallic trim; books, parchments, script, daemonic runes and ash weathering are common"
    },
    {
      "id": "k40-chaos-space-marines-alpha-legion",
      "system": "k40",
      "faction": "Chaos Space Marines",
      "subfaction": "Alpha Legion",
      "schemeName": "Hydra Teal",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#287E83"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B7C2C5"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#111317"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7E3DB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2B66A7"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8A1F24"
        }
      ],
      "paintEquivalents": "Turquoise/teal metallics, silver",
      "notes": "Blue-green metallic sheen is the iconic read; hydra transfers, scale shifts, covert matte-black gear work well"
    },
    {
      "id": "k40-death-guard-no-specific-constraint",
      "system": "k40",
      "faction": "Death Guard",
      "subfaction": "No specific constraint",
      "schemeName": "Rotten Green and Bronze",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7A8660"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8D6F3D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#252821"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0BB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A1452A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#BDAA5E"
        }
      ],
      "paintEquivalents": "Death Guard Green, bronzes, bone",
      "notes": "Official box-art is green-bronze-bone with heavy rot; rust, ooze, grime, corrosion are expected finishes"
    },
    {
      "id": "k40-thousand-sons-no-specific-constraint",
      "system": "k40",
      "faction": "Thousand Sons",
      "subfaction": "No specific constraint",
      "schemeName": "Prosperine Blue and Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#1E5A93"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C6A04A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#10151C"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EDE6D8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#9A1E29"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#3EC0E8"
        }
      ],
      "paintEquivalents": "Thousand Sons Blue, gold metallics",
      "notes": "GW emphasises blue-and-gold as most frequent, while noting warbands vary widely; arcane glow effects are common"
    },
    {
      "id": "k40-world-eaters-no-specific-constraint",
      "system": "k40",
      "faction": "World Eaters",
      "subfaction": "No specific constraint",
      "schemeName": "Khorne Red and Brass",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8C1F22"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B07A3C"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#121315"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E1D4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#F1F1F1"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#2A2A2A"
        }
      ],
      "paintEquivalents": "Khorne/Mephiston reds, brass",
      "notes": "41st-millennium studio look is red/brass rather than Heresy white-blue; blood spatter is highly characteristic"
    },
    {
      "id": "k40-emperors-children-no-specific-constraint",
      "system": "k40",
      "faction": "Emperor\u2019s Children",
      "subfaction": "No specific constraint",
      "schemeName": "Excess Pink-Purple",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B53E89"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#6D2D7A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#141418"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0E4E7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D3AF57"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#111111"
        }
      ],
      "paintEquivalents": "Pinks, purples, golds, blacks",
      "notes": "Official guidance explicitly allows clashing colours, loud patterns, animal prints; bright, decadent finishes are on-brand"
    },
    {
      "id": "k40-chaos-daemons-khorne",
      "system": "k40",
      "faction": "Chaos Daemons",
      "subfaction": "Khorne",
      "schemeName": "Brass and Blood Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#A32023"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#9B6B2E"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#151313"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E4D9C7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#F2F2F0"
        }
      ],
      "paintEquivalents": "Reds, brass, black",
      "notes": "Hot reds, brass blades, charred leather, scorched basing; gore is common but not mandatory"
    },
    {
      "id": "k40-chaos-daemons-tzeentch",
      "system": "k40",
      "faction": "Chaos Daemons",
      "subfaction": "Tzeentch",
      "schemeName": "Azure and Pink Fire",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2E77C8"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D954A5"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#171826"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EFE8D9"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#E3C43F"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#63E0F6"
        }
      ],
      "paintEquivalents": "Bright blues, pinks, yellows",
      "notes": "Iridescent/candy colours work well; warpflame, magical gradients, saturated contrasts are highly canonical"
    },
    {
      "id": "k40-chaos-daemons-nurgle",
      "system": "k40",
      "faction": "Chaos Daemons",
      "subfaction": "Nurgle",
      "schemeName": "Rot Green and Bone",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#748362"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D0C29B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#312D25"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E4DED1"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8B5E2D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B64D2C"
        }
      ],
      "paintEquivalents": "Greens, bone, rust browns",
      "notes": "Diseased flesh, rust, slime, bruising, oxides and foul washes are all typical finishes"
    },
    {
      "id": "k40-chaos-daemons-slaanesh",
      "system": "k40",
      "faction": "Chaos Daemons",
      "subfaction": "Slaanesh",
      "schemeName": "Velvet Pink and Violet",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#C65AA6"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#7C3D8D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#1A1620"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2E7EA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D3B45D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5DC7D8"
        }
      ],
      "paintEquivalents": "Pinks, purples, pale flesh",
      "notes": "Sharp black-lining and gemlike gloss accents help sell the lacquered, decadent look"
    },
    {
      "id": "k40-chaos-knights-house-lucaris",
      "system": "k40",
      "faction": "Chaos Knights",
      "subfaction": "House Lucaris",
      "schemeName": "Royal Violet Tyranny",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#4E2A68"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B08A45"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#111216"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E5DDD3"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A12022"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#2A2A2A"
        }
      ],
      "paintEquivalents": "Purple, brass/gold, black",
      "notes": "Noble, decadent, heavily weathered trim; trophies and torn heraldry suit the household well"
    },
    {
      "id": "k40-chaos-knights-house-herpetrax",
      "system": "k40",
      "faction": "Chaos Knights",
      "subfaction": "House Herpetrax",
      "schemeName": "Murder Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7D1E24"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8B6B3E"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#131417"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DCD4C6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C9C5BD"
        }
      ],
      "paintEquivalents": "Deep red, bronze, black",
      "notes": "Dark red armour, corrupted trim, oily weathering, battle damage and warped iconography are typical"
    },
    {
      "id": "k40-aeldari-saim-hann",
      "system": "k40",
      "faction": "Aeldari",
      "subfaction": "Saim-Hann",
      "schemeName": "Wild Rider Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B52724"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F2F2EF"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#15171A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D2C8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A6FB0"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#0A0B0C"
        }
      ],
      "paintEquivalents": "Mephiston Red, White Scar",
      "notes": "Red-and-white is the most explicit official starter-box/paint identity; clean curves reward high-gloss smoothness"
    },
    {
      "id": "k40-aeldari-biel-tan",
      "system": "k40",
      "faction": "Aeldari",
      "subfaction": "Biel-Tan",
      "schemeName": "Thorn Green and White",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#F2F2EF"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#2E6B4A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#15171A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D7D1C5"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A32522"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C9A24C"
        }
      ],
      "paintEquivalents": "White Scar, green thorn motifs",
      "notes": "Green thorn motif on white hulls is explicitly called out by GW; very crisp panel lining suits the scheme"
    },
    {
      "id": "k40-aeldari-ulthwe",
      "system": "k40",
      "faction": "Aeldari",
      "subfaction": "Ulthw\u00e9",
      "schemeName": "Black and Bone",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D8CCAD"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EFE8D9"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D4B23F"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#51B8F0"
        }
      ],
      "paintEquivalents": "Abaddon Black, bone/ivory family",
      "notes": "GW points to \u201cmorbid black-and-bone\u201d; yellow masks/helmets often appear in older studio depictions"
    },
    {
      "id": "k40-aeldari-iyanden",
      "system": "k40",
      "faction": "Aeldari",
      "subfaction": "Iyanden",
      "schemeName": "Sunburst Yellow and Blue",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#E1B62A"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#275FA2"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#131417"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3F1E7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#9A1E25"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#D8CEB8"
        }
      ],
      "paintEquivalents": "Iyanden/Sigismund-type yellow, Macragge Blue",
      "notes": "Official articles repeatedly identify bright yellow-and-blue Iyanden; clean gem colours and white helms are common"
    },
    {
      "id": "k40-aeldari-ynnari",
      "system": "k40",
      "faction": "Aeldari",
      "subfaction": "Ynnari",
      "schemeName": "Blood Red and Black",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7C1D23"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EEE5D9"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D0B15A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6A2A70"
        }
      ],
      "paintEquivalents": "Deep crimson, black, ivory",
      "notes": "GW explicitly describes Ynnari as blood-red-and-black; ivory and gold details keep it readable"
    },
    {
      "id": "k40-drukhari-kabal-of-the-black-heart",
      "system": "k40",
      "faction": "Drukhari",
      "subfaction": "Kabal of the Black Heart",
      "schemeName": "Black Heart",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#2C6F78"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0C4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E1E24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#AEB5BE"
        }
      ],
      "paintEquivalents": "Black, teal/turquoise, steel",
      "notes": "Sleek black armour with cold edge accents; sharp panel lines, poison-glass vials, metallic edges"
    },
    {
      "id": "k40-drukhari-cult-of-strife",
      "system": "k40",
      "faction": "Drukhari",
      "subfaction": "Cult of Strife",
      "schemeName": "Crimson Wych",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8E1F23"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E9DDCF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C9A24C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B7BBC2"
        }
      ],
      "paintEquivalents": "Reds, black, pale flesh",
      "notes": "Wych cult schemes usually push skin, leather and arena flair harder than kabal armour"
    },
    {
      "id": "k40-drukhari-prophets-of-flesh",
      "system": "k40",
      "faction": "Drukhari",
      "subfaction": "Prophets of Flesh",
      "schemeName": "Pallid Coven",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D7C9B8"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#6D8B8A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2624"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0E8DF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E1E24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A9B0B7"
        }
      ],
      "paintEquivalents": "Pallid flesh, green-blue, crimson",
      "notes": "Haemonculus covens favour diseased flesh, stitches, vials, bruising and surgical metallics over clean armour"
    },
    {
      "id": "k40-necrons-szarekhan-dynasty",
      "system": "k40",
      "faction": "Necrons",
      "subfaction": "Szarekhan Dynasty",
      "schemeName": "Weathered Bronze",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8E6C45"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#2C9B86"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9D1C3"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#7C7F84"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6BFF8E"
        }
      ],
      "paintEquivalents": "Bronze metallics, turquoise glow",
      "notes": "GW\u2019s dedicated paint article explicitly foregrounds the weathered bronze of Szarekhan; aged metal and glow effects are key"
    },
    {
      "id": "k40-necrons-sautekh-dynasty",
      "system": "k40",
      "faction": "Necrons",
      "subfaction": "Sautekh Dynasty",
      "schemeName": "Gunmetal and Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8B9096"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#4FB45B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DAD3C8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8A6A45"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#0CF27A"
        }
      ],
      "paintEquivalents": "Dark silver, green glow, bronze trim",
      "notes": "Classic \u201cdefault Necron\u201d read for many hobbyists: dark metal, green weapons, occasional bronze accents"
    },
    {
      "id": "k40-necrons-nihilakh-dynasty",
      "system": "k40",
      "faction": "Necrons",
      "subfaction": "Nihilakh Dynasty",
      "schemeName": "Turquoise and Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2C7E86"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C6A24B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E2D8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#F1F1ED"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#59F08E"
        }
      ],
      "paintEquivalents": "Turquoise, gold, white, green glow",
      "notes": "Regal Egyptian feel; white panels and rich trim are common, with cleaner finish than Sautekh"
    },
    {
      "id": "k40-orks-goffs",
      "system": "k40",
      "faction": "Orks",
      "subfaction": "Goffs",
      "schemeName": "Black and White Goff",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F0F0EC"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D4C8B6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A11F23"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5C8A45"
        }
      ],
      "paintEquivalents": "Black, white, red, ork skin greens",
      "notes": "Black armour, white glyphs/checks, red touches; heavy chipping and crude contrast fit the look"
    },
    {
      "id": "k40-orks-bad-moons",
      "system": "k40",
      "faction": "Orks",
      "subfaction": "Bad Moons",
      "schemeName": "Loud Yellow",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#DDB432"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D5C8B4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A22121"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5C8A45"
        }
      ],
      "paintEquivalents": "Averland-like yellow, black, red",
      "notes": "Yellow panels, teef icons, lots of metallic scrap; grime and chips keep the yellow believable"
    },
    {
      "id": "k40-orks-evil-sunz",
      "system": "k40",
      "faction": "Orks",
      "subfaction": "Evil Sunz",
      "schemeName": "Fast Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B52724"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F1F1EE"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D4C6B2"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5A8B47"
        }
      ],
      "paintEquivalents": "Red, white, black",
      "notes": "Red vehicles and speed-freak iconography; checks, stripes and exhaust soot work especially well"
    },
    {
      "id": "k40-orks-deathskulls",
      "system": "k40",
      "faction": "Orks",
      "subfaction": "Deathskulls",
      "schemeName": "Looted Blue",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2B5D9B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F1F1EE"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#16171A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D0C6B6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A12222"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5C8A45"
        }
      ],
      "paintEquivalents": "Mid blue, white, black",
      "notes": "Blue armour/clothing alongside looted gear; white dags/checks and rust are strongly on-theme"
    },
    {
      "id": "k40-tau-empire-viorla-sept",
      "system": "k40",
      "faction": "T\u2019au Empire",
      "subfaction": "Vior\u2019la Sept",
      "schemeName": "White and Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#F2F2EF"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#A11E22"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#20242B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D6D9DE"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6CC8F1"
        }
      ],
      "paintEquivalents": "White Scar, red sept markings, grey/black undersuit",
      "notes": "GW explicitly identifies Vior\u2019la white armour with red sept iconography as the common box-art look"
    },
    {
      "id": "k40-tau-empire-tau-sept",
      "system": "k40",
      "faction": "T\u2019au Empire",
      "subfaction": "T\u2019au Sept",
      "schemeName": "Ochre Sept",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B38B48"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F2F2EF"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#30343B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D3C7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A21E22"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5BC3E9"
        }
      ],
      "paintEquivalents": "Ochre/tan armour, white sept markings",
      "notes": "T\u2019au armour can change for camouflage, but sept markings remain the main consistent identifier"
    },
    {
      "id": "k40-tau-empire-farsight-enclaves",
      "system": "k40",
      "faction": "T\u2019au Empire",
      "subfaction": "Farsight Enclaves",
      "schemeName": "Farsight Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8E2024"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F0F1EE"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#171A20"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9D6CF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6ACAF0"
        }
      ],
      "paintEquivalents": "Crimson red, white, dark grey",
      "notes": "Commander Farsight\u2019s blood-red panels define the enclave look; weathered battlesuits suit the narrative"
    },
    {
      "id": "k40-tyranids-hive-fleet-leviathan",
      "system": "k40",
      "faction": "Tyranids",
      "subfaction": "Hive Fleet Leviathan",
      "schemeName": "Purple and Bone",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#E0D5BD"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#52306D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#15151A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3F0E8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8A4AA2"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#7C1E22"
        }
      ],
      "paintEquivalents": "Wraithbone, Magos Purple, Naggaroth Night",
      "notes": "GW explicitly describes \u201cpurple-and-bone\u201d; high-contrast carapace edges and organic pink shading are canonical"
    },
    {
      "id": "k40-tyranids-hive-fleet-behemoth",
      "system": "k40",
      "faction": "Tyranids",
      "subfaction": "Hive Fleet Behemoth",
      "schemeName": "Crimson and Near-Black Blue",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B42724"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#1B2B43"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#111216"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DFD1"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#E06A2C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#922826"
        }
      ],
      "paintEquivalents": "Mephiston Red, Corvus Black, Temple Guard Blue",
      "notes": "Officially: radiant crimson bodies, dark blue near-black carapace; glossy claws and teeth help readability"
    },
    {
      "id": "k40-tyranids-hive-fleet-kraken",
      "system": "k40",
      "faction": "Tyranids",
      "subfaction": "Hive Fleet Kraken",
      "schemeName": "Bone and Bright Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D8C7A2"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#AE2325"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#151417"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2EEDF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#5C5B56"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8D2A23"
        }
      ],
      "paintEquivalents": "Wraithbone, Skeleton Horde, Flesh Tearers Red",
      "notes": "Officially: deep bone body and bright red plates; very fast to batch paint, reads instantly on table"
    },
    {
      "id": "k40-tyranids-hive-fleet-jormungandr",
      "system": "k40",
      "faction": "Tyranids",
      "subfaction": "Hive Fleet Jormungandr",
      "schemeName": "Black and Yellow-Brown",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C09B33"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DCCFAA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#6B6C70"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8E6C35"
        }
      ],
      "paintEquivalents": "Abaddon Black, Averland Sunset, sepia shade",
      "notes": "Officially: predominantly black bodies with sharply contrasting yellow-brown carapace"
    },
    {
      "id": "k40-tyranids-hive-fleet-gorgon",
      "system": "k40",
      "faction": "Tyranids",
      "subfaction": "Hive Fleet Gorgon",
      "schemeName": "Green Flesh and Bone",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#73885A"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D8D0B4"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#242822"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0EBDD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8A5E34"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#65C46E"
        }
      ],
      "paintEquivalents": "Death Guard Green, Screaming Skull",
      "notes": "Officially: vibrant green flesh beneath a bone carapace; good candidate for toxic slime accents"
    },
    {
      "id": "k40-genestealer-cults-cult-of-the-four-armed-emperor",
      "system": "k40",
      "faction": "Genestealer Cults",
      "subfaction": "Cult of the Four-Armed Emperor",
      "schemeName": "Grey and Purple",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#6D7179"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#6A4B7E"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#22242A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#CFC8BA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B67F5B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8E1F22"
        }
      ],
      "paintEquivalents": "Neutral greys, purple cloth, pallid skin",
      "notes": "GW explicitly calls out the classic grey-and-purple Combat Patrol look for this cult"
    },
    {
      "id": "k40-genestealer-cults-twisted-helix",
      "system": "k40",
      "faction": "Genestealer Cults",
      "subfaction": "Twisted Helix",
      "schemeName": "Toxic Bioform",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#94B548"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E6D7B8"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A25"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0EBDD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#6A4B7C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C4558F"
        }
      ],
      "paintEquivalents": "Sickly greens, cream, purple",
      "notes": "Best read with bio-lab greens, pallid flesh and industrial neutrals; mutation emphasis suits the cult"
    },
    {
      "id": "k40-genestealer-cults-rusted-claw",
      "system": "k40",
      "faction": "Genestealer Cults",
      "subfaction": "Rusted Claw",
      "schemeName": "Dust-Orange Outrider",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B46F3E"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#5E7A85"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2B2D30"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DAD0C0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E1F22"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C5A86B"
        }
      ],
      "paintEquivalents": "Dust orange, teal-grey, leather browns",
      "notes": "Vehicle-heavy, nomad/industrial read; dust weathering and oxide effects sell the identity fast"
    },
    {
      "id": "k40-leagues-of-votann-greater-thurian-league",
      "system": "k40",
      "faction": "Leagues of Votann",
      "subfaction": "Greater Thurian League",
      "schemeName": "Teal and Cream",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2D7C78"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E7E1D1"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2D33"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F4F2EC"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A52224"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#7A7D86"
        }
      ],
      "paintEquivalents": "Teal armour, cream plates, red details",
      "notes": "GW explicitly identifies GTL teal-and-white/cream as iconic; clean hard edges and panel weathering work well"
    },
    {
      "id": "k40-leagues-of-votann-ymyr-conglomerate",
      "system": "k40",
      "faction": "Leagues of Votann",
      "subfaction": "Ymyr Conglomerate",
      "schemeName": "Red and Black",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8C1F23"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#18191D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EAE3D8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C7A24C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5FC8F0"
        }
      ],
      "paintEquivalents": "Red armour, black, cream",
      "notes": "Official community showcases repeatedly identify Ymyr as bold black-and-red; plasma glow makes a strong accent"
    },
    {
      "id": "k40-leagues-of-votann-trans-hyperian-alliance",
      "system": "k40",
      "faction": "Leagues of Votann",
      "subfaction": "Trans-Hyperian Alliance",
      "schemeName": "Orange Pioneer",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D46C23"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F1F1EE"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#21242B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D4CD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#18191D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5FC7F0"
        }
      ],
      "paintEquivalents": "Bright orange, white, black arm markings",
      "notes": "GW calls out veterans painting one arm black; orange-and-white is the most recognisable THA read"
    },
    {
      "id": "k40-leagues-of-votann-urani-surtr-regulates",
      "system": "k40",
      "faction": "Leagues of Votann",
      "subfaction": "Urani-Surtr Regulates",
      "schemeName": "Resilient Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#556B45"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E5DFD0"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#24272D"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2F0EA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A62224"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#7C7F86"
        }
      ],
      "paintEquivalents": "Olive/green armour, cream",
      "notes": "WarCom explicitly refers to the \u201cresilient green armour\u201d of the Regulates; durable, lower-saturation look suits them"
    },
    {
      "id": "aos-stormcast-eternals-hammers-of-sigmar",
      "system": "aos",
      "faction": "Stormcast Eternals",
      "subfaction": "Hammers of Sigmar",
      "schemeName": "Sigmarite Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#C59A43"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#235A9A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#15171A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2F2EE"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#9D1F24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#D8D0C4"
        }
      ],
      "paintEquivalents": "Gold metallics, Kantor/Macragge blue, white",
      "notes": "The default studio Stormcast look; bright sigmarite, blue cloth, white iconography, neat edge-work"
    },
    {
      "id": "aos-stormcast-eternals-hallowed-knights",
      "system": "aos",
      "faction": "Stormcast Eternals",
      "subfaction": "Hallowed Knights",
      "schemeName": "Silver and Azure",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B9BDC4"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#285C9A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2F1EB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C6A24C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#9F1E23"
        }
      ],
      "paintEquivalents": "Silver metallics, blue cloth",
      "notes": "Silver-armour Stormhost read is widely used; gold details and scripture give strong contrast"
    },
    {
      "id": "aos-stormcast-eternals-anvils-of-the-heldenhammer",
      "system": "aos",
      "faction": "Stormcast Eternals",
      "subfaction": "Anvils of the Heldenhammer",
      "schemeName": "Black and Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C39A43"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E5DED1"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#4CB6E8"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#F2F2EF"
        }
      ],
      "paintEquivalents": "Black, gold, pale cloth",
      "notes": "Deep black plate with gold trim; turquoise/blue spectral accents often help keep it readable"
    },
    {
      "id": "aos-stormcast-eternals-tempest-lords",
      "system": "aos",
      "faction": "Stormcast Eternals",
      "subfaction": "Tempest Lords",
      "schemeName": "Regal Purple and Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#6A2F7C"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C49B43"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F1F0EA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#F2F2EF"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A22124"
        }
      ],
      "paintEquivalents": "Purple cloth/plates, gold metallics",
      "notes": "Official paint support points to broader Stormhost variety; purple-and-gold is the key recognisable Tempest Lords cue"
    },
    {
      "id": "aos-cities-of-sigmar-hammerhal-aqsha",
      "system": "aos",
      "faction": "Cities of Sigmar",
      "subfaction": "Hammerhal Aqsha",
      "schemeName": "Hammerhal Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#922123"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E6DDCF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C49B46"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B3BAC3"
        }
      ],
      "paintEquivalents": "Red cloth, black, brass/steel",
      "notes": "City heraldry matters as much as cloth; banners, shields, municipal symbols and weathered steel are typical"
    },
    {
      "id": "aos-cities-of-sigmar-greywater-fastness",
      "system": "aos",
      "faction": "Cities of Sigmar",
      "subfaction": "Greywater Fastness",
      "schemeName": "Gunmetal Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#58624C"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B28F50"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#242628"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DDD5C7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E2024"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#AEB5BE"
        }
      ],
      "paintEquivalents": "Greens, brass/steel, cream",
      "notes": "Industrial city look; soot, cannon grime, brass fittings and campaign wear fit perfectly"
    },
    {
      "id": "aos-cities-of-sigmar-lethis",
      "system": "aos",
      "faction": "Cities of Sigmar",
      "subfaction": "Lethis",
      "schemeName": "Shyish Purple",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#5F3E72"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E3DDCF"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F1EEE7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B28F4C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8D2022"
        }
      ],
      "paintEquivalents": "Purple cloth, pale panels",
      "notes": "Mortuary/Shyish tone works well with cream tabards and darker steel; cleaner civic heraldry than Greywater"
    },
    {
      "id": "aos-seraphon-starborne",
      "system": "aos",
      "faction": "Seraphon",
      "subfaction": "Starborne",
      "schemeName": "Celestial Blue-Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2D7CC4"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C9A34C"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#16171B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EDE5D7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D958A5"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#59D4F5"
        }
      ],
      "paintEquivalents": "Bright blues, golds, glows",
      "notes": "GW explicitly frames Starborne vs Coalesced as the central paint split; bright, magical glows suit Starborne"
    },
    {
      "id": "aos-seraphon-coalesced",
      "system": "aos",
      "faction": "Seraphon",
      "subfaction": "Coalesced",
      "schemeName": "Jungle Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#55824E"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C58A35"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2D22"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DDD2BC"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E1F23"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#59C8A6"
        }
      ],
      "paintEquivalents": "Greens, oranges, bone",
      "notes": "More naturalistic than Starborne; scales, jungle wear, earthy bases and matte skin are typical"
    },
    {
      "id": "aos-seraphon-fangs-of-sotek",
      "system": "aos",
      "faction": "Seraphon",
      "subfaction": "Fangs of Sotek",
      "schemeName": "Blue and Red Crest",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2F71B6"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#A52524"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#15171A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E0D0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C6A24C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#58D4F0"
        }
      ],
      "paintEquivalents": "Blue scales, red crests, gold details",
      "notes": "Strong starborne-aligned blue/red contrast; crests and jade/gold details help the scheme pop"
    },
    {
      "id": "aos-sylvaneth-heartwood",
      "system": "aos",
      "faction": "Sylvaneth",
      "subfaction": "Heartwood",
      "schemeName": "Ancient Bark",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#6B5437"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#6FC9C3"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2E251E"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D5C5A7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B45E2B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A3D94C"
        }
      ],
      "paintEquivalents": "Bark browns, spirit turquoise, leaf greens",
      "notes": "Sylvaneth glades are less rigid than marine chapters; bark texture, spirit glow and seasonal basing matter most"
    },
    {
      "id": "aos-sylvaneth-winterleaf",
      "system": "aos",
      "faction": "Sylvaneth",
      "subfaction": "Winterleaf",
      "schemeName": "Frosted Grove",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7E8577"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#A8D9E8"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#34362F"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E9E4D7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B7C567"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5A7A67"
        }
      ],
      "paintEquivalents": "Grey bark, icy blues, pale leaves",
      "notes": "Cooler bark, frost effects and desaturated leaves communicate the subfaction faster than heraldry does"
    },
    {
      "id": "aos-lumineth-realm-lords-syar",
      "system": "aos",
      "faction": "Lumineth Realm-lords",
      "subfaction": "Syar",
      "schemeName": "Crimson and Ivory",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#F1EEE6"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#9B1F23"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D1C4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C8A24D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#4EB9E7"
        }
      ],
      "paintEquivalents": "Ivory/white, crimson, gold",
      "notes": "Official Lumineth guides foreground multiple colour schemes; clean ivory surfaces and gold trim are essential"
    },
    {
      "id": "aos-lumineth-realm-lords-ymetrica",
      "system": "aos",
      "faction": "Lumineth Realm-lords",
      "subfaction": "Ymetrica",
      "schemeName": "Teal and White",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#317D84"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F1F1EC"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D7D1C6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C8A24D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6FBF6E"
        }
      ],
      "paintEquivalents": "Teal, white, gold",
      "notes": "Mountain-heavy Ymetrica often looks best with stone, jade, and earth element accents"
    },
    {
      "id": "aos-lumineth-realm-lords-zaitrec",
      "system": "aos",
      "faction": "Lumineth Realm-lords",
      "subfaction": "Zaitrec",
      "schemeName": "Arcane Violet",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#6B3C86"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F0EEE7"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D7D1C5"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C8A34D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5ECBEA"
        }
      ],
      "paintEquivalents": "Purple, ivory, gold",
      "notes": "Wizard-heavy aesthetic; very clean cloth transitions and luminous gems/spells look especially appropriate"
    },
    {
      "id": "aos-kharadron-overlords-barak-nar",
      "system": "aos",
      "faction": "Kharadron Overlords",
      "subfaction": "Barak-Nar",
      "schemeName": "Navy and Brass",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#243955"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B48C4C"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#16181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E4DCCF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#F1F1EE"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8D2023"
        }
      ],
      "paintEquivalents": "Navy, brass, cream",
      "notes": "Barak-Nar is the most visible official sky-port; brass, hazard wear, sky-vessel soot and gauges are common"
    },
    {
      "id": "aos-kharadron-overlords-barak-zilfin",
      "system": "aos",
      "faction": "Kharadron Overlords",
      "subfaction": "Barak-Zilfin",
      "schemeName": "White and Teal",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#F2F2EE"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#2E7A79"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#1E232A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D2C6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B48D4B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8D2023"
        }
      ],
      "paintEquivalents": "White, teal, brass",
      "notes": "Clean bright armour over industrial metal substructures; great on balloons, fins and hull trim"
    },
    {
      "id": "aos-kharadron-overlords-barak-urbaz",
      "system": "aos",
      "faction": "Kharadron Overlords",
      "subfaction": "Barak-Urbaz",
      "schemeName": "Red Mercantile",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8F2124"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E8E0D1"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2F0EA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B58E4C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#4CB6E7"
        }
      ],
      "paintEquivalents": "Red, cream, brass",
      "notes": "Rich trade-port palette; excellent with polished brass but still benefits from rivet grime and smoke staining"
    },
    {
      "id": "aos-fyreslayers-vostarg-lodge",
      "system": "aos",
      "faction": "Fyreslayers",
      "subfaction": "Vostarg Lodge",
      "schemeName": "Flame Orange",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D56722"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#1A1A1D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DCCEB6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C59A42"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A22424"
        }
      ],
      "paintEquivalents": "Orange hair, dark scales, gold",
      "notes": "Hair and crest colour are the fastest lodge signal; heat-glow weapons and runes fit the faction well"
    },
    {
      "id": "aos-fyreslayers-hermdar-lodge",
      "system": "aos",
      "faction": "Fyreslayers",
      "subfaction": "Hermdar Lodge",
      "schemeName": "White Crest",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#F1F1EE"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#1A1A1D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DCCEB6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C59A42"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#D56B22"
        }
      ],
      "paintEquivalents": "White hair, black scales, gold",
      "notes": "White crests and darker armour create a colder, more stoic lodge read than Vostarg\u2019s orange blaze"
    },
    {
      "id": "aos-daughters-of-khaine-hagg-nar",
      "system": "aos",
      "faction": "Daughters of Khaine",
      "subfaction": "Hagg Nar",
      "schemeName": "Black, Crimson, Purple",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8D1F24"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E0D0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#6E3F82"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A24B"
        }
      ],
      "paintEquivalents": "Black, crimson, purple, gold",
      "notes": "The first temple is the clearest official sect reference; glossy black, pale skin, crimson cloth all fit"
    },
    {
      "id": "aos-daughters-of-khaine-draichi-ganeth",
      "system": "aos",
      "faction": "Daughters of Khaine",
      "subfaction": "Draichi Ganeth",
      "schemeName": "Murder Crimson",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8D2124"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DDCF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B8BDC3"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6E3C80"
        }
      ],
      "paintEquivalents": "Crimson, black, steel",
      "notes": "More overtly red and martial than Hagg Nar; blades and shrine elements often lean colder in tone"
    },
    {
      "id": "aos-daughters-of-khaine-khailebron",
      "system": "aos",
      "faction": "Daughters of Khaine",
      "subfaction": "Khailebron",
      "schemeName": "Shadow Teal",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#234B53"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DDCF"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#6A3E80"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A24C"
        }
      ],
      "paintEquivalents": "Dark teal, black, purple",
      "notes": "Stealthier, duskier read; excellent with cool metallics and restrained blood effects"
    },
    {
      "id": "aos-idoneth-deepkin-ionrach",
      "system": "aos",
      "faction": "Idoneth Deepkin",
      "subfaction": "Ionrach",
      "schemeName": "Seafoam and White",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7FBDB4"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#F1F1EE"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#1D2327"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D2C6"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#A2B8C8"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C79B46"
        }
      ],
      "paintEquivalents": "Sea greens, whites, silver/gold",
      "notes": "Pearlescent, wet-looking transitions and aquatic basing do more work than hard heraldic markings"
    },
    {
      "id": "aos-idoneth-deepkin-fuethan",
      "system": "aos",
      "faction": "Idoneth Deepkin",
      "subfaction": "Fueth\u00e1n",
      "schemeName": "Hot Reef Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#9A2A24"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E6DDD0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#5BC7E8"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A24C"
        }
      ],
      "paintEquivalents": "Reds, black, turquoise water accents",
      "notes": "Warmer, fiercer enclave read; coral, shell and wet turquoise effects help distinguish the army"
    },
    {
      "id": "aos-soulblight-gravelords-vyrkos-dynasty",
      "system": "aos",
      "faction": "Soulblight Gravelords",
      "subfaction": "Vyrkos Dynasty",
      "schemeName": "Wolf-Blood Crimson",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7F2025"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0C3"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E7756"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#E4E0D8"
        }
      ],
      "paintEquivalents": "Crimson, black, bone, fur browns",
      "notes": "GW repeatedly highlights Vyrkos; wolves, grime, cold metal and deathly skin tones fit the dynasty well"
    },
    {
      "id": "aos-soulblight-gravelords-kastelai-dynasty",
      "system": "aos",
      "faction": "Soulblight Gravelords",
      "subfaction": "Kastelai Dynasty",
      "schemeName": "Crimson Keep",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8E2024"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#C7A24D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E1D7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#F1F1EE"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B9BDC4"
        }
      ],
      "paintEquivalents": "Deep red, gold, black",
      "notes": "More aristocratic and knightly; Blood Knights reward polished armour with selective grime"
    },
    {
      "id": "aos-soulblight-gravelords-legion-of-blood",
      "system": "aos",
      "faction": "Soulblight Gravelords",
      "subfaction": "Legion of Blood",
      "schemeName": "Noble Scarlet",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#971F24"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E0D4C0"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2F0EA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C7A24D"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#4F5A6A"
        }
      ],
      "paintEquivalents": "Scarlet, ivory, black, gold",
      "notes": "Rich vampire-court palette; ivory and deep reds benefit from satin rather than dead-matte finishes"
    },
    {
      "id": "aos-ossiarch-bonereapers-petrifex-elite",
      "system": "aos",
      "faction": "Ossiarch Bonereapers",
      "subfaction": "Petrifex Elite",
      "schemeName": "Bone and Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D8CCAF"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#922124"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0EBDD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#6C7076"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A24C"
        }
      ],
      "paintEquivalents": "Bone, deep red, dark metal",
      "notes": "Bone is the true dominant read; red shields/capes and cold metals are the fastest recognisers"
    },
    {
      "id": "aos-ossiarch-bonereapers-mortis-praetorians",
      "system": "aos",
      "faction": "Ossiarch Bonereapers",
      "subfaction": "Mortis Praetorians",
      "schemeName": "Bone, Black, Crimson",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D5C9B0"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0EBDD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F1F23"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A24D"
        }
      ],
      "paintEquivalents": "Bone, black, crimson",
      "notes": "More martial and severe than Petrifex; black panels and crimson cloth sharpen the silhouettes"
    },
    {
      "id": "aos-flesh-eater-courts-hollowmourne",
      "system": "aos",
      "faction": "Flesh-eater Courts",
      "subfaction": "Hollowmourne",
      "schemeName": "Courtly Crimson Delusion",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8E2024"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D8CAB2"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2522"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EEE7DC"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F6A43"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B8B1A6"
        }
      ],
      "paintEquivalents": "Crimson cloth, bone, pallid flesh",
      "notes": "FEC schemes rely on the tension between \u201cnoble court\u201d accents and corpse-pale flesh; grime is essential"
    },
    {
      "id": "aos-flesh-eater-courts-morgaunt",
      "system": "aos",
      "faction": "Flesh-eater Courts",
      "subfaction": "Morgaunt",
      "schemeName": "Pallid Ghast",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D7CDC0"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#587C7A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2E2A28"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0EBDC"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E2024"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#BDA676"
        }
      ],
      "paintEquivalents": "Pallid skin, teal-grey, bone",
      "notes": "Cooler, corpse-like read; bruising, gore and dirty bone keep the scheme from looking too clean"
    },
    {
      "id": "aos-nighthaunt-emerald-host",
      "system": "aos",
      "faction": "Nighthaunt",
      "subfaction": "Emerald Host",
      "schemeName": "Spectral Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#68C09C"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E7E0D4"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F3F1EB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#4F5E6B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8F1F23"
        }
      ],
      "paintEquivalents": "Nihilakh/emerald ghost tones, bone",
      "notes": "Ghost gradients and ethereal glow matter more than heraldry; rusty metals and grave dirt add grounding"
    },
    {
      "id": "aos-nighthaunt-quicksilver-dead",
      "system": "aos",
      "faction": "Nighthaunt",
      "subfaction": "Quicksilver Dead",
      "schemeName": "Liquid Metal Ghost",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#A8B0B8"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B9D7EA"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F2F1EB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F1F23"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#D7D2C8"
        }
      ],
      "paintEquivalents": "Silver, pale blue, bone",
      "notes": "GW explicitly references the Quicksilver Dead as liquid-metal spirits shaped by Chamon\u2019s magic"
    },
    {
      "id": "aos-blades-of-khorne-goretide",
      "system": "aos",
      "faction": "Blades of Khorne",
      "subfaction": "Goretide",
      "schemeName": "Blood and Brass",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#9A1F23"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#B58C4A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DDD0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#F2F2EF"
        }
      ],
      "paintEquivalents": "Reds, brass, black",
      "notes": "GW specifically calls the Goretide the most notorious Bloodbound horde; gore, brass and ash bases fit perfectly"
    },
    {
      "id": "aos-blades-of-khorne-reapers-of-vengeance",
      "system": "aos",
      "faction": "Blades of Khorne",
      "subfaction": "Reapers of Vengeance",
      "schemeName": "Dark Gore Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#7F2024"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8D6B41"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#131417"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E5DDD1"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#2A2A2A"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C7A24C"
        }
      ],
      "paintEquivalents": "Dark red, black, bronze",
      "notes": "Slightly darker, harsher than Goretide; battered iron and trophy racks help sell the look"
    },
    {
      "id": "aos-disciples-of-tzeentch-hosts-arcanum",
      "system": "aos",
      "faction": "Disciples of Tzeentch",
      "subfaction": "Hosts Arcanum",
      "schemeName": "Arcane Blue and Pink",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2F79CC"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D65BA8"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#171826"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#EFE8D9"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#E2C43E"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5EE1F6"
        }
      ],
      "paintEquivalents": "Bright blue, pink, yellow",
      "notes": "Multicolour fire and magical gradients are more important than rigid heraldry; high saturation is canonical"
    },
    {
      "id": "aos-disciples-of-tzeentch-eternal-conflagration",
      "system": "aos",
      "faction": "Disciples of Tzeentch",
      "subfaction": "Eternal Conflagration",
      "schemeName": "Sorcerous Flame",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#2C78C8"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#E1C83D"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#1A1A24"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0E8D8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D759A5"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5AE1F5"
        }
      ],
      "paintEquivalents": "Blue, yellow, pink flames",
      "notes": "Flame-heavy subfaction read benefits from bright source lighting and candy-colour transitions"
    },
    {
      "id": "aos-hedonites-of-slaanesh-no-specific-constraint",
      "system": "aos",
      "faction": "Hedonites of Slaanesh",
      "subfaction": "No specific constraint",
      "schemeName": "Studio Pink-Purple-Gold",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#C660A8"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#7A3E8C"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F1E8EA"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D2B15B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5BC8D8"
        }
      ],
      "paintEquivalents": "Pinks, purples, golds, pale flesh",
      "notes": "Official faction support in the sources reviewed was lighter on named colour systems; the common studio read remains pink/purple, lacquered black, pale flesh, and gold"
    },
    {
      "id": "aos-maggotkin-of-nurgle-drowned-men",
      "system": "aos",
      "faction": "Maggotkin of Nurgle",
      "subfaction": "Drowned Men",
      "schemeName": "Bog-Rot Green",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#5E7551"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8F6C42"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A24"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DAD1BD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#6C8F95"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B24F2B"
        }
      ],
      "paintEquivalents": "Sickly green, rust, bone",
      "notes": "Damp, swampy weathering and corrosion suit the name; wet mud and verdigris are especially effective"
    },
    {
      "id": "aos-maggotkin-of-nurgle-blessed-sons",
      "system": "aos",
      "faction": "Maggotkin of Nurgle",
      "subfaction": "Blessed Sons",
      "schemeName": "Pallid Contagion",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#A7B38A"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#6A5A48"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A24"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7E0D0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B24F2B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8651A3"
        }
      ],
      "paintEquivalents": "Pale green, brown, bruised tones",
      "notes": "Pox, bruising, rust and diseased flesh are the core visual language more than heraldic markings"
    },
    {
      "id": "aos-slaves-to-darkness-ravagers",
      "system": "aos",
      "faction": "Slaves to Darkness",
      "subfaction": "Ravagers",
      "schemeName": "Chaos Black and Brass",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8C6B42"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E5DBCD"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#9B1F24"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6E3C80"
        }
      ],
      "paintEquivalents": "Black, bronze, crimson",
      "notes": "Heavy blackened steel, leather, chaos runes, and dust sit closest to the dominant studio aesthetic"
    },
    {
      "id": "aos-slaves-to-darkness-cabalists",
      "system": "aos",
      "faction": "Slaves to Darkness",
      "subfaction": "Cabalists",
      "schemeName": "Arcane Ruin",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#4F2C67"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E6DDD1"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#C7A24C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5ECBEA"
        }
      ],
      "paintEquivalents": "Purple, black, gold",
      "notes": "Best when pushed into sorcerous glows, runes, and occult object-source lighting"
    },
    {
      "id": "aos-slaves-to-darkness-knights-of-the-empty-throne",
      "system": "aos",
      "faction": "Slaves to Darkness",
      "subfaction": "Knights of the Empty Throne",
      "schemeName": "Black Iron and Crimson",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8E2024"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DDD0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8A6A43"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B0B5BB"
        }
      ],
      "paintEquivalents": "Black, crimson, steel",
      "notes": "Mounted elite look rewards polished armour plates over grimy barbarian textures"
    },
    {
      "id": "aos-skaven-clan-skryre",
      "system": "aos",
      "faction": "Skaven",
      "subfaction": "Clan Skryre",
      "schemeName": "Brass and Warp-Cyan",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8D6A40"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#4EC8DE"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A2A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DCCFB8"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#7A2024"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6BFF7C"
        }
      ],
      "paintEquivalents": "Brass, teal glow, rusty metal",
      "notes": "Official painting support singles out the Great Clans; Skryre loves brass, verdigris and toxic glow"
    },
    {
      "id": "aos-skaven-clans-verminus",
      "system": "aos",
      "faction": "Skaven",
      "subfaction": "Clans Verminus",
      "schemeName": "Verminus Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8F1F24"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8B8F95"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A2A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D6CAB5"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#5F6C37"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#B18C4B"
        }
      ],
      "paintEquivalents": "Red cloth, dirty steel",
      "notes": "GW explicitly notes the red colours of Clans Verminus in studio treatment of Skaventide rats"
    },
    {
      "id": "aos-skaven-clan-pestilens",
      "system": "aos",
      "faction": "Skaven",
      "subfaction": "Clan Pestilens",
      "schemeName": "Plague Green and Bone",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#788858"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#D8CFB5"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2E2B23"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0E9DB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E2024"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8B6A41"
        }
      ],
      "paintEquivalents": "Sickly greens, bone, filth",
      "notes": "Diseased robes, off-white bone, grime and rust are the signature visual cues"
    },
    {
      "id": "aos-skaven-clan-moulder",
      "system": "aos",
      "faction": "Skaven",
      "subfaction": "Clan Moulder",
      "schemeName": "Flesh and Rust",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B89974"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8C6A42"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2A2A2A"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E7DED0"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#7C2023"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#6A7A4B"
        }
      ],
      "paintEquivalents": "Flesh, leather, rust",
      "notes": "Flesh-stitching, bruising and warped hide colours sell Moulder faster than banner colours do"
    },
    {
      "id": "aos-gloomspite-gitz-moonclan",
      "system": "aos",
      "faction": "Gloomspite Gitz",
      "subfaction": "Moonclan",
      "schemeName": "Bad Moon Black and Yellow",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#DAB73C"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0C3"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#5D914B"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A12123"
        }
      ],
      "paintEquivalents": "Black robes, yellow moon icons, green skin",
      "notes": "Hoods, moon glyphs, mushrooms and sickly green skin are the strongest recognisers"
    },
    {
      "id": "aos-gloomspite-gitz-jaws-of-mork",
      "system": "aos",
      "faction": "Gloomspite Gitz",
      "subfaction": "Jaws of Mork",
      "schemeName": "Squig Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B1352A"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E8E0D2"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#DAB73C"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5D914B"
        }
      ],
      "paintEquivalents": "Bright reds, black, yellow iconography",
      "notes": "Squig-heavy forces look best with vivid red/orange beasts against darker grots and caves"
    },
    {
      "id": "aos-orruk-warclans-ironjawz-ironsunz",
      "system": "aos",
      "faction": "Orruk Warclans",
      "subfaction": "Ironjawz Ironsunz",
      "schemeName": "Boss Yellow",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#DAB63A"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9CEBB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F2023"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5D8F47"
        }
      ],
      "paintEquivalents": "Yellow armour, black, rust",
      "notes": "GW\u2019s Ironjawz painting article centers on vivid yellow plus weathering and rust"
    },
    {
      "id": "aos-orruk-warclans-ironjawz-bloodtoofs",
      "system": "aos",
      "faction": "Orruk Warclans",
      "subfaction": "Ironjawz Bloodtoofs",
      "schemeName": "Gore Red Ironjawz",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#9A2125"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8CEBB"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8A6A41"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5C8F47"
        }
      ],
      "paintEquivalents": "Red armour, black, rusty metal",
      "notes": "Red armour, chipped plates, iron rivets and muddy bases read immediately as aggressive Ironjawz"
    },
    {
      "id": "aos-orruk-warclans-kruleboyz-big-yellers",
      "system": "aos",
      "faction": "Orruk Warclans",
      "subfaction": "Kruleboyz Big Yellers",
      "schemeName": "Swamp Ochre",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#C69B3F"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#2F4736"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0C3"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F2023"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5C8F47"
        }
      ],
      "paintEquivalents": "Ochre shields/armour, dark greens",
      "notes": "Kruleboyz reward muted swamp palettes, grime, and shield patterns over bright clean armour"
    },
    {
      "id": "aos-orruk-warclans-kruleboyz-grinnin-blades",
      "system": "aos",
      "faction": "Orruk Warclans",
      "subfaction": "Kruleboyz Grinnin\u2019 Blades",
      "schemeName": "Shadow Swamp",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#304236"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D7D0C4"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#B89A49"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5E8F4A"
        }
      ],
      "paintEquivalents": "Dark green, black, bone, rust",
      "notes": "Officially stealthier-feeling Kruleboyz reads benefit from muddy metals, wet wood and matte greens"
    },
    {
      "id": "aos-ogor-mawtribes-boulderhead",
      "system": "aos",
      "faction": "Ogor Mawtribes",
      "subfaction": "Boulderhead",
      "schemeName": "Ice and Bone",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#D8D0BF"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8FB7D2"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#4A4036"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F0ECE2"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8E2024"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8C6A41"
        }
      ],
      "paintEquivalents": "Bone, hide, icy blue accents",
      "notes": "Beastclaw-style palettes love pale fur, frost, leather, bone trophies and cold-weather weathering"
    },
    {
      "id": "aos-ogor-mawtribes-bloodgullet",
      "system": "aos",
      "faction": "Ogor Mawtribes",
      "subfaction": "Bloodgullet",
      "schemeName": "Meat Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#8F2023"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#815F3A"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#352E28"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#E4D9C9"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D6CAB4"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#5B8D48"
        }
      ],
      "paintEquivalents": "Red aprons, leather, flesh tones",
      "notes": "Gutbuster schemes usually read through aprons, gutplates, stains and battered metal rather than heraldry"
    },
    {
      "id": "aos-sons-of-behemat-no-specific-constraint",
      "system": "aos",
      "faction": "Sons of Behemat",
      "subfaction": "No specific constraint",
      "schemeName": "Studio Gargant Earthtones",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#B78B69"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#7A5B3B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#2E2A28"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D9D0C2"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#8F2023"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#8A8F95"
        }
      ],
      "paintEquivalents": "Flesh, worn leather, rusty iron",
      "notes": "Official source coverage reviewed here gives little paint-prescriptive support; giant skin, tattoos, scrap metal and tribe trophies vary widely"
    },
    {
      "id": "aos-helsmiths-of-hashut-ashen-dominion",
      "system": "aos",
      "faction": "Helsmiths of Hashut",
      "subfaction": "Ashen Dominion",
      "schemeName": "Ash, Black, Bronze",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#17181B"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#A06F36"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#D8D0C3"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D95A22"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#C53E2B"
        }
      ],
      "paintEquivalents": "Blackened armour, bronze, fire orange",
      "notes": "The default studio read is infernal black/bronze with furnace glows, soot and ash weathering"
    },
    {
      "id": "aos-helsmiths-of-hashut-ur-zorn",
      "system": "aos",
      "faction": "Helsmiths of Hashut",
      "subfaction": "Ur-Zorn",
      "schemeName": "Pale Ash Forge",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#C9C2B0"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#8D6A3B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#17181B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#F1EEE7"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D95A22"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A22124"
        }
      ],
      "paintEquivalents": "Ash grey, bronze, ember orange",
      "notes": "Official alternative-scheme support explicitly names Ur-Zorn; cooler ash tones help distinguish it from the main studio scheme"
    },
    {
      "id": "aos-helsmiths-of-hashut-zharr-vyxa",
      "system": "aos",
      "faction": "Helsmiths of Hashut",
      "subfaction": "Zharr Vyxa",
      "schemeName": "Furnace Red",
      "roles": [
        {
          "code": "D",
          "name": "Dominant colour",
          "hex": "#9A2124"
        },
        {
          "code": "S",
          "name": "Secondary colour",
          "hex": "#17181B"
        },
        {
          "code": "ND",
          "name": "Near-dark neutral",
          "hex": "#090A0B"
        },
        {
          "code": "NL",
          "name": "Near-light neutral",
          "hex": "#DDD3C5"
        },
        {
          "code": "A1",
          "name": "Accent 1",
          "hex": "#D96A21"
        },
        {
          "code": "A2",
          "name": "Accent 2",
          "hex": "#A06F36"
        }
      ],
      "paintEquivalents": "Reds, black, bronze, ember orange",
      "notes": "Official alternative-scheme support explicitly names Zharr Vyxa; fiery plates and hot glow effects are the obvious finish choice"
    }
  ]
};

  return {
    DEFAULT_FACTION_SCHEME_DATA,
    DEFAULT_FACTION_SCHEMES: DEFAULT_FACTION_SCHEME_DATA.schemes
  };
}));
