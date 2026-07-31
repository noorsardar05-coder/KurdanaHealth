/**
 * MediaPipe Face Mesh — Kurdana Beauty (stream supplied by app after permission).
 */
(function () {
  "use strict";

  var faceMesh = null;
  var cameraObj = null;
  var rafId = null;
  var running = false;
  var videoEl = null;
  var canvasEl = null;
  var ctx = null;
  var lastLm = null;
  var onFrameCb = null;

  function ovalPairs() {
    if (typeof FACEMESH_FACE_OVAL !== "undefined") return FACEMESH_FACE_OVAL;
    return [];
  }

  function drawFace(canvas, results) {
    if (!canvas || !ctx) return;
    var lm = results.multiFaceLandmarks && results.multiFaceLandmarks[0];
    lastLm = lm || lastLm;
    var w = canvas.width,
      h = canvas.height;
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    var img = results.image || videoEl;
    if (img) {
      try {
        var iw = img.videoWidth || img.width || 0;
        var ih = img.videoHeight || img.height || 0;
        if (iw && ih) ctx.drawImage(img, 0, 0, w, h);
      } catch (e) {}
    }

    if (!lm) {
      ctx.restore();
      return;
    }

    var pairs = ovalPairs();
    if (pairs.length && typeof drawConnectors === "function") {
      try {
        drawConnectors(ctx, lm, pairs, { color: "#00ffe8", lineWidth: 1.5 });
      } catch (e) {}
    }

    ctx.fillStyle = "rgba(52, 211, 153, 0.85)";
    for (var i = 0; i < lm.length; i += 6) {
      var p = lm[i];
      if (!p) continue;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    if (onFrameCb) onFrameCb(lm);
  }

  function onResults(results) {
    if (!canvasEl || !ctx) return;
    if (videoEl && videoEl.videoWidth) {
      canvasEl.width = Math.min(640, videoEl.videoWidth);
      canvasEl.height = Math.round((canvasEl.width * videoEl.videoHeight) / videoEl.videoWidth);
      ctx = canvasEl.getContext("2d");
    }
    drawFace(canvasEl, results);
  }

  function loop() {
    if (!running || !faceMesh || !videoEl) return;
    if (videoEl.readyState >= 2 && videoEl.videoWidth > 0) {
      faceMesh.send({ image: videoEl });
    }
    rafId = requestAnimationFrame(loop);
  }

  function drawAnalysisZones(snapshotCanvas, landmarks) {
    if (!snapshotCanvas || !landmarks || !landmarks.length) return;
    var sx = snapshotCanvas.getContext("2d");
    var w = snapshotCanvas.width,
      h = snapshotCanvas.height;

    function pt(i) {
      var p = landmarks[i];
      return p ? { x: p.x * w, y: p.y * h } : null;
    }

    sx.fillStyle = "rgba(251, 191, 36, 0.14)";
    var n = pt(1),
      ls = pt(234),
      rs = pt(454);
    if (n && ls && rs) {
      sx.beginPath();
      sx.moveTo(ls.x, ls.y - h * 0.05);
      sx.lineTo(rs.x, rs.y - h * 0.05);
      sx.lineTo(n.x, n.y + h * 0.08);
      sx.closePath();
      sx.fill();
    }

    sx.fillStyle = "rgba(147, 112, 219, 0.12)";
    var le = pt(33),
      re = pt(263);
    if (le && re) {
      sx.beginPath();
      sx.arc(le.x, le.y + 8, w * 0.055, 0, Math.PI * 2);
      sx.arc(re.x, re.y + 8, w * 0.055, 0, Math.PI * 2);
      sx.fill();
    }

    sx.fillStyle = "rgba(248, 113, 113, 0.11)";
    var ch = pt(61),
      ch2 = pt(291);
    if (ch && ch2) {
      sx.beginPath();
      sx.arc((ch.x + ch2.x) / 2, (ch.y + ch2.y) / 2, w * 0.07, 0, Math.PI * 2);
      sx.fill();
    }
  }

  function captureSnapshot(landmarks) {
    if (!videoEl || !canvasEl) return null;
    var w = canvasEl.width,
      h = canvasEl.height;
    if (w < 4 || h < 4) return null;
    var snap = document.createElement("canvas");
    snap.width = w;
    snap.height = h;
    var sctx = snap.getContext("2d");
    try {
      sctx.drawImage(videoEl, 0, 0, w, h);
    } catch (e) {
      return null;
    }
    drawAnalysisZones(snap, landmarks);
    return snap;
  }

  function attachStreamAndRun(stream, opts) {
    videoEl = opts.video;
    canvasEl = opts.canvas;
    ctx = canvasEl.getContext("2d");
    onFrameCb = opts.onLandmarks || null;
    running = true;
    lastLm = null;

    videoEl.srcObject = stream;
    videoEl.playsInline = true;
    videoEl.muted = true;
    return videoEl.play().then(function () {
      rafId = requestAnimationFrame(loop);
      if (opts.onReady) opts.onReady();
    });
  }

  window.KurdanaBeautyFace = {
    /**
     * Request front camera (Beauty) — use from UI after permission screen.
     */
    requestUserCameraStream: function () {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return Promise.reject(new Error("no-api"));
      }
      return navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
    },

    /**
     * Start face mesh with an existing MediaStream (after user taps Allow).
     */
    startWithStream: function (stream, opts) {
      if (typeof FaceMesh === "undefined") {
        if (opts.onError) opts.onError("nofacemesh");
        return Promise.reject(new Error("nofacemesh"));
      }

      if (faceMesh) {
        try {
          faceMesh.close();
        } catch (e) {}
        faceMesh = null;
      }

      faceMesh = new FaceMesh({
        locateFile: function (file) {
          return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/" + file;
        },
      });
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      faceMesh.onResults(onResults);

      var self = this;
      return faceMesh
        .initialize()
        .then(function () {
          return attachStreamAndRun(stream, opts);
        })
        .catch(function (e) {
          try {
            stream.getTracks().forEach(function (t) {
              t.stop();
            });
          } catch (e2) {}
          if (opts.onError) opts.onError("mesh");
          throw e;
        });
    },

    /** @deprecated use permission flow + startWithStream */
    startPreview: function (opts) {
      var self = this;
      return this.requestUserCameraStream()
        .then(function (stream) {
          return self.startWithStream(stream, opts);
        })
        .catch(function () {
          if (opts.onError) opts.onError("camera");
        });
    },

    stopPreview: function () {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (videoEl && videoEl.srcObject) {
        videoEl.srcObject.getTracks().forEach(function (t) {
          t.stop();
        });
        videoEl.srcObject = null;
      }
      try {
        if (videoEl) videoEl.removeAttribute("src");
      } catch (e) {}
      if (faceMesh) {
        try {
          faceMesh.close();
        } catch (e) {}
        faceMesh = null;
      }
      if (canvasEl && ctx) {
        try {
          ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        } catch (e) {}
      }
      lastLm = null;
      onFrameCb = null;
      videoEl = null;
      canvasEl = null;
      ctx = null;
    },

    getLastLandmarks: function () {
      return lastLm;
    },

    captureSnapshot: captureSnapshot,

    drawZonesOnCanvas: drawAnalysisZones,
  };
})();
