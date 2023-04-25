const sql = require("./db");

const EmployeeInfo = function (employeeInfo) {
  this.positionName = employeeInfo.positionName;
  this.departmentId = employeeInfo.departmentId;
  this.roleId = employeeInfo.roleId;
  this.dateStarted = employeeInfo.dateStarted;
  this.dateOfRegularization = employeeInfo.dateOfRegularization;
  this.employmentStatus = employeeInfo.employmentStatus;
  this.employmentType = employeeInfo.employmentType;
  this.alias = employeeInfo.alias;
  this.workEmail = employeeInfo.workEmail;
  this.basicSalary = employeeInfo.basicSalary;
  this.allowance = employeeInfo.allowance;
  this.status = employeeInfo.status;
  this.createdAt = employeeInfo.status;
  this.updatedAt = employeeInfo.updatedAt;
  this.authBy = employeeInfo.authBy;
};

EmployeeInfo.create = (newEmployeeInfo, result) => {
  sql.query(
    "INSERT INTO ec_care_employee_info SET ?",
    newEmployeeInfo,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Department: ", {
        id: res.insertId,
        ...newEmployeeInfo,
      });
      result(null, { id: res.insertId, ...newEmployeeInfo });
    }
  );
};
