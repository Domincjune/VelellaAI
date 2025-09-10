export async function ingestFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetch("/api/ingest", { method: "POST", body: formData });
}

export async function getStatus(ingestionId) {
  return fetch(`/api/ingest/${ingestionId}/status`).then(res => res.json());
}

export async function runQuery(query) {
  return fetch("/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then(res => res.json());
}