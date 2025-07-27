import Inputbox from './Inputbox';
import { lazy, Suspense } from 'react';
import { faker } from '@faker-js/faker';
import ImgFallback from '../components/ImgFallback'
import { useAuthContext } from '../hooks/useAuthProvider';
const Image = lazy(() => import('../components/Image'));  
faker.seed(125)

const ComSec = () => {
  const { userData: { username }} = useAuthContext();
  return (
    <div className="w-full flex flex-col px-1 gap-y-2 pb-1">
         <div className="w-full flex items-center gap-x-2">
           <Suspense fallback={<ImgFallback />}>
             <Image url={faker.image.avatar()} className="w-8 h-8 rounded-full" />
           </Suspense>
           <div className="w-full pt-2">
              <Inputbox placeholder="Write a comment..." type="textarea" /> 
           </div>
         </div>
         <div className="flex items-center gap-x-2">
           <Suspense fallback={<ImgFallback />}>
             <Image url={faker.image.avatar()} className="w-8 h-8 mt-1 rounded-full self-start" />
           </Suspense> 
           <div className="w-full flex flex-col">
              <span className="font-medium text-sm text-zinc-400">{username}</span>
              <span className="break-words text-zinc-200">This new smartphone looks so sleek! Can't wait to get my hands on it</span>
           </div>
         </div>
         <div className="flex items-center gap-x-2">
           <Suspense fallback={<ImgFallback />}>
             <Image url={faker.image.avatar()} className="w-8 h-8 mt-1 rounded-full self-start" />
           </Suspense> 
           <div className="w-full flex flex-col">
              <span className="font-medium text-sm text-zinc-400">{username}</span>
              <span className="break-words text-zinc-200">I'm not sure about the price though. Is it really worth the hype?</span>
           </div>
         </div> 
      </div> 
    );
};

export default ComSec;