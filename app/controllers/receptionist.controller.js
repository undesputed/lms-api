const Receptionist = require("../models/ec_care_receptionist.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Both email and password are required.",
    });
  }

  Receptionist.findEmail(email, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `User Not found with email: ${email}`,
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving User with Email " + email,
        });
      }
    }

    if (!data) {
      return res.status(401).send({
        message: "Invalid username or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid Username or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: data.id,
        email: data.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 * 1000 }
    );

    res.set("Authorization", `${token}`);

    res.cookie("token", token, {
      httpOnly: true, // Ensures the cookie is accessible only by the server
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expiry time for the cookie (1 hour in this example)
    });

    return res.status(200).send({
      token,
    });
  });
};

exports.register = async (req, res) => {
  const { firstName, lastName, middleName, username, email, password } =
    req.body;

  const expirationDate = new Date();
  const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds
  const expirationValue = expirationDate.getTime() + sessionDuration;

  if (
    !firstName ||
    !lastName ||
    !middleName ||
    !username ||
    !email ||
    !password
  ) {
    return res.status(400).send({
      message: "All fields are required.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 16);
    const newReceptionist = new Receptionist({
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      username: username,
      email: email,
      emailVerifiedAt: 1,
      password: hashedPassword,
      rememberToken: 1,
      exp: expirationValue,
      userType: "admin",
      status: 1,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      authBy: 0,
      loginType: "receptionist",
    });

    const handleReceptionistReg = async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          await Receptionist.create(newReceptionist);
          res.send({
            message: "Registration Successful.",
          });
        } else {
          return res.status(500).send({
            message: "Error User Registration. ",
          });
        }
      } else {
        return res.status(400).send({
          message: "Username or email already in use.",
        });
      }
    };

    Receptionist.findEmail(email, handleReceptionistReg);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while registering the user. ",
    });
  }
};
