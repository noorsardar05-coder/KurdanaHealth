/**
 * Mental Health companion API — POST /api/mental-companion
 * Run: npm run api  (node server/mental-companion.mjs)
 *
 * Server-side only:
 *   OPENAI_API_KEY (required)
 *   OPENAI_MENTAL_HEALTH_MODEL (optional, default gpt-4o-mini)
 *   OPENAI_MODEL (legacy alias)
 *   MH_API_PORT (default 8787)
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnvFile() {
  const envPath = path.join(root, ".env");
  try {
    const raw = fs.readFileSync(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  } catch {
    /* no .env */
  }
}

loadEnvFile();

const PORT = Number(process.env.MH_API_PORT || 8787);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const MODEL =
  process.env.OPENAI_MENTAL_HEALTH_MODEL ||
  process.env.OPENAI_MODEL ||
  "gpt-4o-mini";

const HISTORY_LIMIT = 16;
const MODES = new Set(["chat", "thought_mirror", "brain_dump", "grounding", "check_in"]);
const REFINE = new Set([
  "gentler",
  "realistic",
  "shorter",
  "explain_pattern",
  "another",
  "",
]);

const RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    reflection: { type: "string" },
    gentleReframe: { type: "string" },
    nextStep: { type: "string" },
    followUpQuestion: { type: "string" },
    suggestedTool: {
      type: "string",
      enum: ["breathing", "grounding", "brain_dump", "journal", "sounds", "none"],
    },
    riskLevel: { type: "string", enum: ["none", "elevated", "urgent"] },
    language: { type: "string", enum: ["en", "ku"] },
    dump: {
      type: "object",
      additionalProperties: false,
      properties: {
        canControl: { type: "array", items: { type: "string" } },
        cannotControl: { type: "array", items: { type: "string" } },
        tomorrow: { type: "array", items: { type: "string" } },
        letGo: { type: "array", items: { type: "string" } },
        wins: { type: "array", items: { type: "string" } },
      },
      required: ["canControl", "cannotControl", "tomorrow", "letGo", "wins"],
    },
  },
  required: [
    "reply",
    "reflection",
    "gentleReframe",
    "nextStep",
    "followUpQuestion",
    "suggestedTool",
    "riskLevel",
    "language",
    "dump",
  ],
};

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function buildInstructions({ language, mode, refine }) {
  const langLine =
    language === "ku"
      ? "Respond entirely in natural modern Sorani Kurdish (Kurdistan Region)."
      : "Respond in warm, clear English.";

  const modeLine = {
    chat: "Mode: open companion chat. Respond specifically to what the user said.",
    thought_mirror:
      "Mode: Thought Mirror. Acknowledge the emotional meaning, carefully name a possible thinking pattern, offer a realistic alternative interpretation, create one kinder believable replacement thought (gentleReframe), and one optional next action. Never generate the grammatical opposite or toxic positivity.",
    brain_dump:
      "Mode: Brain Dump. Sort the user's free-write into dump.canControl, dump.cannotControl, dump.tomorrow, dump.letGo, dump.wins. Put one small next action in nextStep. Keep reply short and calm.",
    grounding:
      "Mode: grounding support. Help the user slow down with one present-moment cue. Keep it brief.",
    check_in:
      "Mode: emotional check-in. Reflect mood gently and offer at most one soft follow-up.",
  }[mode];

  const refineLine =
    refine === "gentler"
      ? "Refine request: make the mirror gentler and softer."
      : refine === "realistic"
        ? "Refine request: make the reframe more realistic and believable — no overpromise."
        : refine === "shorter"
          ? "Refine request: make the whole response shorter."
          : refine === "explain_pattern"
            ? "Refine request: briefly explain the thinking pattern behind the thought."
            : refine === "another"
              ? "Refine request: give a freshly worded alternative version — do not reuse prior phrasing."
              : "";

  return [
    "You are Kurdana, a bilingual emotional-wellness companion inside KurdanaHealth.",
    "You help users: name emotions, feel heard, slow down overwhelming thoughts, explore more balanced perspectives, identify one small next step, and find appropriate support.",
    "You are not a therapist, psychologist, psychiatrist, doctor, diagnostic service, or emergency service.",
    "Never diagnose. Never shame. Never guilt. Never expose chain-of-thought or hidden reasoning.",
    "Tone: emotionally intelligent, gentle, warm, calm, concise, natural, respectful — never robotic, judgmental, childish, or excessively cheerful.",
    "Avoid starting every response with stock openers like “I’m glad you shared,” “Thank you for telling me,” “Take a breath,” or “One step is enough.” Use them only when they genuinely fit.",
    "Do not use forced positivity. Do not say “You are perfect,” “Everyone loves you,” or “Everything will be okay.” Offer believable, balanced language.",
    "Usually reply in fewer than 140 words. If the user sounds exhausted, be even briefer.",
    "Ask at most one follow-up question (followUpQuestion). If none fits, use an empty string.",
    "Put the main supportive text in reply. Use reflection for an optional observation. Use gentleReframe for a kinder alternative thought when relevant.",
    "For non-brain-dump modes, set dump arrays to empty arrays [].",
    "If risk seems elevated or urgent, set riskLevel accordingly and gently encourage reaching a trusted person or local emergency help — without lectures.",
    "Return only the structured JSON fields. Do not invent fake success if you cannot help.",
    langLine,
    modeLine,
    refineLine,
  ]
    .filter(Boolean)
    .join(" ");
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .map((h) => {
      const roleRaw = String(h?.role || "").toLowerCase();
      const role =
        roleRaw === "assistant" || roleRaw === "ai" || roleRaw === "kurdana"
          ? "assistant"
          : roleRaw === "user"
            ? "user"
            : null;
      const content = String(h?.content || h?.text || "").trim();
      if (!role || !content) return null;
      return { role, content };
    })
    .filter(Boolean)
    .slice(-HISTORY_LIMIT);
}

