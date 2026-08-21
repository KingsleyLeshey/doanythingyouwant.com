import { describe, expect, it } from "vitest";
import worker, { classifyV0, validateRequestText } from "../src/index";

describe("front-door request validation", () => {
  it("rejects requests that are too vague", () => {
    expect(validateRequestText("more leads").ok).toBe(false);
  });

  it("normalizes a valid request", () => {
    expect(validateRequestText("  Find qualified prospects for our B2B software.  ")).toEqual({
      ok: true,
      value: "Find qualified prospects for our B2B software.",
    });
  });
});

describe("V0 classification", () => {
  it("routes acquisition demand into the first commercial wedge", () => {
    expect(classifyV0("Build a qualified prospect list for our B2B sales team")).toBe(
      "acquisition_sprint",
    );
  });

  it("records other business demand without pretending it is supported", () => {
    expect(classifyV0("Build a new inventory forecasting application for my company")).toBe(
      "demand_observation",
    );
  });
});

describe("Worker readiness", () => {
  it("truthfully reports that durable intake and payments are not live", async () => {
    const response = await worker.fetch(new Request("https://example.com/ready"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      ok: true,
      stage: "foundation",
      durable_intake: false,
      payments: false,
      fulfillment: false,
    });
  });

  it("previews a valid acquisition request without claiming persistence", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/intents/preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestText: "Find 50 qualified B2B prospects in the UK for our accounting software.",
        }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      ok: true,
      durable: false,
      classification: "acquisition_sprint",
    });
    expect(typeof body.requestId).toBe("string");
  });
});
