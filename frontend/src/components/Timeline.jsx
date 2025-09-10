import React from "react";

const steps = ["Ingestion", "Parsing", "Normalization", "Validation", "KG Upsert", "Optimization"];

export default function Timeline() {
  return (
    <div className="my-4">
      <h2 className="font-semibold mb-2">Agentic Flow Timeline</h2>
      <div className="flex space-x-4">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col items-center">
            <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">{idx + 1}</div>
            <span className="text-xs mt-1">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}