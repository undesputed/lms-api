const sql = require("./db");

const ReceptionistNotification = function (receptionistNotification) {
  this.user_id = receptionistNotification.user_id;
  this.receptionist_id = receptionistNotification.receptionist_id;
  this.patient_request_id = receptionistNotification.patient_request_id;
  this.message = receptionistNotification.message;
  this.is_read = receptionistNotification.is_read;
  this.created_at = receptionistNotification.created_at;
  this.updated_at = receptionistNotification.updated_at;
};

ReceptionistNotification.create = (newReceptionistNotif, result) => {
  sql.query(
    "INSERT INTO ec_care_receptionist_notification SET ?",
    newReceptionistNotif,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Receptionist Notification: ", {
        id: res.insertId,
        ...newReceptionistNotif,
      });
      result(null, { id: res.insertId, ...newReceptionistNotif });
    }
  );
};

ReceptionistNotification.findById = (id, result) => {
  sql.query(
    `SELECT * FROM ec_care_receptionist_notification WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Fond Receptionist Notification: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

ReceptionistNotification.findByUnread = (result) => {
  sql.query(
    `SELECT * FROM ec_care_receptionist_notification WHERE id_read = 0`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      console.log("Notification: ", res);
      result(null, res);
    }
  );
};

ReceptionistNotification.findByRead = (result) => {
    sql.query(
      `SELECT * FROM ec_care_receptionist_notification WHERE id_read = 1`,
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(null, err);
          return;
        }
  
        console.log("Notification: ", res);
        result(null, res);
      }
    );
  };

ReceptionistNotification.updateIsRead = (isRead, id, result) => {
  sql.query(
    "UPDATE ec_care_receptionist_notification SET is_read = ? WHERE id = ?",
    [isRead, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({
          kind: "not_found",
        });
        return;
      }

      console.log("Updated Receptionist Notification: ", { id: id, ...res });
      result(null, { id: id, ...res });
    }
  );
};

module.exports = ReceptionistNotification;
