const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./routes/index");

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

require("./passport/localStrategy")(passport);
require("./passport/googleStrategy")(passport);
//require("./passport/githubStratergy")(passport);

//DB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

//Routes
app.use("/", routes);
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
