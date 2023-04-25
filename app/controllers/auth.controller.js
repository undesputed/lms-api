const User = require("../models/ec_care_user.model");
const moment = require("moment");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { google } = require("googleapis");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Both email and password are required.",
    });
  }

  User.findEmail(email, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `User Not found with username: ${email}.`,
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving User with username " + email,
        });
      }
    }

    if (!data) {
      return res.status(401).send({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userId: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.set("Authorization", `Bearer ${token}`);

    return res.status(200).send({
      token,
    });
  });
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send({
      message: "All fields are required.",
    });
  }

  try {
    //Has the password
    const hashedPassword = await bcrypt.hash(password, 16);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const handleResult = async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          await User.create(newUser);

          res.send({
            message: "Registration Successful.",
          });
        } else {
          return res.status(500).send({
            message: "Error User Registration.",
          });
        }
      } else {
        return res.status(409).send({
          message: "Username or email already in use.",
        });
      }
    };

    User.findUsernameOrEmail(newUser, handleResult);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while registering the user.",
    });
  }
};
