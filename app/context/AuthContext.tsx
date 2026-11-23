// app/context/AuthContext.tsx

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the access token when the application loads
  useEffect(() => {
    async function refreshAccessToken() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include',
          }
        );

        if (!res.ok) {
          throw new Error('Session expired or no refresh token');
        }

        const { accessToken } = await res.json();

        setToken(accessToken);
      } catch (error) {
        console.log('Could not restore session:', error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }

    refreshAccessToken();
  }, []);

  // Log out: clear the refresh cookie on the backend
  // and clear the access token in React state
  async function logout() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        console.error('Backend logout failed:', res.status);
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      setToken(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        login: (t) => setToken(t),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
