import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const googleAuth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      Client.findOrCreate({ googleId: profile.id }, (err, client) => {
        return cb(err, client);
      });
    },
  ),
);
