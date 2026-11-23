
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ParticipantList from './components/ParticipantList';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { token, isLoading, logout } = useAuth();
  const router = useRouter();

  // Only redirect after the refresh-token check has finished
  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/login');
    }
  }, [token, isLoading, router]);

  // Wait while checking the refresh token
  if (isLoading) {
    return <p>Checking your session...</p>;
  }

  // Don't render the protected interface while redirecting
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
