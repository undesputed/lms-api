const sql = require("./db");

const RequestForm = function (requestForm) {
  this.user_id = requestForm.user_id;
  this.dateOfVisit = requestForm.dateOfVisit;
  this.status = requestForm.status;
  this.authBy = requestForm.authBy;
  this.receivedBy = requestForm.receivedBy;
  this.releasedBy = requestForm.releasedBy;
  this.releaseDate = requestForm.releaseDate;
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

      console.log("Created Request Form: ", {
        id: res.insertId,
        ...newRequestForm,
      });
      result(null, [{ id: res.insertId, ...newRequestForm }]);
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

RequestForm.findUserByIdStatus = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_request_form WHERE id = ${id} AND status = 1`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        result;
      }

      if (res.length) {
        console.log("Found Pending Request: ", res[0]);
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

RequestForm.findRequestByUserId = (userId, result) => {
  sql.query(
    `SELECT * FROM ec_care_request_form WHERE user_id = ? AND status = 1`,
    [userId],
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

RequestForm.findAllRequestByUserId = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_request_form WHERE user_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = RequestForm;
