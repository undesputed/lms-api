const RequestFormLabTest = require("../models/ec_care_request_form_lab_test.model");
const moment = require("moment");

exports.create = (req, res) => {
  const requestFormLabTest = new RequestFormLabTest({
    request_form_id: req.body.request_form_id,
    sub_category_id: req.body.sub_category_id,
    status: req.body.status,
    authBy: req.body.authBy,
  });

  RequestFormLabTest.create(requestFormLabTest, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some Error occurred while created a new request form lab test. ",
      });
    else req.send(data);
  });
};
