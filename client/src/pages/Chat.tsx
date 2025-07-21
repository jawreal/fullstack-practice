import { useEffect, useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { SendHorizontal, User } from 'lucide-react';
import { io } from 'socket.io-client';
import { useAuthContext } from '../hooks/useAuthProvider';

interface Chats {
  to?: string;
  from?: string;
  message?: string;
};

const socket = io("http://localhost:3000", {
  withCredentials: false, 
});

const Chat = () => {
  const { userData: { username: from_user } } = useAuthContext();
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<Chats[]>([]);
  useEffect(() => {
     const handlePrivateMessage = (data: Chats) => {
      setChats(prevMsg => [...prevMsg, data]);
    };
     socket.on("private_message", handlePrivateMessage);

     return () => {
       socket.off("private_message", handlePrivateMessage); 
     };
  }, []);
  
  useEffect(() => {
    if(from_user){
      socket.emit("register", from_user);
    }
  }, [from_user]);
  
  const sendChat = useCallback(() => {
    if(!username) return;  
    const data: Chat = { to: username, from: from_user, message: message };
    socket.emit("private_message", data);
    setMessage("");
  }, [username, message, from_user]);
  
  const messageOnchange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(prevMsg => e.target.value);
  }, []);
  
  const setChatWith = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(prevUser => e.target.value);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-2 bg-zinc-950">
      <div className="w-full md:max-w-80 pb-2 bg-zinc-950 flex gap-x-2">
         <Inputbox value={username} onChange={setChatWith} icon={<User size={22} />} placeholder="Chat with" />
      </div>
      <div className="rounded-md h-[35rem] w-full md:max-w-80 relative p-0 flex flex-col gap-y-3 my-1 overflow-auto">
         {chats.map((info: Chats, idx: number) => {
           return (
           <span key={idx} className={`rounded-md border ${info?. from === from_user ? "border-emerald-800 bg-emerald-600 text-emerald-50 self-end" : "border-zinc-800 bg-zinc-900 text-zinc-200 self-start"} p-2 max-w-[15rem] break-words`}>{info?.message}</span> 
           );
         })}
      </div>
      <div className="w-full md:max-w-80 flex gap-x-2 pt-2 bg-zinc-950">
         <Inputbox value={message} onChange={messageOnchange} type="textarea" placeholder="Send your message" />
         <Button className="p-2 rounded-md bg-emerald-500 text-emerald-50 mb-2" onClick={sendChat} icon={<SendHorizontal size={22} />} />
       </div> 
    </div>
    );
};

export default Chat;