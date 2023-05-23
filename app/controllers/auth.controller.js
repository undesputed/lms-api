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
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).send({
      message: "All fields are required.",
    });
  }

  try {
    //Has the password
    const hashedPassword = await bcrypt.hash(password, 16);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      phone: req.body.phone,
      address: req.body.address,
      sex: req.body.sex,
      age: req.body.age,
      birthday: new Date(req.body.birthday)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      username: email,
      email: email,
      emailVerifiedAt: 1,
      password: hashedPassword,
      rememberToken: 1,
      exp: 1,
      userType: "patient",
      loginType: "patient",
      authBy: 0,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      status: 1,
    });

    const handleResult = async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          User.create(newUser, (error, result) => {
            if (error) {
              res.status(500).send({
                message:
                  error.message || "Some error occurred while registration. ",
              });
            } else {
              res.send({
                message: "Registration Successful.",
              });
            }
          });
        } else {
          return res.status(500).send({
            message: "Error User Registration.",
          });
        }
      } else {
        return res.status(409).send({
          message: "Email or email already in use.",
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

exports.updatePassword = (req, res) => {
  const { email, oldPass, newPass, confirmPass } = req.body;

  if (!email || !oldPass || !newPass || !confirmPass) {
    return res.status(400).send({
      message: "All fields is required!",
    });
  }

  //Check if the email exists
  User.findEmail(email, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `User Not found with Email: ${email}`,
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving Patient with email " + email,
        });
      }
    }

    if (!data) {
      return res.data(401).send({
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPass, data.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }

    //Check if the newPass and confirmPass if equal
    if (newPass !== confirmPass) {
      return res.status(401).send({
        message: "Password does not match!!",
      });
    }

    //Update the password with the new password by email
    const hashedNewPassword = await bcrypt.hash(newPass, 16);

    User.updatePassByEmail(email, hashedNewPassword, (error, updateData) => {
      if (error) {
        return res.status(500).send({
          message: error.message || "Some error occurred while updating. ",
        });
      } else {
        return res.status(200).send(updateData);
      }
    });
  });
};
