const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

const clientUrl = process.env.CLIENT_URL_DEV;

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5000/api",
    session: false,
  }),
  (req, res) => {
    res.redirect(clientUrl);
  }
);

module.exports = router;
