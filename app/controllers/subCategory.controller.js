const SubCategory = require("../models/ec_care_laboratory_sub_category.model");
const moment = require("moment");

exports.findByCategory = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: "Category ID cannot be empty!",
    });
  }

  SubCategory.findByCategoryId(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sub Categories",
      });
    else res.send(data);
  });
};
