const express = require("express");
const router = express.Router();
//login page
router.get("/login", (req, res) => res.send("login"));
//register page
router.get("/signup", (req, res) => res.send("Sign up"));

module.exports = router;
