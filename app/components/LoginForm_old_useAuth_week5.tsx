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
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) throw new Error('Invalid credentials');
      const { token } = await res.json();
      login(token);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  }
 
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Log In</button>
      {error && <p className="login-error">{error}</p>}
    </form>
  );
}
