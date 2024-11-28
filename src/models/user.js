const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
      // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates email format
    },
    password: {
      type: String,
      require: true,
      minlength: 8, // Minimum password length
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","other"],
        message:`{VALUE} is not the valid gender type`
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Finternet--web%2Fweb-interface-flat%2F6606-male-user.html&psig=AOvVaw1lMHqqmRWOAj9LipF8GjC_&ust=1732721157696000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMj60r2n-okDFQAAAAAdAAAAABAE",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    about: {
      type: String,
      default: "This is Default about user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "MY@TINDER$19", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
