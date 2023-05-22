const sql = require("./db");

const SubCategory = function (subCategory) {
  this.sub_category_name = subCategory.sub_category_name;
  this.price = subCategory.price;
  this.status = subCategory.status;
  this.authBy = subCategory.authBy;
  this.created_at = subCategory.created_at;
  this.updated_at = subCategory.updated_at;
  this.deleted_at = subCategory.deleted_at;
};

SubCategory.findAll = (result) => {
  sql.query(`SELECT * FROM ec_care_laboratory_sub_category`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Sub Category: ", res);
    result(null, res);
  });
  // return new Promise((resolve, reject) => {
  //   sql.query(
  //     `SELECT * FROM ec_care_laboratory_sub_category WHERE category_id = ?`,
  //     [category_id],
  //     (err, res) => {
  //       if (err) {
  //         console.log("Error: ", err);
  //         reject(err);
  //         return;
  //       }

  //       if (res.length) {
  //         console.log("Found Sub Category: ", res);
  //         resolve(res);
  //         return;
  //       }

  //       reject({ kind: "not_found" });
  //     }
  //   );
  // });
};

module.exports = SubCategory;
