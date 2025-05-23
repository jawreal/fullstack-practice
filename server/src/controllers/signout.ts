import { Request, Response } from 'express';


const signout = (_req: Request, res: Response) => {
  console.log("Cookie clear")
  res.clearCookie('token');
  res.status(200).send('sign out')
};

export default signout;