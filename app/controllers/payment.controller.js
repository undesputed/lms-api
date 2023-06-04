const Payment = require("../models/ec_care_payment.model");

exports.create = (req, res) => {
  const newPayment = new Payment({
    request_form_id: req.body.request_form_id,
    basic_info_id: req.body.basic_info_id,
    payment_type: req.body.payment_type,
    serial_number: req.body.serial_number,
    payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    status: req.body.status,
    authBy: req.body.authBy,
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    updated_at: null,
  });

  Payment.create = (newPayment, result) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new Payment",
      });
    else res.send(data);
  };
};
