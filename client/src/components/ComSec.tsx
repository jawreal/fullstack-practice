import Inputbox from './Inputbox';
import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import ImgFallback from '../components/ImgFallback'
import { useAuthContext } from '../hooks/useAuthProvider';
import { io } from 'socket.io-client';
import { SendHorizontal } from 'lucide-react';
import Button from './Button';
const Image = lazy(() => import('../components/Image'));  
const socket = io("http://localhost:3000", {
  withCredentials: false, 
}); 
faker.seed(123);

interface IComments {
  com_id: string;
  avatar: string;
  username: string;
  comment: string;
}

const ComSec = () => {
  const [comments, setComments] = useState<IComments[]>([]);
  const [userComment, setUserComment] = useState<string>('');
  const { userData: { username: from_user  }} = useAuthContext();
  const { id } = useParams();
  const userAvatar = useMemo(() => faker.image.avatar(), [])
  
  useEffect(() => {
    if(id) socket.emit("join-comment-sec", id);
    return () => {
      socket.off("join-comment-sec", id);
    }
  }, [id]);
  
  const handleCommentValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  }
  
  const sendComment = () => {
    //socket
    socket.emit("comment-sec-room", {
      com_id: id, avatar: userAvatar, username: from_user, comment: userComment });
      setUserComment('');
  };
  
  useEffect(() => {
    const commentListener = (data: IComments) => {
      setComments(prevData => [...prevData, data]);
    };
    socket.on("receive-comment", commentListener);
    
    return () => {
      socket.off("receive-comment", commentListener)
    }
  }, [])
  
  return (
    <div className="w-full flex flex-col px-1 gap-y-2 pb-1">
         <div className="w-full flex items-center gap-x-2">
           <Suspense fallback={<ImgFallback />}>
             <Image url={userAvatar} className="w-8 h-8 rounded-full self-start mt-2" />
           </Suspense>
           <div className="w-full pt-2">
              <Inputbox value={userComment} onChange={handleCommentValue} placeholder="Write a comment..." type="textarea" /> 
           </div>
         </div>
         <Button className="p-2 rounded-md bg-emerald-500 text-emerald-50 mb-2 self-end" onClick={sendComment} icon={<SendHorizontal size={22} />} /> 
         {comments?.map((info: IComments, idx: number) =>
          <div key={idx} className="flex items-center gap-x-2">
           <Suspense fallback={<ImgFallback />}>
             <Image url={info.avatar} className="w-8 h-8 mt-1 rounded-full self-start" />
           </Suspense> 
           <div className="w-full flex flex-col">
              <span className="font-medium text-sm text-zinc-400">{info.username}</span>
              <span className="break-words text-zinc-200">{info.comment}</span>
           </div>
         </div>)}
      </div> 
    );
};

export default ComSec;