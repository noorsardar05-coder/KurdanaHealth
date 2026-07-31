/**
 * Kurdana Health — confetti + game celebration + shared points (vanilla, no deps)
 */
(function (global) {
  "use strict";

  var COLORS = ["#f472b6", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa", "#fb7185", "#2dd4bf", "#f97316"];

  function pointsKey(userKey) {
    return "kurdana_game_points_" + String(userKey || "guest").slice(0, 80);
  }

  global.KurdanaGamePoints = {
    add: function (userKey, n) {
      var add = Math.max(0, Math.floor(Number(n) || 0));
      var cur = parseInt(localStorage.getItem(pointsKey(userKey)) || "0", 10) || 0;
      var next = cur + add;
      try {
        localStorage.setItem(pointsKey(userKey), String(next));
      } catch (e) {}
      return next;
    },
    get: function (userKey) {
      return parseInt(localStorage.getItem(pointsKey(userKey)) || "0", 10) || 0;
    },
  };

  global.KurdanaConfetti = {
    /**
     * @param {HTMLElement} [container] default document.body
     * @param {{ duration?: number }} [opts] duration ms ~2000–3000
     */
    burst: function (container, opts) {
      opts = opts || {};
      var duration = Math.min(4000, Math.max(1800, opts.duration || 2600));
      var root = container || document.body;
      var layer = document.createElement("div");
      layer.className = "kurdana-confetti-layer";
      layer.setAttribute("aria-hidden", "true");
      var n = Math.min(55, Math.max(28, opts.count || 42));
      var w = global.innerWidth || 400;

      for (var i = 0; i < n; i++) {
        var p = document.createElement("span");
        p.className = "kurdana-confetti-piece";
        p.style.left = Math.random() * 100 + "%";
        p.style.background = COLORS[i % COLORS.length];
        p.style.animationDuration = duration * (0.75 + Math.random() * 0.5) + "ms";
        var drift = (Math.random() - 0.5) * w * 0.35;
        p.style.setProperty("--kx", drift + "px");
        layer.appendChild(p);
      }

      root.appendChild(layer);

      var t = setTimeout(function () {
        if (layer.parentNode) layer.parentNode.removeChild(layer);
      }, duration + 400);

      layer.addEventListener(
        "animationend",
        function () {},
        false
      );

      return {
        cancel: function () {
          clearTimeout(t);
          if (layer.parentNode) layer.parentNode.removeChild(layer);
        },
      };
    },
  };

  /**
   * @param {{
   *   userKey: string,
   *   lang: string,
   *   correct: number,
   *   total: number,
   *   pointsRound: number,
   *   onPlayAgain: function(),
   *   onBack: function(),
   *   labels?: { en?: object, ku?: object }
   * }} opts
   */
  global.KurdanaGameCelebration = {
    show: function (opts) {
      if (!opts || !opts.userKey) return;
      var lang = opts.lang === "ku" ? "ku" : "en";
      var L = opts.labels || {};
      var en = L.en || {};
      var ku = L.ku || {};
      var great = lang === "ku" ? ku.great || "زۆر باش!" : en.great || "Great job!";
      var totalAfter = global.KurdanaGamePoints.add(opts.userKey, opts.pointsRound || 0);
      var correct = Math.max(0, Math.floor(Number(opts.correct) || 0));
      var total = Math.max(0, Math.floor(Number(opts.total) || 0));
      var earned = Math.max(0, Math.floor(Number(opts.pointsRound) || 0));

      var line =
        lang === "ku"
          ? (ku.line &&
              ku.line
                .replace("{c}", String(correct))
                .replace("{t}", String(total))
                .replace("{e}", String(earned))) ||
            "تۆ " + correct + " لە " + total + "ت بەدەستهێنا و " + earned + " خاڵت وەرگرت."
          : (en.line &&
              en.line
                .replace("{c}", String(correct))
                .replace("{t}", String(total))
                .replace("{e}", String(earned))) ||
            "You scored " + correct + "/" + total + " and earned " + earned + " points.";

      var totalLabel =
        lang === "ku"
          ? (ku.totalSaved && ku.totalSaved.replace("{n}", String(totalAfter))) || "کۆی خاڵەکان: " + totalAfter
          : (en.totalSaved && en.totalSaved.replace("{n}", String(totalAfter))) || "Total saved points: " + totalAfter;

      global.KurdanaConfetti.burst(document.body, { duration: 2600 });

      var ov = document.createElement("div");
      ov.className = "kurdana-game-overlay";
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.innerHTML =
        '<div class="kurdana-game-card">' +
        "<h3>" +
        great +
        "</h3>" +
        "<p>" +
        line +
        "</p>" +
        '<p class="kurdana-game-points">' +
        totalLabel +
        "</p>" +
        '<div class="kurdana-game-actions">' +
        '<button type="button" class="kurdana-game-btn-primary kgd-play">' +
        (lang === "ku" ? ku.playAgain || "دووبارە یاری بکە" : en.playAgain || "Play Again") +
        "</button>" +
        '<button type="button" class="kurdana-game-btn-secondary kgd-back">' +
        (lang === "ku" ? ku.backDept || "گەڕانەوە بۆ بەش" : en.backDept || "Back to Department") +
        "</button>" +
        "</div></div>";

      document.body.appendChild(ov);

      ov.querySelector(".kgd-play").addEventListener("click", function () {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        if (typeof opts.onPlayAgain === "function") opts.onPlayAgain();
      });
      ov.querySelector(".kgd-back").addEventListener("click", function () {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        if (typeof opts.onBack === "function") opts.onBack();
      });
    },
  };
})(typeof window !== "undefined" ? window : this);
