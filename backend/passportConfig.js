const User = require("./models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { comparePassword } = require("./helper");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      if (!email || !passport) {
        done(new Error("Missing Credentials"), null);
      }
      const userDB = await User.findOne({ email });
      if (!userDB) throw new Error("User not found");
      const isValid = comparePassword(password, userDB.password);
      if (isValid) {
        console.log("Authenticated Successfully");
        done(null, userDB);
      } else {
        console.log("Failed to Authenticate");
        done(null, null);
      }
    }
  )
);

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       User.findOne({ email: email }, (err, user) => {
//         if (err) throw err;
//         if (!user) return done(null, false);
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });
//   passport.deserializeUser((id, cb) => {
//     User.findOne({ _id: id }, (err, user) => {
//       cb(err, user);
//     });
//   });
// };
