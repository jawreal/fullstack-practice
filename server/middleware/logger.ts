import { Request, Response, NextFunction } from 'express';

const logger = (_req: Request, _res: Response, next: NextFunction ) => {
  console.log("Middleware works")
  next();
}

export default logger;