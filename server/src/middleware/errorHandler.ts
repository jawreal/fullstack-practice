import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error, 
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("an Error occured")
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;