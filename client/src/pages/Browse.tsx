import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import Inputbox from '../components/Inputbox';
import { Search } from 'lucide-react';
import { searchData } from '../services/mockData';
import type { Data } from '../services/mockData'; 
import useDebounce from '../hooks/useDebounce';

const Browse = () => {
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
  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-2 bg-zinc-950">
       <div className="w-full max-w-80">
         <Inputbox value={search} onChange={handleChange} placeholder="Search" icon={<Search size={22} />}/>
       </div>
       <div className="w-full max-w-80 mt-2 flex flex-col gap-y-2">
           {data.map((person, idx) => (
             <div key={person.id} className="border border-zinc-700 p-2 rounded-md bg-zinc-800 flex gap-2 items-center">
               <img src={person.avatar} className="rounded-full w-8 h-8"/>
               <span className="text-zinc-200">{person.name}</span>
             </div>
           ))}
       </div>
    </div>
    );
};

export default Browse;