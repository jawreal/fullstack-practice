import express from 'express';
import { query, body } from 'express-validator';
import signin from '../controllers/signin';
import signout from '../controllers/signout';
import signup from '../controllers/signup';
import authSender from '../controllers/authSender';
import googleAuth from '../controllers/googleAuth';
import githubAuth from '../controllers/githubAuth';
import googleCallback from '../controllers/googleCallback';
import githubCallback from '../controllers/githubCallback';
import googleFailure from '../controllers/googleFailure';
import test from '../controllers/test';
import checkUserData from '../middleware/checkUserData';
import passport from 'passport'
import verifySession from '../middleware/verifySession'; 
import '../auth/strat'
const router = express.Router();

router.post(
  '/sign-in',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  checkUserData,
  signin
);

router.post(
  '/sign-up',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  signup
);
router.post('/sign-out', checkUserData, signout);
router.get('/api/auth-check', verifySession, authSender)
router.get('/auth/google', googleAuth);
router.get('/auth/github', githubAuth);
router.get('/auth/google/callback', googleCallback);
router.get('/auth/github/callback', githubCallback);
router.get('/auth/failure', googleFailure);
router.get('/test', [query("person").notEmpty().escape()] , test)

export default router;