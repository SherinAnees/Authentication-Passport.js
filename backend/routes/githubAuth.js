const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/github", passport.authenticate("github"));

const clientUrl = process.env.CLIENT_URL_DEV;

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5000/api",
    session: false,
  }),
  (req, res) => {
    res.redirect(clientUrl);
  }
);

module.exports = router;
