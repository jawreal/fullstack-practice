import express from 'express';
import signin from '../controllers/signin';
import signout from '../controllers/signout';
import authSender from '../controllers/authSender';
import test from '../controllers/test';
import checkUserData from '../middleware/checkUserData';
//import verifyToken from '../middleware/verifyToken'; this is for JWT token based auth
import verifySession from '../middleware/verifySession'; 
const router = express.Router();

router.post('/sign-in', checkUserData, signin);
router.post('/sign-out', signout);
router.get('/api/auth-check', verifySession, authSender)
router.get('/test', test)

export default router;