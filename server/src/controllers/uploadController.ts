import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises'
import extractTextFromPdf from '../helpers/parsePdf';
import extractTextFromDocs from '../helpers/parseDocs';

const uploadController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const file = req?.file;
    if(!file) res.status(401).send("File is missing");
    const extention: string | undefined = file?.originalname?.split(".").pop();
    console.log(file?.originalname) 
    const buffer = await fs.readFile(file!.path);
    if(extention === "docx" || extention === "doc"){
      const docxText = await extractTextFromDocs(buffer ?? null)
      console.log("Doc text: ", docxText)
      res.status(200).json({ fileText: docxText });
    }else if(extention === "pdf"){
      const pdfText = await extractTextFromPdf(buffer ?? null)
      console.log("Pdf text", pdfText);
      res.status(200).json({ fileText: pdfText });
    }
  }catch(err){
    next(err)
  }
};

export default uploadController;