import { Request, Response } from 'express';
import { hashPassword } from '../auth/hash';
import User from '../models/user';

const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, confirm_pass } = req?.body;
  const hashResult = await hashPassword(confirm_pass);
  try{
    const user = new User({ username: username, password: hashResult });
    await user.save();
    //const user = await User.find();
    console.log("Success sign-up")
    res.status(200).json({ success: true }); 
  }catch(error){
    res.status(401).json({ success: false }); 
  }
};

export default signup;