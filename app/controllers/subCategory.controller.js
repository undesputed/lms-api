const SubCategory = require("../models/ec_care_laboratory_sub_category.model");
const moment = require("moment");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const subCategory = new SubCategory({
    category_id: req.body.category_id,
    sub_category_name: req.body.sub_category_name,
    price: req.body.price,
    status: 1,
    authBy: req.body.authBy,
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    updated_at: null,
  });

  SubCategory.create(subCategory, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new Sub Category.",
      });
    } else res.send(data);
  });
};

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

exports.updateName = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sub Category name cannot be empty!",
    });
  }

  console.log(req.body);

  SubCategory.updateNameById(
    req.params.id,
    req.body.sub_category_name,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          req.status(404).send({
            message: `Not found Sub Category With id ${req.params.id}`,
          });
        } else {
          res.status(500).send({
            message: "Error Updating Sub Category with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.updatePrice = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sub Category Price Cannot be empty!",
    });
  }

  SubCategory.updatePriceById(req.params.id, req.body.price, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not Found Sub Category with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Sub Category with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteSubCategory = (req, res) => {
  SubCategory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sub Category with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: `Could not Delete Sub Category With id: ${req.params.id}`,
        });
      }
    } else res.send({ message: `Sub Category was deleted successfully` });
  });
};
