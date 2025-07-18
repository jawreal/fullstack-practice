import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import type { FormEvent, ChangeEvent } from 'react';
import Button from '../components/Button';

const SendFile = () => {
  const [fileName, setName] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFile(prevFile => e.target.files[0]);
    setName(prevName => e.target.files[0]?.name);
  }, []);
  
  const removeFile = useCallback(() => {
    setFile(prevFile => null);
    setName(prevFile => null);
    setText(prevText => null);
  }, []);
  
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!file) return;  
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
    const result = await fetch('http://localhost:3000/server/upload-file', {
      method: 'POST',
      body: formData,
    });

    const data = await result.json();
    setText(data.fileText);
    } catch (err) {
      console.error(err);
    }
  }, [file]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-emerald-950 flex md:flex-row flex-col justify-center items-center gap-y-3 p-5"> 
       <form name="sendFile" className="w-full md:w-[25rem] flex flex-col gap-y-3" onSubmit={handleSubmit}>
         <label htmlFor="fileSender" className="p-2 rounded-md border border-zinc-800 text-zinc-200 w-full text-center bg-zinc-900">Upload File</label>
         {fileName && <div className="w-full flex gap-x-2">
           <span className="p-2 rounded-md border border-dashed border-zinc-800 text-zinc-200 w-full text-center">{fileName}</span>
           <Button className="p-2 text-emerald-50 bg-emerald-600 rounded-md active:bg-emerald-700" icon={<X size={22} />} onClick={removeFile} />
         </div>}
         <input type="file" id="fileSender" accept=".doc,.docx,.pdf" onChange={handleChange} className="hidden"/>
         <Button className={`p-2 bg-emerald-600 text-emerald-50 rounded-md font-medium ${!file ? "bg-emerald-800 text-emerald-300" : "active:bg-emerald-700"}`}type="submit" text="Submit File" />
         {text && <div className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2">
            <span className="text-zinc-200">{text}</span>
         </div>}
       </form>
    </div>
    );
};

export default SendFile;