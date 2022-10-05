const express = require("express");
const router = express.Router();
//login page
router.post("/login", (req, res) => {
  console.log(req.body);
});
//register page
router.post("/signup", (req, res) => {
  console.log(req.body);
});
//get user
//router.get("/user", (req, res) => {});

module.exports = router;
