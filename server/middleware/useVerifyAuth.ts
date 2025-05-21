import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const useVerifyAuth = (_req: Request, _res: Response, next: NextFunction ) => {
  console.log("Middleware works")
  next();
}

export default logger;, 