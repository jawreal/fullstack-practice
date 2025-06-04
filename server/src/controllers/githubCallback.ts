import { Request, Response } from 'express';
import passport from 'passport';

const githubCallback = [
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:5173/sign-in'
  }),
  (_req: Request, res: Response) => {
    /*const session = req.session as Session & CustomSession;
    session.isAuthenticated = true;*/
    res.redirect('http://localhost:5173/home');
  }
];
export default githubCallback;