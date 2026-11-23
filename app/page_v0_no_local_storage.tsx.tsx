'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ParticipantList from './components/ParticipantList';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <main>
      <button onClick={logout}>Log Out</button>

      <nav className="nav">
        <Link href="/">Home</Link>
        <span> | </span>
        <Link href="/about">About</Link>
      </nav>

      <ParticipantList />
    </main>
  );
}