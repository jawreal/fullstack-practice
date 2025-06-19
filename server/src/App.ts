import express, { Express, Request, Response } from 'express'; 
import passport from 'passport';
import morgan from 'morgan'
import router from './routes/userRoutes';
import dotenv from 'dotenv';
dotenv.config();   
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import errorHandler from './middleware/errorHandler';
import session from 'express-session';

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;
const distPath = path.join(__dirname, '../../client/dist');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET as string, 
  resave: false, 
  rolling: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    sameSite: 'strict', 
    maxAge: 1000 * 60 * 60,
  }, 
})); 
app.use(passport.session());

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected on mongodb atlas"))
  .catch((err) => console.error("Error on connecting in mongodb atlas", err));

// Static files middleware
app.use(express.static(distPath));

// API routes FIRST
app.use('/server', router);

// Catch-all route AFTER API routes (for React Router)
app.get('/*splat', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handler LAST
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening in PORT", PORT);
});