const sql = require("./db");

const RequestForm = function (requestForm) {
  this.user_id = requestForm.user_id;
  this.fullName = requestForm.fullName;
  this.dateOfVisit = requestForm.dateOfVisit;
  this.birthday = requestForm.birthday;
  this.age = requestForm.age;
  this.sex = requestForm.sex;
  this.address = requestForm.address;
  this.status = requestForm.status;
  this.authBy = requestForm.authBy;
  this.created_at = requestForm.created_at;
  this.updated_at = requestForm.updated_at;
};

RequestForm.create = (newRequestForm, result) => {
  sql.query(
    "INSERT INTO ec_care_request_form SET ?",
    newRequestForm,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Reqeust Form: ", {
        id: res.insertId,
        ...newRequestForm,
      });
      result(null, { id: res.insertId, ...newRequestForm });
    }
  );
};

RequestForm.findById = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_request_form WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Request Form: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

RequestForm.getAll = (result) => {
  sql.query(`SELECT * FROM ec_care_request_form`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Request Form: ", res);
    result(null, res);
  });
};

module.exports = RequestForm;
