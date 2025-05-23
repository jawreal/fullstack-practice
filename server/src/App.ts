import express, { Express, Request, Response } from 'express';
import router from './routes/userRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
const app: Express = express();
const PORT = process.env.PORT || 5000;
dotenv.config(); 

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));
app.use(errorHandler);
//cors are always first before the routes 
app.use('/server', router);

app.listen(PORT, () => {
  console.log("Listening in PORT", PORT)
});