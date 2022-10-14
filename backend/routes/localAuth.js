const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../models/User");
const requireLocalAuth = require("../middleware/requireLocalAuth");
const registerSchema = require("../passport/validators");

//login route
router.post("/login", requireLocalAuth, (req, res) => {
  res.send(req.user);
});
//register route
router.post("/signup", async (req, res, next) => {
  // const { error } = registerSchema.validate(req.body);
  // if (error) {
  //   return res.status(422).send({ message: error.details[0].message });
  // }

  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: "Email is in use" });
    }

    try {
      const newUser = await new User({
        provider: "email",
        email,
        password,
        username,
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        res.json({ message: "User Created" }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});
//get user
router.get("/user", (req, res) => {
  res.send(req.user);
});
//logout
router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
