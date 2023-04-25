const { google } = require("googleapis");
const Google = require("../models/ec_care_google.model");
const User = require("../models/ec_care_user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const MAX_PAGE_SIZE = 1000;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

exports.googleLogin = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);
};

exports.googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      res.status(400).send("Code is required");
      return;
    }
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const fileList = await getFileList(drive);
    res.send(`Files: ${fileList.join(", ")}`);
  } catch (error) {
    console.error("Error retrieving files: ", error);
    res.status(500).send("Error retrieving files");
  }
};

async function getFileList(drive) {
  const fileList = [];
  let pageToken = null;
  do {
    const response = await drive.files.list({
      pageSize: MAX_PAGE_SIZE,
      fields: "nextPageToken, files(name)",
      pageToken,
    });
    const files = response.data.files;
    if (files && files.length) {
      files.forEach((file) => fileList.push(file.name));
    }
    pageToken = response.data.nextPageToken;
  } while (pageToken);
  return fileList;
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const google = new Google({
    user_id: req.body.user_id,
    aud: req.body.aud,
    azp: req.body.azp,
    email: req.body.email,
    email_verified: req.body.email_verified,
    exp: req.body.exp,
    family_name: req.body.family_name,
    given_name: req.body.given_name,
    hd: req.body.hd,
    iat: req.body.iat,
    iss: req.body.iss,
    jti: req.body.jti,
    name: req.body.name,
    ndf: req.body.ndf,
    sub: req.body.sub,
    updated_at: null,
    deleted_at: null,
  });

  Google.create(google, (err, data) => {
    {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating Google Info.",
        });
      else res.send(data);
    }
  });
};

exports.login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      message: "Email is required",
    });
  }
  try {
    const data = await User.findEmail(email);
    if (!data) {
      return res.status(401).send({
        message: "Invalid Email.",
      });
    }

    const token = jwt.sign(
      { userId: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: data.exp }
    );

    return res.status(200).send({
      token,
    });
  } catch (error) {
    if (error.kind === "not_found") {
      exports.register(req, res);
    } else {
      return res.status(500).send({
        message: "Error retrieving User with email: " + email,
      });
    }
  }
  // User.findEmail(email, async (err, data) => {
  //   if (err) {
  //     if (err.kind === "not_found") {
  //       exports.register(req, res);
  //     } else {
  //       return res.status(500).send({
  //         message: "Error retrieving User with email: " + email,
  //       });
  //     }
  //   }

  //   if (!data) {
  //     return res.status(401).send({
  //       message: "Invalid Email.",
  //     });
  //   }

  //   const token = jwt.sign(
  //     { userId: data.id, email: data.email },
  //     process.env.JWT_SECRET,
  //     { expiresIn: data.exp }
  //   );

  //   return res.status(200).send({
  //     token,
  //   });
  // });
};

exports.register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      message: "All fields are required.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(process.env.GOOGLE_LOGIN_PASS, 16);
    const user = new User({
      firstName: req.body.given_name,
      lastName: req.body.family_name,
      middleName: req.body.middleName,
      username: req.body.username,
      email: email,
      emailVerifiedAt: req.body.email_verified,
      password: hashedPassword,
      exp: req.body.exp,
      userType: "patient",
      status: 1,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      authBy: 0,
      loginType: "google",
    });

    const handleUserReg = async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          const createUser = await User.create(user);
          exports.googleRegister(req, res, { user_id: createUser.id });
        } else {
          return res.status(500).send({
            message: "Error User Registration.",
          });
        }
      } else {
        return res.status(400).send({
          message: "Email already in use.",
        });
      }
    };

    User.findUsernameOrEmail(user, handleUserReg);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while creating a new User.",
    });
  }
};

exports.googleRegister = async (req, res, options) => {
  const { email } = req.body;

  if (!email || !options.user_id) {
    return res.status(400).send({
      message: "All Fields are required.",
    });
  }

  try {
    const newGoogle = new Google({
      user_id: options.user_id,
      aud: req.body.aud,
      azp: req.body.azp,
      email: email,
      email_verified: req.body.email_verified,
      exp: req.body.exp,
      family_name: req.body.family_name,
      given_name: req.body.given_name,
      hd: req.body.hd,
      iat: req.body.iat,
      iss: req.body.iss,
      jti: req.body.jti,
      name: req.body.name,
      picture: req.body.picture,
      ndf: req.body.ndf,
      sub: req.body.sub,
      updated_at: null,
      deleted_at: null,
    });

    const handleResult = async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          await Google.create(newGoogle);
          exports.login(req, res);
        } else {
          return res.status(500).send({
            message: "Error User Registration.",
          });
        }
      } else {
        return res.status(400).send({
          message: "Email already in Use.",
        });
      }
    };

    Google.findEmail(email, handleResult);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred why creating a new Google Account.",
    });
  }
};
