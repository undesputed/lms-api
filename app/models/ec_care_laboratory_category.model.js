const sql = require("./db");

const Category = function (category) {
  this.category_name = category.category_name;
  this.authBy = category.authBy;
  this.status = category.status;
  this.created_at = category.created_at;
  this.updated_at = category.updated_at;
  this.deleted_at = category.deleted_at;
};

Category.create = (newCategory, result) => {
  sql.query(
    "INSERT INTO ec_care_laboratory_category SET ?",
    newCategory,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Laboratory Category: ", {
        id: res.insertId,
        ...newCategory,
      });
      result(null, { id: res.insertId, ...newCategory });
    }
  );
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

Category.updateNameById = (id, category_name, result) => {
  sql.query(
    "UPDATE ec_care_laboratory_category SET category_name = ?, updated_at = ? WHERE id = ?",
    [
      category_name,
      new Date().toISOString().slice(0, 19).replace("T", " "),
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({
          kind: "not_found",
        });
        return;
      }

      console.log("Update Category Name: ", { id: id, category_name });
      result(null, { id: id, category_name });
    }
  );
};

module.exports = Category;
