import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import { User, Lock, Shield } from 'lucide-react';

const SignUp = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-emerald-950 flex md:flex-row flex-col justify-center items-center gap-y-3 relative">
       <form className="w-full max-w-80 bg-zinc-900 border border-zinc-800 rounded-md flex flex-col items-center p-3 gap-y-3">
           <span className="text-zinc-200 font-medium text-2xl">Sign Up</span>
           <Inputbox placeholder="Create username" icon={<User className="w-6 h-6 text-zinc-600" />}/>
           <Inputbox placeholder="Create password" icon={<Lock className="w-6 h-6 text-zinc-600" />} type="password" toggleType={true}  />
           <Inputbox placeholder="Confirm password" icon={<Shield className="w-6 h-6 text-zinc-600" />} type="password" toggleType={true} />
           <Button className="rounded-md p-2 bg-emerald-800 text-emerald-50 font-medium w-full p-3 active:bg-emerald-900" text="Sign Up" type="submit" />
       </form> 
    </div>
    );
};

export default SignUp;