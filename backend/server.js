const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//Routes
app.use("/", require("./routes/user"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
