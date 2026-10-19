import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, renderStatus } from "../app.js";

test("renders summary cards", () => {
  const html = renderStatus({ summary: { profiles: 2, plugins: 1, events: 5 }, events: [] });
  assert.match(html, /Profiles/);
  assert.match(html, /<p class="value">2<\/p>/);
});

test("renders events table", () => {
  const html = renderStatus({
    summary: { events: 1 },
    events: [{ at: "2026-01-01T00:00:00Z", type: "login", actor: "victor" }],
  });
  assert.match(html, /login/);
  assert.match(html, /victor/);
});

test("shows empty state without events", () => {
  const html = renderStatus({ summary: {}, events: [] });
  assert.match(html, /No events/);
});

test("escapes unsafe values", () => {
  const html = renderStatus({
    summary: { profiles: 1 },
    events: [{ at: "<script>", type: "x", actor: "y" }],
  });
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("escapeHtml handles quotes", () => {
  assert.equal(escapeHtml('a"b<c>'), "a&quot;b&lt;c&gt;");
});
