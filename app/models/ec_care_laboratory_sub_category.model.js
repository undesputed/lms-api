const sql = require("./db");

const SubCategory = function (subCategory) {
  this.category_id = subCategory.category_id;
  this.sub_category_name = subCategory.sub_category_name;
  this.price = subCategory.price;
  this.status = subCategory.status;
  this.authBy = subCategory.authBy;
  this.created_at = subCategory.created_at;
  this.updated_at = subCategory.updated_at;
  this.deleted_at = subCategory.deleted_at;
};

SubCategory.create = (subCategory, result) => {
  sql.query(
    "INSERT INTO ec_care_laboratory_sub_category SET ?",
    subCategory,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created SubCategory: ", {
        id: res.insertId,
        ...subCategory,
      });
      result(null, { id: res.insertId, ...subCategory });
    }
  );
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
};

SubCategory.updateSubCategory = (id, name, price, result) => {
  sql.query(
    "UPDATE ec_care_laboratory_sub_category SET sub_category_name = ?, price = ?, updated_at = ? WHERE id = ?",
    [name, price, new Date().toISOString().slice(0, 19).replace("T", " "), id],
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

      console.log("Updated Sub Category: ", {
        id: id,
        sub_category_name: name,
        price: price,
      });
      result(null, { id: id, sub_category_name: name, price: price });
    }
  );
};

SubCategory.updateNameById = (id, sub_category_name, result) => {
  sql.query(
    "UPDATE ec_care_laboratory_sub_category SET sub_category_name = ? WHERE id = ? ",
    [sub_category_name, id],
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

      console.log("Updated Sub Category: ", { id: id, sub_category_name });
      result(null, { id: id, sub_category_name });
    }
  );
};

SubCategory.updatePriceById = (id, price, result) => {
  sql.query(
    "UPDATE ec_care_laboratory_sub_category SET price = ? WHERE id = ?",
    [price, id],
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

      console.log("Updated Sub Category Price: ", { id: id, price });
      result(null, { id: id, price });
    }
  );
};

SubCategory.remove = (id, result) => {
  sql.query(
    "DELETE FROM ec_care_laboratory_sub_category WHERE id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Deleted Sub Category with id: ", id);
      result(null, res);
    }
  );
};

module.exports = SubCategory;
