const Department = require("../models/ec_care_department.model");
const moment = require("moment");

//Create a save new Department
exports.create = (req, res) => {
  const todate = moment().format("YYYY-MM-DDT0h:mm:ss");

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  //Create Department
  const department = new Department({
    departmentName: req.body.departmentName,
    departmentDescription: req.body.departmentDescription,
    status: req.body.status,
    createdAt: todate,
    updatedAt: null,
    deletedAt: null,
    authBy: req.body.authBy,
  });

  Department.create(department, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Department.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const departmentName = req.body.departmentName;

  Department.getAll(departmentName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Department.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not Found Department with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Department with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Department.updatedById(
    req.params.id,
    new Department(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Department with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Department with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Department.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Department with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Department with id " + req.params.id,
        });
      }
    } else res.send({ message: `Department was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Department.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message | "Some error occurred while removing all Department.",
      });
    else res.send({ message: `All Department were deleted successfully` });
  });
};
