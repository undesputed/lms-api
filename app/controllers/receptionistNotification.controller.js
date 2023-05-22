const ReceptionistNotification = require("../models/ec_care_receptionist_notification.model");

exports.createNotification = (req, res) => {
  const newNotif = new ReceptionistNotification({
    receptionist_id: req.body.receptionist_id,
    patient_request_id: req.body.patient_request_id,
    message: req.body.message,
    is_read: 0,
    created_at: new Date(req.body.created_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
      ? new Date().toISOString().slice(0, 19).replace("T", " ")
      : null,
    updated_at: null,
  });

  ReceptionistNotification.create(newNotif, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a new Notification.",
      });
    else res.send(data);
  });
};

exports.getAllNotifByRequestId = (req, res) => {
  ReceptionistNotification.findByRequestId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Notification.",
      });
    else res.send(data);
  });
};
