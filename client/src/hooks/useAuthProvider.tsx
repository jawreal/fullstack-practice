import { useState, createContext, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '../services/getSession';


interface JsonType {
  authenticated?: boolean;
  refetch: () => void;
  username?: string;
}

const AuthContext = createContext<JsonType | null>(null);

export const AuthProvider = ({ children }: JSX.element ) => {
  const [userData, setData] = useState<JsonType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['auth'], 
    queryFn: getSession, 
    staleTime: 5 * 60 * 1000, 
    //refetchOnMount: true,
  });
  
  useEffect(() => {
    if(!isLoading){
       console.log(data)
       setData(data)
       if(data?.authenticated === false && !location.pathname.startsWith('/sign-in') && !location.pathname.startsWith('/sign-up')){
         navigate('/sign-in', { replace: true });
       }
       if(data?.authenticated === true && location.pathname.startsWith('/sign-in')) navigate('/home', { replace: true })
    }
  }, [data, isLoading, navigate])
  
  return (
    <AuthContext.Provider value={{ userData, refetch }}>
      { children } 
    </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if(!context) throw new Error('useAuthContext must be used within the same component')
  return context
}