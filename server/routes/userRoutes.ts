import express from 'express';
import useLogin from '../controllers/useLogin';
import checkUserData from '../middleware/checkUserData';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();

router.post('/login', checkUserData, useLogin);
router.get('/api/auth-check', verifyToken)

export default router;