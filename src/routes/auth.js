const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
// Add New user
authRouter.post("/signup", async (req, res) => {
  // const user = new User({
  //     firstName:"prath",
  //     lastName:"Wade",
  //     emailId:"prath@gmail.com",
  //     password:"kedar@123",
  // });
  try {
    // validate data before signup
    validateSignUpData(req);
    // console.log(req.body);
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;
    // password incrption
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Fetch a single user
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Compare the password with the stored hash
    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      // create a jwt token
      const token = await user.getJWT();
      console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
      });
      res.send("User login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = authRouter;
