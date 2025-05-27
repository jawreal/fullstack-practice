import { Request, Response } from 'express';

const authSender = (req: Request, res: Response) => {
  res.status(200).json({ authenticated: true, username: (req.session as any).username });
}

export default authSender;