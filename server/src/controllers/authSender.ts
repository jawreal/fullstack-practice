import { Request, Response } from 'express';

const authSender = (req: Request, res: Response) => {
  res.status(200).json({ authenticated: true });
}

export default authSender;