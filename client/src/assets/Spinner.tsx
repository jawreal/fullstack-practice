import { memo } from 'react';

const Spinner = ({ size, color = "border-4 border-emerald-500" }: { size: string; color?: string | undefined; }) => {
  return (
    <>
      <div className={`${size} ${color} border-t-transparent rounded-full animate-spin`}></div>
    </>
  );
};

export default memo(Spinner);
