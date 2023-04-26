const sql = require("./db");

const Category = function (category) {
  this.category_name = category.category_name;
  this.authBy = category.authBy;
  this.status = category.status;
  this.created_at = category.created_at;
  this.updated_at = category.updated_at;
  this.deleted_at = category.deleted_at;
};

Category.create = (newCategory) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "INSERT INTO ec_care_laboratory_category SET ?",
      newCategory,
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          reject(err);
          return;
        }

        console.log("Created Laboratory Category: ", {
          id: res.insertId,
          ...newCategory,
        });
        resolve({ id: res.insertId, ...newCategory });
      }
    );
  });
};

Category.getAll = (name, result) => {
  let query = "SELECT * FROM ec_care_laboratory_category";
  if (name) {
    query += `WHERE category_name LIKE %${name}%`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Category: ", res);
    result(null, res);
  });
};

module.exports = Category;
