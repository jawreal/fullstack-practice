import { Request, Response } from 'express';

const test = (req: Request, res: Response) => {
  res.send(`Hello ${req.query.person}`)
}

export default test;