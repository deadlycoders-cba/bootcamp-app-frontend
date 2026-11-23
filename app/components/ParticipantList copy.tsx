// app/components/ParticipantList.tsx
// Uses public API: https://jsonplaceholder.typicode.com/users

'use client';
import { useState, useEffect } from 'react';
import './ParticipantList.css';

// Current shape from the public API

interface Participant {
  id: number;
  name: string;
  email: string;
  // These will come from your Express API in Week 4
  // Hardcoded as placeholders for now
  stream?: string;
  isActive?: boolean;
}

// Placeholder data for fields not yet in the public API
// Remove these when you connect to your own backend
const PLACEHOLDER_STREAMS = ['Engineering', 'Data', 'Cyber'];
const getPlaceholderStream = (id: number) =>
  PLACEHOLDER_STREAMS[id % PLACEHOLDER_STREAMS.length];


export default function ParticipantList() {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Fetch failed');
        const json: Participant[] = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="participant-status-msg">Loading participants...</p>;
  if (error)   return <p className="participant-status-msg participant-error">Error: {error}</p>;

  return (
    <section className="participant-section">
      <h2 className="participant-heading">Cohort Participants</h2>
      <div className="participant-grid">
        {data.map(p => {
          const stream = p.stream ?? getPlaceholderStream(p.id);
          const isActive = p.isActive !== false;

          return (
            <article key={p.id} className="participant-card">

              <div className="participant-avatar">
                {p.name.charAt(0).toUpperCase()}
              </div>

              <h3>{p.name}</h3>
              <p>{p.email}</p> 

              <span className={`participant-badge badge-${stream.toLowerCase()}`}>
                {stream}
              </span>

              <span className={`participant-status-dot ${isActive ? 'active' : 'inactive'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>

            </article>
          );
        })}
      </div>
    </section>
  );
}