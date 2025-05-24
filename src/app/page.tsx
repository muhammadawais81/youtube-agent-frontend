'use client';
import { useState } from 'react';
import ResultCard from '@/app/components/ResultCard';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ transcript: string; summary: string } | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setError('');
    setResult(null);
    if (!url) {
      setError('Please enter a valid YouTube URL.');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('https://angelic-tenderness-production.up.railway.app/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">YouTube Script & Summary Generator</h1>
        <input
          type="text"
          placeholder="Paste YouTube video URL"
          className="w-full p-3 border rounded-lg mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Analyzing...' : 'Analyze Video'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {result && <ResultCard transcript={result.transcript} summary={result.summary} />}
      </div>
    </main>
  );
}
