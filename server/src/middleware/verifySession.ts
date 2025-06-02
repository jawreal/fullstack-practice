import { Request, Response, NextFunction } from 'express';
import { CustomSession } from '../shared/session'
import { Session } from 'express-session';

const verifySession = (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.session.id)
  /*const session = req.session as Session & CustomSession;
  if(!session.isAuthenticated){
    res.status(401).json({ authenticated: false })
    return 
  }*/
  if(!req.isAuthenticated()) {
    res.status(401).json({ authenticated: false })
    return 
  }
  next();
};

export default verifySession;