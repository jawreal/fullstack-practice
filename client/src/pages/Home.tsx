import { useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthProvider';
import Button from '../components/Button';

const Home = () => {
  const { userData, refetch } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = useCallback(async(e: FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try{
      const result = await fetch('http://localhost:3000/server/sign-out' , {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        }, 
        credentials: 'include', 
      });
      console.log(result)
      if (result.status === 200) refetch();
    }catch(err){
      console.error(err)
    }
  }, [])
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-emerald-950 flex md:flex-row flex-col justify-center items-center gap-y-3"> 
       <form onSubmit={handleSubmit} className="w-72 flex flex-col gap-y-3">
         <span className="text-zinc-200 text-2xl">{`Welcome ${userData?.username ?? "Guest"}`}</span>
         <Button className="rounded-md p-2 bg-emerald-800 text-emerald-50 font-medium w-full p-3 active:bg-emerald-900" text="Sign Out" type="submit" />
       </form>
    </div>
    );
};

export default Home;