import passport from 'passport';

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export default googleAuth;