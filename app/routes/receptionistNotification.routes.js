module.exports = (app) => {
  const receptionistNotification = require("../controllers/receptionistNotification.controller");

  var router = require("express").Router();

  router.get("/notifById/:id", receptionistNotification.getAllNotifByRequestId);

  router.post("/", receptionistNotification.createNotification);

  app.use("/api/receptionistNotification", router);
};
