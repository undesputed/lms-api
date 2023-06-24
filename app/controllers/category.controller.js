const Category = require("../models/ec_care_laboratory_category.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content Cannot be empty!!",
    });
  }

  const category = new Category({
    category_name: req.body.category_name,
    authBy: req.body.authBy,
    status: 1,
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    updated_at: null,
  });

  Category.create(category, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a new Category",
      });
    } else res.send(data);
  });
};

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

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Category Name Cannot be empty!!",
    });
  }

  Category.updateNameById(
    req.params.id,
    req.body.category_name,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.id}`,
          });
        } else {
          res.status(500).send({
            message: "Error Updating Category with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};
