
'use client';

import { useState, useEffect } from 'react';
import './ParticipantList.css';
import { useAuth } from '../context/AuthContext';

interface Participant {
  id: number;
  name: string;
  stream: string;
  isActive: boolean;
}

export default function ParticipantList() {
  const { token } = useAuth();

  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch participants - no access token required
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/participants`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch participants');
        }

        const json: Participant[] = await res.json();
        setData(json);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Edit participant - access token required
  async function handleEdit(participant: Participant) {
    if (!token) {
      setError('You must be logged in to edit a participant.');
      return;
    }

    const newName = window.prompt(
      'Participant name:',
      participant.name
    );

    if (newName === null) return;

    const newStream = window.prompt(
      'Stream (Engineering, Data or Cyber):',
      participant.stream
    );

    if (newStream === null) return;

    const newIsActive = window.prompt(
      'Active? Enter yes or no:',
      participant.isActive ? 'yes' : 'no'
    );

    if (newIsActive === null) return;

    const updatedData = {
      name: newName.trim(),
      stream: newStream.trim(),
      isActive: newIsActive.toLowerCase() === 'yes',
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/participants/${participant.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        throw new Error('Update failed');
      }

      const updatedParticipant: Participant = await res.json();

      setData(current =>
        current.map(p =>
          p.id === updatedParticipant.id
            ? updatedParticipant
            : p
        )
      );

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  if (loading) {
    return <p className="participant-status-msg">Loading participants...</p>;
  }

  if (error) {
    return (
      <p className="participant-status-msg participant-error">
        Error: {error}
      </p>
    );
  }

  return (
    <section className="participant-section">
      <h2 className="participant-heading">Cohort Participants</h2>

      <div className="participant-grid">
        {data.map(p => (
          <article key={p.id} className="participant-card">

            {token && (
              <button
                className="edit-button"
                onClick={() => handleEdit(p)}
                aria-label={`Edit ${p.name}`}
                title={`Edit ${p.name}`}
              >
                ✎
              </button>
            )}

            <div className="participant-avatar">
              {p.name.charAt(0).toUpperCase()}
            </div>

            <h3>{p.name}</h3>

            <span className={`participant-badge badge-${p.stream.toLowerCase()}`}>
              {p.stream}
            </span>

            <span className={`participant-status-dot ${p.isActive ? 'active' : 'inactive'}`}>
              {p.isActive ? 'Active' : 'Inactive'}
            </span>

          </article>
        ))}
      </div>
    </section>
  );
}
