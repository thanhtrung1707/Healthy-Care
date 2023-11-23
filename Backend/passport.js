// passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userRouter from "./Routes/UserRoutes.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: "486960350131-ni59gvk4mdcjjaonglqijgvln21lkft2.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Tìm hoặc tạo người dùng trong cơ sở dữ liệu thông qua UserRoutes (giả sử UserRoutes chứa method tương ứng)
        let user = await userRouter.findOne({ googleId: profile.id });

        if (!user) {
          user = new userRouter({
            googleId: profile.id,
            email: profile.emails[0].value,
            // Các trường thông tin khác bạn muốn lưu trữ
          });
          await user.save(); // Gọi method tạo người dùng từ UserRoutes
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Thực hiện deserializeUser thông qua UserRoutes (nếu có phương thức tương ứng)
  userRouter.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
