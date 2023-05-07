const User = require("../models/ec_care_user.model");

exports.findOne = (req, res) => {
  User.findEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with email: ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params.email,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Users. ",
      });
    else res.send(data);
  });
};
