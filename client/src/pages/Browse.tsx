import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import type { ChangeEvent } from 'react';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { Search } from 'lucide-react';
import { searchData } from '../services/mockData';
import type { Data } from '../services/mockData'; 
import useDebounce from '../hooks/useDebounce';
import { io } from 'socket.io-client';
import { useAuthContext } from '../hooks/useAuthProvider';
const PostCard = lazy(() => import('../components/PostCard'));

const socket = io("http://localhost:3000", {
  withCredentials: false, 
});

const Browse = () => {
  const { userData: { username: from_user } } = useAuthContext(); 
  const [data, setData] = useState<Data[]>([]);
  const [search, setSearch] = useState<string>('');
  const debounceResult = useDebounce(search);
  
  useEffect(() => {
    const getData = (async () => {
     const result = await searchData(debounceResult);
     setData(result);
    })()
  }, [debounceResult]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };
  
  const handleLike = useCallback((id: number) => {
    socket.emit("update-like", { id: id, username: from_user })
  }, [socket, from_user]);
  
  useEffect(() => {
    if(from_user){
      socket.emit("register", from_user);
    }
  }, [from_user]);
 
  useEffect(() => {
    const listener = (info: { id: number; username: string }) => {
      setData((prevData: Data[]) => data.map((person) => {
        const correctId: boolean = person.id === info.id;
        const alreadyLiked = person.likers.includes(info.username);
        console.log(alreadyLiked);
        if(correctId && alreadyLiked){
          const filterUser = person.likers.filter((username: string) => username !== from_user);
          return {...person, likers: filterUser, likeTotal: person.likeTotal  - 1 };
        }
        if(correctId){
          return {...person, likers: [...person.likers, info.username], likeTotal: person.likeTotal  + 1};
        }
        return person;
      }));
    };
    socket.on("receive-like", listener);
    
    return () => {
      socket.off("receive-like", listener);
    }
  }, [data]);
  
  
  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-2 bg-zinc-950">
       <div className="w-full max-w-80">
         <Inputbox value={search} onChange={handleChange} placeholder="Search" icon={<Search size={22} />}/>
       </div>
       <Suspense fallback={<div className="w-full max-w-80 h-[15rem] bg-zinc-700 animate-pulse mt-2 rounded-md"></div>}>
           <PostCard data={data} handleLike={handleLike}/>
       </Suspense>
    </div>
    );
};

export default Browse;