import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './Models/UserModel.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '486960350131-ni59gvk4mdcjjaonglqijgvln21lkft2.apps.googleusercontent.com',
      clientSecret: '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',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = profile._json;
        let user = await UserModel.findOne({ email });

        if (!user) {
          user = new User({ email, name });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
