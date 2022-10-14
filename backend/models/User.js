// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: false,
//   },
//   profileImg: {
//     type: String,
//     default:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model("User", UserSchema);

// module.exports = User;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      //required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },

    // google
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    // github
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    // fb
    // facebookId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

userSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// const delay = (t, ...vs) => new Promise(r => setTimeout(r, t, ...vs)) or util.promisify(setTimeout)

const hashPassword = async (password) => {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  });

  return hashedPassword;
};

// const validateUser = (user) => {
//   const schema = {
//     avatar: Joi.any(),
//     username: Joi.string().min(2).max(30),
//     name: Joi.string().min(2).max(30),
//     // username: Joi.string()
//     //   .min(2)
//     //   .max(20)
//     //   .regex(/^[a-zA-Z0-9_]+$/)
//     //   .required(),
//     password: Joi.string().min(6).max(20).allow("").allow(null),
//   };

//   return Joi.validate(user, schema);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
