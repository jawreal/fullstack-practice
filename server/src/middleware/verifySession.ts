import { Request, Response, NextFunction } from 'express';
import { CustomSession } from '../shared/session'
import { Session } from 'express-session';

const verifySession = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.isAuthenticated())
  if(!req.isAuthenticated()) {
    res.status(401).json({ authenticated: false })
    return 
  }
  next();
};

export default verifySession;