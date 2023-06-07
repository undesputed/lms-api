const BasicInfo = require("../models/ec_care_basic_info.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const basicInfo = new BasicInfo({
    name: req.body.name,
    dateOfVisit: new Date(req.body.dateOfVisit)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    phone: req.body.phone,
    birthday: new Date(req.body.birthday)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    gender: req.body.gender,
    address: req.body.address,
    companyName: req.body.companyName,
    others: req.body.others,
    referredBy: req.body.referredBy,
    dateRequested: new Date(req.body.dateRequested)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    status: req.body.status,
    authBy: req.body.authBy,
    created_at: new Date(req.body.created_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    updated_at: null,
  });

  BasicInfo.create(basicInfo, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Department.",
      });
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  BasicInfo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving all basic Information. ",
      });
    else res.send(data);
  });
};

exports.updateBasicInfo = (req, res) => {
  const id = req.params.id;
  const newBasicInfo = new BasicInfo({
    name: req.body.name,
    dateOfVisit: req.body.dateOfVisit,
    phone: req.body.phone,
    birthday: new Date(req.body.birthday)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    gender: req.body.gender,
    address: req.body.address,
    companyName: req.body.companyName,
    others: req.body.others,
    referredBy: req.body.referredBy,
    dateRequested: new Date(req.body.dateRequested)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  });
  BasicInfo.updateById(id, newBasicInfo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Basic Info with id ${id}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Basic Info with id " + id,
        });
      }
    } else res.send(data);
  });
};

exports.BasicInfoUpdateStatus = (req, res) => {
  BasicInfo.updateStatus(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Basic Information with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error Updating Basic info with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
