import passport from 'passport';
import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';
import { comparePassword } from '../auth/hash';
import User from '../models/user';
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}, (accessToken: string, refreshToken: string, profile: Profile, done) => {
  return done(null, profile);
}));

passport.use(new LocalStrategy({
  usernameField: 'username', 
  passwordField: 'password'
}, async (username: string, password: string, done: (error: any, user?: Express.User | false, info?: any) => void) => {
  try{
    const userData = await User.findOne({ username: username }, {_id: 0, username: 1, password: 1})
    
    if(!userData) throw new Error ("User doesn't exist")
    
    const isCorrect = await comparePassword(password, userData?.password);
    if(isCorrect && username === userData?.username){
      const { password, _id, ...user } = userData;
      return done(null, user, { authenticated: true })
    }else{
      throw new Error ("Incorrect password");
    }
  }catch(err){
    return done(err)
  }
}))


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
