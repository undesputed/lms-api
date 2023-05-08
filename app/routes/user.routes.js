module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  router.get("/", user.findAll);
  router.get("/:id", user.findOne);

  app.use("/api/user", router);
};
