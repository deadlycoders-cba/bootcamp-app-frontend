//components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.status === 429) {
        setError('Too many login attempts. Please try again later.');
        return;
      }

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const { accessToken } = await res.json();

      login(accessToken);

      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Log In</button>

      {error && <p className="login-error">{error}</p>}
    </form>
  );
}
