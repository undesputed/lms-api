const sql = require("./db");

const RequestForm = function (requestForm) {
  this.basic_info_id = requestForm.basic_info_id;
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
    `SELECT * FROM ec_care_request_form WHERE user_id = ${id} AND status = 1`,
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

RequestForm.findAllRequest = (result) => {
  sql.query(
    `SELECT 
    ec_care_request_form.*, 
    ec_care_user.firstName, 
    ec_care_user.lastName, 
    ec_care_user.middleName,
    ec_care_user.phone, 
    ec_care_user.address, 
    ec_care_user.sex, 
    ec_care_user.age, 
    ec_care_user.birthday 
    FROM 
    ec_care_request_form 
    INNER JOIN ec_care_user ON ec_care_user.id = ec_care_request_form.user_id
    ORDER BY ec_care_request_form.user_id desc`,
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

RequestForm.findAllRequestBasicInfo = (result) => {
  sql.query(
    `SELECT 
    * ,
    ec_care_request_form.status as form_status,
    ec_care_basic_info.id as info_id,
    ec_care_request_form.id as form_id
    FROM ec_care_request_form
    INNER JOIN 
    ec_care_basic_info 
    ON ec_care_basic_info.id = ec_care_request_form.basic_info_id
    ORDER BY ec_care_request_form.created_at DESC
    `,
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

RequestForm.findBasicInfoByRequestForm = (id, result) => {
  sql.query(
    `SELECT ec_care_basic_info.* FROM ec_care_request_form
    INNER JOIN ec_care_basic_info ON ec_care_basic_info.id = ec_care_request_form.basic_info_id
    WHERE ec_care_request_form.id = ${id}`,
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

      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

RequestForm.updateStatus = (id, result) => {
  sql.query(
    "UPDATE ec_care_request_form SET status = 2, updated_at = ? WHERE id = ?",
    [new Date().toISOString().slice(0, 19).replace("T", " "), id],
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

      console.log("Updated Request Form: ", { id: id });
      result(null, { id: id });
    }
  );
};

RequestForm.updateCompletedStatus = (id, result) => {
  sql.query(
    "UPDATE ec_care_request_form SET status = 3, updated_at = ? WHERE id = ?",
    [new Date().toISOString().slice(0, 19).replace("T", " "), id],
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

      console.log("Updated Request Form: ", { id: id });
      result(null, { id: id });
    }
  );
};

module.exports = RequestForm;
