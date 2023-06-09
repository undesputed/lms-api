const sql = require("./db");

const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.middleName = user.middleName;
  this.phone = user.phone;
  this.address = user.address;
  this.sex = user.sex;
  this.age = user.age;
  this.birthday = user.birthday;
  this.username = user.username;
  this.email = user.email;
  this.emailVerifiedAt = user.emailVerifiedAt;
  this.password = user.password;
  this.rememberToken = user.rememberToken;
  this.exp = user.exp;
  this.userType = user.userType;
  this.status = user.status;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
  this.authBy = user.authBy;
  this.loginType = user.loginType;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO ec_care_user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created new Patient: ", {
      id: res.insertId,
      newUser,
    });
    result(null, {
      id: res.insertId,
      ...newUser,
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

User.findById = (id, result) => {
  sql.query(
    `SELECT 
    firstName,
    lastName,
    middleName,
    phone,
    address,
    sex,
    age,
    birthday,
    email,
    username
  FROM ec_care_user WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Patient; ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE ec_care_user SET firstName = ?, lastName = ?, middleName = ?, phone = ?, address = ?, sex = ?, age = ?, birthday = ?, updated_at = ? WHERE id = ? ",
    [
      user.firstName,
      user.lastName,
      user.middleName,
      user.phone,
      user.address,
      user.sex,
      user.age,
      user.birthday,
      user.updated_at,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" });
        return;
      }

      console.log("Update User: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.updateEmailById = (id, email, result) => {
  sql.query(
    "UPDATE ec_care_user SET email = ? WHERE id = ?",
    [email, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" });
        return;
      }

      console.log("Updated User: ", { id: id, email });
      result(null, { id: id, email });
    }
  );
};

User.updatePassByEmail = (email, newPassword, result) => {
  sql.query(
    "UPDATE ec_care_user SET password = ? WHERE email = ?",
    [newPassword, email],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" });
        return;
      }
      result(null, { email: email, password: newPassword });
    }
  );
};

module.exports = User;
