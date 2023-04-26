const SubCategory = require("../models/ec_care_laboratory_sub_category.model");
const moment = require("moment");

exports.findByCategory = (req, res) => {
  SubCategory.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sub Categories",
      });
    else res.send(data);
  });
};
