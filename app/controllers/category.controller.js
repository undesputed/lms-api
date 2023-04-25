const Category = require("../models/ec_care_laboratory_category.model");

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Categories Not Found.`,
        });
      } else {
        res.status(500).send({
          message: "Error Retrieve Categories ",
        });
      }
    } else res.send(data);
  });
};
