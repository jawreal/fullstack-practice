import { memo, useState, useCallback } from 'react';
import type { KeyboardEvent, ChangeEvent, RefObject } from 'react';
import Button from './Button';
import { Eye, EyeOff } from 'lucide-react';

interface INPUTBOX_TYPE {
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  isTransparent?: boolean;
  value?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  ref?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  toggleType?: boolean;
};

const Inputbox = ({ placeholder, icon, type, isTransparent, value, onKeyDown, onChange, ref, toggleType }: INPUTBOX_TYPE) => {
  const [defType, setType] = useState<string | undefined>(type);
  const attributes: Partial<React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = {
    className: `${isTransparent ? `border-none outline-none bg-transparent py-2 text-zinc-200 flex-grow` : `bg-zinc-800 border text-zinc-200 focus:ring-1 border-zinc-700 focus:ring-emerald-500 focus:border-none focus:ring-emerald-600 outline-none focus:border-none w-full p-2 rounded-md ${icon ? "pl-11" : ""} mb-0`}`, 
    placeholder: placeholder ?? "",
    value: value ?? "", 
    onKeyDown: onKeyDown ?? ((_: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {}), 
    onChange: onChange ?? ((_: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {}), 
  }
  
  const changeType = useCallback(() => {
    if(!value) return;
    if (defType === "password" && value.trim()?.length > 0) {
      setType("text");
    } else {
      setType("password");
    }
  }, [defType, value])
  
  return (
    <div className={`relative ${isTransparent ? "flex-grow max-w-32" : "w-full"}`}>
      {type === "textarea" ? (
        <textarea {...attributes} rows={4} />
      ) : (
        <input ref={ref as RefObject<HTMLInputElement> | undefined} {...attributes} type={defType ?? "text"} />
      )}
       {icon && <span className="absolute left-0 pt-2 pl-3">{icon}</span>}
       {toggleType && <Button className="absolute right-0 bottom-0 pb-2 pr-2" icon={defType === "password" ? <Eye className="w-6 h-6 dark:text-zinc-600 text-zinc-400" /> : <EyeOff className="w-6 h-6 dark:text-zinc-600 text-zinc-400" />} onClick={changeType}/>}
    </div>
    );
};

export default memo(Inputbox);