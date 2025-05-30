import { Request, Response } from 'express';

const errorHandler = (
  err: Error, 
  _req: Request,
  res: Response,
) => {
  //console.log("an Error occured")
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;