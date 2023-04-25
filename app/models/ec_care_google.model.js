const sql = require("./db");

const Google = function (google) {
  this.user_id = google.user_id;
  this.aud = google.aud;
  this.azp = google.azp;
  this.email = google.email;
  this.email_verified = google.email_verified;
  this.exp = google.exp;
  this.family_name = google.family_name;
  this.given_name = google.given_name;
  this.hd = google.hd;
  this.iat = google.iat;
  this.iss = google.iss;
  this.jti = google.jti;
  this.name = google.name;
  this.picture = google.picture;
  this.ndf = google.ndf;
  this.sub = google.sub;
  this.updated_at = google.updated_at;
  this.deleted_at = google.deleted_at;
};

Google.create = (newGoogle) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO ec_care_google SET ?", newGoogle, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
        return;
      }

      console.log("Created Google user: ", {
        id: res.insertId,
        ...newGoogle,
      });
      resolve({ id: res.insertId, ...newGoogle });
    });
  });
};

Google.findEmail = (email, result) => {
  sql.query(
    `SELECT * FROM ec_care_google WHERE email = ?`,
    [email],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found User email: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Google;
