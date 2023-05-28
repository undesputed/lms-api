const sql = require("./db");

const BasicInfo = function (basicInfo) {
  this.name = basicInfo.name;
  this.dateOfVisit = basicInfo.dateOfVisit;
  this.phone = basicInfo.phone;
  this.birthday = basicInfo.birthday;
  this.gender = basicInfo.gender;
  this.address = basicInfo.address;
  this.companyName = basicInfo.companyName;
  this.others = basicInfo.others;
  this.referredBy = basicInfo.referredBy;
  this.dateRequested = basicInfo.dateRequested;
  this.status = basicInfo.status;
  this.authBy = basicInfo.authBy;
  this.created_at = basicInfo.created_at;
  this.updated_at = basicInfo.updated_at;
};

BasicInfo.create = (newBasicInfo, result) => {
  sql.query(
    "INSERT INTO ec_care_basic_info SET ? ",
    newBasicInfo,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created a new Basic Info: ", {
        id: res.insertId,
        ...newBasicInfo,
      });
      result(null, [{ id: res.insertId, ...newBasicInfo }]);
    }
  );
};

BasicInfo.getAll = (result) => {
  sql.query(`SELECT * FROM ec_care_basic_info`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Basic Info: ", res);
    result(null, res);
  });
};

module.exports = BasicInfo;
