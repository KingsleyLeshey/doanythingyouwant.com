const MAX_REQUEST_BODY_BYTES = 16_384;
const MIN_REQUEST_TEXT_LENGTH = 12;
const MAX_REQUEST_TEXT_LENGTH = 4_000;

export type V0Classification = "acquisition_sprint" | "demand_observation";

export type ValidationResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

export function validateRequestText(value: unknown): ValidationResult {
  if (typeof value !== "string") {
    return { ok: false, error: "requestText must be a string" };
  }

  const text = value.trim();

  if (text.length < MIN_REQUEST_TEXT_LENGTH) {
    return {
      ok: false,
      error: `Tell us a little more — use at least ${MIN_REQUEST_TEXT_LENGTH} characters.`,
    };
  }

  if (text.length > MAX_REQUEST_TEXT_LENGTH) {
    return {
      ok: false,
      error: `Keep the request under ${MAX_REQUEST_TEXT_LENGTH} characters.`,
    };
  }

  return { ok: true, value: text };
}

export function classifyV0(text: string): V0Classification {
  const normalized = text.toLowerCase();
  const acquisitionSignals = [
    "lead",
    "leads",
    "customer",
    "customers",
    "client",
    "clients",
    "prospect",
    "prospects",
    "pipeline",
    "outbound",
    "outreach",
    "appointment",
    "appointments",
    "sales",
    "b2b",
  ];

  return acquisitionSignals.some((signal) => normalized.includes(signal))
    ? "acquisition_sprint"
    : "demand_observation";
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(body), { ...init, headers });
}

