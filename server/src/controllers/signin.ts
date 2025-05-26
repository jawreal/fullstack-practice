import { Request, Response } from 'express';
//import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

interface Info {
  username: string;
  password: string;
}

/*
JWT and cookie sending auth without using expressjs session 
const SECRET = process.env.JWT_SECRET as string;
const token = jwt.sign({ userId: 7 }, SECRET, {
  expiresIn: '1h',
});
  if(username === "jawreal23" && password === "070203"){
    res.cookie('token', token, {
    httpOnly: true, 
    secure: true, 
    sameSite: 'strict', 
    maxAge: 3600000
    });
    console.log("Correct data");
    res.status(200).json({ message: "Successully sign-in"}); 
   }else{
     res.status(401).send("Incorrect credentials")
  }*/

const signin = (req: Request<{}, {}, Info>, res: Response) => {
  console.log("sign-in works")
  const { username, password } = req.body;
  if(username === "jawreal" && password === "1234"){
    (req.session as any).isAuthenticated = true;
    res.status(200).json({ authenticated: true })
    return
  }
  res.status(401).json({ authenticated: false })
}

export default signin;