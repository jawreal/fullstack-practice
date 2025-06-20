import { useEffect } from 'react';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { SendHorizontal } from 'lucide-react';
import { io } from 'socket.io-client';
import { useAuthContext } from '../hooks/useAuthProvider';

const socket = io("http://localhost:3000", {
  withCredentials: true, 
});

const Chat = () => {
  const { userData: { id: userId } } = useAuthContext();
  
  useEffect(() => {
    if(userId){
      socket.emit("register", userId);
    }
  }, [userId]);
  return (
    <div className="min-h-screen flex justify-center items-center p-2 bg-zinc-950">
      <div className="rounded-md h-[35rem] w-full md:max-w-80 relative p-0 flex flex-col gap-y-3">
         {/*<span className="rounded-md border border-zinc-800 bg-zinc-900 text-zinc-200 p-2 self-start">Sybau 🥀🥀🥀</span>
         <span className="rounded-md border border-zinc-800 bg-emerald-600 text-emerald-50 p-2 self-end">"Sybau" in big 2025 🥀🥀</span>
         <span className="rounded-md border border-zinc-800 bg-zinc-900 text-zinc-200 p-2 self-start">Imma touch ya mom bro🥀🥀</span>*/} 
         <div className="w-full absolute bottom-0 p-0 mb-0 flex gap-x-2">
           <Inputbox type="textarea" placeholder="Send your message" />
           <Button className="p-2 rounded-md bg-emerald-500 text-emerald-50 mb-2" icon={<SendHorizontal size={22} />} />
         </div>
      </div>
    </div>
    );
};

export default Chat;