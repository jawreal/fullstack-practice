import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

type Info = {
  username: string;
  password: string;
}

const SECRET = process.env.JWT_SECRET as string;
const token = jwt.sign({ userId: 7}, SECRET, {
  expiresIn: '1h',
});

const useLogin = (req: Request<{}, {}, Info>, res: Response) => {
  console.log("useLogin works")
  const { username, password } = req.body;
  if(username === "jawreal23" && password === "070203"){
    res.cookie('token', token, {
    httpOnly: true, 
    secure: true, 
    sameSite: 'strict', 
    maxAge: 3600000
    });
    console.log("Correct data");
    res.status(200).json({ message: "Successully login"}); 
   }else{
     res.status(401).send("Incorrect credentials")
  }
}

export default useLogin;