function emptyDump() {
  return {
    canControl: [],
    cannotControl: [],
    tomorrow: [],
    letGo: [],
    wins: [],
  };
}

function validatePayload(parsed, language) {
  const tools = new Set(["breathing", "grounding", "brain_dump", "journal", "sounds", "none"]);
  const risks = new Set(["none", "elevated", "urgent"]);
  const dumpIn = parsed?.dump && typeof parsed.dump === "object" ? parsed.dump : {};
  const asList = (v) =>
    Array.isArray(v) ? v.map((x) => String(x || "").trim()).filter(Boolean).slice(0, 12) : [];

  const reply = String(parsed?.reply || "").trim();
  if (!reply) {
    const err = new Error("Model returned empty reply");
    err.status = 500;
    err.safe = "AI returned an empty reply";
    throw err;
  }

  return {
    reply,
    reflection: String(parsed?.reflection || "").trim(),
    gentleReframe: String(parsed?.gentleReframe || "").trim(),
    nextStep: String(parsed?.nextStep || "").trim(),
    followUpQuestion: String(parsed?.followUpQuestion || "").trim(),
    suggestedTool: tools.has(parsed?.suggestedTool) ? parsed.suggestedTool : "none",
    riskLevel: risks.has(parsed?.riskLevel) ? parsed.riskLevel : "none",
    language: parsed?.language === "ku" || language === "ku" ? "ku" : "en",
    dump: {
      canControl: asList(dumpIn.canControl),
      cannotControl: asList(dumpIn.cannotControl),
      tomorrow: asList(dumpIn.tomorrow),
      letGo: asList(dumpIn.letGo),
      wins: asList(dumpIn.wins),
    },
  };
}

