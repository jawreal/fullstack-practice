import { memo } from 'react';

interface IMAGE_TYPE{
  url: string | null | undefined;
  className: string;
}

const Image = ({ url, className }: IMAGE_TYPE) => {
  return (
    <>
     {url && <img src={url} alt="img" className={className}/>} 
    </>
    );
};

export default memo(Image);