import React, { useState } from "react";

export default function QueryInput() {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    alert("Query sent!");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ask a question..."
        className="border px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Query</button>
    </form>
  );
}