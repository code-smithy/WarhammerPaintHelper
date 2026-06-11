(function () {
  "use strict";

  const SETTINGS_VERSION = 1;
  const STORAGE_KEYS = {
    lastSettings: "wph.settings.v1",
    profiles: "wph.profiles.v1"
  };
  const DEFAULT_SECTION_COLLAPSE = {
    paintingNotes: false,
    rolePlanner: false,
    baseAdvice: false,
    modelRoles: false,
    paintLadder: false,
    catalogueMatches: false
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    const W = window.WPH;
    const state = {
      h: 220,
      s: 70,
      l: 46,
      style: 0,
      language: detectLanguage(W),
      system: "aos",
      mode: "single",
      factionSchemeId: "",
      activeColor: "primary",
      secondary: { h: 45, s: 16, l: 92 },
      heraldicLayout: "split",
      heraldicRatio: "dominant",
      heraldicAccent: "auto",
      schemeKey: "complementary",
      roleProfileKey: "balanced",
      baseThemeKey: "auto",
      recipeModeKey: "battle",
      paintSearch: "",
      producerKeys: null,
      ownedPaintKeys: [],
      onlyOwnedMatches: false,
      ownedPaintsCollapsed: false,
      shoppingPaintKeys: [],
      shoppingListCollapsed: false,
      shoppingSearch: "",
      collapsedSections: { ...DEFAULT_SECTION_COLLAPSE }
    };

    let pendingProducerKeys = null;
    let ownedPaintKeys = new Set(state.ownedPaintKeys);
    let shoppingPaintKeys = new Set(state.shoppingPaintKeys);
    applySettingsToState(readSettingsSnapshot(STORAGE_KEYS.lastSettings));
    applySettingsToState(readSettingsFromUrl());

    let translator = W.createTranslator(state.language);
    let currentPalette = [];
    let cataloguePaints = W.DEFAULT_PAINT_CATALOGUE || W.DEFAULT_CITADEL_PAINTS;
    let factionSchemes = W.normalizeFactionSchemes(W.DEFAULT_FACTION_SCHEMES || W.DEFAULT_FACTION_SCHEME_DATA || []);
    let profiles = readProfiles();
    let catalogueSource = "sample";
    let selectedManufacturers = new Set();
    let producerFiltersInitialized = false;
    let paintSelectorOptions = [];
    let hoverTimer = null;
    let activeHoverTarget = null;

    const $ = id => document.getElementById(id);
    const el = {
      language: $("languageSelect"),
      system: $("systemSelect"),
      mode: $("modeSelect"),
      faction: $("factionSelect"),
      subfaction: $("subfactionSelect"),
      factionMeta: $("factionSchemeMeta"),
      activeColor: $("activeColorSelect"),
      wheel: $("colorWheel"),
      markers: $("schemeMarkers"),
      dot: $("selectorDot"),
      swatch: $("currentSwatch"),
      primaryColorLabel: $("primaryColorLabel"),
      hex: $("currentHex"),
      hsl: $("currentHsl"),
      secondarySwatch: $("secondarySwatch"),
      secondaryHex: $("secondaryHex"),
      secondaryHsl: $("secondaryHsl"),
      paintSearch: $("paintSearchInput"),
      paintSelect: $("paintSelect"),
      hexInput: $("hexInput"),
      secondaryHexInput: $("secondaryHexInput"),
      schemeField: $("schemeField"),
      scheme: $("schemeSelect"),
      heraldicControls: $("heraldicControls"),
      heraldicLayout: $("heraldicLayoutSelect"),
      heraldicRatio: $("heraldicRatioSelect"),
      heraldicAccent: $("heraldicAccentSelect"),
      heraldicPreview: $("heraldicPreview"),
      roleStyle: $("roleStyleSelect"),
      baseTheme: $("baseThemeSelect"),
      recipeMode: $("recipeModeSelect"),
      producerFilters: $("producerFilters"),
      ownedOnlyMatches: $("ownedOnlyMatchesToggle"),
      ownedSelectAllVisible: $("ownedSelectAllVisible"),
      ownedPaintsCollapse: $("ownedPaintsCollapseBtn"),
      ownedPaintsBody: $("ownedPaintsBody"),
      ownedPaintStatus: $("ownedPaintStatus"),
      ownedPaintList: $("ownedPaintList"),
      shoppingListPanel: $("shoppingListPanel"),
      shoppingListCollapse: $("shoppingListCollapseBtn"),
      shoppingListBody: $("shoppingListBody"),
      shoppingSearch: $("shoppingSearchInput"),
      shoppingAddSelect: $("shoppingAddSelect"),
      addShoppingPaint: $("addShoppingPaintBtn"),
      shoppingListStatus: $("shoppingListStatus"),
      shoppingList: $("shoppingList"),
      profileName: $("profileNameInput"),
      savedProfiles: $("savedProfilesSelect"),
      profileStatus: $("profileStatus"),
      saveProfile: $("saveProfileBtn"),
      loadProfile: $("loadProfileBtn"),
      deleteProfile: $("deleteProfileBtn"),
      copyShareLink: $("copyShareLinkBtn"),
      sat: $("satRange"),
      light: $("lightRange"),
      satOut: $("satValue"),
      lightOut: $("lightValue"),
      style: $("styleRange"),
      styleOut: $("styleValue"),
      styleSummary: $("styleSummary"),
      palette: $("palette"),
      paintMap: $("paintMap"),
      paintLadder: $("paintLadder"),
      rolePlan: $("rolePlan"),
      baseAdvice: $("baseAdvice"),
      citadelMatches: $("citadelMatches"),
      citadelStatus: $("citadelStatus"),
      title: $("schemeTitle"),
      desc: $("schemeDescription"),
      notes: $("paintNotes"),
      random: $("randomBtn"),
      debug: $("debugState"),
      rolePlannerTitle: $("rolePlannerTitle"),
      baseAdviceTitle: $("baseAdviceTitle"),
      paintLadderTitle: $("paintLadderTitle"),
      paintTooltip: createPaintTooltip(),
      sectionCollapseButtons: Array.from(document.querySelectorAll("[data-section-collapse]"))
    };
    el.swatch.classList.add("paint-hover-target");
    el.swatch.tabIndex = 0;
    el.secondarySwatch.classList.add("paint-hover-target");
    el.secondarySwatch.tabIndex = 0;

    syncControlsFromState();
    renderProfiles();
    drawWheel();
    attachEvents();
    update();

    W.loadPaintCatalogue("data/paint-catalogue.json").then(result => {
      cataloguePaints = result.paints;
      catalogueSource = result.source;
      renderProducerFilters(true);
      renderPaintSelectorOptions();
      renderOwnedPaintList();
      renderShoppingList();
      update();
    });

    function t(path, params) {
      return translator(path, params);
    }

    function translateStatic() {
      translator = W.createTranslator(state.language);
      document.documentElement.lang = state.language;
      document.title = t("appTitle");
      document.querySelectorAll("[data-i18n]").forEach(node => {
        node.textContent = t(node.dataset.i18n);
      });
      renderProfiles();
      syncOwnedPaintsCollapse();
      syncShoppingListCollapse();
      syncCollapsibleSections();
      renderShoppingList();
    }

    function populateDynamicControls() {
      setSelectOptions(el.system, ["aos", "k40"], key => t(`systems.${key}`), state.system);
      state.system = el.system.value;
      populateFactionControls();

      setSelectOptions(
        el.scheme,
        W.getSchemeKeysForSystem(state.system),
        key => t(`schemes.${key}.title`),
        state.schemeKey
      );
      state.schemeKey = el.scheme.value;
      setSelectOptions(
        el.roleStyle,
        W.getRoleProfileKeys(state.system),
        key => t(`profiles.${state.system}.${key}`),
        state.roleProfileKey
      );
      state.roleProfileKey = el.roleStyle.value;
      setSelectOptions(
        el.baseTheme,
        W.getBaseThemeKeys(state.system),
        key => key === "auto" ? t("baseOptions.auto") : t(`bases.${key}.title`),
        state.baseThemeKey
      );
      state.baseThemeKey = el.baseTheme.value;
      setSelectOptions(
        el.recipeMode,
        W.getRecipeModeKeys(),
        key => t(`recipeModes.${key}.title`),
        state.recipeModeKey
      );
      state.recipeModeKey = el.recipeMode.value;
      setSelectOptions(el.heraldicLayout, Object.keys(W.HERALDIC_LAYOUTS), key => t(`heraldic.layouts.${key}`), state.heraldicLayout);
      state.heraldicLayout = el.heraldicLayout.value;
      setSelectOptions(el.heraldicRatio, Object.keys(W.HERALDIC_RATIOS), key => t(`heraldic.ratios.${key}`), state.heraldicRatio);
      state.heraldicRatio = el.heraldicRatio.value;
      setSelectOptions(el.heraldicAccent, Object.keys(W.HERALDIC_ACCENTS), key => t(`heraldic.accents.${key}`), state.heraldicAccent);
      state.heraldicAccent = el.heraldicAccent.value;
    }

    function setSelectOptions(select, keys, labelForKey, preferredValue) {
      const selected = keys.includes(preferredValue) ? preferredValue : keys[0];
      select.innerHTML = keys.map(key => (
        `<option value="${escapeHtml(key)}">${escapeHtml(labelForKey(key))}</option>`
      )).join("");
      select.value = selected;
    }

    function syncControlsFromState(options = {}) {
      const resetProducerSelection = options.resetProducerSelection !== false;
      el.language.value = state.language;
      el.mode.value = state.mode;
      el.activeColor.value = state.activeColor;
      el.sat.value = Math.round(state.s);
      el.light.value = Math.round(state.l);
      el.style.value = Math.round(state.style);
      el.paintSearch.value = state.paintSearch || "";
      el.ownedOnlyMatches.checked = Boolean(state.onlyOwnedMatches);
      translateStatic();
      populateDynamicControls();
      renderProducerFilters(resetProducerSelection);
      renderPaintSelectorOptions();
      renderOwnedPaintList();
      renderShoppingList();
      syncOwnedPaintsCollapse();
      syncShoppingListCollapse();
      syncCollapsibleSections();
      syncSlidersToActiveColor();
    }

    function attachEvents() {
      el.language.addEventListener("change", () => {
        state.language = el.language.value;
        saveLanguage(state.language);
        translateStatic();
        populateDynamicControls();
        renderProducerFilters(false);
        renderPaintSelectorOptions();
        renderOwnedPaintList();
        renderShoppingList();
        update();
      });

      el.system.addEventListener("change", () => {
        state.system = el.system.value;
        state.factionSchemeId = "";
        populateDynamicControls();
        update();
      });

      el.mode.addEventListener("change", () => {
        clearFactionScheme();
        state.mode = el.mode.value;
        syncSlidersToActiveColor();
        update();
      });

      el.activeColor.addEventListener("change", () => {
        state.activeColor = el.activeColor.value;
        syncSlidersToActiveColor();
        update();
      });

      el.faction.addEventListener("change", () => {
        const schemes = factionSchemesForCurrentSystem()
          .filter(scheme => scheme.faction === el.faction.value);
        state.factionSchemeId = schemes.length ? schemes[0].id : "";
        populateFactionControls(el.faction.value);
        update();
      });

      el.subfaction.addEventListener("change", () => {
        state.factionSchemeId = el.subfaction.value;
        populateFactionControls();
        update();
      });

      el.wheel.addEventListener("pointerdown", event => {
        clearFactionScheme();
        if (el.wheel.setPointerCapture) {
          el.wheel.setPointerCapture(event.pointerId);
        }
        pickFromWheel(event);
      });
      el.wheel.addEventListener("pointermove", event => {
        if (event.buttons === 1) {
          pickFromWheel(event);
        }
      });
      el.wheel.addEventListener("click", pickFromWheel);
      el.scheme.addEventListener("change", () => {
        clearFactionScheme();
        update();
      });
      el.heraldicLayout.addEventListener("change", update);
      el.heraldicRatio.addEventListener("change", update);
      el.heraldicAccent.addEventListener("change", update);
      el.roleStyle.addEventListener("change", update);
      el.baseTheme.addEventListener("change", update);
      el.recipeMode.addEventListener("change", update);
      el.producerFilters.addEventListener("change", event => {
        if (!event.target.matches("input[type='checkbox']")) {
          return;
        }
        const producer = event.target.value;
        if (event.target.checked) {
          selectedManufacturers.add(producer);
        } else {
          selectedManufacturers.delete(producer);
        }
        pendingProducerKeys = null;
        state.producerKeys = Array.from(selectedManufacturers);
        renderPaintSelectorOptions();
        renderOwnedPaintList();
        renderShoppingList();
        update();
      });
      el.paintSearch.addEventListener("input", () => {
        state.paintSearch = el.paintSearch.value;
        renderPaintSelectorOptions();
        renderOwnedPaintList();
        renderShoppingList();
        saveLastSettings();
      });
      el.ownedOnlyMatches.addEventListener("change", () => {
        state.onlyOwnedMatches = el.ownedOnlyMatches.checked;
        renderCitadelMatches();
        saveLastSettings();
      });
      el.ownedSelectAllVisible.addEventListener("change", () => {
        setVisibleOwnedPaints(el.ownedSelectAllVisible.checked);
      });
      el.ownedPaintsCollapse.addEventListener("click", () => {
        state.ownedPaintsCollapsed = !state.ownedPaintsCollapsed;
        syncOwnedPaintsCollapse();
        saveLastSettings();
      });
      el.ownedPaintList.addEventListener("change", event => {
        if (!event.target.matches("input[type='checkbox']")) {
          return;
        }
        toggleOwnedPaint(event.target.value, event.target.checked);
      });
      el.shoppingListCollapse.addEventListener("click", () => {
        state.shoppingListCollapsed = !state.shoppingListCollapsed;
        syncShoppingListCollapse();
        saveLastSettings();
      });
      el.sectionCollapseButtons.forEach(button => {
        button.addEventListener("click", () => {
          const key = button.dataset.sectionCollapse;
          if (!Object.prototype.hasOwnProperty.call(DEFAULT_SECTION_COLLAPSE, key)) {
            return;
          }
          state.collapsedSections = {
            ...DEFAULT_SECTION_COLLAPSE,
            ...state.collapsedSections,
            [key]: !Boolean(state.collapsedSections[key])
          };
          syncCollapsibleSections();
          saveLastSettings();
        });
      });
      el.shoppingSearch.addEventListener("input", () => {
        state.shoppingSearch = el.shoppingSearch.value;
        renderShoppingList();
        saveLastSettings();
      });
      el.addShoppingPaint.addEventListener("click", () => {
        addShoppingPaintByKey(el.shoppingAddSelect.value);
      });
      el.shoppingAddSelect.addEventListener("change", () => {
        el.addShoppingPaint.disabled = !el.shoppingAddSelect.value;
      });
      el.shoppingList.addEventListener("click", event => {
        const button = event.target.closest("[data-remove-shopping-key]");
        if (!button) {
          return;
        }
        removeShoppingPaint(button.dataset.removeShoppingKey);
      });
      el.paintTooltip.addEventListener("click", event => {
        const button = event.target.closest("[data-add-shopping-key]");
        if (!button) {
          return;
        }
        addShoppingPaintByKey(button.dataset.addShoppingKey);
        showPaintTooltip(activeHoverTarget);
      });
      el.paintTooltip.addEventListener("mouseover", () => {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      });
      el.paintTooltip.addEventListener("mouseleave", hidePaintTooltip);
      el.saveProfile.addEventListener("click", saveNamedProfile);
      el.loadProfile.addEventListener("click", loadSelectedProfile);
      el.deleteProfile.addEventListener("click", deleteSelectedProfile);
      el.copyShareLink.addEventListener("click", async () => {
        const copied = await copyText(buildShareUrl());
        setProfileStatus(t(copied ? "ui.shareLinkCopied" : "ui.shareLinkCopyFailed"));
      });
      el.savedProfiles.addEventListener("change", () => {
        const profile = selectedProfile();
        el.profileName.value = profile ? profile.name : "";
        el.loadProfile.disabled = !profile;
        el.deleteProfile.disabled = !profile;
        setProfileStatus("");
      });
      el.paintSelect.addEventListener("change", () => {
        if (!el.paintSelect.value) {
          return;
        }
        const paint = paintSelectorOptions[Number(el.paintSelect.value)];
        if (!paint) {
          return;
        }
        clearFactionScheme();
        setPrimaryFromHex(paint.hex);
        if (state.mode === "heraldic") {
          el.activeColor.value = "primary";
          state.activeColor = "primary";
        }
        syncSlidersToActiveColor();
        update();
      });
      el.sat.addEventListener("input", () => {
        clearFactionScheme();
        update();
      });
      el.light.addEventListener("input", () => {
        clearFactionScheme();
        update();
      });
      el.style.addEventListener("input", update);
      window.addEventListener("resize", () => {
        setDot();
        setSchemeMarkers();
      });

      el.hexInput.addEventListener("change", () => {
        clearFactionScheme();
        if (!setPrimaryFromHex(el.hexInput.value)) {
          el.hexInput.value = W.primaryHex(state);
          return;
        }
        if (state.mode !== "heraldic" || state.activeColor === "primary") {
          syncSlidersToActiveColor();
        }
        update();
      });

      el.secondaryHexInput.addEventListener("change", () => {
        clearFactionScheme();
        const rgb = W.hexToRgb(el.secondaryHexInput.value);
        if (!rgb) {
          el.secondaryHexInput.value = W.hslToHex(state.secondary.h, state.secondary.s, state.secondary.l);
          return;
        }
        state.secondary = W.rgbToHsl(rgb.r, rgb.g, rgb.b);
        if (state.mode === "heraldic" && state.activeColor === "secondary") {
          syncSlidersToActiveColor();
        }
        update();
      });

      el.random.addEventListener("click", () => {
        randomizePalette();
      });

      document.addEventListener("mouseover", handlePaintHoverStart);
      document.addEventListener("mouseout", handlePaintHoverEnd);
      document.addEventListener("focusin", handlePaintHoverStart);
      document.addEventListener("focusout", handlePaintHoverEnd);
      window.addEventListener("scroll", hidePaintTooltip, true);
      window.addEventListener("resize", hidePaintTooltip);
    }

    function update() {
      hidePaintTooltip();
      state.mode = el.mode.value;
      state.activeColor = el.activeColor.value;
      state.style = Number(el.style.value);
      state.heraldicLayout = el.heraldicLayout.value;
      state.heraldicRatio = el.heraldicRatio.value;
      state.heraldicAccent = el.heraldicAccent.value;
      state.schemeKey = el.scheme.value;
      state.roleProfileKey = el.roleStyle.value;
      state.baseThemeKey = el.baseTheme.value;
      state.recipeModeKey = el.recipeMode.value;
      state.paintSearch = el.paintSearch.value;
      state.producerKeys = pendingProducerKeys ? pendingProducerKeys.slice() : Array.from(selectedManufacturers);
      const factionScheme = selectedFactionScheme();
      if (!factionScheme) {
        applySlidersToActiveColor();
      }
      const schemeKey = el.scheme.value;
      const scheme = W.SCHEMES[schemeKey] || W.SCHEMES.complementary;
      const finishKey = W.styleLabelKey(state.style);
      const finishLabel = t(`finish.${finishKey}`);
      const isFactionScheme = Boolean(factionScheme);
      const isHeraldic = !isFactionScheme && state.mode === "heraldic";
      currentPalette = isFactionScheme
        ? W.buildFactionSchemePalette(factionScheme)
        : isHeraldic
        ? W.buildHeraldicPalette(state, {
          layoutKey: state.heraldicLayout,
          ratioKey: state.heraldicRatio,
          accentKey: state.heraldicAccent
        })
        : W.buildPalette(state, schemeKey);
      if (isFactionScheme && currentPalette[0]) {
        state.h = currentPalette[0].h;
        state.s = currentPalette[0].s;
        state.l = currentPalette[0].l;
        if (currentPalette[1]) {
          state.secondary = {
            h: currentPalette[1].h,
            s: currentPalette[1].s,
            l: currentPalette[1].l
          };
        }
        syncSlidersToActiveColor();
      }
      const hex = currentPalette[0] ? currentPalette[0].hex : W.primaryHex(state);
      const secondaryHex = W.hslToHex(state.secondary.h, state.secondary.s, state.secondary.l);

      setHeraldicVisibility(isHeraldic);
      el.swatch.style.background = hex;
      el.swatch.dataset.colorHex = hex;
      el.swatch.dataset.colorName = isHeraldic ? t("heraldic.primaryColor") : t("ui.mainColor");
      el.primaryColorLabel.textContent = isHeraldic ? t("heraldic.primaryColor") : t("ui.mainColor");
      el.hex.textContent = hex;
      el.hsl.textContent = `HSL(${Math.round(state.h)}, ${Math.round(state.s)}%, ${Math.round(state.l)}%)`;
      el.hexInput.value = hex;
      el.secondarySwatch.style.background = secondaryHex;
      el.secondarySwatch.dataset.colorHex = secondaryHex;
      el.secondarySwatch.dataset.colorName = t("heraldic.secondaryColor");
      el.secondaryHex.textContent = secondaryHex;
      el.secondaryHsl.textContent = `HSL(${Math.round(state.secondary.h)}, ${Math.round(state.secondary.s)}%, ${Math.round(state.secondary.l)}%)`;
      el.secondaryHexInput.value = secondaryHex;
      const activeColor = activeWheelColor();
      el.satOut.value = `${Math.round(activeColor.s)}%`;
      el.lightOut.value = `${Math.round(activeColor.l)}%`;
      el.styleOut.value = finishLabel;
      el.styleSummary.textContent = t(`finish.summary.${finishKey}`);
      el.title.textContent = isFactionScheme
        ? factionSchemeTitle(factionScheme)
        : isHeraldic ? t("heraldic.title") : t(`schemes.${schemeKey}.title`);
      el.desc.textContent = isFactionScheme
        ? t("factionSchemes.description", {
          faction: factionScheme.faction,
          subfaction: factionScheme.subfaction,
          scheme: factionScheme.schemeName
        })
        : isHeraldic
        ? t("heraldic.description", {
          layout: t(`heraldic.layouts.${state.heraldicLayout}`),
          ratio: t(`heraldic.ratios.${state.heraldicRatio}`)
        })
        : t(`schemes.${schemeKey}.desc`);
      el.rolePlannerTitle.textContent = t(`systemCopy.${state.system}.rolePlannerTitle`);
      el.baseAdviceTitle.textContent = t(`systemCopy.${state.system}.baseAdviceTitle`);
      el.paintLadderTitle.textContent = t("ui.recipeTitle", {
        system: t(`systems.${state.system}`),
        mode: t(`recipeModes.${state.recipeModeKey}.title`)
      });
      const paintEquivalentText = factionScheme
        ? `<br><br><strong>${escapeHtml(t("factionSchemes.paintEquivalents"))}:</strong> ${escapeHtml(factionScheme.paintEquivalents || t("factionSchemes.noPaintEquivalents"))}`
        : "";
      el.notes.innerHTML = `<strong>${escapeHtml(t("ui.paintingNotes"))}:</strong> ${escapeHtml(paintingNoteText(factionScheme, isHeraldic, schemeKey))}${paintEquivalentText}<br><br><strong>${escapeHtml(t(`systemCopy.${state.system}.finishPrefix`))}:</strong> ${escapeHtml(t(`finish.summary.${finishKey}`))}`;
      renderFactionSchemeMeta(factionScheme);

      renderPalette(scheme);
      renderRolePlanner();
      renderBaseAdvice();
      renderPaintMap();
      renderPaintLadder();
      renderCitadelMatches();
      setDot();
      setSchemeMarkers();
      renderHeraldicPreview();
      el.debug.textContent = t("ui.debug", {
        hex,
        firstHex: currentPalette[0].hex,
        h: state.h,
        s: state.s,
        l: state.l,
        finish: finishLabel
      });
      saveLastSettings();
    }

    function populateFactionControls(preferredFaction) {
      const schemes = factionSchemesForCurrentSystem();
      const selected = selectedFactionScheme();
      const factionNames = unique(schemes.map(scheme => scheme.faction));
      const factionValue = preferredFaction || (selected && selected.faction) || "";

      setSelectOptions(
        el.faction,
        ["", ...factionNames],
        key => key || t("factionSchemes.custom"),
        factionValue
      );

      const subfactionSchemes = el.faction.value
        ? schemes.filter(scheme => scheme.faction === el.faction.value)
        : [];
      setOptionObjects(
        el.subfaction,
        [{ value: "", label: subfactionSchemes.length ? t("factionSchemes.chooseSubfaction") : t("factionSchemes.noSubfactions") }]
          .concat(subfactionSchemes.map(scheme => ({
            value: scheme.id,
            label: `${scheme.subfaction} - ${scheme.schemeName}`
          }))),
        selected && subfactionSchemes.some(scheme => scheme.id === selected.id) ? selected.id : ""
      );
      el.subfaction.disabled = !subfactionSchemes.length;
    }

    function setOptionObjects(select, options, preferredValue) {
      select.innerHTML = options.map(option => (
        `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`
      )).join("");
      select.value = options.some(option => option.value === preferredValue) ? preferredValue : options[0].value;
    }

    function factionSchemesForCurrentSystem() {
      return W.getFactionSchemesForSystem(factionSchemes, state.system);
    }

    function selectedFactionScheme() {
      return factionSchemes.find(scheme => scheme.id === state.factionSchemeId && scheme.system === state.system) || null;
    }

    function clearFactionScheme() {
      if (!state.factionSchemeId) {
        return;
      }
      state.factionSchemeId = "";
      populateFactionControls();
    }

    function unique(values) {
      return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
    }

    function factionSchemeTitle(scheme) {
      return `${scheme.subfaction} - ${scheme.schemeName}`;
    }

    function paintingNoteText(factionScheme, isHeraldic, schemeKey) {
      if (factionScheme) {
        return factionScheme.notes || t("factionSchemes.defaultNote");
      }
      return isHeraldic ? t("heraldic.note") : t(`schemes.${schemeKey}.note`);
    }

    function renderFactionSchemeMeta(factionScheme) {
      if (!factionScheme) {
        el.factionMeta.textContent = factionSchemes.length
          ? t("factionSchemes.customHint")
          : t("factionSchemes.missing");
        return;
      }
      el.factionMeta.textContent = t("factionSchemes.selectedMeta", {
        faction: factionScheme.faction,
        count: currentPalette.length
      });
    }

    function setHeraldicVisibility(isHeraldic) {
      document.querySelectorAll(".heraldic-only").forEach(node => {
        node.hidden = !isHeraldic;
      });
      el.schemeField.hidden = isHeraldic;
      el.activeColor.disabled = !isHeraldic;
      el.heraldicLayout.disabled = !isHeraldic;
      el.heraldicRatio.disabled = !isHeraldic;
      el.heraldicAccent.disabled = !isHeraldic;
    }

    function applySlidersToActiveColor() {
      const s = Number(el.sat.value);
      const l = Number(el.light.value);
      if (state.mode === "heraldic" && state.activeColor === "secondary") {
        state.secondary.s = s;
        state.secondary.l = l;
        return;
      }
      state.s = s;
      state.l = l;
    }

    function syncSlidersToActiveColor() {
      const color = activeWheelColor();
      el.sat.value = Math.round(color.s);
      el.light.value = Math.round(color.l);
    }

    function setPrimaryFromHex(hex) {
      const rgb = W.hexToRgb(hex);
      if (!rgb) {
        return false;
      }
      const hsl = W.rgbToHsl(rgb.r, rgb.g, rgb.b);
      state.h = hsl.h;
      state.s = hsl.s;
      state.l = hsl.l;
      return true;
    }

    function renderHeraldicPreview() {
      if (state.mode !== "heraldic") {
        return;
      }
      const primary = W.primaryHex(state);
      const secondary = W.hslToHex(state.secondary.h, state.secondary.s, state.secondary.l);
      const accent = currentPalette.find(color => color.roleKey === "heraldicAccent") || currentPalette[currentPalette.length - 1];
      el.heraldicPreview.dataset.layout = state.heraldicLayout;
      el.heraldicPreview.style.setProperty("--heraldic-primary", primary);
      el.heraldicPreview.style.setProperty("--heraldic-secondary", secondary);
      el.heraldicPreview.style.setProperty("--heraldic-accent", accent ? accent.hex : "#D2A13D");
    }

    function renderPalette() {
      el.palette.innerHTML = currentPalette.map(color => `
          <article class="card paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(color.hex)}" data-color-name="${escapeHtml(colorName(color))}">
          <div class="swatch" style="background:${escapeHtml(color.hex)}"></div>
          <div class="card-body">
            <div class="role">${escapeHtml(colorName(color))}</div>
            <code class="hex" title="${escapeHtml(t("ui.copyPalette"))}">${escapeHtml(color.hex)}</code>
            <div class="meta">HSL(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)</div>
          </div>
        </article>
      `).join("");
      el.palette.querySelectorAll(".hex").forEach(node => node.addEventListener("click", () => copyText(node.textContent)));
    }

    function renderRolePlanner() {
      el.rolePlan.innerHTML = rolePlannerItems().map(item => {
        const color = resolveRoleColor(item.colorRef);
        const area = item.extra ? color.name : t(`roleAreas.${item.areaKey}`);
        return `
          <article class="role-plan-card paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(color.hex)}" data-color-name="${escapeHtml(color.name)}">
            <div class="role-plan-swatch" style="background:${escapeHtml(color.hex)}"></div>
            <div>
              <div class="role-plan-area">${escapeHtml(area)}</div>
              <div class="role-plan-source">${escapeHtml(color.hex)} · ${escapeHtml(color.name)}</div>
              <div class="role-plan-use">${escapeHtml(t(`roleUses.${item.useKey}`))}</div>
            </div>
            <div class="role-plan-tip">${escapeHtml(t(`roleTips.${item.tipKey}`))}</div>
          </article>
        `;
      }).join("");
    }

    function rolePlannerItems() {
      const profile = W.getRoleProfile(state.system, el.roleStyle.value);
      const usedPaletteIndexes = new Set(profile
        .filter(item => item.colorRef && item.colorRef.type === "palette")
        .map(item => item.colorRef.index));
      const extraPaletteItems = currentPalette
        .map((color, index) => ({ color, index }))
        .filter(item => !usedPaletteIndexes.has(item.index))
        .map(item => ({
          extra: true,
          colorRef: { type: "palette", index: item.index },
          useKey: "extraPalette",
          tipKey: "extraPalette"
        }));

      return profile.concat(extraPaletteItems);
    }

    function renderBaseAdvice() {
      const suggestions = W.baseSuggestions({
        palette: currentPalette,
        state,
        systemKey: state.system,
        roleProfileKey: el.roleStyle.value,
        baseThemeKey: el.baseTheme.value
      });
      el.baseAdvice.innerHTML = suggestions.map(base => {
        const recipe = t(`bases.${base.key}.recipe`);
        const steps = Array.isArray(recipe) ? recipe.join(" -> ") : "";
        return `
          <article class="base-advice-card paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(base.hex)}" data-color-name="${escapeHtml(t(`bases.${base.key}.title`))}">
            <div class="base-advice-swatch" style="background:${escapeHtml(base.hex)}"></div>
            <div>
              <div class="base-advice-title">${escapeHtml(t(`bases.${base.key}.title`))}</div>
              <div class="base-advice-source">${escapeHtml(base.hex)}</div>
              <div class="base-advice-use">${escapeHtml(t(`bases.${base.key}.use`))}</div>
            </div>
            <div class="base-advice-tip"><strong>${escapeHtml(t("ui.why"))}:</strong> ${escapeHtml(t(`bases.${base.key}.tip`))}<br><strong>${escapeHtml(t("ui.build"))}:</strong> ${escapeHtml(steps)}</div>
          </article>
        `;
      }).join("");
    }

    function renderPaintMap() {
      el.paintMap.innerHTML = currentPalette.map((color, index) => {
        const placement = index === 0
          ? t("placements.dominant")
          : index === 1
            ? t("placements.secondary")
            : index === 2
              ? t("placements.contrast")
          : t("placements.small");
        return `
          <article class="paint-map-card paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(color.hex)}" data-color-name="${escapeHtml(colorName(color))}">
            <div class="paint-map-swatch" style="background:${escapeHtml(color.hex)}"></div>
            <div>
              <div class="role">${escapeHtml(colorName(color))}</div>
              <code>${escapeHtml(color.hex)}</code>
              <div class="meta">${escapeHtml(placement)}</div>
            </div>
          </article>
        `;
      }).join("");
      el.paintMap.querySelectorAll("code").forEach(node => node.addEventListener("click", () => copyText(node.textContent)));
    }

    function renderPaintLadder() {
      el.paintLadder.innerHTML = currentPalette.slice(0, 4).map(color => {
        const steps = W.ladderForColor(color, state.style, state.recipeModeKey).map(step => `
          <div class="ladder-step paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(step.hex)}" data-color-name="${escapeHtml(t(`ladder.steps.${step.key}`))}">
            <div class="ladder-swatch" style="background:${escapeHtml(step.hex)}"></div>
            <div>
              <strong>${escapeHtml(t(`ladder.steps.${step.key}`))}</strong>
              <code title="${escapeHtml(t("ui.copyPalette"))}">${escapeHtml(step.hex)}</code>
              <div class="meta">${escapeHtml(t(`ladder.hints.${step.key}`))}</div>
            </div>
          </div>
        `).join("");

        return `
          <article class="ladder-card">
            <div class="ladder-title">${escapeHtml(colorName(color))}</div>
            <div class="ladder-steps">${steps}</div>
            <p class="recipe-note"><strong>${escapeHtml(t(`recipeModes.${state.recipeModeKey}.title`))}:</strong> ${escapeHtml(t(`recipeModes.${state.recipeModeKey}.description`))}</p>
            <p class="recipe-note">${escapeHtml(t("ladder.note", {
              system: t(`systems.${state.system}`),
              finish: t(`finish.${W.styleLabelKey(state.style)}`)
            }))}</p>
          </article>
        `;
      }).join("");
      el.paintLadder.querySelectorAll("code").forEach(node => node.addEventListener("click", () => copyText(node.textContent)));
    }

    function renderCitadelMatches() {
      const paints = closestMatchCataloguePaints();
      const mapped = W.mapPaletteToCatalogue(currentPalette, paints, { limit: 3 });
      const statusKey = cataloguePaints.length ? (catalogueSource === "json" ? "loaded" : "sample") : "missing";
      el.citadelStatus.textContent = t(`citadel.${statusKey}`, { count: paints.length }) + " " + t("ui.citadelJsonHint");
      el.citadelMatches.innerHTML = mapped.map(color => {
        const matches = color.matches.length
          ? color.matches.map(match => {
            const meta = [paintMatchMeta(match), t("citadel.distance", { distance: match.distance })]
              .filter(Boolean)
              .join(" - ");
            const owned = ownedPaintKeys.has(paintKey(match));
            return `
              <div class="match-row ${owned ? "owned-match" : ""}">
                <span class="match-chip" style="background:${escapeHtml(match.hex)}"></span>
                <div>
                  <div>${escapeHtml(match.name)} <code>${escapeHtml(match.hex)}</code>${owned ? ` <span class="owned-badge">${escapeHtml(t("ui.ownedBadge"))}</span>` : ""}</div>
                  <div class="meta">${escapeHtml(meta)}</div>
                </div>
              </div>
            `;
          }).join("")
          : `<p class="notes">${escapeHtml(t("citadel.missing"))}</p>`;
        return `
          <article class="match-card">
            <div class="match-swatch" style="background:${escapeHtml(color.hex)}"></div>
            <div class="match-body">
              <div class="match-name">${escapeHtml(colorName(color))}</div>
              <div class="match-distance">${escapeHtml(color.hex)}</div>
              <p>${escapeHtml(t("citadel.closest"))}</p>
              <div class="match-list">${matches}</div>
            </div>
          </article>
        `;
      }).join("");
    }

    function paintMatchMeta(match) {
      return [
        match.manufacturer,
        match.collection,
        match.range,
        match.finish
      ].filter(Boolean).join(" / ");
    }

    function renderPaintSelectorOptions() {
      const query = el.paintSearch.value.trim().toLowerCase();
      paintSelectorOptions = filteredCataloguePaints()
        .filter(paint => !query || paintSelectorText(paint).toLowerCase().includes(query))
        .sort((a, b) => paintSelectorText(a).localeCompare(paintSelectorText(b)));

      const placeholder = paintSelectorOptions.length
        ? t("ui.paintSelectPlaceholder", { count: paintSelectorOptions.length })
        : t("ui.paintSelectEmpty");
      el.paintSelect.innerHTML = [
        `<option value="">${escapeHtml(placeholder)}</option>`,
        ...paintSelectorOptions.map((paint, index) => (
          `<option value="${index}">${escapeHtml(paintSelectorLabel(paint))}</option>`
        ))
      ].join("");
      el.paintSelect.value = "";
    }

    function paintSelectorText(paint) {
      return [
        paint.name,
        paint.manufacturer,
        paint.collection,
        paint.range,
        paint.finish,
        paint.manufacturerCode,
        paint.hex
      ].filter(Boolean).join(" ");
    }

    function paintSelectorLabel(paint) {
      const meta = paintSelectorMeta(paint);
      return meta ? `${paint.name} - ${meta} - ${paint.hex}` : `${paint.name} - ${paint.hex}`;
    }

    function paintSelectorMeta(paint) {
      return [paint.manufacturer, paint.collection, paint.range].filter(Boolean).join(" / ");
    }

    function renderProducerFilters(resetSelection) {
      const producers = catalogueManufacturers();
      const producerKeys = producers.map(producer => producer.key);
      const resolved = W.resolveProducerSelection({
        producerKeys,
        pendingProducerKeys,
        selectedKeys: Array.from(selectedManufacturers),
        catalogueSource,
        resetSelection,
        initialized: producerFiltersInitialized
      });
      selectedManufacturers = new Set(resolved.selectedKeys);
      pendingProducerKeys = resolved.pendingProducerKeys;
      state.producerKeys = pendingProducerKeys ? pendingProducerKeys.slice() : Array.from(selectedManufacturers);
      producerFiltersInitialized = true;

      el.producerFilters.innerHTML = producers.map(producer => `
        <label class="producer-option">
          <input type="checkbox" value="${escapeHtml(producer.key)}" ${selectedManufacturers.has(producer.key) ? "checked" : ""} />
          <span>${escapeHtml(producer.label)}</span>
        </label>
      `).join("");
    }

    function catalogueManufacturers() {
      const producerMap = new Map();
      cataloguePaints.forEach(paint => {
        const key = paintProducerKey(paint);
        if (!producerMap.has(key)) {
          producerMap.set(key, {
            key,
            label: paint.manufacturer || t("ui.unknownProducer")
          });
        }
      });
      return Array.from(producerMap.values()).sort((a, b) => a.label.localeCompare(b.label));
    }

    function filteredCataloguePaints() {
      if (!selectedManufacturers.size) {
        return [];
      }
      return cataloguePaints.filter(paint => selectedManufacturers.has(paintProducerKey(paint)));
    }

    function ownedListPaints() {
      const query = el.paintSearch.value.trim().toLowerCase();
      return filteredCataloguePaints()
        .filter(paint => !query || paintSelectorText(paint).toLowerCase().includes(query))
        .sort((a, b) => paintSelectorText(a).localeCompare(paintSelectorText(b)));
    }

    function closestMatchCataloguePaints() {
      return W.filterOwnedPaints(filteredCataloguePaints(), {
        onlyOwnedMatches: state.onlyOwnedMatches,
        ownedPaintKeys,
        paintKey
      });
    }

    function syncOwnedPaintsCollapse() {
      if (!el.ownedPaintsCollapse || !el.ownedPaintsBody) {
        return;
      }
      const collapsed = Boolean(state.ownedPaintsCollapsed);
      el.ownedPaintsBody.hidden = collapsed;
      el.ownedPaintsCollapse.setAttribute("aria-expanded", String(!collapsed));
      el.ownedPaintsCollapse.textContent = t(collapsed ? "ui.expandOwnedPaints" : "ui.collapseOwnedPaints");
    }

    function renderOwnedPaintList() {
      const paints = ownedListPaints();
      const ownedVisibleCount = paints.filter(paint => ownedPaintKeys.has(paintKey(paint))).length;
      const allVisibleSelected = paints.length > 0 && ownedVisibleCount === paints.length;
      el.ownedSelectAllVisible.checked = allVisibleSelected;
      el.ownedSelectAllVisible.indeterminate = ownedVisibleCount > 0 && ownedVisibleCount < paints.length;
      el.ownedSelectAllVisible.disabled = !paints.length;
      el.ownedPaintStatus.textContent = t(
        allVisibleSelected ? "ui.ownedPaintsAllSelected" : "ui.ownedPaintsStatus",
        { owned: ownedPaintKeys.size, visible: paints.length }
      );
      el.ownedPaintList.innerHTML = paints.length
        ? paints.map(paint => {
          const key = paintKey(paint);
          return `
            <label class="owned-paint-option">
              <input type="checkbox" value="${escapeHtml(key)}" ${ownedPaintKeys.has(key) ? "checked" : ""} />
              <span class="owned-paint-chip" style="background:${escapeHtml(paint.hex)}"></span>
              <span>
                <span class="owned-paint-name">${escapeHtml(paint.name)}</span>
                <span class="owned-paint-meta">${escapeHtml(paintSelectorMeta(paint))}</span>
              </span>
            </label>
          `;
        }).join("")
        : `<p class="notes">${escapeHtml(t("ui.ownedPaintsEmpty"))}</p>`;
    }

    function setVisibleOwnedPaints(checked) {
      ownedListPaints().forEach(paint => {
        const key = paintKey(paint);
        if (checked) {
          ownedPaintKeys.add(key);
          shoppingPaintKeys.delete(key);
        } else {
          ownedPaintKeys.delete(key);
        }
      });
      state.ownedPaintKeys = Array.from(ownedPaintKeys);
      state.shoppingPaintKeys = Array.from(shoppingPaintKeys);
      renderOwnedPaintList();
      renderShoppingList();
      renderCitadelMatches();
      saveLastSettings();
    }

    function toggleOwnedPaint(key, checked) {
      if (checked) {
        ownedPaintKeys.add(key);
      } else {
        ownedPaintKeys.delete(key);
      }
      if (ownedPaintKeys.has(key)) {
        shoppingPaintKeys.delete(key);
      }
      state.ownedPaintKeys = Array.from(ownedPaintKeys);
      state.shoppingPaintKeys = Array.from(shoppingPaintKeys);
      renderOwnedPaintList();
      renderShoppingList();
      renderCitadelMatches();
      saveLastSettings();
    }

    function syncShoppingListCollapse() {
      if (!el.shoppingListCollapse || !el.shoppingListBody) {
        return;
      }
      const collapsed = Boolean(state.shoppingListCollapsed);
      el.shoppingListBody.hidden = collapsed;
      el.shoppingListCollapse.setAttribute("aria-expanded", String(!collapsed));
      el.shoppingListCollapse.textContent = t(collapsed ? "ui.expandShoppingList" : "ui.collapseShoppingList");
    }

    function syncCollapsibleSections() {
      el.sectionCollapseButtons.forEach(button => {
        const key = button.dataset.sectionCollapse;
        const bodyId = button.getAttribute("aria-controls");
        const body = bodyId ? document.getElementById(bodyId) : null;
        if (!body || !Object.prototype.hasOwnProperty.call(DEFAULT_SECTION_COLLAPSE, key)) {
          return;
        }
        const collapsed = Boolean(state.collapsedSections[key]);
        body.hidden = collapsed;
        button.setAttribute("aria-expanded", String(!collapsed));
        button.textContent = t(collapsed ? "ui.expandSection" : "ui.collapseSection");
        const section = button.closest("[data-collapsible-section]");
        if (section) {
          section.classList.toggle("is-collapsed", collapsed);
        }
      });
    }

    function shoppingSearchPaints() {
      const query = el.shoppingSearch.value.trim().toLowerCase();
      return cataloguePaints
        .filter(paint => !ownedPaintKeys.has(paintKey(paint)))
        .filter(paint => !shoppingPaintKeys.has(paintKey(paint)))
        .filter(paint => !query || paintSelectorText(paint).toLowerCase().includes(query))
        .sort((a, b) => paintSelectorText(a).localeCompare(paintSelectorText(b)))
        .slice(0, 80);
    }

    function shoppingListPaints() {
      return Array.from(shoppingPaintKeys)
        .map(key => ({ key, paint: paintByKey(key) }))
        .filter(item => item.paint && !ownedPaintKeys.has(item.key))
        .sort((a, b) => paintSelectorText(a.paint).localeCompare(paintSelectorText(b.paint)));
    }

    function renderShoppingList() {
      if (!el.shoppingList) {
        return;
      }
      el.shoppingSearch.value = state.shoppingSearch || "";
      pruneOwnedShoppingPaints();
      const suggestions = shoppingSearchPaints();
      const selected = shoppingListPaints();
      const placeholder = suggestions.length
        ? t("ui.shoppingSearchPlaceholder", { count: suggestions.length })
        : t("ui.shoppingSearchEmpty");
      el.shoppingAddSelect.innerHTML = [
        `<option value="">${escapeHtml(placeholder)}</option>`,
        ...suggestions.map(paint => {
          const key = paintKey(paint);
          return `<option value="${escapeHtml(key)}">${escapeHtml(paintSelectorLabel(paint))}</option>`;
        })
      ].join("");
      el.shoppingAddSelect.value = "";
      el.addShoppingPaint.disabled = true;
      el.shoppingListStatus.textContent = t("ui.shoppingListStatus", { count: selected.length });
      el.shoppingList.innerHTML = selected.length
        ? selected.map(({ key, paint }) => `
          <div class="shopping-list-item">
            <span class="owned-paint-chip" style="background:${escapeHtml(paint.hex)}"></span>
            <span>
              <span class="owned-paint-name">${escapeHtml(paint.name)}</span>
              <span class="owned-paint-meta">${escapeHtml(paintSelectorMeta(paint))} · ${escapeHtml(paint.hex)}</span>
            </span>
            <button type="button" class="secondary danger compact-button" data-remove-shopping-key="${escapeHtml(key)}">${escapeHtml(t("ui.removeShoppingPaint"))}</button>
          </div>
        `).join("")
        : `<p class="notes">${escapeHtml(t("ui.shoppingListEmpty"))}</p>`;
    }

    function addShoppingPaintByKey(key) {
      const paint = paintByKey(key);
      if (!paint || ownedPaintKeys.has(key)) {
        return;
      }
      shoppingPaintKeys.add(key);
      state.shoppingPaintKeys = Array.from(shoppingPaintKeys);
      renderShoppingList();
      saveLastSettings();
    }

    function removeShoppingPaint(key) {
      shoppingPaintKeys.delete(key);
      state.shoppingPaintKeys = Array.from(shoppingPaintKeys);
      renderShoppingList();
      saveLastSettings();
    }

    function pruneOwnedShoppingPaints() {
      let changed = false;
      shoppingPaintKeys.forEach(key => {
        if (ownedPaintKeys.has(key) || !paintByKey(key)) {
          shoppingPaintKeys.delete(key);
          changed = true;
        }
      });
      if (changed) {
        state.shoppingPaintKeys = Array.from(shoppingPaintKeys);
      }
    }

    function paintByKey(key) {
      return cataloguePaints.find(paint => paintKey(paint) === key) || null;
    }

    function paintKey(paint) {
      return [
        paint.manufacturer,
        paint.collection,
        paint.range,
        paint.name,
        paint.hex
      ].map(value => String(value || "").trim().toLowerCase()).join("|");
    }

    function paintProducerKey(paint) {
      return paint.manufacturer || "__unknown__";
    }

    function randomizePalette() {
      state.system = randomChoice(["aos", "k40"]);
      state.mode = randomChoice(["single", "heraldic"]);
      state.activeColor = "primary";
      state.factionSchemeId = "";
      state.schemeKey = randomChoice(W.getSchemeKeysForSystem(state.system));
      state.roleProfileKey = randomChoice(W.getRoleProfileKeys(state.system));
      state.baseThemeKey = randomChoice(W.getBaseThemeKeys(state.system));
      state.recipeModeKey = randomChoice(W.getRecipeModeKeys());
      state.heraldicLayout = randomChoice(Object.keys(W.HERALDIC_LAYOUTS));
      state.heraldicRatio = randomChoice(Object.keys(W.HERALDIC_RATIOS));
      state.heraldicAccent = randomChoice(Object.keys(W.HERALDIC_ACCENTS));
      state.style = randomInt(-100, 100);
      state.paintSearch = "";

      const randomPrimary = randomCatalogueColor() || randomHobbyColor();
      state.h = randomPrimary.h;
      state.s = randomPrimary.s;
      state.l = randomPrimary.l;
      state.secondary = randomHobbyColor();

      const schemesForSystem = factionSchemesForCurrentSystem();
      if (schemesForSystem.length && Math.random() < 0.34) {
        state.factionSchemeId = randomChoice(schemesForSystem).id;
        state.mode = "single";
      }

      syncControlsFromState({ resetProducerSelection: false });
      update();
    }

    function randomCatalogueColor() {
      if (!cataloguePaints.length || Math.random() < 0.45) {
        return null;
      }
      const paint = randomChoice(filteredCataloguePaints().filter(item => item.hex));
      if (!paint) {
        return null;
      }
      const rgb = W.hexToRgb(paint.hex);
      return rgb ? W.rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
    }

    function randomHobbyColor() {
      return {
        h: randomInt(0, 359),
        s: randomInt(38, 92),
        l: randomInt(28, 72)
      };
    }


    function randomChoice(items) {
      return items[Math.floor(Math.random() * items.length)];
    }

    function randomInt(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }

    function saveLastSettings() {
      writeJson(STORAGE_KEYS.lastSettings, createSettingsSnapshot());
    }

    function saveNamedProfile() {
      const name = cleanProfileName(el.profileName.value) || defaultProfileName();
      const existing = profiles.find(profile => profile.name.toLowerCase() === name.toLowerCase());
      const profile = {
        id: existing ? existing.id : `profile-${Date.now()}`,
        name,
        savedAt: new Date().toISOString(),
        settings: createSettingsSnapshot()
      };

      if (existing) {
        profiles = profiles.map(item => item.id === existing.id ? profile : item);
      } else {
        profiles = profiles.concat(profile);
      }
      profiles.sort((a, b) => a.name.localeCompare(b.name));
      writeJson(STORAGE_KEYS.profiles, profiles);
      renderProfiles(profile.id);
      el.profileName.value = name;
      setProfileStatus(t("ui.profileSaved", { name }));
    }

    function loadSelectedProfile() {
      const profile = selectedProfile();
      if (!profile) {
        setProfileStatus(t("ui.profileMissing"));
        return;
      }
      if (!applySettingsToState(profile.settings)) {
        setProfileStatus(t("ui.profileMissing"));
        return;
      }
      syncControlsFromState();
      renderProfiles(profile.id);
      update();
      el.profileName.value = profile.name;
      setProfileStatus(t("ui.profileLoaded", { name: profile.name }));
    }

    function deleteSelectedProfile() {
      const profile = selectedProfile();
      if (!profile) {
        setProfileStatus(t("ui.profileMissing"));
        return;
      }
      profiles = profiles.filter(item => item.id !== profile.id);
      writeJson(STORAGE_KEYS.profiles, profiles);
      renderProfiles();
      el.profileName.value = "";
      setProfileStatus(t("ui.profileDeleted", { name: profile.name }));
    }

    function selectedProfile() {
      return profiles.find(profile => profile.id === el.savedProfiles.value) || null;
    }

    function renderProfiles(selectedId) {
      if (!el.savedProfiles) {
        return;
      }
      const placeholder = profiles.length ? t("ui.profilePlaceholder") : t("ui.noProfiles");
      el.savedProfiles.innerHTML = [
        `<option value="">${escapeHtml(placeholder)}</option>`,
        ...profiles.map(profile => (
          `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`
        ))
      ].join("");
      el.savedProfiles.value = profiles.some(profile => profile.id === selectedId) ? selectedId : "";
      const hasSelection = Boolean(el.savedProfiles.value);
      el.loadProfile.disabled = !profiles.length || !hasSelection;
      el.deleteProfile.disabled = !profiles.length || !hasSelection;
    }

    function setProfileStatus(message) {
      el.profileStatus.textContent = message;
    }

    function defaultProfileName() {
      return `${t(`systems.${state.system}`)} ${W.primaryHex(state)}`;
    }

    function cleanProfileName(name) {
      return String(name || "").trim().replace(/\s+/g, " ").slice(0, 60);
    }

    function createSettingsSnapshot() {
      return {
        version: SETTINGS_VERSION,
        savedAt: new Date().toISOString(),
        h: state.h,
        s: state.s,
        l: state.l,
        style: state.style,
        language: state.language,
        system: state.system,
        mode: state.mode,
        factionSchemeId: state.factionSchemeId,
        activeColor: state.activeColor,
        secondary: {
          h: state.secondary.h,
          s: state.secondary.s,
          l: state.secondary.l
        },
        heraldicLayout: state.heraldicLayout,
        heraldicRatio: state.heraldicRatio,
        heraldicAccent: state.heraldicAccent,
        schemeKey: state.schemeKey,
        roleProfileKey: state.roleProfileKey,
        baseThemeKey: state.baseThemeKey,
        recipeModeKey: state.recipeModeKey,
        paintSearch: state.paintSearch,
        producerKeys: pendingProducerKeys ? pendingProducerKeys.slice() : Array.from(selectedManufacturers),
        ownedPaintKeys: Array.from(ownedPaintKeys),
        onlyOwnedMatches: Boolean(state.onlyOwnedMatches),
        ownedPaintsCollapsed: Boolean(state.ownedPaintsCollapsed),
        shoppingPaintKeys: Array.from(shoppingPaintKeys),
        shoppingListCollapsed: Boolean(state.shoppingListCollapsed),
        shoppingSearch: state.shoppingSearch,
        collapsedSections: {
          ...DEFAULT_SECTION_COLLAPSE,
          ...state.collapsedSections
        }
      };
    }

    function buildShareUrl() {
      const snapshot = createSettingsSnapshot();
      const url = new URL(window.location.href);
      const params = new URLSearchParams();
      params.set("wph", String(SETTINGS_VERSION));
      params.set("system", snapshot.system);
      params.set("mode", snapshot.mode);
      params.set("hex", W.primaryHex(state).slice(1));
      params.set("style", String(Math.round(snapshot.style)));
      params.set("scheme", snapshot.schemeKey);
      params.set("role", snapshot.roleProfileKey);
      params.set("base", snapshot.baseThemeKey);
      params.set("recipe", snapshot.recipeModeKey);
      params.set("lang", snapshot.language);

      if (snapshot.factionSchemeId) {
        params.set("faction", snapshot.factionSchemeId);
      }
      if (snapshot.mode === "heraldic") {
        params.set("active", snapshot.activeColor);
        params.set("shex", W.hslToHex(snapshot.secondary.h, snapshot.secondary.s, snapshot.secondary.l).slice(1));
        params.set("layout", snapshot.heraldicLayout);
        params.set("ratio", snapshot.heraldicRatio);
        params.set("accent", snapshot.heraldicAccent);
      }
      if (snapshot.paintSearch) {
        params.set("search", snapshot.paintSearch);
      }
      if (snapshot.onlyOwnedMatches) {
        params.set("ownedOnly", "1");
      }
      if (!sameStringSet(snapshot.producerKeys, catalogueManufacturers().map(producer => producer.key))) {
        params.set("producers", snapshot.producerKeys.join(","));
      }

      url.search = params.toString();
      url.hash = "";
      return url.toString();
    }

    function applySettingsToState(snapshot) {
      if (!snapshot || typeof snapshot !== "object") {
        return false;
      }

      state.language = W.hasLanguage(snapshot.language) ? snapshot.language : state.language;
      state.system = ["aos", "k40"].includes(snapshot.system) ? snapshot.system : state.system;
      state.mode = ["single", "heraldic"].includes(snapshot.mode) ? snapshot.mode : state.mode;
      state.activeColor = ["primary", "secondary"].includes(snapshot.activeColor) ? snapshot.activeColor : state.activeColor;
      state.h = validNumber(snapshot.h) ? W.normHue(snapshot.h) : state.h;
      state.s = validNumber(snapshot.s) ? W.clamp(snapshot.s, 5, 100) : state.s;
      state.l = validNumber(snapshot.l) ? W.clamp(snapshot.l, 10, 90) : state.l;
      state.style = validNumber(snapshot.style) ? W.clamp(snapshot.style, -100, 100) : state.style;
      if (snapshot.secondary && typeof snapshot.secondary === "object") {
        state.secondary = {
          h: validNumber(snapshot.secondary.h) ? W.normHue(snapshot.secondary.h) : state.secondary.h,
          s: validNumber(snapshot.secondary.s) ? W.clamp(snapshot.secondary.s, 5, 100) : state.secondary.s,
          l: validNumber(snapshot.secondary.l) ? W.clamp(snapshot.secondary.l, 10, 90) : state.secondary.l
        };
      }
      state.factionSchemeId = typeof snapshot.factionSchemeId === "string" ? snapshot.factionSchemeId : "";
      state.heraldicLayout = typeof snapshot.heraldicLayout === "string" ? snapshot.heraldicLayout : state.heraldicLayout;
      state.heraldicRatio = typeof snapshot.heraldicRatio === "string" ? snapshot.heraldicRatio : state.heraldicRatio;
      state.heraldicAccent = typeof snapshot.heraldicAccent === "string" ? snapshot.heraldicAccent : state.heraldicAccent;
      state.schemeKey = typeof snapshot.schemeKey === "string" ? snapshot.schemeKey : state.schemeKey;
      state.roleProfileKey = typeof snapshot.roleProfileKey === "string" ? snapshot.roleProfileKey : state.roleProfileKey;
      state.baseThemeKey = typeof snapshot.baseThemeKey === "string" ? snapshot.baseThemeKey : state.baseThemeKey;
      state.recipeModeKey = W.normalizeRecipeMode(snapshot.recipeModeKey || state.recipeModeKey);
      state.paintSearch = typeof snapshot.paintSearch === "string" ? snapshot.paintSearch : "";
      state.producerKeys = Array.isArray(snapshot.producerKeys)
        ? snapshot.producerKeys.filter(key => typeof key === "string")
        : null;
      pendingProducerKeys = Array.isArray(state.producerKeys) ? state.producerKeys.slice() : null;
      state.ownedPaintKeys = Array.isArray(snapshot.ownedPaintKeys)
        ? snapshot.ownedPaintKeys.filter(key => typeof key === "string")
        : [];
      ownedPaintKeys = new Set(state.ownedPaintKeys);
      state.onlyOwnedMatches = Boolean(snapshot.onlyOwnedMatches);
      state.ownedPaintsCollapsed = Boolean(snapshot.ownedPaintsCollapsed);
      state.shoppingPaintKeys = Array.isArray(snapshot.shoppingPaintKeys)
        ? snapshot.shoppingPaintKeys.filter(key => typeof key === "string")
        : [];
      shoppingPaintKeys = new Set(state.shoppingPaintKeys);
      state.shoppingListCollapsed = Boolean(snapshot.shoppingListCollapsed);
      state.shoppingSearch = typeof snapshot.shoppingSearch === "string" ? snapshot.shoppingSearch : "";
      state.collapsedSections = normalizeCollapsedSections(snapshot.collapsedSections);
      return true;
    }

    function normalizeCollapsedSections(value) {
      const collapsedSections = { ...DEFAULT_SECTION_COLLAPSE };
      if (!value || typeof value !== "object") {
        return collapsedSections;
      }
      Object.keys(DEFAULT_SECTION_COLLAPSE).forEach(key => {
        collapsedSections[key] = Boolean(value[key]);
      });
      return collapsedSections;
    }

    function readSettingsFromUrl() {
      try {
        const params = new URLSearchParams(window.location.search);
        if (!params.has("wph") && !params.has("hex")) {
          return null;
        }

        const snapshot = {};
        const primary = hslFromHexParam(params.get("hex"));
        const secondary = hslFromHexParam(params.get("shex"));
        if (primary) {
          snapshot.h = primary.h;
          snapshot.s = primary.s;
          snapshot.l = primary.l;
        }
        if (secondary) {
          snapshot.secondary = secondary;
        }
        setStringSetting(snapshot, "language", params.get("lang"));
        setStringSetting(snapshot, "system", params.get("system"));
        setStringSetting(snapshot, "mode", params.get("mode"));
        setStringSetting(snapshot, "factionSchemeId", params.get("faction"));
        setStringSetting(snapshot, "activeColor", params.get("active"));
        setStringSetting(snapshot, "heraldicLayout", params.get("layout"));
        setStringSetting(snapshot, "heraldicRatio", params.get("ratio"));
        setStringSetting(snapshot, "heraldicAccent", params.get("accent"));
        setStringSetting(snapshot, "schemeKey", params.get("scheme"));
        setStringSetting(snapshot, "roleProfileKey", params.get("role"));
        setStringSetting(snapshot, "baseThemeKey", params.get("base"));
        setStringSetting(snapshot, "recipeModeKey", params.get("recipe"));
        setStringSetting(snapshot, "paintSearch", params.get("search"));
        const style = Number(params.get("style"));
        if (Number.isFinite(style)) {
          snapshot.style = style;
        }
        const producers = params.get("producers");
        if (producers !== null) {
          snapshot.producerKeys = producers.split(",")
            .map(value => value.trim())
            .filter(Boolean);
        }
        return snapshot;
      } catch (error) {
        return null;
      }
    }

    function hslFromHexParam(value) {
      if (!value) {
        return null;
      }
      const hex = value.startsWith("#") ? value : `#${value}`;
      const rgb = W.hexToRgb(hex);
      return rgb ? W.rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
    }

    function setStringSetting(target, key, value) {
      if (typeof value === "string" && value) {
        target[key] = value;
      }
    }

    function validNumber(value) {
      return typeof value === "number" && Number.isFinite(value);
    }

    function readSettingsSnapshot(key) {
      const snapshot = readJson(key);
      return snapshot && typeof snapshot === "object" ? snapshot : null;
    }

    function readProfiles() {
      const storedProfiles = readJson(STORAGE_KEYS.profiles);
      if (!Array.isArray(storedProfiles)) {
        return [];
      }
      return storedProfiles
        .filter(profile => profile && typeof profile.id === "string" && typeof profile.name === "string" && profile.settings)
        .map(profile => ({
          id: profile.id,
          name: cleanProfileName(profile.name) || "Profile",
          savedAt: typeof profile.savedAt === "string" ? profile.savedAt : "",
          settings: profile.settings
        }));
    }

    function readJson(key) {
      const raw = safeLocalStorage("get", key);
      if (!raw) {
        return null;
      }
      try {
        return JSON.parse(raw);
      } catch (error) {
        return null;
      }
    }

    function writeJson(key, value) {
      safeLocalStorage("set", key, JSON.stringify(value));
    }

    function createPaintTooltip() {
      const tooltip = document.createElement("div");
      tooltip.className = "paint-tooltip";
      tooltip.setAttribute("role", "tooltip");
      tooltip.setAttribute("aria-hidden", "true");
      document.body.appendChild(tooltip);
      return tooltip;
    }

    function handlePaintHoverStart(event) {
      const target = event.target.closest("[data-color-hex]");
      if (!target || el.paintTooltip.contains(event.target)) {
        return;
      }
      if (activeHoverTarget === target) {
        return;
      }
      hidePaintTooltip();
      activeHoverTarget = target;
      hoverTimer = setTimeout(() => {
        showPaintTooltip(target);
      }, 550);
    }

    function handlePaintHoverEnd(event) {
      const target = event.target.closest("[data-color-hex]");
      if (!target) {
        return;
      }
      if (event.relatedTarget && (target.contains(event.relatedTarget) || el.paintTooltip.contains(event.relatedTarget))) {
        return;
      }
      if (target === activeHoverTarget) {
        hidePaintTooltip();
      }
    }

    function showPaintTooltip(target) {
      if (target !== activeHoverTarget) {
        return;
      }
      const hex = target.dataset.colorHex;
      const colorName = target.dataset.colorName || hex;
      const paints = closestMatchCataloguePaints();
      const matches = paints.length ? W.findClosestPaints(hex, paints, 3) : [];
      const matchRows = matches.length
        ? matches.map(match => {
          const meta = [paintMatchMeta(match), t("citadel.distance", { distance: match.distance })]
            .filter(Boolean)
            .join(" - ");
          const key = paintKey(match);
          const owned = ownedPaintKeys.has(key);
          const inShoppingList = shoppingPaintKeys.has(key);
          const action = !owned
            ? `<button type="button" class="secondary compact-button tooltip-shopping-button" data-add-shopping-key="${escapeHtml(key)}" ${inShoppingList ? "disabled" : ""}>${escapeHtml(t(inShoppingList ? "ui.inShoppingList" : "ui.addToShoppingList"))}</button>`
            : "";
          return `
            <div class="paint-tooltip-row ${owned ? "owned-tooltip-match" : ""}">
              <span class="match-chip" style="background:${escapeHtml(match.hex)}"></span>
              <div>
                <div class="paint-tooltip-name">
                  ${escapeHtml(match.name)} <code>${escapeHtml(match.hex)}</code>${owned ? ` <span class="owned-badge">${escapeHtml(t("ui.ownedBadge"))}</span>` : ""}
                </div>
                <div class="meta">${escapeHtml(meta)}</div>
                ${action}
              </div>
            </div>
          `;
        }).join("")
        : `<p class="notes">${escapeHtml(t("citadel.missing"))}</p>`;

      el.paintTooltip.innerHTML = `
        <div class="paint-tooltip-head">
          <span class="paint-tooltip-swatch" style="background:${escapeHtml(hex)}"></span>
          <div>
            <div class="paint-tooltip-title">${escapeHtml(colorName)}</div>
            <code>${escapeHtml(hex)}</code>
          </div>
        </div>
        <div class="paint-tooltip-subtitle">${escapeHtml(t("citadel.closest"))}</div>
        <div class="paint-tooltip-list">${matchRows}</div>
      `;
      el.paintTooltip.classList.add("is-visible");
      el.paintTooltip.setAttribute("aria-hidden", "false");
      positionPaintTooltip(target);
    }

    function positionPaintTooltip(target) {
      const rect = target.getBoundingClientRect();
      const gap = 12;
      const margin = 12;
      const tooltipRect = el.paintTooltip.getBoundingClientRect();
      const maxLeft = window.innerWidth - tooltipRect.width - margin;
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      let top = rect.bottom + gap;

      left = W.clamp(left, margin, Math.max(margin, maxLeft));
      if (top + tooltipRect.height > window.innerHeight - margin) {
        top = rect.top - tooltipRect.height - gap;
      }
      top = Math.max(margin, top);

      el.paintTooltip.style.left = `${left}px`;
      el.paintTooltip.style.top = `${top}px`;
    }

    function hidePaintTooltip() {
      clearTimeout(hoverTimer);
      hoverTimer = null;
      activeHoverTarget = null;
      el.paintTooltip.classList.remove("is-visible");
      el.paintTooltip.setAttribute("aria-hidden", "true");
    }

    function resolveRoleColor(ref) {
      if (ref.type === "material") {
        const material = W.getMaterialFallback(ref.key);
        return {
          hex: material.hex,
          name: materialName(material.key)
        };
      }

      const color = currentPalette[ref.index] || currentPalette[currentPalette.length - 1] || {
        roleKey: "primary",
        hex: W.primaryHex(state)
      };
      return {
        hex: color.hex,
        name: roleName(color.roleKey)
      };
    }

    function roleName(key) {
      return t(`schemeRoles.${key}`);
    }

    function colorName(color) {
      return color.roleLabel || roleName(color.roleKey);
    }

    function materialName(key) {
      return t(`materials.items.${key}.name`);
    }

    function drawWheel() {
      const canvas = el.wheel;
      const ctx = canvas.getContext("2d");
      const size = canvas.width;
      const r = size / 2;
      const img = ctx.createImageData(size, size);
      const data = img.data;
      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          const dx = x - r;
          const dy = y - r;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const i = (y * size + x) * 4;
          if (dist <= r) {
            const h = W.normHue(Math.atan2(dy, dx) * 180 / Math.PI);
            const s = W.clamp(dist / r * 100, 0, 100);
            const rgb = W.hslToRgb(h, s, 50);
            data[i] = rgb.r;
            data[i + 1] = rgb.g;
            data[i + 2] = rgb.b;
            data[i + 3] = 255;
          } else {
            data[i + 3] = 0;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
    }

    function setDot() {
      const rect = el.wheel.getBoundingClientRect();
      const wrap = el.wheel.parentElement.getBoundingClientRect();
      const color = activeWheelColor();
      positionWheelMarker(el.dot, color.h, color.s, rect, wrap);
      el.dot.style.background = color.hex;
    }

    function setSchemeMarkers() {
      const rect = el.wheel.getBoundingClientRect();
      const wrap = el.wheel.parentElement.getBoundingClientRect();
      const markers = currentPalette.slice(1);

      el.markers.innerHTML = markers.map((color, index) => (
        `<span class="scheme-marker" data-marker-index="${index}" style="background:${escapeHtml(color.hex)}"></span>`
      )).join("");

      el.markers.querySelectorAll(".scheme-marker").forEach((marker, index) => {
        const color = markers[index];
        marker.title = `${roleName(color.roleKey)} ${color.hex}`;
        positionWheelMarker(marker, color.h, color.s, rect, wrap);
      });
    }

    function positionWheelMarker(marker, hue, saturation, rect, wrap) {
      const r = rect.width / 2;
      const markerR = r * (W.clamp(saturation, 0, 100) / 100);
      const angle = hue * Math.PI / 180;
      marker.style.left = `${rect.left + r + Math.cos(angle) * markerR - wrap.left}px`;
      marker.style.top = `${rect.top + r + Math.sin(angle) * markerR - wrap.top}px`;
    }

    function pickFromWheel(event) {
      const rect = el.wheel.getBoundingClientRect();
      const r = rect.width / 2;
      const dx = event.clientX - rect.left - r;
      const dy = event.clientY - rect.top - r;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > r) {
        return;
      }
      const picked = {
        h: Math.round(W.normHue(Math.atan2(dy, dx) * 180 / Math.PI)),
        s: Math.round(W.clamp(dist / r * 100, 5, 100)),
        l: state.activeColor === "secondary" && state.mode === "heraldic" ? state.secondary.l : state.l
      };
      if (state.mode === "heraldic" && state.activeColor === "secondary") {
        state.secondary = picked;
      } else {
        state.h = picked.h;
        state.s = picked.s;
      }
      syncSlidersToActiveColor();
      update();
    }

    function activeWheelColor() {
      if (state.mode === "heraldic" && state.activeColor === "secondary") {
        return {
          h: state.secondary.h,
          s: state.secondary.s,
          l: state.secondary.l,
          hex: W.hslToHex(state.secondary.h, state.secondary.s, state.secondary.l)
        };
      }
      return {
        h: state.h,
        s: state.s,
        l: state.l,
        hex: W.primaryHex(state)
      };
    }

    async function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (error) {
          return fallbackCopy(text);
        }
      }
      return fallbackCopy(text);
    }

    function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    }
  }

  function sameStringSet(left, right) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
      return false;
    }
    const rightKeys = new Set(right);
    return left.every(key => rightKeys.has(key));
  }

  function detectLanguage(W) {
    const stored = safeLocalStorage("get", "wph.language");
    if (stored && W.hasLanguage(stored)) {
      return stored;
    }
    const browserLanguage = (navigator.language || "en").slice(0, 2).toLowerCase();
    return W.hasLanguage(browserLanguage) ? browserLanguage : "en";
  }

  function saveLanguage(language) {
    safeLocalStorage("set", "wph.language", language);
  }

  function safeLocalStorage(action, key, value) {
    try {
      if (!window.localStorage) {
        return null;
      }
      if (action === "get") {
        return window.localStorage.getItem(key);
      }
      if (action === "set") {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}());
