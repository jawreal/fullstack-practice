import { useParams } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import PostCard from '../components/PostCard';
import type { Data } from '../services/mockData';
import { useAuthContext } from '../hooks/useAuthProvider';
import { searchData } from '../services/mockData'

const ViewPost = () => {
  const { id } = useParams();
  const { userData: { username: from_user }} = useAuthContext();
  const [singleData, setSingleData] = useState<Data[] | null>(null);
  
  useEffect(() => {
    const fetchSingleData = (async() => {
      const result = await searchData(id);
      console.log(result)
      setSingleData(result)
    })()
  }, [id])
  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-4 px-2 bg-zinc-950">
        <Suspense fallback={<div className="w-full max-w-80 h-[15rem] bg-zinc-800 animate-pulse mt-2 rounded-md"></div>}>
           <PostCard data={singleData} />
        </Suspense>
     </div>
    )
};

export default ViewPost;