import express, { Express, Request, Response } from 'express';
import router from './routes/userRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
const app: Express = express();
const PORT = process.env.PORT || 5000;
dotenv.config(); 

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'UPDATE', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
})) 
//cors are always first before the routes 
app.use('/server', router); 

app.listen(PORT, () => {
  console.log("Listening in PORT", PORT)
});