(function () {
  "use strict";

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
      activeColor: "primary",
      secondary: { h: 45, s: 16, l: 92 },
      heraldicLayout: "split",
      heraldicRatio: "dominant",
      heraldicAccent: "auto"
    };

    let translator = W.createTranslator(state.language);
    let currentPalette = [];
    let cataloguePaints = W.DEFAULT_PAINT_CATALOGUE || W.DEFAULT_CITADEL_PAINTS;
    let catalogueSource = "sample";
    let selectedManufacturers = new Set();
    let producerFiltersInitialized = false;
    let hoverTimer = null;
    let activeHoverTarget = null;

    const $ = id => document.getElementById(id);
    const el = {
      language: $("languageSelect"),
      system: $("systemSelect"),
      mode: $("modeSelect"),
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
      producerFilters: $("producerFilters"),
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
      copy: $("copyPaletteBtn"),
      random: $("randomBtn"),
      debug: $("debugState"),
      rolePlannerTitle: $("rolePlannerTitle"),
      baseAdviceTitle: $("baseAdviceTitle"),
      paintLadderTitle: $("paintLadderTitle"),
      paintTooltip: createPaintTooltip()
    };
    el.swatch.classList.add("paint-hover-target");
    el.swatch.tabIndex = 0;
    el.secondarySwatch.classList.add("paint-hover-target");
    el.secondarySwatch.tabIndex = 0;

    el.language.value = state.language;
    translateStatic();
    populateDynamicControls();
    renderProducerFilters(true);
    drawWheel();
    attachEvents();
    update();

    W.loadPaintCatalogue("data/paint-catalogue.json").then(result => {
      cataloguePaints = result.paints;
      catalogueSource = result.source;
      renderProducerFilters(true);
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
      renderProducerFilters(false);
    }

    function populateDynamicControls() {
      setSelectOptions(el.system, ["aos", "k40"], key => t(`systems.${key}`), state.system);
      state.system = el.system.value;

      setSelectOptions(
        el.scheme,
        W.getSchemeKeysForSystem(state.system),
        key => t(`schemes.${key}.title`),
        el.scheme.value
      );
      setSelectOptions(
        el.roleStyle,
        W.getRoleProfileKeys(state.system),
        key => t(`profiles.${state.system}.${key}`),
        el.roleStyle.value
      );
      setSelectOptions(
        el.baseTheme,
        W.getBaseThemeKeys(state.system),
        key => key === "auto" ? t("baseOptions.auto") : t(`bases.${key}.title`),
        el.baseTheme.value
      );
      setSelectOptions(el.heraldicLayout, Object.keys(W.HERALDIC_LAYOUTS), key => t(`heraldic.layouts.${key}`), el.heraldicLayout.value || state.heraldicLayout);
      setSelectOptions(el.heraldicRatio, Object.keys(W.HERALDIC_RATIOS), key => t(`heraldic.ratios.${key}`), el.heraldicRatio.value || state.heraldicRatio);
      setSelectOptions(el.heraldicAccent, Object.keys(W.HERALDIC_ACCENTS), key => t(`heraldic.accents.${key}`), el.heraldicAccent.value || state.heraldicAccent);
    }

    function setSelectOptions(select, keys, labelForKey, preferredValue) {
      const selected = keys.includes(preferredValue) ? preferredValue : keys[0];
      select.innerHTML = keys.map(key => (
        `<option value="${escapeHtml(key)}">${escapeHtml(labelForKey(key))}</option>`
      )).join("");
      select.value = selected;
    }

    function attachEvents() {
      el.language.addEventListener("change", () => {
        state.language = el.language.value;
        saveLanguage(state.language);
        translateStatic();
        populateDynamicControls();
        update();
      });

      el.system.addEventListener("change", () => {
        state.system = el.system.value;
        populateDynamicControls();
        update();
      });

      el.mode.addEventListener("change", () => {
        state.mode = el.mode.value;
        syncSlidersToActiveColor();
        update();
      });

      el.activeColor.addEventListener("change", () => {
        state.activeColor = el.activeColor.value;
        syncSlidersToActiveColor();
        update();
      });

      el.wheel.addEventListener("pointerdown", event => {
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
      el.scheme.addEventListener("change", update);
      el.heraldicLayout.addEventListener("change", update);
      el.heraldicRatio.addEventListener("change", update);
      el.heraldicAccent.addEventListener("change", update);
      el.roleStyle.addEventListener("change", update);
      el.baseTheme.addEventListener("change", update);
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
        update();
      });
      el.sat.addEventListener("input", update);
      el.light.addEventListener("input", update);
      el.style.addEventListener("input", update);
      window.addEventListener("resize", () => {
        setDot();
        setSchemeMarkers();
      });

      el.hexInput.addEventListener("change", () => {
        const rgb = W.hexToRgb(el.hexInput.value);
        if (!rgb) {
          el.hexInput.value = W.primaryHex(state);
          return;
        }
        const hsl = W.rgbToHsl(rgb.r, rgb.g, rgb.b);
        state.h = hsl.h;
        state.s = hsl.s;
        state.l = hsl.l;
        if (state.mode !== "heraldic" || state.activeColor === "primary") {
          syncSlidersToActiveColor();
        }
        update();
      });

      el.secondaryHexInput.addEventListener("change", () => {
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
        const randomColor = {
          h: Math.floor(Math.random() * 360),
          s: Math.floor(45 + Math.random() * 45),
          l: Math.floor(34 + Math.random() * 24)
        };
        if (state.mode === "heraldic" && state.activeColor === "secondary") {
          state.secondary = randomColor;
          syncSlidersToActiveColor();
        } else {
          state.h = randomColor.h;
          state.s = randomColor.s;
          state.l = randomColor.l;
          syncSlidersToActiveColor();
        }
        update();
      });

      el.copy.addEventListener("click", () => {
        copyText(buildCopyText());
        const old = el.copy.textContent;
        el.copy.textContent = t("ui.copied");
        setTimeout(() => {
          el.copy.textContent = old;
        }, 900);
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
      applySlidersToActiveColor();
      state.style = Number(el.style.value);
      state.heraldicLayout = el.heraldicLayout.value;
      state.heraldicRatio = el.heraldicRatio.value;
      state.heraldicAccent = el.heraldicAccent.value;
      const schemeKey = el.scheme.value;
      const scheme = W.SCHEMES[schemeKey] || W.SCHEMES.complementary;
      const hex = W.primaryHex(state);
      const secondaryHex = W.hslToHex(state.secondary.h, state.secondary.s, state.secondary.l);
      const finishKey = W.styleLabelKey(state.style);
      const finishLabel = t(`finish.${finishKey}`);
      const isHeraldic = state.mode === "heraldic";
      currentPalette = isHeraldic
        ? W.buildHeraldicPalette(state, {
          layoutKey: state.heraldicLayout,
          ratioKey: state.heraldicRatio,
          accentKey: state.heraldicAccent
        })
        : W.buildPalette(state, schemeKey);

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
      el.title.textContent = isHeraldic ? t("heraldic.title") : t(`schemes.${schemeKey}.title`);
      el.desc.textContent = isHeraldic
        ? t("heraldic.description", {
          layout: t(`heraldic.layouts.${state.heraldicLayout}`),
          ratio: t(`heraldic.ratios.${state.heraldicRatio}`)
        })
        : t(`schemes.${schemeKey}.desc`);
      el.rolePlannerTitle.textContent = t(`systemCopy.${state.system}.rolePlannerTitle`);
      el.baseAdviceTitle.textContent = t(`systemCopy.${state.system}.baseAdviceTitle`);
      el.paintLadderTitle.textContent = t(`systemCopy.${state.system}.paintLadderTitle`);
      el.notes.innerHTML = `<strong>${escapeHtml(t("ui.paintingNotes"))}:</strong> ${escapeHtml(isHeraldic ? t("heraldic.note") : t(`schemes.${schemeKey}.note`))}<br><br><strong>${escapeHtml(t(`systemCopy.${state.system}.finishPrefix`))}:</strong> ${escapeHtml(t(`finish.summary.${finishKey}`))}`;

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
        <article class="card paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(color.hex)}" data-color-name="${escapeHtml(roleName(color.roleKey))}">
          <div class="swatch" style="background:${escapeHtml(color.hex)}"></div>
          <div class="card-body">
            <div class="role">${escapeHtml(roleName(color.roleKey))}</div>
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
          <article class="paint-map-card paint-hover-target" tabindex="0" data-color-hex="${escapeHtml(color.hex)}" data-color-name="${escapeHtml(roleName(color.roleKey))}">
            <div class="paint-map-swatch" style="background:${escapeHtml(color.hex)}"></div>
            <div>
              <div class="role">${escapeHtml(roleName(color.roleKey))}</div>
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
        const steps = W.ladderForColor(color, state.style).map(step => `
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
            <div class="ladder-title">${escapeHtml(roleName(color.roleKey))}</div>
            <div class="ladder-steps">${steps}</div>
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
      const paints = filteredCataloguePaints();
      const mapped = W.mapPaletteToCatalogue(currentPalette, paints, { limit: 3 });
      const statusKey = cataloguePaints.length ? (catalogueSource === "json" ? "loaded" : "sample") : "missing";
      el.citadelStatus.textContent = t(`citadel.${statusKey}`, { count: paints.length }) + " " + t("ui.citadelJsonHint");
      el.citadelMatches.innerHTML = mapped.map(color => {
        const matches = color.matches.length
          ? color.matches.map(match => {
            const meta = [paintMatchMeta(match), t("citadel.distance", { distance: match.distance })]
              .filter(Boolean)
              .join(" - ");
            return `
              <div class="match-row">
                <span class="match-chip" style="background:${escapeHtml(match.hex)}"></span>
                <div>
                  <div>${escapeHtml(match.name)} <code>${escapeHtml(match.hex)}</code></div>
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
              <div class="match-name">${escapeHtml(roleName(color.roleKey))}</div>
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
        match.finish,
        match.status
      ].filter(Boolean).join(" / ");
    }

    function paintMatchLabel(match) {
      const manufacturer = match.manufacturer ? ` (${match.manufacturer})` : "";
      return `${match.name}${manufacturer} ${match.hex}`;
    }

    function renderProducerFilters(resetSelection) {
      const producers = catalogueManufacturers();
      if (resetSelection || !producerFiltersInitialized) {
        selectedManufacturers = new Set(producers.map(producer => producer.key));
      } else {
        selectedManufacturers = new Set(producers.map(producer => producer.key).filter(key => selectedManufacturers.has(key)));
      }
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

    function paintProducerKey(paint) {
      return paint.manufacturer || "__unknown__";
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
      if (!target) {
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
      if (event.relatedTarget && target.contains(event.relatedTarget)) {
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
      const paints = filteredCataloguePaints();
      const matches = paints.length ? W.findClosestPaints(hex, paints, 3) : [];
      const matchRows = matches.length
        ? matches.map(match => {
          const meta = [paintMatchMeta(match), t("citadel.distance", { distance: match.distance })]
            .filter(Boolean)
            .join(" - ");
          return `
            <div class="paint-tooltip-row">
              <span class="match-chip" style="background:${escapeHtml(match.hex)}"></span>
              <div>
                <div class="paint-tooltip-name">${escapeHtml(match.name)} <code>${escapeHtml(match.hex)}</code></div>
                <div class="meta">${escapeHtml(meta)}</div>
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

    function buildCopyText() {
      const paletteText = currentPalette.map(color => (
        `${roleName(color.roleKey)}: ${color.hex} - HSL(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)`
      )).join("\n");
      const roleText = rolePlannerItems().map(item => {
        const color = resolveRoleColor(item.colorRef);
        const area = item.extra ? color.name : t(`roleAreas.${item.areaKey}`);
        return `${area}: ${color.hex} (${color.name}) - ${t(`roleUses.${item.useKey}`)} ${t(`roleTips.${item.tipKey}`)}`;
      }).join("\n");
      const baseText = W.baseSuggestions({
        palette: currentPalette,
        state,
        systemKey: state.system,
        roleProfileKey: el.roleStyle.value,
        baseThemeKey: el.baseTheme.value
      }).map(base => {
        const recipe = t(`bases.${base.key}.recipe`);
        return `${t(`bases.${base.key}.title`)}: ${base.hex} - ${t(`bases.${base.key}.use`)}\n${t("ui.why")}: ${t(`bases.${base.key}.tip`)}\n${t("ui.build")}: ${Array.isArray(recipe) ? recipe.join(" -> ") : ""}`;
      }).join("\n");
      const ladderText = currentPalette.slice(0, 4).map(color => (
        `${roleName(color.roleKey)}:\n` + W.ladderForColor(color, state.style).map(step => (
          `  ${t(`ladder.steps.${step.key}`)}: ${step.hex} - ${t(`ladder.hints.${step.key}`)}`
        )).join("\n")
      )).join("\n\n");
      const catalogueText = W.mapPaletteToCatalogue(currentPalette, filteredCataloguePaints(), { limit: 3 }).map(color => (
        `${roleName(color.roleKey)} ${color.hex}: ` + color.matches.map(paintMatchLabel).join(", ")
      )).join("\n");

      return [
        `${t("copy.palette")}:\n${paletteText}`,
        `${t("copy.roles")}:\n${roleText}`,
        `${t("copy.bases")}:\n${baseText}`,
        `${t("copy.ladder")}:\n${ladderText}`,
        `${t("copy.citadel")}:\n${catalogueText}`
      ].filter(Boolean).join("\n\n");
    }

    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    }

    function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
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
