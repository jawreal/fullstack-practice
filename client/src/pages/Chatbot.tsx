import { useMemo, useState } from 'react';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { SendHorizontal } from 'lucide-react';

interface IChatbot {
  from?: string;
  question?: string;
  answer?: string;
}

const Chatbot = () => {
  const chatbotFaqs: IChatbot[] = useMemo(() => [
  { from: "chatbot", question: "Who created you?", answer: "I was created by Jorell Relleve using AI and web technologies to assist users like you!" },
  { from: "chatbot", question: "Are you an AI or a real person?", answer: "I'm an AI-powered chatbot — not a human, but I'm here to help like one!" },
  { from: "chatbot", question: "What can you do?", answer: "I can answer common questions, guide you through steps, and simulate conversations." },
  { from: "chatbot", question: "Do you store my data?", answer: "No, I don’t store any personal data. This chat is only used to assist you during your session." },
  { from: "chatbot", question: "Can you learn from our conversation?", answer: "In this demo, I don’t learn from chats. But some advanced AI bots can improve over time." },
  ], []);
  const [chats, setChats] = useState<IChatbot[]>([]);
  
  const handleQuestion = (qstn: string, aswr: string) => {
    setChats(prevMsg => [...prevMsg, {
      from: 'user', 
      message: qstn
    }]);
    setChats(prevMsg => [...prevMsg, {
      from: 'chatbot', 
      message: aswr
    }]);
  };

  
  return (
    <div className="w-full min-h-screen flex flex-col justify-start p-4 bg-zinc-950">
      <div className="w-full md:max-w-80 rounded-md h-[40rem] flex flex-col gap-y-2 overflow-auto">
          <ul className="flex flex-col divide-y divide-zinc-800 self-start border border-zinc-800 rounded-md">
          {chatbotFaqs.map((val, idx) => (
             <li key={idx}>
               <Button className={`w-[17rem] text-zinc-200 bg-zinc-900 active:bg-zinc-900/50 py-2 px-3 ${idx === 0 ? "rounded-t-md" : (idx === 4 ? "rounded-b-md"  : "")} break-words self-start text-start`} text={val.question} onClick={() => handleQuestion(val.question, val.answer)}/> 
             </li>
          ))}
          </ul>
          <div className="flex flex-col gap-y-2">
             {chats.map((chat, idx) => (
               <span key={idx} className={`rounded-md border ${chat?.from === "user" ? "border-emerald-800 bg-emerald-600 text-emerald-50 self-end" : "border-zinc-800 bg-zinc-900 text-zinc-200 self-start"} p-2 max-w-[15rem] break-words`}>{chat?.message}</span> 
             ))}
          </div>
      </div>
      <div className="w-full mt-2 md:max-w-80 flex gap-x-2">
        <Inputbox placeholder="Ask anything" />
        <Button className="p-2 rounded-md bg-emerald-500 text-emerald-50 mb-2 h-full" icon={<SendHorizontal />} />
      </div> 
    </div>
    );
};


export default Chatbot;