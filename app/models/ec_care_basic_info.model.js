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

BasicInfo.updateById = (id, newBasicInfo, result) => {
  sql.query(
    `UPDATE ec_care_basic_info SET name = ?, dateOfVisit = ?, 
    phone = ?, birthday = ?, gender = ?, address = ?, companyName = ?, 
    others = ?, referredBy = ?, dateRequested = ?, updated_at = ? WHERE id = ?`,
    [
      newBasicInfo.name,
      newBasicInfo.dateOfVisit,
      newBasicInfo.phone,
      newBasicInfo.birthday,
      newBasicInfo.gender,
      newBasicInfo.address,
      newBasicInfo.companyName,
      newBasicInfo.others,
      newBasicInfo.referredBy,
      newBasicInfo.dateRequested,
      newBasicInfo.updated_at,
      id,
    ],
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

      console.log("Updated Basic Info: ", { id: id, newBasicInfo });
      result(null, { id: id, ...newBasicInfo });
    }
  );
};

module.exports = BasicInfo;
