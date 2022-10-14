const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// google strategy

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          //const oldUser = await User.findOne({ email: profile.email });
          const oldUser = await User.findOne({ googleId: profile.id });

          if (oldUser) {
            //console.log(oldUser);
            return done(null, oldUser);
          }
        } catch (err) {
          console.log(err);
        }

        try {
          const newUser = await new User({
            provider: "google",
            googleId: profile.id,

            email: profile.emails,
            name: profile.displayName,
            avatar: profile.picture,
          }).save();
          done(null, newUser);
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
