import express, { Express, Request, Response } from 'express';
import router from './routes/userRoutes';
const app: Express = express();
const PORT = 3000;

app.use('/myapp', router);

app.listen(PORT, () => {
  console.log("Listening in PORT ", PORT)
});