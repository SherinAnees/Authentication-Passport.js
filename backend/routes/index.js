//import googleAuthRoutes from "./googleAuth.js";

const express = require("express");
const router = express.Router();
const localAuthRoutes = require("./localAuth");
const googleAuthRoutes = require("./googleAuth");
const githubAuthRoutes = require("./githubAuth");

router.use("/auth", localAuthRoutes);
router.use("/auth", googleAuthRoutes);
//router.use("/auth", githubAuthRoutes);
// fallback 404
router.use("/api", (req, res) =>
  res.status(404).json("No route for this path")
);

module.exports = router;
/*
routes:

GET /auth/google
GET /auth/google/callback

GET /auth/facebook
GET /auth/facebook/callback

POST /auth/login
POST /auth/register
GET /auth/logout

GET api/users/me
GET /api/users/feature

*/
