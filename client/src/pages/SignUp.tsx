import { useCallback, useState, useMemo } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { User, Lock, Shield } from 'lucide-react';

interface Data {
  username: string;
  create_pass: string;
  confirm_pass: string;
}

const SignUp = () => {
  const [errorData, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const [data, setData] = useState<Data>({
    username: "", 
    create_pass: "", 
    confirm_pass: "", 
  });
  
  const dataEmpty = useMemo(() => Object. values(data).some(value => value.trim().length === 0), [data])
  
  const handleUsername = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prevData => ({
     ...prevData, 
     username: e.target.value
    }));
  }
  const handleCreatePass = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prevData => ({
     ...prevData, 
     create_pass: e.target.value
    }))
  }
  const handleConfirmPass = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prevData => ({
     ...prevData, 
     confirm_pass: e.target.value
    }))
  }
  
  const submitData = useCallback(async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if(dataEmpty) {
      setError(true)
      return 
    }
    const { create_pass, ...signupData } = data;
    try{
      const result = await fetch('http://localhost:3000/server/sign-up', {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(signupData), 
        credentials: 'include'
      });
      const resData = await result.json();
      if(resData?.success){
        console.log("Successully sign up")
        setError(false)
        navigate('/sign-in', { replace: true });
      }else{
        console.log("Failed to sign-up")
      }
    }catch(err){
      console.log("Error", err)
    }
  }, [data, errorData])
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-emerald-950 flex md:flex-row flex-col justify-center items-center gap-y-3 relative">
       <form onSubmit={submitData} className="w-full max-w-80 bg-zinc-900 border border-zinc-800 rounded-md flex flex-col items-center p-3 gap-y-3">
           <span className="text-zinc-200 font-medium text-2xl">Sign Up</span>
           <Inputbox placeholder="Create username" icon={<User className="w-6 h-6 text-zinc-600"/>} value={data?.username} onChange={handleUsername} isError={errorData}/>
           <Inputbox placeholder="Create password" icon={<Lock className="w-6 h-6 text-zinc-600" />} type="password" toggleType={true} value={data?.create_pass} onChange={handleCreatePass} isError={errorData}/>
           <Inputbox placeholder="Confirm password" icon={<Shield className="w-6 h-6 text-zinc-600" />} type="password" toggleType={true} value={data?.confirm_pass} onChange={handleConfirmPass} isError={errorData}/>
           <Button className="rounded-md p-2 bg-emerald-800 text-emerald-50 font-medium w-full p-3 active:bg-emerald-900" text="Sign Up" type="submit"/>
       </form> 
    </div>
    );
};

export default SignUp;