import express from 'express';
import useLogin from '../controllers/useLogin';
import { checkUserData } from '../middleware/checkUserData';
const router = express.Router();

router.post('/login', checkUserData, useLogin)

export default router;