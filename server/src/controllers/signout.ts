import { Request, Response } from 'express';


const signout = (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if(err){
      console.log("Couldn't destroy the session")
      res.status(500).send("Couldn't signout")
      return
    }
    res.clearCookie('connect.sid');
    res.status(200).send('Signout')
  })
};

export default signout;