import express, {Express, Request, Response } from 'express';
const app: Express = express();
const PORT = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: "Hello World"})
});

app.listen(PORT, () => {
  console.log("Listening in PORT ", PORT)
});