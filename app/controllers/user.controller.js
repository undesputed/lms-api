const User = require("../models/ec_care_user.model");

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

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not Found patient with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Patient with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.updateDetailsById = (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const updateUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    phone: req.body.phone,
    address: req.body.address,
    sex: req.body.sex,
    age: calculateAge(req.body.birthday),
    birthday: req.body.birthday,
    updated_at: new Date(),
  });

  User.updateById(id, updateUser, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${id}`,
        });
      } else {
        res.status(500).send({
          message: "Error Updated details with id " + id,
        });
      }
    } else res.send(data);
  });
};

exports.updateUserEmailById = (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!id || !email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateEmailById(id, email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${id},`,
        });
      } else {
        res.status(500).send({
          message: "Error updated details with id " + id,
        });
      }
    } else res.send(data);
  });
};

exports.retrieveUserByEmail = (req, res) => {
  User.findEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not Patient with Email: ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error Retrieving User With email " + req.params.email,
        });
      }
    } else res.send(data);
  });
};
