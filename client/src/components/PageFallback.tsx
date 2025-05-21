import Spinner from '../assets/Spinner';

const PageFallback = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-zinc-950 via-zinc-950 to-emerald-950">
       <Spinner size="w-20 h-20" />
    </div>
    );
};


export default PageFallback;
