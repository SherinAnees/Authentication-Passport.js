const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../passportConfig");
//login page

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in");
  res.send(200);
});

//register page
router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exist");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});
//get user
router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
