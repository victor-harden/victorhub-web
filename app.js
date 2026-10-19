export function renderStatus(data) {
  const summary = data.summary || {};
  const events = Array.isArray(data.events) ? data.events : [];

  const cards = [
    { label: "Profiles", value: summary.profiles ?? 0 },
    { label: "Plugins", value: summary.plugins ?? 0 },
    { label: "Events", value: summary.events ?? 0 },
  ];

  const cardsHtml = cards
    .map(
      (card) =>
        `<section class="card"><h2>${escapeHtml(card.label)}</h2>` +
        `<p class="value">${escapeHtml(String(card.value))}</p></section>`
    )
    .join("");

  const rows = events
    .slice(0, 10)
    .map(
      (event) =>
        `<tr><td>${escapeHtml(event.at || "")}</td>` +
        `<td>${escapeHtml(event.type || "")}</td>` +
        `<td>${escapeHtml(event.actor || "")}</td></tr>`
    )
    .join("");

  return (
    cardsHtml +
    `<table><thead><tr><th>When</th><th>Type</th><th>Actor</th></tr></thead>` +
    `<tbody>${rows || '<tr><td colspan="3">No events</td></tr>'}</tbody></table>`
  );
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function main() {
  const app = document.getElementById("app");
  const subtitle = document.getElementById("subtitle");
  try {
    const response = await fetch("status.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    app.innerHTML = renderStatus(data);
    subtitle.textContent = data.generatedAt ? `Updated ${data.generatedAt}` : "Status";
  } catch (error) {
    app.innerHTML = `<section class="card error"><h2>Status</h2>` +
      `<p class="value">unavailable</p><p>${escapeHtml(error.message)}</p></section>`;
    subtitle.textContent = "Could not load status.json";
  }
}

if (typeof document !== "undefined") {
  main();
}
