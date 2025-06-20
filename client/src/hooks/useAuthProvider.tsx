// src/hooks/useAuthProvider.tsx

import { useState, createContext, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '../services/getSession';

interface JsonType {
  id: string;
  authenticated?: boolean; 
  username?: string; 
} 

interface Context {
  refetch: () => void;
  userData: JsonType | null;
}

const AuthContext = createContext<Context | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setData] = useState<JsonType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['auth'], 
    queryFn: getSession, 
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      setData(data);
      
      if (data.authenticated === false && !location.pathname.startsWith('/sign-in') && !location.pathname.startsWith('/sign-up')) {
        navigate('/sign-in', { replace: true });
      }
      
      if (data.authenticated === true && location.pathname.startsWith('/sign-in')) {
        navigate('/home', { replace: true });
      }
    }
  }, [data, isLoading, location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ userData, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
