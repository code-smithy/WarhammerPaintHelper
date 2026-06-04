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
      system: "aos"
    };

    let translator = W.createTranslator(state.language);
    let currentPalette = [];
    let cataloguePaints = W.DEFAULT_PAINT_CATALOGUE || W.DEFAULT_CITADEL_PAINTS;
    let catalogueSource = "sample";

    const $ = id => document.getElementById(id);
    const el = {
      language: $("languageSelect"),
      system: $("systemSelect"),
      wheel: $("colorWheel"),
      markers: $("schemeMarkers"),
      dot: $("selectorDot"),
      swatch: $("currentSwatch"),
      hex: $("currentHex"),
      hsl: $("currentHsl"),
      hexInput: $("hexInput"),
      scheme: $("schemeSelect"),
      roleStyle: $("roleStyleSelect"),
      baseTheme: $("baseThemeSelect"),
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
      paintLadderTitle: $("paintLadderTitle")
    };

    el.language.value = state.language;
    translateStatic();
    populateDynamicControls();
    drawWheel();
    attachEvents();
    update();

    W.loadPaintCatalogue("data/paint-catalogue.json").then(result => {
      cataloguePaints = result.paints;
      catalogueSource = result.source;
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
      el.roleStyle.addEventListener("change", update);
      el.baseTheme.addEventListener("change", update);
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
        el.sat.value = state.s;
        el.light.value = state.l;
        update();
      });

      el.random.addEventListener("click", () => {
        state.h = Math.floor(Math.random() * 360);
        state.s = Math.floor(45 + Math.random() * 45);
        state.l = Math.floor(34 + Math.random() * 24);
        el.sat.value = state.s;
        el.light.value = state.l;
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
    }

    function update() {
      state.s = Number(el.sat.value);
      state.l = Number(el.light.value);
      state.style = Number(el.style.value);
      const schemeKey = el.scheme.value;
      const scheme = W.SCHEMES[schemeKey] || W.SCHEMES.complementary;
      const hex = W.primaryHex(state);
      const finishKey = W.styleLabelKey(state.style);
      const finishLabel = t(`finish.${finishKey}`);
      currentPalette = W.buildPalette(state, schemeKey);

      el.swatch.style.background = hex;
      el.hex.textContent = hex;
      el.hsl.textContent = `HSL(${Math.round(state.h)}, ${Math.round(state.s)}%, ${Math.round(state.l)}%)`;
      el.hexInput.value = hex;
      el.satOut.value = `${Math.round(state.s)}%`;
      el.lightOut.value = `${Math.round(state.l)}%`;
      el.styleOut.value = finishLabel;
      el.styleSummary.textContent = t(`finish.summary.${finishKey}`);
      el.title.textContent = t(`schemes.${schemeKey}.title`);
      el.desc.textContent = t(`schemes.${schemeKey}.desc`);
      el.rolePlannerTitle.textContent = t(`systemCopy.${state.system}.rolePlannerTitle`);
      el.baseAdviceTitle.textContent = t(`systemCopy.${state.system}.baseAdviceTitle`);
      el.paintLadderTitle.textContent = t(`systemCopy.${state.system}.paintLadderTitle`);
      el.notes.innerHTML = `<strong>${escapeHtml(t("ui.paintingNotes"))}:</strong> ${escapeHtml(t(`schemes.${schemeKey}.note`))}<br><br><strong>${escapeHtml(t(`systemCopy.${state.system}.finishPrefix`))}:</strong> ${escapeHtml(t(`finish.summary.${finishKey}`))}`;

      renderPalette(scheme);
      renderRolePlanner();
      renderBaseAdvice();
      renderPaintMap();
      renderPaintLadder();
      renderCitadelMatches();
      setDot();
      setSchemeMarkers();
      el.debug.textContent = t("ui.debug", {
        hex,
        firstHex: currentPalette[0].hex,
        h: state.h,
        s: state.s,
        l: state.l,
        finish: finishLabel
      });
    }

    function renderPalette() {
      el.palette.innerHTML = currentPalette.map(color => `
        <article class="card">
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
          <article class="role-plan-card">
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
          <article class="base-advice-card">
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
          <article class="paint-map-card">
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
          <div class="ladder-step">
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
      const mapped = W.mapPaletteToCatalogue(currentPalette, cataloguePaints, { limit: 3 });
      const statusKey = cataloguePaints.length ? (catalogueSource === "json" ? "loaded" : "sample") : "missing";
      el.citadelStatus.textContent = t(`citadel.${statusKey}`, { count: cataloguePaints.length }) + " " + t("ui.citadelJsonHint");
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
      positionWheelMarker(el.dot, state.h, state.s, rect, wrap);
      el.dot.style.background = W.primaryHex(state);
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
      state.h = Math.round(W.normHue(Math.atan2(dy, dx) * 180 / Math.PI));
      state.s = Math.round(W.clamp(dist / r * 100, 5, 100));
      el.sat.value = state.s;
      update();
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
      const catalogueText = W.mapPaletteToCatalogue(currentPalette, cataloguePaints, { limit: 3 }).map(color => (
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
