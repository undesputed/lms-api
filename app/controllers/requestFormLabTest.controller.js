const RequestFormLabTest = require("../models/ec_care_request_form_lab_test.model");
const moment = require("moment");

exports.create = (req, res) => {
  const requestFormLabTest = new RequestFormLabTest({
    request_form_id: req.body.request_form_id,
    sub_category_id: req.body.sub_category_id,
    status: req.body.status,
    authBy: req.body.authBy,
    created_at: new Date(req.body.created_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
      ? new Date().toISOString().slice(0, 19).replace("T", " ")
      : null,
    updated_at: null,
  });

  RequestFormLabTest.create(requestFormLabTest, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some Error occurred while created a new request form lab test. ",
      });
    else res.send(data);
  });
};

exports.getFormByRequestForm = (req, res) => {
  RequestFormLabTest.findByRequestFormId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Request form Lab Test",
      });
    else res.send(data);
  });
};

exports.getAllRequestFormLabTest = (req, res) => {
  RequestFormLabTest.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Request Form Lab Test. ",
      });
    else res.send(data);
  });
};

exports.getAllMaxTestRequestFormById = (req, res) => {
  RequestFormLabTest.getMaxLabTestByFormId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Request Form Lab test.",
      });
    else res.send(data);
  });
};

exports.getLabTestByFormId = (req, res) => {
  RequestFormLabTest.getAllLabTestByFormId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Request Form Lab Test.",
      });
    else res.send(data);
  });
};
