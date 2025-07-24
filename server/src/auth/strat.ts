import passport from 'passport';
import { Profile as GoogleProfile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubSrategy, Profile as GithubProfile} from 'passport-github2'
import dotenv from 'dotenv';
import User from '../models/user';
dotenv.config();

type Done = (error: any, user?: Express.User | false, info?: any) => void;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}, (accessToken: string, refreshToken: string, profile: GoogleProfile, done) => {
  return done(null, profile);
}));

passport.use(new GithubSrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: process.env.GITHUB_CALLBACK_URL || '', 
}, (accessToken: string, refreshToken: string, profile: GithubProfile, done: Done) => {
  return done(null, profile)
}));

passport.use(new LocalStrategy({
  usernameField: 'username', 
  passwordField: 'password'
}, async (username: string, password: string, done: Done) => {
  try{
    const userData = await User.findOne({ username: username }, { username: 1, password: 1})
    if(!userData) throw new Error ("User doesn't exist")
    const isCorrect = await userData.validateCredentials(password, username);
    if(isCorrect){
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
