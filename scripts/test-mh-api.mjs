const tests = ["I feel dumb.", "I feel lonely.", "I failed my exam."];
const url = "http://127.0.0.1:8787/api/mental-companion";

for (const message of tests) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lang: "en" }),
    });
    const text = await res.text();
    console.log("---");
    console.log("message:", message);
    console.log("status:", res.status);
    console.log("body:", text.slice(0, 500));
  } catch (err) {
    console.log("---");
    console.log("message:", message);
    console.log("fetch_error:", err.message);
  }
}
