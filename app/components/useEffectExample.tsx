'use client';
import { useState, useEffect } from 'react';

interface Participant { id: number; name: string; email: string; }

export default function ParticipantList() {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        if (!res.ok) throw new Error('Fetch failed');
        const json: Participant[] = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);  // always runs, success or fail
      }
    }
    fetchData();
  }, []);  // [] = run once when component first loads

  if (loading) return <p>Loading participants...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <ul>{data.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
