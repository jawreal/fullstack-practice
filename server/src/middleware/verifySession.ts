import { Request, Response, NextFunction } from 'express';

const verifySession = (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.session.id)
  if(!(req.session as any).isAuthenticated){
    res.status(401).json({ authenticated: false })
    return 
  }
  next();
};

export default verifySession;