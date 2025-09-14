"use client";

import { useState } from "react";

export default function AskAIPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ask AI About Your Goa Trip 🏖️</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about places, food, nightlife..."
        className="w-full p-3 border rounded-lg mb-4"
        rows={4}
      />

      <button
        onClick={handleAsk}
        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-line">
          <strong>AI says:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
