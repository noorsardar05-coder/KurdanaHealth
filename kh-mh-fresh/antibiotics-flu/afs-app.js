/**
 * Kurdana Antibiotics & Flu — premium bilingual app (educational only)
 */
(function () {
  "use strict";

  var LANG = "en";
  var USER_KEY = "kurdana_antibiotics_guest";

  var SYM_KEYS = [
    "fever", "cough", "soreThroat", "runnyNose", "bodyAches", "fatigue",
    "headache", "chills", "chest", "breath", "ear", "sinus", "nausea", "vomit", "diarrhea",
  ];
  var RF_KEYS = ["breath", "chest", "blue", "conf", "neck", "fever39", "fever4d", "dehyd", "weak", "worse"];
  var RISK_KEYS = ["riskAsthma", "riskPreg", "riskDiabetes", "riskImmune", "riskHeart", "riskNone"];

  var LEGACY_SYM_MAP = {
    fever: "sym_fever", cough: "sym_cough", soreThroat: "sym_soreThroat",
    runnyNose: "sym_runnyNose", bodyAches: "sym_bodyAches", fatigue: "sym_fatigue",
    headache: "sym_headache", chills: "sym_chills", chest: "sym_chest",
    breath: "sym_breath", ear: "sym_ear", sinus: "sym_sinus",
    nausea: "sym_nausea", vomit: "sym_vomit", diarrhea: "sym_diarrhea",
  };

  var QUICK_NAV = [
    { tab: "symptom", icon: "🧠", title: "quickNavSymptom" },
    { tab: "flu", icon: "📊", title: "quickNavFlu" },
    { tab: "library", icon: "💊", title: "quickNavLibrary" },
    { tab: "infection", icon: "🔬", title: "quickNavInfection" },
    { tab: "play", icon: "🎮", title: "quickNavPlay" },
    { tab: "discover", icon: "📚", title: "quickNavDiscover" },
  ];

  var WIZARD_STEPS = [
    { id: 0, key: "stepRedFlags" },
    { id: 1, key: "stepSymptoms" },
    { id: 2, key: "stepDetails" },
    { id: 3, key: "stepResults" },
  ];

  var state = {
    wizardStep: 0,
    symptoms: {},
    redFlags: {},
    duration: "dur35",
    temp: "tempNormal",
    severity: "sevMod",
    age: "ageAdult",
    risks: {},
    mythI: 0,
    virusI: 0,
    resistI: 0,
    badges: { wise: false, hero: false },
  };

  var gameCeleb = { virus: false, myth: false, resist: false, plan: false };

  /* ── Utilities ── */

  function $id(id) { return document.getElementById(id); }

  function tr(k) {
    var o = window.AFS_I18N[LANG] || window.AFS_I18N.en;
    return (o && o[k]) || (window.AFS_I18N.en[k] !== undefined ? window.AFS_I18N.en[k] : k);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function toggleHidden(node, show) {
    if (!node) return;
    node.classList.toggle("afs-hidden", !show);
  }

  function getUserKey() {
    try {
      var p = new URLSearchParams(location.search || "");
      var uk = p.get("uk");
      if (uk) return decodeURIComponent(uk).slice(0, 80);
    } catch (e) {}
    try {
      var raw = localStorage.getItem("user");
      if (!raw) return "kurdana_antibiotics_guest";
      var u = JSON.parse(raw);
      if (!u || typeof u.name !== "string" || !String(u.name).trim()) return "kurdana_antibiotics_guest";
      var slug = String(u.name).trim().toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "_")
        .replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 64);
      return (slug || "user") + "_" + (u.gender || "x");
    } catch (e2) {
      return "kurdana_antibiotics_guest";
    }
  }

  function keyTracker() { return "kurdana_antibiotics_tracker_" + USER_KEY; }
  function keySymptom() { return "kurdana_antibiotics_symptom_results_" + USER_KEY; }
  function keyLangStore() { return "kurdana_antibiotics_language_" + USER_KEY; }
  function keyBadges() { return "kurdana_antibiotics_badges_" + USER_KEY; }

  /* ── i18n & language ── */

  function parseUrlLang() {
    try {
      var l = new URLSearchParams(location.search).get("lang");
      if (l === "ku" || l === "en") return l;
    } catch (e) {}
    return null;
  }

  function loadStoredLang() {
    try {
      var v = localStorage.getItem(keyLangStore());
      if (v === "ku" || v === "en") return v;
      var legacy = localStorage.getItem("kurdana_afs_lang");
      if (legacy === "ckb") return "ku";
      if (legacy === "en") return "en";
    } catch (e) {}
    return null;
  }

  function saveLang() {
    try { localStorage.setItem(keyLangStore(), LANG); } catch (e) {}
  }

  function applyI18n() {
    document.querySelectorAll("[data-str]").forEach(function (node) {
      var k = node.getAttribute("data-str");
      if (k) node.textContent = tr(k);
    });
  }

  function refreshDynamicI18n() {
    var ph = $id("drugSearch");
    if (ph) ph.placeholder = tr("phSearch");
    var fm = $id("fluMeds");
    if (fm) fm.placeholder = tr("ph_meds");
  }

  function setLang(lang) {
    LANG = lang === "ku" ? "ku" : "en";
    document.documentElement.lang = LANG;
    document.documentElement.dir = LANG === "ku" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-en", LANG === "en");
    document.body.classList.toggle("lang-ku", LANG === "ku");
    var lbl = $id("afsLangLabel");
    if (lbl) lbl.textContent = LANG === "en" ? "کوردی" : "English";
    applyI18n();
    saveLang();
    refreshDynamicI18n();
    renderQuickNav();
    renderWizard();
    renderLibraryEdu();
    renderInfectionGrid();
    renderDiscover();
    renderDrugGrid();
    renderGames();
    renderBadges();
    renderFluHistory();
    updatePlayPointsDisplay();
    if (state.wizardStep === 3) {
      var res = analyzePattern();
      renderAnalysisResult(res);
    }
  }

  /* ── Navigation ── */

  function jumpTab(name) {
    document.querySelectorAll(".afs-tab").forEach(function (b) {
      var on = b.getAttribute("data-tab") === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".afs-panel").forEach(function (p) {
      var on = p.getAttribute("data-panel") === name;
      p.classList.toggle("active", on);
      p.hidden = !on;
    });
  }

  function wireTabs() {
    document.querySelectorAll(".afs-tab").forEach(function (btn) {
      btn.addEventListener("click", function () { jumpTab(btn.getAttribute("data-tab")); });
    });
  }

  function renderQuickNav() {
    var host = $id("quickNav");
    if (!host) return;
    host.innerHTML = "";
    QUICK_NAV.forEach(function (c) {
      var btn = el("button", "afs-quick-card afs-glass",
        '<span class="afs-quick-icon" aria-hidden="true">' + c.icon + "</span>" +
        "<span>" + esc(tr(c.title)) + "</span>");
      btn.type = "button";
      btn.addEventListener("click", function () { jumpTab(c.tab); });
      host.appendChild(btn);
    });
  }

  /* ── Checkbox grid builder ── */

  function buildCheckGrid(rootId, items, stateKey, opts) {
    var root = $id(rootId);
    if (!root) return;
    var warn = opts && opts.warn;
    var attr = opts && opts.attr || "data-k";
    root.innerHTML = "";
    items.forEach(function (item) {
      var k = typeof item === "string" ? item : item.key;
      var strKey = typeof item === "string" ? (opts.prefix || "") + item : item.str;
      var id = (opts.idPrefix || "chk_") + k;
      var lab = el("label", "afs-check" + (warn ? " afs-check-warn" : ""),
        '<input type="checkbox" id="' + id + '" ' + attr + '="' + k + '"> <span>' + esc(tr(strKey)) + "</span>");
      root.appendChild(lab);
      var inp = lab.querySelector("input");
      var store = stateKey === "redFlags" ? state.redFlags : stateKey === "risks" ? state.risks : state.symptoms;
      inp.checked = !!store[k];
      inp.addEventListener("change", function () {
        if (stateKey === "risks" && k === "riskNone" && inp.checked) {
          RISK_KEYS.forEach(function (x) { if (x !== "riskNone") state.risks[x] = false; });
        } else if (stateKey === "risks" && k !== "riskNone") {
          state.risks.riskNone = false;
        }
        store[k] = inp.checked;
        if (stateKey === "risks") syncRiskBoxes();
        if (stateKey === "redFlags") updateUrgentBanner();
      });
    });
  }

  function syncRiskBoxes() {
    document.querySelectorAll("#riskChecks input, #wizardRiskChecks input").forEach(function (inp) {
      var k = inp.getAttribute("data-risk");
      if (k) inp.checked = !!state.risks[k];
    });
  }

  function chipRow(id, options, cur, onPick) {
    var root = $id(id);
    if (!root) return;
    root.innerHTML = "";
    options.forEach(function (opt) {
      var b = el("button", "afs-chip" + (cur === opt ? " active" : ""), esc(tr(opt)));
      b.type = "button";
      b.addEventListener("click", function () { onPick(opt); chipRow(id, options, opt, onPick); });
      root.appendChild(b);
    });
  }

  /* ── Symptom wizard ── */

  function renderWizardSteps() {
    var host = $id("symptomSteps");
    if (!host) return;
    host.innerHTML = "";
    WIZARD_STEPS.forEach(function (s) {
      var step = el("div", "afs-wizard-step" + (state.wizardStep === s.id ? " active" : "") +
        (state.wizardStep > s.id ? " done" : ""), esc(tr(s.key)));
      step.setAttribute("role", "listitem");
      host.appendChild(step);
    });
  }

  function renderWizardBody() {
    var body = $id("symptomStepBody");
    if (!body) return;
    body.innerHTML = "";

    if (state.wizardStep === 0) {
      body.appendChild(el("h3", "afs-card-title", esc(tr("redFlagTitle"))));
      body.appendChild(el("p", "afs-muted small", esc(tr("redFlagIntro"))));
      var rf = el("div", "afs-check-grid");
      rf.id = "wizardRedFlags";
      body.appendChild(rf);
      RF_KEYS.forEach(function (k) {
        var lab = el("label", "afs-check afs-check-warn",
          '<input type="checkbox" data-rf="' + k + '"> <span>' + esc(tr("rf_" + k)) + "</span>");
        rf.appendChild(lab);
        var inp = lab.querySelector("input");
        inp.checked = !!state.redFlags[k];
        inp.addEventListener("change", function () {
          state.redFlags[k] = inp.checked;
          updateUrgentBanner();
        });
      });
    } else if (state.wizardStep === 1) {
      body.appendChild(el("h3", "afs-card-title", esc(tr("symptomsTitle"))));
      var sg = el("div", "afs-check-grid");
      sg.id = "wizardSymptoms";
      body.appendChild(sg);
      SYM_KEYS.forEach(function (k) {
        var lab = el("label", "afs-check",
          '<input type="checkbox" data-k="' + k + '"> <span>' + esc(tr("sym_" + k)) + "</span>");
        sg.appendChild(lab);
        var inp = lab.querySelector("input");
        inp.checked = !!state.symptoms[k];
        inp.addEventListener("change", function () { state.symptoms[k] = inp.checked; });
      });
    } else if (state.wizardStep === 2) {
      body.appendChild(el("h3", "afs-card-title", esc(tr("stepDetails"))));
      var fields = el("div", "afs-row-fields afs-mt");
      fields.innerHTML =
        '<div><span class="afs-label">' + esc(tr("lblDuration")) + '</span><div class="afs-chips" id="durationChips"></div></div>' +
        '<div><span class="afs-label">' + esc(tr("lblTemp")) + '</span><div class="afs-chips" id="tempChips"></div></div>' +
        '<div><span class="afs-label">' + esc(tr("lblSeverity")) + '</span><div class="afs-chips" id="severityChips"></div></div>' +
        '<div><span class="afs-label">' + esc(tr("lblAge")) + '</span><div class="afs-chips" id="ageChips"></div></div>';
      body.appendChild(fields);
      var riskWrap = el("div", "afs-mt");
      riskWrap.innerHTML = '<span class="afs-label">' + esc(tr("lblRisk")) + '</span><div class="afs-check-grid cols-2" id="wizardRiskChecks"></div>';
      body.appendChild(riskWrap);
      RISK_KEYS.forEach(function (k) {
        var rc = $id("wizardRiskChecks");
        var lab = el("label", "afs-check",
          '<input type="checkbox" data-risk="' + k + '"> <span>' + esc(tr(k)) + "</span>");
        rc.appendChild(lab);
        var inp = lab.querySelector("input");
        inp.checked = !!state.risks[k];
        inp.addEventListener("change", function () {
          if (k === "riskNone" && inp.checked) RISK_KEYS.forEach(function (x) { if (x !== "riskNone") state.risks[x] = false; });
          else if (k !== "riskNone") state.risks.riskNone = false;
          state.risks[k] = inp.checked;
          syncRiskBoxes();
        });
      });
      chipRow("durationChips", ["dur12", "dur35", "dur6"], state.duration, function (v) { state.duration = v; });
      chipRow("tempChips", ["tempNormal", "tempMild", "tempHigh"], state.temp, function (v) { state.temp = v; });
      chipRow("severityChips", ["sevMild", "sevMod", "sevSev"], state.severity, function (v) { state.severity = v; });
      chipRow("ageChips", ["ageChild", "ageTeen", "ageAdult", "ageElder"], state.age, function (v) { state.age = v; });
    } else {
      body.appendChild(el("p", "afs-muted", esc(tr("symptomDesc"))));
      body.appendChild(el("p", "afs-wizard-ready", "✓ " + esc(tr("btnAnalyze"))));
    }
  }

  function renderWizard() {
    renderWizardSteps();
    renderWizardBody();
    var prev = $id("symptomPrev");
    var next = $id("symptomNext");
    var analyze = $id("analyzeBtn");
    toggleHidden(prev, state.wizardStep > 0 && state.wizardStep < 3);
    toggleHidden(next, state.wizardStep < 2);
    toggleHidden(analyze, state.wizardStep === 2);
  }

  function wireWizard() {
    $id("symptomPrev").addEventListener("click", function () {
      if (state.wizardStep > 0) { state.wizardStep -= 1; renderWizard(); }
    });
    $id("symptomNext").addEventListener("click", function () {
      if (state.wizardStep < 2) { state.wizardStep += 1; renderWizard(); }
    });
    $id("analyzeBtn").addEventListener("click", function () {
      state.wizardStep = 3;
      renderWizard();
      runAnalyze();
    });
  }

  function updateUrgentBanner() {
    var el = $id("afsUrgentBanner");
    if (!el) return;
    var any = RF_KEYS.some(function (k) { return state.redFlags[k]; });
    if (any) {
      el.classList.remove("afs-hidden");
      el.innerHTML =
        '<div class="afs-urgent-inner"><strong>⚠ ' + esc(tr("urgentCare")) + "</strong><p>" +
        esc(tr("urgentBody")) + "</p></div>";
    } else {
      el.classList.add("afs-hidden");
      el.innerHTML = "";
    }
  }

  /* ── Symptom analysis ── */

  function analyzePattern() {
    var anyRed = RF_KEYS.some(function (k) { return state.redFlags[k]; });
    var s = state.symptoms;
    var flu = 0, cold = 0, bact = 0;

    if (s.fever && s.bodyAches && s.fatigue) flu += 4;
    if (s.cough && (s.fever || s.fatigue)) flu += 1;
    if (s.runnyNose && s.soreThroat && !s.breath) cold += 3;
    if (s.runnyNose && s.cough) cold += 1;
    if (s.headache || s.chills) flu += 1;
    if (s.ear || (s.soreThroat && state.duration !== "dur12" && (state.temp === "tempHigh" || state.severity === "sevSev"))) bact += 2;
    if (s.breath || s.chest) bact += 2;
    if (state.duration === "dur6" && state.severity !== "sevMild") bact += 1;

    var patternKey = "pattern_viral";
    if (anyRed) patternKey = "pattern_urgent";
    else if (bact >= 3 && (state.duration === "dur6" || state.severity === "sevSev")) patternKey = "pattern_bact";
    else if (flu >= 4 && flu >= cold) patternKey = "pattern_flu";
    else if (cold >= 3) patternKey = "pattern_cold";

    var risk = "riskLow";
    if (anyRed) risk = "riskUrgent";
    else if (state.severity === "sevSev" || state.temp === "tempHigh") risk = "riskHigh";
    else if (state.severity === "sevMod" || state.duration === "dur6") risk = "riskMod";

    return { patternKey: patternKey, risk: risk, anyRed: anyRed };
  }

  function getSelfCare(key) {
    var map = {
      pattern_flu: "selfCareFlu", pattern_cold: "selfCareCold",
      pattern_viral: "selfCareViral", pattern_bact: "selfCareBact", pattern_urgent: "selfCareUrgent",
    };
    return tr(map[key] || "selfCareViral");
  }

  function getSeekCare(key) {
    var map = {
      pattern_flu: "seekFlu", pattern_cold: "seekCold",
      pattern_viral: "seekViral", pattern_bact: "seekBact", pattern_urgent: "seekUrgent",
    };
    return tr(map[key] || "seekCare");
  }

  function getAbxLine(res) {
    if (res.patternKey === "pattern_bact" || res.patternKey === "pattern_urgent") return tr("abx_out_review");
    return tr("abx_out_not_helpful");
  }

  function resultCard(icon, title, body, extraCls) {
    return '<article class="afs-result-card afs-glass' + (extraCls ? " " + extraCls : "") + '">' +
      '<span class="afs-result-icon" aria-hidden="true">' + icon + "</span>" +
      "<h4>" + esc(title) + "</h4><p>" + body + "</p></article>";
  }

  function renderAnalysisResult(res) {
    var box = $id("analysisResult");
    if (!box) return;
    box.classList.remove("afs-hidden");
    var ptext = esc(tr(res.patternKey));
    var abxLine = esc(getAbxLine(res));

    box.innerHTML =
      '<div class="afs-not-diagnosis afs-not-diagnosis-inline" role="note"><p>ℹ️ ' + esc(tr("notDiagnosis")) + "</p></div>" +
      '<div class="afs-result-grid">' +
      resultCard("🔍", tr("patternLabel"), "<em>" + esc(tr("mayMatch")) + "</em> " + ptext) +
      resultCard("🏠", tr("selfCareTitle"), esc(getSelfCare(res.patternKey))) +
      resultCard("🩺", tr("seekDoctorTitle"), esc(getSeekCare(res.patternKey))) +
      resultCard("💊", tr("abxEduTitle"), abxLine + " " + esc(tr("abx_out_no_leftover"))) +
      resultCard("📊", tr("riskLevel"), esc(tr(res.risk)), res.anyRed ? "afs-result-urgent" : "") +
      resultCard("💡", tr("explainTitle"), esc(tr("considerClinician"))) +
      "</div>";

    saveSymptomResult({ at: Date.now(), patternKey: res.patternKey, risk: res.risk, lang: LANG });
  }

  function saveSymptomResult(payload) {
    try { localStorage.setItem(keySymptom(), JSON.stringify(payload)); } catch (e) {}
  }

  function renderTimeline() {
    var body = $id("timelineBody");
    if (!body) return;
    var blocks = [];
    if (state.duration === "dur12") {
      blocks.push("<h4>" + esc(tr("tl_early_title")) + "</h4><p>" + esc(tr("tl_early_body")) + "</p>");
      blocks.push("<h4>" + esc(tr("tl_peak_title")) + "</h4><p>" + esc(tr("tl_peak_body")) + "</p>");
    } else if (state.duration === "dur35") {
      blocks.push("<h4>" + esc(tr("tl_peak_title")) + "</h4><p>" + esc(tr("tl_peak_body")) + "</p>");
    } else {
      blocks.push("<h4>" + esc(tr("tl_rec_title")) + "</h4><p>" + esc(tr("tl_rec_body")) + "</p>");
    }
    body.innerHTML = blocks.join("");
  }

  function renderAbxEducation() {
    var ed = $id("abxEducation");
    var dyn = $id("abxDynamic");
    if (ed) {
      ed.innerHTML = "<ul class=\"afs-list\"><li>" + esc(tr("abx_static_1")) + "</li><li>" +
        esc(tr("abx_static_2")) + "</li><li>" + esc(tr("abx_static_3")) + "</li><li>" +
        esc(tr("abx_static_4")) + "</li></ul>";
    }
    if (dyn) dyn.textContent = tr("abx_out_not_helpful") + " " + tr("abx_out_no_leftover");
  }

  function runAnalyze() {
    renderTimeline();
    var res = analyzePattern();
    renderAnalysisResult(res);
    var dyn = $id("abxDynamic");
    if (dyn) dyn.textContent = getAbxLine(res) + " " + tr("abx_out_no_leftover");
    updateUrgentBanner();
  }

  /* ── Flu tracker ── */

  function formatSymptoms(symptoms) {
    if (symptoms == null || symptoms === "") return "";
    if (typeof symptoms === "string") return symptoms;
    if (typeof symptoms === "object") {
      return Object.keys(symptoms)
        .filter(function (k) { return symptoms[k]; })
        .map(function (k) {
          var i18nKey = LEGACY_SYM_MAP[k] || ("sym_" + k);
          return tr(i18nKey);
        })
        .join(", ");
    }
    return String(symptoms);
  }

  function normalizeEntry(e, idx) {
    if (!e.id) e.id = e.date ? "legacy_" + e.date + "_" + idx : "legacy_" + idx;
    if (e.symptoms && typeof e.symptoms === "object") {
      e.symptomsText = formatSymptoms(e.symptoms);
    } else {
      e.symptomsText = e.symptoms || "";
    }
    return e;
  }

  function loadTrackerEntries() {
    try {
      var raw = localStorage.getItem(keyTracker());
      if (!raw) {
        var leg = localStorage.getItem("kurdana_afs_flu_v2");
        if (leg) { localStorage.setItem(keyTracker(), leg); raw = leg; }
      }
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr.map(normalizeEntry);
    } catch (e) { return []; }
  }

  function saveTrackerEntries(arr) {
    try { localStorage.setItem(keyTracker(), JSON.stringify(arr)); } catch (e) {}
  }

  function trendArrow(values) {
    if (values.length < 2) return { arrow: "—", cls: "neutral" };
    var last = values[values.length - 1];
    var first = values[0];
    if (last < first) return { arrow: "↓", cls: "down" };
    if (last > first) return { arrow: "↑", cls: "up" };
    return { arrow: "→", cls: "neutral" };
  }

  function trendCard(icon, label, value, unit, arrow, cls) {
    return '<div class="afs-trend-card">' +
      '<span class="afs-trend-icon" aria-hidden="true">' + icon + "</span>" +
      '<div class="afs-trend-info"><span class="afs-trend-label">' + esc(label) + "</span>" +
      '<span class="afs-trend-value">' + esc(String(value)) + (unit ? " " + unit : "") +
      ' <span class="afs-trend-arrow ' + cls + '">' + arrow + "</span></span></div></div>";
  }

  function renderFluTrends(entries) {
    var trends = $id("fluTrends");
    if (!trends) return;
    if (!entries.length) {
      trends.innerHTML = '<p class="afs-muted">' + esc(tr("noData")) + "</p>";
      return;
    }
    var last = entries.slice(0, Math.min(5, entries.length)).reverse();
    var temps = last.map(function (x) { return parseFloat(x.temp); }).filter(function (x) { return !isNaN(x); });
    var sevs = last.map(function (x) { return parseInt(x.severity, 10); }).filter(function (x) { return !isNaN(x); });
    var hyd = last.map(function (x) { return parseInt(x.hydration, 10); }).filter(function (x) { return !isNaN(x); });
    var sleep = last.map(function (x) { return parseFloat(x.sleep); }).filter(function (x) { return !isNaN(x); });

    var tTemp = trendArrow(temps);
    var tSev = trendArrow(sevs);
    var tHyd = trendArrow(hyd);
    var tSleep = trendArrow(sleep);

    var outlook = tr("stable");
    if (temps.length >= 2 && temps[temps.length - 1] < temps[0] && sevs.length >= 2 && sevs[sevs.length - 1] <= sevs[0]) outlook = tr("improving");
    if (temps.length >= 2 && temps[temps.length - 1] > temps[0]) outlook = tr("worsening");

    var avgTemp = temps.length ? temps[temps.length - 1].toFixed(1) : "—";
    var avgSev = sevs.length ? sevs[sevs.length - 1] : "—";
    var avgHyd = hyd.length ? hyd[hyd.length - 1] : "—";
    var avgSleep = sleep.length ? sleep[sleep.length - 1] : "—";

    trends.innerHTML =
      trendCard("🌡️", tr("trendFever"), avgTemp, "°C", tTemp.arrow, tTemp.cls) +
      trendCard("😷", tr("trendSymptom"), avgSev, "/5", tSev.arrow, tSev.cls) +
      trendCard("💧", tr("trendHydration"), avgHyd, "/10", tHyd.arrow, tHyd.cls) +
      trendCard("😴", tr("trendSleep"), avgSleep, "h", tSleep.arrow, tSleep.cls) +
      '<div class="afs-trend-card afs-trend-outlook"><span class="afs-trend-icon" aria-hidden="true">📈</span>' +
      '<div class="afs-trend-info"><span class="afs-trend-label">' + esc(tr("recoveryLabel")) + "</span>" +
      '<span class="afs-trend-outlook-text">' + esc(outlook) + "</span></div></div>";
  }

  function renderFluHistory() {
    var host = $id("fluHistory");
    var empty = $id("fluHistoryEmpty");
    if (!host) return;
    var entries = loadTrackerEntries().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
    host.innerHTML = "";
    toggleHidden(empty, entries.length === 0);

    entries.forEach(function (e) {
      var symText = e.symptomsText || formatSymptoms(e.symptoms);
      var metrics = [];
      if (e.temp != null && e.temp !== "") metrics.push("🌡️ " + e.temp + "°C");
      if (e.severity != null && e.severity !== "") metrics.push("😷 " + tr("fieldSeverity") + " " + e.severity + "/5");
      if (e.hydration != null && e.hydration !== "") metrics.push("💧 " + e.hydration + "/10");
      if (e.sleep != null && e.sleep !== "") metrics.push("😴 " + e.sleep + "h");

      var card = el("article", "afs-log-card afs-glass",
        '<div class="afs-log-head"><div><strong class="afs-log-date">' + esc(e.date || "") + "</strong>" +
        (metrics.length ? '<div class="afs-log-metrics">' + metrics.map(esc).join(" · ") + "</div>" : "") +
        '</div><button type="button" class="afs-btn-mini" data-del="' + esc(String(e.id)) + '">' +
        esc(tr("btnDeleteEntry")) + "</button></div>" +
        (symText ? '<p class="afs-log-symptoms"><strong>' + esc(tr("fieldSymptoms")) + ":</strong> " + esc(symText) + "</p>" : "") +
        (e.meds ? '<p class="afs-log-detail"><strong>' + esc(tr("fieldMeds")) + ":</strong> " + esc(e.meds) + "</p>" : "") +
        (e.notes ? '<p class="afs-log-detail afs-muted small"><strong>' + esc(tr("fieldNotes")) + ":</strong> " + esc(e.notes) + "</p>" : ""));
      card.querySelector("[data-del]").addEventListener("click", function () {
        var next = loadTrackerEntries().filter(function (x) { return String(x.id) !== String(e.id); });
        saveTrackerEntries(next);
        renderFluHistory();
        checkHeroBadge();
      });
      host.appendChild(card);
    });

    renderFluTrends(entries);
  }

  function wireFluForm() {
    var form = $id("fluForm");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var entry = {
        id: Date.now(),
        date: $id("fluDate").value,
        temp: $id("fluTemp").value,
        severity: $id("fluSeverity").value,
        hydration: $id("fluHydration").value,
        sleep: $id("fluSleep").value,
        meds: $id("fluMeds").value,
        symptoms: $id("fluSymptoms").value,
        notes: $id("fluNotes").value,
      };
      var list = loadTrackerEntries();
      list.push(entry);
      saveTrackerEntries(list);
      renderFluHistory();
      form.reset();
      var d = $id("fluDate");
      if (d) d.valueAsDate = new Date();
      checkHeroBadge();
    });
    var clr = $id("clearAllLogs");
    if (clr) clr.addEventListener("click", function () {
      if (confirm(tr("confirmClear"))) { saveTrackerEntries([]); renderFluHistory(); }
    });
    var fd = $id("fluDate");
    if (fd && !fd.value) fd.valueAsDate = new Date();
  }

  /* ── Library ── */

  function renderLibraryEdu() {
    var list = $id("libraryEduList");
    if (!list) return;
    list.innerHTML = "";
    ["libraryEdu1", "libraryEdu2", "libraryEdu3", "libraryEdu4"].forEach(function (k) {
      list.innerHTML += "<li>" + esc(tr(k)) + "</li>";
    });
  }

  function renderDrugGrid() {
    var grid = $id("drugGrid");
    var selClass = $id("drugFilterClass");
    var selUse = $id("drugFilterUse");
    if (!grid || !window.AFS_DRUGS) return;
    var q = ($id("drugSearch") && $id("drugSearch").value.toLowerCase()) || "";
    var fc = selClass ? selClass.value : "";
    var fu = selUse ? selUse.value : "";
    var notViral = $id("drugFilterNotViral") && $id("drugFilterNotViral").checked;
    var D = window.AFS_DRUG_DETAILS[LANG] || window.AFS_DRUG_DETAILS.en;

    if (selClass && selClass.options.length <= 1) {
      var classes = {};
      window.AFS_DRUGS.forEach(function (d) { classes[d.classId] = true; });
      Object.keys(classes).forEach(function (c) {
        var o = document.createElement("option");
        o.value = c;
        o.textContent = tr("class_" + c);
        selClass.appendChild(o);
      });
    }
    if (selUse && selUse.options.length <= 1) {
      ["use_resp", "use_skin", "use_uti", "use_gi", "use_broad"].forEach(function (u) {
        var o = document.createElement("option");
        o.value = u;
        o.textContent = tr(u);
        selUse.appendChild(o);
      });
    }

    grid.innerHTML = "";
    var count = 0;
    window.AFS_DRUGS.forEach(function (drug) {
      var name = drug.names[LANG] || drug.names.en;
      if (q && name.toLowerCase().indexOf(q) < 0) return;
      if (fc && drug.classId !== fc) return;
      if (fu) {
        var tagMap = { use_resp: "resp", use_skin: "skin", use_uti: "uti", use_gi: "gi", use_broad: "broad" };
        if (tagMap[fu] && drug.tags.indexOf(tagMap[fu]) < 0) return;
      }
      if (notViral && drug.tags.indexOf("not_flu") < 0) return;
      count++;

      var card = el("article", "afs-drug-card afs-glass",
        "<h4>" + esc(name) + '</h4><p class="afs-tag">' + esc(tr("class_" + drug.classId)) + "</p>" +
        '<p class="afs-muted small">' + esc(tr("doctorOnly")) + "</p>" +
        "<p><strong>" + esc(tr("drugUses")) + ":</strong> " + esc(D.defaultUses) + "</p>" +
        "<p><strong>" + esc(tr("drugNotFor")) + ":</strong> " + esc(D.defaultNot) + "</p>" +
        '<p class="afs-muted small"><strong>' + esc(tr("drugResist")) + ":</strong> " + esc(D.defaultResist) + "</p>" +
        '<p class="afs-warn">' + esc(D.defaultWarn) + "</p>");
      grid.appendChild(card);
    });
    if (!count) grid.innerHTML = '<p class="afs-empty">' + esc(tr("noResults")) + "</p>";
  }

  function wireLibraryFilters() {
    ["drugSearch", "drugFilterClass", "drugFilterUse", "drugFilterNotViral"].forEach(function (id) {
      var node = $id(id);
      if (node) node.addEventListener(node.type === "checkbox" ? "change" : "input", renderDrugGrid);
    });
  }

  /* ── Infection guide ── */

  function renderInfectionGrid() {
    var grid = $id("infectionGrid");
    if (!grid || !window.AFS_INFECTIONS) return;
    grid.innerHTML = "";
    var L = window.AFS_ABX_LABELS[LANG] || window.AFS_ABX_LABELS.en;
    window.AFS_INFECTIONS.forEach(function (inf) {
      var abx = L[inf.abx] || inf.abx;
      var badgeCls = inf.abx === "no" ? "viral" : inf.abx === "yes" ? "bact" : "maybe";
      var card = el("article", "afs-inf-card afs-glass",
        "<h4>" + esc(inf.names[LANG]) + '</h4><p class="afs-abx-badge ' + badgeCls + '">' + esc(abx) + "</p>" +
        "<p><strong>" + esc(tr("symptomsTitle")) + ":</strong> " + esc(inf.sym[LANG]) + "</p>" +
        "<p><strong>" + esc(tr("selfCareTitle")) + ":</strong> " + esc(inf.do[LANG]) + "</p>" +
        "<p><strong>" + esc(tr("seekDoctorTitle")) + ":</strong> " + esc(inf.care[LANG]) + "</p>");
      grid.appendChild(card);
    });
  }

  /* ── Discover ── */

  function renderDiscover() {
    var host = $id("discoverArticles");
    if (!host || !window.AFS_ARTICLES) return;
    host.innerHTML = "";
    window.AFS_ARTICLES.forEach(function (a, i) {
      var art = el("article", "afs-article afs-glass",
        '<span class="afs-article-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
        "<h4>" + esc(a.titles[LANG]) + "</h4><p>" + esc(a.bodies[LANG]) + "</p>");
      host.appendChild(art);
    });
  }

  /* ── Badges ── */

  function loadBadges() {
    try {
      var raw = localStorage.getItem(keyBadges());
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { wise: false, hero: false, mythDone: false, resistDone: false, planDone: false, logCount: 0 };
  }

  function saveBadges(b) {
    try { localStorage.setItem(keyBadges(), JSON.stringify(b)); } catch (e) {}
    state.badges = { wise: b.wise, hero: b.hero };
  }

  function checkWiseBadge() {
    var b = loadBadges();
    if (b.mythDone && b.resistDone && b.virusDone) {
      b.wise = true;
      saveBadges(b);
    }
  }

  function checkHeroBadge() {
    var b = loadBadges();
    b.logCount = loadTrackerEntries().length;
    if (b.planDone && b.logCount >= 2) {
      b.hero = true;
      saveBadges(b);
    } else {
      saveBadges(b);
    }
  }

  function renderBadges() {
    var shelf = $id("badgeShelf");
    if (!shelf) return;
    var b = loadBadges();
    var badges = [
      { id: "wise", icon: "🏅", title: "badgeWise", desc: "badgeWiseDesc", unlocked: b.wise },
      { id: "hero", icon: "🌟", title: "badgeHero", desc: "badgeHeroDesc", unlocked: b.hero },
    ];
    shelf.innerHTML = "<h3 class=\"afs-badge-title\">" + esc(tr("badgesTitle")) + "</h3><div class=\"afs-badge-row\"></div>";
    var row = shelf.querySelector(".afs-badge-row");
    badges.forEach(function (bd) {
      var card = el("div", "afs-badge" + (bd.unlocked ? " unlocked" : " locked"),
        '<span class="afs-badge-icon" aria-hidden="true">' + bd.icon + "</span>" +
        "<strong>" + esc(tr(bd.title)) + "</strong>" +
        "<p class=\"afs-muted small\">" + esc(bd.unlocked ? tr(bd.desc) : tr("badgeLocked")) + "</p>");
      row.appendChild(card);
    });
  }

  /* ── Play & Learn ── */

  function celebrationLabels() {
    return {
      en: { great: "Great job!", line: "You scored {c}/{t} and earned {e} points.", totalSaved: "Total saved points: {n}.", playAgain: "Play Again", backDept: "Back to Department" },
      ku: { great: "زۆر باش!", line: "تۆ {c} لە {t}ت بەدەستهێنا و {e} خاڵت وەرگرت.", totalSaved: "کۆی خاڵە پاشەکەوتکراوەکان: {n}.", playAgain: "دووبارە یاری بکە", backDept: "گەڕانەوە بۆ بەش" },
    };
  }

  function showPlayCelebrate(correct, total, pointsRound, onPlayAgain) {
    if (!window.KurdanaGameCelebration) return;
    KurdanaGameCelebration.show({
      userKey: USER_KEY, lang: LANG, correct: correct, total: total, pointsRound: pointsRound,
      labels: celebrationLabels(), onPlayAgain: onPlayAgain || function () {},
      onBack: function () { jumpTab("symptom"); window.scrollTo(0, 0); },
    });
  }

  function updatePlayPointsDisplay() {
    var el = $id("playScoreDisplay");
    if (el && window.KurdanaGamePoints) el.textContent = String(KurdanaGamePoints.get(USER_KEY));
  }

  function markGameDone(key) {
    var b = loadBadges();
    b[key] = true;
    saveBadges(b);
    if (key === "mythDone" || key === "resistDone" || key === "virusDone") checkWiseBadge();
    if (key === "planDone") checkHeroBadge();
    renderBadges();
  }

  function renderMythGame() {
    var host = $id("gameMythHost");
    var M = window.AFS_MYTH_GAME;
    if (!host || !M) return;
    if (state.mythI >= M.length) {
      host.innerHTML = "<h3>" + esc(tr("gameMythTitle")) + "</h3><p>" + esc(tr("gameComplete")) + "</p>";
      return;
    }
    var mg = M[state.mythI];
    host.innerHTML =
      "<h3>" + esc(tr("gameMythTitle")) + '</h3><p class="afs-q">' + esc(mg.st[LANG]) + "</p>" +
      '<div class="afs-game-btns"><button type="button" class="afs-btn afs-btn-secondary" data-m="t">' + esc(tr("btnTrue")) +
      '</button><button type="button" class="afs-btn afs-btn-secondary" data-m="f">' + esc(tr("btnFalse")) + "</button></div>" +
      '<p class="afs-feedback" id="mythFb"></p>';
    host.querySelectorAll("[data-m]").forEach(function (b) {
      b.addEventListener("click", function () {
        var ok = (b.getAttribute("data-m") === "t") === mg.ok;
        $id("mythFb").textContent = mg.exp[LANG];
        if (ok) {
          state.mythI += 1;
          if (state.mythI >= M.length && !gameCeleb.myth) {
            gameCeleb.myth = true;
            markGameDone("mythDone");
            showPlayCelebrate(M.length, M.length, 5 * M.length, function () {
              gameCeleb.myth = false; state.mythI = 0; renderGames(); updatePlayPointsDisplay();
            });
          }
          renderGames();
          updatePlayPointsDisplay();
        }
      });
    });
  }

  function renderResistGame() {
    var host = $id("gameResistHost");
    var R = window.AFS_RESIST_GAME;
    if (!host || !R) return;
    if (state.resistI >= R.length) {
      host.innerHTML = "<h3>" + esc(tr("gameResistTitle")) + "</h3><p>" + esc(tr("gameComplete")) + "</p>";
      return;
    }
    var rg = R[state.resistI];
    var opts = rg.opts.map(function (o, i) {
      return '<button type="button" class="afs-btn afs-btn-secondary" data-r="' + i + '">' + esc(o[LANG]) + "</button>";
    }).join("");
    host.innerHTML =
      "<h3>" + esc(tr("gameResistTitle")) + "</h3><p class=\"afs-muted small\">" + esc(tr("gameResistSub")) + "</p>" +
      '<p class="afs-q">' + esc(rg.q[LANG]) + '</p><div class="afs-game-btns">' + opts + '</div><p class="afs-feedback" id="resistFb"></p>';
    host.querySelectorAll("[data-r]").forEach(function (b) {
      b.addEventListener("click", function () {
        var pick = parseInt(b.getAttribute("data-r"), 10);
        var ok = pick === rg.correct;
        $id("resistFb").textContent = rg.exp[LANG];
        if (ok) {
          state.resistI += 1;
          if (state.resistI >= R.length && !gameCeleb.resist) {
            gameCeleb.resist = true;
            markGameDone("resistDone");
            showPlayCelebrate(R.length, R.length, 5 * R.length, function () {
              gameCeleb.resist = false; state.resistI = 0; renderGames(); updatePlayPointsDisplay();
            });
          }
          renderGames();
          updatePlayPointsDisplay();
        }
      });
    });
  }

  function renderVirusGame() {
    var host = $id("gameVirusHost");
    var G = window.AFS_VIRUS_GAME;
    if (!host || !G) return;
    if (state.virusI >= G.length) {
      host.innerHTML = "<h3>" + esc(tr("gameVirusTitle")) + "</h3><p>" + esc(tr("gameComplete")) + "</p>";
      return;
    }
    var vg = G[state.virusI];
    host.innerHTML =
      "<h3>" + esc(tr("gameVirusTitle")) + "</h3><p class=\"afs-muted small\">" + esc(tr("gameVirusSub")) + "</p>" +
      '<p class="afs-q">' + esc(vg.q[LANG]) + '</p><div class="afs-game-btns">' +
      '<button type="button" class="afs-btn afs-btn-secondary" data-v="virus">' + esc(tr("btnVirus")) + "</button>" +
      '<button type="button" class="afs-btn afs-btn-secondary" data-v="bacteria">' + esc(tr("btnBacteria")) + "</button></div>" +
      '<p class="afs-feedback" id="virusFb"></p>';
    host.querySelectorAll("[data-v]").forEach(function (b) {
      b.addEventListener("click", function () {
        var ok = b.getAttribute("data-v") === vg.a;
        $id("virusFb").textContent = ok ? "✓" : (LANG === "ku" ? "دووبارە هەوڵ بدەرەوە" : "Try again — antibiotics usually don't help viruses.");
        if (ok) {
          state.virusI += 1;
          if (state.virusI >= G.length && !gameCeleb.virus) {
            gameCeleb.virus = true;
            markGameDone("virusDone");
            showPlayCelebrate(G.length, G.length, 5 * G.length, function () {
              gameCeleb.virus = false; state.virusI = 0; renderGames(); updatePlayPointsDisplay();
            });
          }
          renderGames();
          updatePlayPointsDisplay();
        }
      });
    });
  }

  function renderPlanGame() {
    var host = $id("gamePlanHost");
    if (!host || !window.AFS_PLAN_OPTIONS) return;
    var opts = window.AFS_PLAN_OPTIONS.map(function (o) {
      return '<label class="afs-check"><input type="checkbox" data-plan="' + o.id + '"> ' + esc(o.labels[LANG]) + "</label>";
    }).join("");
    host.innerHTML =
      "<h3>" + esc(tr("gamePlanTitle")) + "</h3><p class=\"afs-muted small\">" + esc(tr("gamePlanSub")) + "</p>" +
      '<div id="planOpts" class="afs-check-grid cols-2">' + opts + '</div>' +
      '<button type="button" class="afs-btn afs-btn-primary afs-mt" id="scorePlan">' + esc(tr("btnCheckPlan")) + "</button>" +
      '<p class="afs-feedback" id="planFb"></p>';
    $id("scorePlan").onclick = function () {
      var picked = [];
      host.querySelectorAll("[data-plan]").forEach(function (inp) {
        if (inp.checked) picked.push(inp.getAttribute("data-plan"));
      });
      var bad = picked.some(function (id) {
        var o = window.AFS_PLAN_OPTIONS.find(function (x) { return x.id === id; });
        return o && o.safe === false;
      });
      var good = picked.filter(function (id) {
        var o = window.AFS_PLAN_OPTIONS.find(function (x) { return x.id === id; });
        return o && o.safe;
      }).length;
      $id("planFb").textContent = bad
        ? (LANG === "ku" ? "هەڵبژاردنی ناسەلامەت — پزیشک و خۆدەرمان بەبێ ڕاوێژ مەکە." : "Unsafe picks detected—avoid leftover antibiotics and borrowing.")
        : (LANG === "ku" ? "زۆر باش! هەڵبژاردنە سەلامەتەکان." : "Strong plan—supportive care first.");
      if (!bad && good >= 2 && !gameCeleb.plan) {
        gameCeleb.plan = true;
        markGameDone("planDone");
        showPlayCelebrate(1, 1, 10, function () { gameCeleb.plan = false; renderGames(); updatePlayPointsDisplay(); });
        updatePlayPointsDisplay();
      }
    };
  }

  function renderGames() {
    renderMythGame();
    renderResistGame();
    renderVirusGame();
    renderPlanGame();
    updatePlayPointsDisplay();
  }

  /* ── Init ── */

  function init() {
    USER_KEY = getUserKey();
    var ul = parseUrlLang();
    var sl = loadStoredLang();
    if (ul) setLang(ul);
    else if (sl) setLang(sl);
    else setLang("en");

    SYM_KEYS.forEach(function (k) { state.symptoms[k] = false; });
    RF_KEYS.forEach(function (k) { state.redFlags[k] = false; });

    wireTabs();
    wireWizard();
    wireFluForm();
    wireLibraryFilters();

    renderWizard();
    renderTimeline();
    renderAbxEducation();
    renderLibraryEdu();
    renderFluHistory();
    renderDrugGrid();
    renderInfectionGrid();
    renderDiscover();
    renderGames();
    renderBadges();
    checkHeroBadge();

    $id("afsLangBtn").addEventListener("click", function () {
      setLang(LANG === "en" ? "ku" : "en");
    });

    $id("afsHeroSymptom").addEventListener("click", function () { jumpTab("symptom"); });
    $id("afsHeroLibrary").addEventListener("click", function () { jumpTab("library"); });
    $id("afsHeroFlu").addEventListener("click", function () { jumpTab("flu"); });

    window.addEventListener("message", function (e) {
      if (!e.data || e.data.type !== "kh-lang") return;
      if (e.data.lang === "ku" || e.data.lang === "en") setLang(e.data.lang);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
