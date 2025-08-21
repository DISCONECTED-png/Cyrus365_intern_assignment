import React, { useState } from "react";
import "./App.css"
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function App() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("");
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2500);
  };

  const handleGenerate = async () => {
    setError("");
    if (!topic.trim()) return setError("Please enter a topic.");
    if (!count || isNaN(count)) return setError("Please enter a valid number of questions.");

    try {
      setLoading(true);
      setExam("");
      const resp = await fetch(`${API_BASE}/generate-exam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count: Number(count), includeAnswerKey }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data?.error || "Failed to generate exam.");
      setExam(data.exam);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exam);
      showToast("📋 Exam copied to clipboard!");
    } catch {
      setError("Could not copy to clipboard, please copy manually.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-500 ease-in-out ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div
        className={`shadow-xl rounded-2xl p-8 w-full max-w-2xl transition-colors duration-500 ease-in-out ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AI Exam Paper Generator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                : "bg-gray-300 hover:bg-gray-400 text-gray-900"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Math Topic</label>
            <input
              className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-indigo-300 p-2 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-200 text-black border-gray-300"
              }`}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Fractions"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Number of Questions</label>
            <input
              type="number"
              className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-indigo-300 p-2 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-200 text-black border-gray-300"
              }`}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <div className="flex items-center">
            <input
              id="answerKey"
              type="checkbox"
              checked={includeAnswerKey}
              onChange={(e) => setIncludeAnswerKey(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="answerKey" className="ml-2 text-sm">
              Include Answer Key
            </label>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium cursor-pointer transform transition-all duration-300
              ${loading ? "scale-95 bg-gray-400 text-white" : "hover:scale-105"}
              ${loading ? "" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
            `}
          >
            {loading ? "Generating..." : "Generate Exam"}
          </button>
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          {exam && (
            <div className="mt-6 animate-fadeIn">
              <button
                onClick={handleCopy}
                className={`mb-3 px-3 py-1 rounded-lg text-sm cursor-pointer transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-black"
                }`}
              >
                Copy to Clipboard
              </button>
              <pre
                className={`p-4 rounded-lg border text-sm whitespace-pre-wrap transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-200 border-gray-300"
                }`}
              >
                {exam}
              </pre>
            </div>
          )}
        </div>
      </div>

      {toast.visible && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
