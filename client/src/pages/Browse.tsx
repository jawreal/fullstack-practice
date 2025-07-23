import { useState, useEffect, Suspense,  lazy } from 'react';
import type { ChangeEvent } from 'react';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { Search } from 'lucide-react';
import { searchData } from '../services/mockData';
import type { Data } from '../services/mockData'; 
import useDebounce from '../hooks/useDebounce';
import { Heart, MessageCircleMore } from 'lucide-react';
import { io } from 'socket.io-client';
import { useAuthContext } from '../hooks/useAuthProvider';
const Image = lazy(() => import('../components/Image'));

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
  
  const handleLike = (id: string) => {
    socket.emit("update-like", id)
  };
  
  useEffect(() => {
    if(from_user){
      socket.emit("register", from_user);
    }
  }, [from_user]);
 
  useEffect(() => {
    const listener = (id: string) => {
      setData((prevData: Data[]) => data.map((person) => {
        const correctId: boolean = person.id === id;
        const alreadyLiked = person.likers.includes(from_user);
        if(correctId && alreadyLiked){
          const filterUser = person.likers.filter((username: string) => username !== from_user);
          return {...person, likers: filterUser, likeTotal: person.likeTotal  - 1 };
        }
        if(correctId){
          return {...person, likers: [...person.likers, from_user], likeTotal: +1 };
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
       <div className="w-full max-w-80 my-4 flex flex-col gap-y-4">
           {data.map((person, idx) => (
             <div key={person.id} className="border border-zinc-700 p-2 rounded-md bg-zinc-800 flex flex-col justify-center gap-y-2">
               <div className="flex gap-y-2 gap-x-3 items-center px-1">
                  <Suspense fallback={<div className="w-8 h-8 rounded-full bg-zinc-700 animate-pulse"></div>}>
                    <Image url={person.avatar} className="w-8 h-8 rounded-full" />
                  </Suspense>
                  <span className="text-zinc-200 font-medium">{person.name}</span>
               </div>
               <span className="text-zinc-200 px-1">{person.post}</span>
               <div className="w-full px-1 flex gap-x-3 items-center">
                  <Button className={`${person.likers.includes(from_user) ? "text-red-800" : "text-zinc-200"}`} icon={<Heart size={22} fill={`${person.likers.includes(from_user) ? "currentColor" : "none"}`} />} onClick={() => handleLike(person.id)}/>
                  <span className="text-zinc-200">{person.likeTotal}</span>
                  <Button className="text-zinc-200" icon={<MessageCircleMore size={22} />}/>
                  <span className="text-zinc-200">{person.commentTotal}</span>
               </div>
             </div>
           ))}
       </div>
    </div>
    );
};

export default Browse;