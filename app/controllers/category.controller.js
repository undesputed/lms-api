const Category = require("../models/ec_care_laboratory_category.model");

exports.findAll = (req, res) => {
  const category_name = req.body.category_name;

  Category.getAll(category_name, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category.",
      });
    } else res.send(data);
  });
};
