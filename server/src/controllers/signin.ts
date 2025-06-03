import { Request, Response } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

type userData = {
  username: string;
}

const signin = (req: Request, res: Response,) => {
   passport.authenticate('local', (err: Error, user: userData | false) => {
     if(err) {
       res.status(404).json({ authenticated: false })
       return
     }
     
     req.login(user, (err) => {
      if (err) {
        res.status(500).send('Internal server error') 
        return
      }
      res.status(200).json({ authenticated: true });
     });
   })(req, res)
}
export default signin;