function securityHeaders(nonce: string): Headers {
  return new Headers({
    "content-security-policy": [
      "default-src 'self'",
      `script-src 'nonce-${nonce}'`,
      `style-src 'nonce-${nonce}'`,
      "img-src 'self' data:",
      "connect-src 'self'",
      "font-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
  });
}

export function renderHome(nonce: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Do Anything You Want — Tell us what you want done.</title>
  <meta name="description" content="Tell us the business outcome you want. Do Anything You Want turns it into a scoped, verifiable execution plan." />
  <style nonce="${nonce}">
    :root {
      color-scheme: dark;
      --bg: #070909;
      --panel: #0f1212;
      --panel-2: #151919;
      --text: #f2f5f3;
      --muted: #98a39e;
      --line: #252c29;
      --accent: #b9ff66;
      --accent-ink: #0a1202;
      --danger: #ff968a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at 20% 0%, rgba(185,255,102,.08), transparent 36rem),
        var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    a { color: inherit; }
    .shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    header { display: flex; align-items: center; justify-content: space-between; padding: 28px 0; }
    .brand { font-weight: 850; letter-spacing: -.04em; font-size: 18px; }
    .status { color: var(--muted); border: 1px solid var(--line); border-radius: 999px; padding: 8px 11px; font-size: 12px; }
    main { padding: 84px 0 56px; }
    .eyebrow { color: var(--accent); font-weight: 750; text-transform: uppercase; letter-spacing: .16em; font-size: 12px; }
    h1 { margin: 18px 0 18px; max-width: 900px; font-size: clamp(52px, 9vw, 108px); line-height: .92; letter-spacing: -.07em; }
    .lede { max-width: 740px; color: var(--muted); font-size: clamp(18px, 2.5vw, 24px); line-height: 1.55; }
    .card { margin-top: 48px; padding: 14px; border: 1px solid var(--line); background: rgba(15,18,18,.88); border-radius: 24px; box-shadow: 0 24px 80px rgba(0,0,0,.35); }
    textarea {
      width: 100%; min-height: 178px; resize: vertical; border: 0; outline: 0; border-radius: 16px;
      background: var(--panel-2); color: var(--text); padding: 22px; font: inherit; font-size: 20px; line-height: 1.5;
    }
    textarea::placeholder { color: #66716c; }
    .bar { display: flex; gap: 12px; align-items: center; justify-content: space-between; padding: 14px 4px 2px 8px; }
    .hint { color: var(--muted); font-size: 13px; }
    button { border: 0; cursor: pointer; background: var(--accent); color: var(--accent-ink); border-radius: 999px; padding: 14px 20px; font: inherit; font-weight: 850; }
    button:disabled { opacity: .55; cursor: wait; }
    .result { display: none; margin-top: 14px; border: 1px solid var(--line); border-radius: 16px; padding: 18px; background: #0b0e0d; }
    .result.show { display: block; }
    .result strong { display: block; margin-bottom: 7px; }
    .result p { color: var(--muted); margin: 0; line-height: 1.55; }
    .error { color: var(--danger) !important; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 22px; }
    .mini { border: 1px solid var(--line); border-radius: 16px; padding: 18px; background: rgba(15,18,18,.58); }
    .mini b { display: block; margin-bottom: 8px; }
    .mini span { color: var(--muted); line-height: 1.5; font-size: 14px; }
    footer { color: var(--muted); padding: 48px 0; font-size: 13px; }
    @media (max-width: 760px) {
      main { padding-top: 42px; }
      .grid { grid-template-columns: 1fr; }
      .bar { align-items: stretch; flex-direction: column; }
      button { width: 100%; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div class="brand">Do Anything You Want</div>
      <div class="status">Foundation preview · no payments yet</div>
    </header>
    <main>
      <div class="eyebrow">One front door. Outcomes, not tools.</div>
      <h1>What do you want done?</h1>
      <p class="lede">Describe the business outcome in plain English. You should not have to know which model, agent, workflow, API or specialist is required.</p>

      <form class="card" id="intent-form">
        <textarea id="request-text" maxlength="4000" required placeholder="Example: Find 50 qualified companies in the UK that are a strong fit for our B2B software and show me why each one qualifies."></textarea>
        <div class="bar">
          <div class="hint"><span id="count">0</span>/4000 · V0 currently productizes acquisition/prospecting work.</div>
          <button id="submit" type="submit">Scope this request →</button>
        </div>
        <div class="result" id="result" role="status" aria-live="polite"></div>
      </form>

      <div class="grid">
        <div class="mini"><b>Tell us the outcome.</b><span>No category hunting and no choosing agents.</span></div>
        <div class="mini"><b>We scope what is real.</b><span>Unsupported work is not dressed up as a fake capability.</span></div>
        <div class="mini"><b>We prove the result.</b><span>Evidence and independent verification matter more than agent confidence.</span></div>
      </div>
    </main>
    <footer>Do Anything You Want · Built around verified outcomes and measurable economics.</footer>
  </div>
  <script nonce="${nonce}">
    const form = document.getElementById('intent-form');
    const input = document.getElementById('request-text');
    const count = document.getElementById('count');
    const result = document.getElementById('result');
    const submit = document.getElementById('submit');

    input.addEventListener('input', () => { count.textContent = String(input.value.length); });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submit.disabled = true;
      result.className = 'result';
      try {
        const response = await fetch('/api/intents/preview', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ requestText: input.value })
        });
        const data = await response.json();
        result.classList.add('show');
        if (!response.ok) {
          result.innerHTML = '<strong>We need a clearer request.</strong><p class="error"></p>';
          result.querySelector('p').textContent = data.error || 'Unable to scope this request.';
          return;
        }
        if (data.classification === 'acquisition_sprint') {
          result.innerHTML = '<strong>This fits the first commercial workflow.</strong><p></p>';
          result.querySelector('p').textContent = 'We would qualify the ICP, define acceptance criteria, price the sprint, then research and independently verify the prospecting deliverable. Durable intake and payment are not live in this foundation build yet.';
        } else {
          result.innerHTML = '<strong>We understand the request, but V0 does not productize it yet.</strong><p></p>';
          result.querySelector('p').textContent = 'The final product will record demand like this and activate new fulfillment categories only when they can be delivered and verified economically. This preview intentionally does not pretend the request was saved.';
        }
      } catch (_) {
        result.classList.add('show');
        result.innerHTML = '<strong>Request preview failed.</strong><p class="error">Nothing was saved. Please try again.</p>';
      } finally {
        submit.disabled = false;
      }
    });
  </script>
</body>
</html>`;
}

async function handlePreview(request: Request): Promise<Response> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_REQUEST_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "Request body is too large." }, { status: 413 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ ok: false, error: "Expected application/json." }, { status: 415 });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_REQUEST_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "Request body is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const requestText =
    typeof payload === "object" && payload !== null && "requestText" in payload
      ? (payload as { requestText?: unknown }).requestText
      : undefined;

  const validation = validateRequestText(requestText);
  if (!validation.ok) {
    return jsonResponse({ ok: false, error: validation.error }, { status: 400 });
  }

  const requestId = crypto.randomUUID();
  const classification = classifyV0(validation.value);

  console.log(
    JSON.stringify({
      message: "intent_preview",
      request_id: requestId,
      classification,
      text_length: validation.value.length,
      durable: false,
    }),
  );

  return jsonResponse({
    ok: true,
    durable: false,
    requestId,
    classification,
  });
}

export const worker = {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    try {
      console.log(
        JSON.stringify({
          message: "incoming_request",
          method: request.method,
          path: url.pathname,
        }),
      );

      if (request.method === "GET" && url.pathname === "/health") {
        return new Response("ok", { headers: { "cache-control": "no-store" } });
      }

      if (request.method === "GET" && url.pathname === "/ready") {
        return jsonResponse({
          ok: true,
          stage: "foundation",
          durable_intake: false,
          payments: false,
          fulfillment: false,
        });
      }

      if (request.method === "POST" && url.pathname === "/api/intents/preview") {
        return await handlePreview(request);
      }

      if (request.method === "GET" && url.pathname === "/") {
        const nonce = crypto.randomUUID().replaceAll("-", "");
        const headers = securityHeaders(nonce);
        headers.set("content-type", "text/html; charset=utf-8");
        headers.set("cache-control", "no-store");
        return new Response(renderHome(nonce), { headers });
      }

      return jsonResponse({ ok: false, error: "Not found" }, { status: 404 });
    } catch (error) {
      console.error(
        JSON.stringify({
          message: "request_failed",
          path: url.pathname,
          error: error instanceof Error ? error.message : String(error),
        }),
      );
      return jsonResponse({ ok: false, error: "Internal server error" }, { status: 500 });
    }
  },
};

export default worker;
