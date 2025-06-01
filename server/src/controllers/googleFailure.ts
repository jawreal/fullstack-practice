import { Request, Response } from 'express';

const googleFailure = (_req: Request, res: Response) => {
  res.status(500).send('Google sign-in error');
};

export default googleFailure;