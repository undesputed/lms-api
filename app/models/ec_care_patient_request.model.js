const sql = require("./db");

const PatientRequest = function (patientRequest) {
  this.user_id = patientRequest.user_id;
  this.sub_category_id = patientRequest.sub_category_id;
  this.todate = patientRequest.todate;
  this.birthDate = patientRequest.birthDate;
  this.age = patientRequest.age;
  this.sex = patientRequest.sex;
  this.address = patientRequest.address;
  this.others = patientRequest.others;
  this.requestedBy = patientRequest.requestedBy;
  this.remarks = patientRequest.remarks;
  this.status = patientRequest.status;
  this.authBy = patientRequest.authBy;
  this.created_at = patientRequest.created_at;
  this.updated_at = patientRequest.updated_at;
};

PatientRequest.create = (newPatientRequest, result) => {
  sql.query(
    "INSERT INTO ec_care_patient_request SET ?",
    newPatientRequest,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Patient Request: ", {
        id: res.insertId,
        ...newPatientRequest,
      });

      result(null, { id: res.insertId, ...newPatientRequest });
    }
  );
};

PatientRequest.findById = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_patient_request WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Patient Request: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

PatientRequest.getAll = (result) => {
  sql.query("SELECT * FROM ec_care_patient_request", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Patient Request: ", res);
    result(null, res);
  });
};

PatientRequest.updateStatus = (status, id, result) => {
  sql.query(
    "UPDATE ec_care_patient_request SET status = ? WHERE id = ?",
    [status, id],
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

      console.log("Updated Patient Request: ", {
        id: id,
        ...res,
      });
      result(null, { id: id, ...res });
    }
  );
};

module.exports = PatientRequest;
