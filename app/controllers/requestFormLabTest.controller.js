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

exports.getLabTestByRequestId = (req, res) => {
  RequestFormLabTest.findAllLabTestByFormId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data",
      });
    else res.send(data);
  });
};

exports.deleteLabTestByFormIdSubId = (req, res) => {
  RequestFormLabTest.removeLabTestBySubId(
    req.body.request_form_id,
    req.body.sub_category_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lab Test with Request Form Id: ${req.body.request_form_id} and Sub Category Id: ${req.body.sub_category_id}`,
          });
        } else {
          res.status(500).send({
            message:
              "Could not delete Lab Test with Request Form Id: ${request_form_id} and Sub Category Id: ${sub_category_id}",
          });
        }
      } else
        res.send({
          message: `Lab Test Deleted Successfully!`,
        });
    }
  );
};

exports.updateLabTestStatusByFormId = (req, res) => {
  RequestFormLabTest.updateStatusByFormId(
    req.params.request_form_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not Found Lab Test form with id: ${req.params.request_form_id}`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Request Form id " + req.params.request_form_id,
          });
        }
      } else res.send(data);
    }
  );
};
