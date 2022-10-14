const passport = require("passport");
const PassportLocalStrategy = require("passport-local").Strategy;
const Joi = require("joi");
const User = require("../models/User");
const loginSchema = require("./validators");

module.exports = function (passport) {
  passport.use(
    new PassportLocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        // const { error } = Joi.validationSchema.validate(req.body, loginSchema);
        // if (error) {
        //   return done(null, false, { message: error.details[0].message });
        // }

        try {
          const user = await User.findOne({ email: email.trim() });
          if (!user) {
            return done(null, false, { message: "Email does not exists." });
          }

          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User not found");
    cd(null, user);
  } catch (err) {
    console.log(err);
    cb(err, null);
  }
});
