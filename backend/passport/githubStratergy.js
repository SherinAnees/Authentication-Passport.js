const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const User = require("../models/User");

// google strategy

module.exports = function (passport) {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          //const oldUser = await User.findOne({ email: profile.email });
          const oldUser = await User.findOne({ githubId: profile.id });
          if (oldUser) {
            return done(null, oldUser);
          }
        } catch (err) {
          console.log(err);
        }

        try {
          const newUser = await new User({
            provider: "github",
            githubId: profile.id,

            email: profile.email,
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
