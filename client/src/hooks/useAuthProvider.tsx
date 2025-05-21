import { useState, createContext, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '../services/getSession';
import type { ReactNode } from 'react';

interface JsonType {
  authenticated?: boolean;
}

const AuthContext = createContext<JsonType | null>(null);

export const AuthProvider = ({ children }: JSX.element ) => {
  const [auth, setAuth] = useState<JsonType | null>(null);
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['auth'], 
    queryFn: getSession, 
  });
  
  useEffect(() => {
    if(!isLoading){
       console.log("AuthProvider triggers", data.authenticated)
       if(data?.authenticated === false){
         navigate('/sign-in');
       }
       setAuth(data?.authenticated)
    }
  }, [data, isLoading, navigate])
  
  return (
    <AuthContext.Provider value={{ auth }}>
      { children } 
    </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if(!context) throw new Error('useAuthContext must be used within the same component')
  return context
}