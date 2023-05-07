const sql = require("./db");

const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.middleName = user.middleName;
  this.username = user.username;
  this.email = user.email;
  this.emailVerifiedAt = user.emailVerifiedAt;
  this.password = user.password;
  this.rememberToken = user.rememberToken;
  this.exp = user.exp;
  this.userType = user.userType;
  this.status = user.status;
  this.createdAt = user.createdAt;
  this.updatedAt = user.updatedAt;
  this.deletedAt = user.deletedAt;
  this.authBy = user.authBy;
  this.loginType = user.loginType;
};

User.create = (newUser) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO ec_care_user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
        return;
      }

      console.log("Created user: ", {
        id: res.insertId,
        ...newUser,
      });
      resolve({ id: res.insertId, ...newUser });
    });
  });
};

User.findEmail = (email, result) => {
  sql.query(
    `SELECT * FROM ec_care_user WHERE email = ?`,
    [email],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found User email: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.findUsernameOrEmail = (newUser, result) => {
  sql.query(
    "SELECT * FROM ec_care_user WHERE username = ? OR email = ? ",
    [newUser.username, newUser.email],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found User Username or Email: ", res);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.getAll = (result) => {
  sql.query("SELECT * FROM ec_care_user", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Patient list: ", res);
    result(null, res);
  });
};

module.exports = User;