async function callCompanion(body) {
  if (!OPENAI_API_KEY) {
    const err = new Error("Missing OPENAI_API_KEY");
    err.status = 401;
    err.safe = "Missing OPENAI_API_KEY — add it to project .env (server-side only)";
    throw err;
  }

  const language = body.language === "ku" || body.lang === "ku" ? "ku" : "en";
  const modeRaw = String(body.mode || "chat").toLowerCase();
  const mode = MODES.has(modeRaw) ? modeRaw : "chat";
  const refineRaw = String(body.refine || body.variant || "").toLowerCase();
  const refine = REFINE.has(refineRaw) ? refineRaw : "";
  const message = String(body.message || body.text || "").trim();
  if (!message) {
    const err = new Error("message is required");
    err.status = 400;
    err.safe = "message is required";
    throw err;
  }

  const history = normalizeHistory(body.history);
  const currentMood = body.currentMood || body.mood || null;
  const userName = body.userName || null;
  const preferences = body.preferences && typeof body.preferences === "object" ? body.preferences : {};
  const replyLength = preferences.replyLength === "short" ? "short" : "normal";

  const meta = [
    `Mode: ${mode}`,
    refine ? `Refine: ${refine}` : null,
    currentMood ? `Current mood: ${currentMood}` : null,
    userName ? `User name (optional): ${userName}` : null,
    `Preferred reply length: ${replyLength}`,
    `Voice enabled: ${preferences.voiceEnabled ? "yes" : "no"}`,
  ]
    .filter(Boolean)
    .join("\n");

  const input = [];
  for (const turn of history) {
    input.push({
      role: turn.role,
      content: turn.content,
    });
  }
  input.push({
    role: "user",
    content: `${meta}\n\nUser message:\n${message}`,
  });

  const client = new OpenAI({ apiKey: OPENAI_API_KEY });
  let response;
  try {
    response = await client.responses.create({
      model: MODEL,
      instructions: buildInstructions({ language, mode, refine }),
      input,
      temperature: 0.85,
      max_output_tokens: mode === "brain_dump" ? 700 : 450,
      text: {
        format: {
          type: "json_schema",
          name: "kurdana_companion",
          strict: true,
          schema: RESPONSE_SCHEMA,
        },
      },
    });
  } catch (err) {
    const status = err?.status || err?.statusCode || 500;
    const safe =
      status === 401
        ? "OpenAI authentication failed (check OPENAI_API_KEY)"
        : status === 429
          ? "OpenAI rate limit (HTTP 429)"
          : err?.message
            ? `OpenAI error: ${String(err.message).slice(0, 160)}`
            : `OpenAI request failed (HTTP ${status})`;
    const wrapped = new Error(safe);
    wrapped.status = status === 401 ? 401 : status === 429 ? 429 : 500;
    wrapped.safe = safe;
    throw wrapped;
  }

  const rawText =
    (typeof response.output_text === "string" && response.output_text) ||
    extractOutputText(response) ||
    "";

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    const err = new Error("invalid JSON from model");
    err.status = 502;
    err.safe = "AI connection failed: invalid JSON";
    throw err;
  }

  const validated = validatePayload(parsed, language);
  if (mode !== "brain_dump") {
    validated.dump = emptyDump();
  }
  return validated;
}

function extractOutputText(response) {
  const parts = [];
  for (const item of response?.output || []) {
    if (item?.type !== "message") continue;
    for (const c of item.content || []) {
      if (c?.type === "output_text" && c.text) parts.push(c.text);
      if (c?.type === "text" && c.text) parts.push(c.text);
    }
  }
  return parts.join("").trim();
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const isCompanion =
    req.method === "POST" &&
    (url.pathname === "/api/mental-companion" || url.pathname === "/api/mental-companion/");

  if (!isCompanion) {
    sendJson(res, 404, {
      error: "Not found. Use POST /api/mental-companion",
      reply: null,
    });
    return;
  }

  try {
    const body = await readBody(req);
    console.log("[mh-api] request", {
      mode: body.mode || "chat",
      language: body.language || body.lang || "en",
      len: String(body.message || "").length,
      history: Array.isArray(body.history) ? body.history.length : 0,
      hasKey: Boolean(OPENAI_API_KEY),
      model: MODEL,
    });

    const result = await callCompanion(body);
    console.log("[mh-api] ok", {
      replyLen: result.reply.length,
      risk: result.riskLevel,
      tool: result.suggestedTool,
    });
    sendJson(res, 200, result);
  } catch (err) {
    const status = err.status || 500;
    console.error("[mh-api] error", {
      status,
      message: err.message,
      safe: err.safe || null,
    });
    sendJson(res, status, {
      error: err.safe || err.message || "Server error",
      reply: null,
    });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[mh-api] listening on http://127.0.0.1:${PORT}/api/mental-companion`);
  console.log(`[mh-api] model=${MODEL} key=${OPENAI_API_KEY ? "set" : "MISSING"}`);
  if (!OPENAI_API_KEY) {
    console.log("[mh-api] Create a .env file with OPENAI_API_KEY=... (never commit it)");
  }
});
