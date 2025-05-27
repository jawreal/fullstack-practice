import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const checkUserData = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    res.status(401).send('Fill all the fields');
    return 
  }
  next();
}
export default checkUserData;