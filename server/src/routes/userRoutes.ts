import express from 'express';
import signin from '../controllers/signin';
import signout from '../controllers/signout';
import authSender from '../controllers/authSender';
import checkUserData from '../middleware/checkUserData';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();

router.post('/sign-in', checkUserData, signin);
router.post('/sign-out', signout);
router.get('/api/auth-check', verifyToken, authSender)

export default router;