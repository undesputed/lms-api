const RequestForm = require("../models/ec_care_request_form.model");
const moment = require("moment");

exports.create = (req, res) => {
  try {
    const requestForm = new RequestForm({
      basic_info_id: req.body.basic_info_id,
      user_id: req.body.user_id,
      dateOfVisit: new Date(req.body.dateOfVisit)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      status: req.body.status,
      authBy: req.body.authBy,
      receivedBy: req.body.receivedBy ? req.body.receivedBy : null,
      releasedBy: req.body.releasedBy ? req.body.releasedBy : null,
      releaseDate: req.body.releaseDate ? req.body.releaseDate : null,
      created_at: new Date(req.body.created_at)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
        ? new Date().toISOString().slice(0, 19).replace("T", " ")
        : null,
      updated_at: null,
    });

    RequestForm.create(requestForm, (error, newData) => {
      if (error)
        res.status(500).send({
          message:
            error.message ||
            "Some error occurred while creating a new Request Form.",
        });
      else res.send(newData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while retrieving Pending Records.",
    });
  }
};

exports.getPendingUserRequest = (req, res) => {
  RequestForm.findRequestByUserId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No Pending Request fond for Id: ${req.params.id}. `,
        });
      } else {
        return res.status(500).send({
          message: "Error Retrieving Request Form for Id: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.getAllUserRequests = (req, res) => {
  RequestForm.findAllRequestByUserId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No Request found with the id: ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          message: "Error Retrieving Request for the user Id: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.getAllPendingRequests = (req, res) => {
  RequestForm.findAllRequest((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No Pending Requests`,
        });
      } else {
        return res.status(500).send({
          message: "Error Retrieving All the Pending Request.",
        });
      }
    } else res.send(data);
  });
};

exports.getAllBasicInfo = (req, res) => {
  RequestForm.findAllRequestBasicInfo((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No Pending request`,
        });
      } else {
        return res.status(500).send({
          message: "Error Retrieving all the Basic Information.",
        });
      }
    } else res.send(data);
  });
};

exports.getFormById = (req, res) => {
  RequestForm.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with is ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Form with id" + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.getBasicInfoByForm = (req, res) => {
  RequestForm.findBasicInfoByRequestForm(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Basic Info with request Id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.updateFormById = (req, res) => {
  RequestForm.updateStatus(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Request Form with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error Updating Request Form with id: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
