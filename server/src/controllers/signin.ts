import { Request, Response } from 'express';
import { Session } from 'express-session';
import { comparePassword } from '../auth/hash';
import { CustomSession } from '../shared/session';
import User from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

interface Info {
  username: string;
  password: string;
}

const signin = async (req: Request<{}, {}, Info>, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try{
    const user = await User.findOne({ username: username }, {_id: 0, username: 1, password: 1})
    if(!user) throw new Error ("User doesn't exist")
    //console.log("User data", user)
    const isCorrect = await comparePassword(password, user?.password);
    if(isCorrect && username === user?.username){
      console.log("Correct credentials");
      const session = req.session as Session & CustomSession;
      session.isAuthenticated = true;
      session.username = username;
      res.status(200).json({ authenticated: true })
      return 
    }
    res.status(401).json({ authenticated: false }) 
  }catch(err){
    console.error("Error in sign-in", err)
    res.status(401).json({ authenticated: false });
  }
}

export default signin;