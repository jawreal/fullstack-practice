import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const token = req?.cookies?.token
    if(!token) throw new Error("No token")
    const decoded = await jwt.verify(token, SECRET);
    next();
  }catch(err){
    next(err);
  }
}

export default verifyToken;