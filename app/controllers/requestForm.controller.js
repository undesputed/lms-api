const RequestForm = require("../models/ec_care_request_form.model");
const moment = require("moment");

exports.create = (req, res) => {
  const requestForm = new RequestForm({
    user_id: req.body.user_id,
    fullName: req.body.fullName,
    dateOfVisit: req.body.dateOfVisit,
    birthday: req.body.birthday,
    age: req.body.age,
    sex: req.body.sex,
    address: req.body.address,
    status: req.body.status,
    authBy: req.body.authBy,
    updated_at: req.body.updated_at,
  });

  RequestForm.create(requestForm, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a new Request Form.",
      });
    else res.send(data);
  });
};
