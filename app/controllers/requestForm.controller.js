const RequestForm = require("../models/ec_care_request_form.model");
const moment = require("moment");

exports.create = (req, res) => {
  try {
    const requestForm = new RequestForm({
      user_id: req.body.user_id,
      dateOfVisit: new Date(req.body.dateOfVisit)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      status: req.body.status,
      authBy: req.body.authBy,
      receivedBy: req.body.receivedBy ? req.body.receivedBy : "",
      releasedBy: req.body.releasedBy ? req.body.releasedBy : "",
      releaseDate: req.body.releaseDate ? req.body.releaseDate : "",
      created_at: new Date(req.body.created_at)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
        ? new Date().toISOString().slice(0, 19).replace("T", " ")
        : null,
      updated_at: null,
    });

    const handleResult = async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          RequestForm.create(requestForm, (error, newData) => {
            if (error)
              res.status(500).send({
                message:
                  error.message ||
                  "Some error occurred while creating a new Request Form.",
              });
            else res.send(newData);
          });
        } else {
          return res.status(500).send({
            message: `There is an error retrieving Pending Requests: ${req.body.user_id}`,
          });
        }
      } else {
        return res.status(409).send({
          message: "Error Retrieving Pending Requests.",
        });
      }
    };

    RequestForm.findUserByIdStatus(req.body.user_id, handleResult);
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
  RequestForm.findAllPendingRequest((err, data) => {
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
