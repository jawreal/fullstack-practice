import { Request, Response } from 'express';
import { Session } from 'express-session';
import { CustomSession } from '../shared/session';
import passport from 'passport';

const googleCallback = [
  passport.authenticate('google', {
    failureRedirect: '/auth/failure'
  }),
  (req: Request, res: Response) => {
    const session = req.session as Session & CustomSession;
    session.isAuthenticated = true;
    res.redirect('http://localhost:5173/home');
  }
];
export default googleCallback;