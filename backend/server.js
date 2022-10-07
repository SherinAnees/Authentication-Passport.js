const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//DB connection
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database  Connected");
  }
);

require("./passportConfig").passport;
//Middileware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(cookieParser());
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/userRoutes"));
// app.post("/login", (req, res, next) => {
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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
