'use client';
import { createContext, useContext, useState } from 'react';
 
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
 
  return (
    <AuthContext.Provider
      value={{
        token,
        login: (t) => setToken(t),
        logout: () => setToken(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
