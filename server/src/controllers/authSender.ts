import { Request, Response } from 'express';

const authSender = (req: Request, res: Response) => {
  const username = (req.session as any).username ?? (req?.user as any)?.displayName;
  res.status(200).json({ authenticated: true, username: username });
}

export default authSender;