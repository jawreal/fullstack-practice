import { useState, useCallback } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import { useAuthContext } from '../hooks/useAuthProvider';
import { User, Lock } from 'lucide-react';
import GoogleLogo from '../assets/GoogleLogo'
import GitHubLogo from '../assets/GitHubLogo'

type ResultType = {
  message?: string;
}


const SignIn = () => {
  const { refetch } = useAuthContext();
  const [data, setData] = useState<{ username: string; password: string }>({
    username: "", 
    password: "", 
  });
  
  const handleUsername = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prevData => ({
     ...prevData, 
     username: e.target.value
    }))
  }, [])
  
  const handlePass = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prevData => ({
     ...prevData, 
     password: e.target.value
    }))
  }, [])
  
  const handleSubmit = useCallback(async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try{
      const result = await fetch('http://localhost:3000/server/sign-in', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify(data), 
        credentials: 'include', 
      });
      const jsonData: ResultType = await result.json() 
      if (result.status === 200){
        refetch();
        //console.log(jsonData)
        //navigate('/home', { replace: true })
      }else{
        console.log("Message", jsonData)
        return 
      }
    }catch(err){
      console.log("Error occured", err)
    }
  }, [data])
  
  const handleGoogileSignin = useCallback(async () => {
    window.location.href = 'http://localhost:3000/server/auth/google';
  }, [])
  
  const handleGithubSignin = useCallback(async () => {
    window.location.href = 'http://localhost:3000/server/auth/github';
  }, [])
  return(
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-emerald-950 flex md:flex-row flex-col justify-center items-center gap-y-3 relative">
       <form onSubmit={handleSubmit} className="w-full max-w-80 bg-zinc-900 border border-zinc-800 rounded-md flex flex-col items-center p-3 gap-y-3">
           <span className="text-zinc-200 font-medium text-2xl">Sign in</span>
           <Inputbox placeholder="Type your username" icon={<User className="w-6 h-6 text-zinc-600" />} value={data?.username} onChange={handleUsername}/>
           <Inputbox placeholder="••••••••••••••" icon={<Lock className="w-6 h-6 text-zinc-600" />} type="password" toggleType={true} value={data?.password} onChange={handlePass} />
           <Button className="rounded-md p-2 bg-emerald-800 text-emerald-50 font-medium w-full p-3 active:bg-emerald-900" text="Sign In" type="submit" />
           <div className="bg-zinc-800 w-full h-px my-2"></div>
           <Button className="rounded-md p-2 bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium w-full p-3 active:bg-zinc-700 active:bg-zinc-600 flex justify-center items-center gap-x-2" text="Continue with Google" icon={<GoogleLogo />} onClick={handleGoogileSignin}/>
           <Button className="rounded-md p-2 bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium w-full p-3 active:bg-zinc-700 active:bg-zinc-600 flex justify-center items-center gap-x-2" text="Continue with Github" icon={<GitHubLogo />} onClick={handleGithubSignin}/>
       </form>
    </div>
    );
};

export default SignIn;