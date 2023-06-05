const sql = require("./db");

const Payment = function (payment) {
  this.request_form_id = payment.request_form_id;
  this.payment_type = payment.payment_type;
  this.serial_number = payment.serial_number;
  this.payment_date = payment.payment_date;
  this.status = payment.status;
  this.authBy = payment.authBy;
  this.created_at = payment.created_at;
  this.updated_at = payment.updated_at;
};

Payment.create = (newPayment, result) => {
  sql.query("INSERT INTO ec_care_payment SET ?", newPayment, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created New Payment: ", {
      id: res.insertId,
      ...newPayment,
    });
    result(null, { id: res.insertId, ...newPayment });
  });
};

module.exports = Payment;
