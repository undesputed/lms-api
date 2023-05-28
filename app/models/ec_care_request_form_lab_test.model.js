const sql = require("./db");

const RequestFormLabTest = function (requestFormLabTest) {
  this.request_form_id = requestFormLabTest.request_form_id;
  this.sub_category_id = requestFormLabTest.sub_category_id;
  this.status = requestFormLabTest.status;
  this.authBy = requestFormLabTest.authBy;
  this.created_at = requestFormLabTest.created_at;
  this.updated_at = requestFormLabTest.updated_at;
};

RequestFormLabTest.create = (newRequestFormLabTest, result) => {
  sql.query(
    "INSERT INTO ec_care_request_form_lab_test SET ?",
    newRequestFormLabTest,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created new Request Form Lab Test: ", {
        id: res.insertId,
        ...newRequestFormLabTest,
      });
      result(null, { id: res.insertId, ...newRequestFormLabTest });
    }
  );
};

RequestFormLabTest.findByRequestFormId = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_request_form_lab_test WHERE request_form_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Request Lab Test: ", res);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

RequestFormLabTest.getAll = (result) => {
  sql.query(`SELECT * FROM ec_care_request_form_lab_test`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Request Form Lab Test : ", res);
    result(null, res);
  });
};

RequestFormLabTest.getMaxLabTestByFormId = (id, result) => {
  sql.query(
    `SELECT *, COUNT(sub_category_id) as total_test FROM ec_care_request_form_lab_test WHERE request_form_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Request Form Labe test: ", res);
      result(null, res);
    }
  );
};

RequestFormLabTest.getAllLabTestByFormId = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_request_form_lab_test WHERE request_form_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Request Form Last Test: ", res);
      result(null, res);
    }
  );
};

module.exports = RequestFormLabTest;
