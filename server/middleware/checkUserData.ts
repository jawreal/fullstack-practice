import { Request, Response, NextFunction } from 'express';

const checkUserData = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if(!username || !password) {
    res.status(400).send("Username and Password required");
    return 
  }
  next();
};

export default checkUserData;