module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  router.get("/", user.findAll);
  router.get("/:id", user.findOne);

  router.put("/updateDetail/:id", user.updateDetailsById);
  router.put("/updateEmail/:id", user.updateUserEmailById);

  app.use("/api/user", router);
};
