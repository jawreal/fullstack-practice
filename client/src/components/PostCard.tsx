import { useState, useEffect, useMemo, memo, lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Data } from '../services/mockData';
import { faker } from '@faker-js/faker';
import Button from './Button';
import Inputbox from './Inputbox';
import { useAuthContext } from '../hooks/useAuthProvider';
import { Heart, MessageCircleMore } from 'lucide-react';
import ComSec from '../components/ComSec'
import ImgFallback from '../components/ImgFallback'
const Image = lazy(() => import('../components/Image'));
faker.seed(125)
interface IPostCard {
  data?: Data[], 
  handleLike?: () => void;
}

const PostCard = ({ data, handleLike }: IPostCard) => {
  const { userData: { username: from_user }} = useAuthContext();
  const viewPostPage = useMemo(() => window.location.pathname.includes('view-post'), []);
  return (
    <div className="w-full max-w-80 my-4 flex flex-col gap-y-4">
       {data?.map((person, idx) => (
           <div key={person.id} className="border border-zinc-700 p-2 rounded-md bg-zinc-800 flex flex-col justify-center gap-y-2">
              <div className="flex gap-y-2 gap-x-3 items-center px-1">
                 <Suspense fallback={<ImgFallback />}>
                    <Image url={person.avatar} className="w-8 h-8 rounded-full" />
                  </Suspense>
                  <span className="text-zinc-200 font-medium">{person.name}</span>
               </div>
               <span className="text-zinc-200 px-1">{person.post}</span>
               <div className="w-full px-1 flex gap-x-3 items-center">
                  <Button className={`${person.likers.includes(from_user) ? "text-red-800" : "text-zinc-200"}`} icon={<Heart size={22} fill={`${person.likers.includes(from_user) ? "currentColor" : "none"}`} />} onClick={() => handleLike(person.id)}/>
                  <span className="text-zinc-200">{person.likeTotal}</span>
                  <Link className="text-zinc-200 flex gap-x-3 items-center" to={`/view-post/${person.id}`}>
                      <span><MessageCircleMore size={22} /></span>
                      <span className="text-zinc-200">{person.commentTotal}</span>
                   </Link>
               </div>
               {viewPostPage && <ComSec />}
           </div>
         ))}
   </div>
    )
};

export default memo(PostCard);