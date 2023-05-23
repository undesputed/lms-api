const sql = require("./db");

const Receptionist = function (receptionist) {
  this.firstName = receptionist.firstName;
  this.lastName = receptionist.lastName;
  this.middleName = receptionist.middleName;
  this.username = receptionist.username;
  this.email = receptionist.email;
  this.emailVerifiedAt = receptionist.emailVerifiedAt;
  this.password = receptionist.password;
  this.rememberToken = receptionist.rememberToken;
  this.exp = receptionist.exp;
  this.userType = receptionist.userType;
  this.status = receptionist.status;
  this.createdAt = receptionist.createdAt;
  this.updatedAt = receptionist.updatedAt;
  this.deletedAt = receptionist.deletedAt;
  this.authBy = receptionist.authBy;
  this.loginType = receptionist.loginType;
};

Receptionist.create = (newReceptionist, result) => {
  sql.query(
    "INSERT INTO ec_care_receptionist SET ?",
    newReceptionist,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Receptionist: ", {
        id: res.insertId,
        ...newReceptionist,
      });
      result(null, { id: res.insertId, ...newReceptionist });
    }
  );
};

Receptionist.findEmail = (email, result) => {
  sql.query(
    `SELECT * FROM ec_care_receptionist WHERE email = ?`,
    [email],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Receptionists: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Receptionist.findById = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_receptionist WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Receptionists: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Receptionist;
