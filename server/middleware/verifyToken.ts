import { Request, Response } from 'express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

const verifyToken = (req: Request, res: Response) => {
  const token = req?.cookies?.token
  if(!token){
    res.status(401).json({ authenticated: false })
    return
  }
  try{
    const decoded = jwt.verify(token, SECRET);
    res.status(200).json({ authenticated: true })
  }catch{
    res.status(401).json({ authenticated: false })
  }
}

export default verifyToken;