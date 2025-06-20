import { Request, Response } from 'express';

const authSender = (req: Request, res: Response) => {
  const username = (req.user as any)._doc?.username ?? (req?.user as any)?.displayName;
  const userId = (req.user as any)._doc?._id
  res.status(200).json({ authenticated: true, id: userId, username: username });
}

export default authSender;