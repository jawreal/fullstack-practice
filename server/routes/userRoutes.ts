import express, { Request, Response } from 'express';
import logger from '../middleware/logger';

const router = express.Router();
router.use(logger);

router.get('/user', (_req, res: Response ) => {
  console.log("Routes from router works /user route")
  res.json({ message: "Route from router folder from user route"});
});

router.get('/', (_req, res: Response ) => {
  console.log("Routes from router works default route")
  res.json({ message: "Route from router folder from default route"});
});

export default router;