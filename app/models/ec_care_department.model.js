const sql = require("./db");

const Department = function (department) {
  this.departmentName = department.departmentName;
  this.departmentDescription = department.departmentDescription;
  this.status = department.status;
  this.createdAt = department.createdAt;
  this.updatedAt = department.updatedAt;
  this.deletedAt = department.deletedAt;
  this.authBy = department.authBy;
};

Department.create = (newDepartment, result) => {
  sql.query(
    "INSERT INTO ec_care_department SET ? ",
    newDepartment,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Department: ", {
        id: res.insertId,
        ...newDepartment,
      });
      result(null, { id: res.insertId, ...newDepartment });
    }
  );
};

Department.findById = (id, result) => {
  sql.query(`SELECT * FROM ec_care_department WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Department: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Department.getAll = (name, result) => {
  let query = "SELECT * FROM ec_care_department";

  if (name) {
    query += ` WHERE departmentName LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Department: ", res);
    result(null, res);
  });
};

Department.updatedById = (id, department, result) => {
  sql.query(
    "UPDATE ec_care_department SET departmentName = ? , departmentDescription = ? , authBy = ? WHERE id = ?",
    [
      department.departmentName,
      department.departmentDescription,
      department.authBy,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        //not found Department with the id
        result({ kind: "not_found" });
        return;
      }

      console.log("Updated Department: ", { id: id, ...department });
      result(null, { id: id, ...department });
    }
  );
};

Department.remove = (id, result) => {
  sql.query("DELETE FROM ec_care_department WHERE id = ? ", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted Department with id: ", id);
    result(null, res);
  });
};

Department.removeAll = (result) => {
  sql.query("DELETE FROM ec_care_department", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} department`);
    result(null, res);
  });
};

module.exports = Department;
