module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  router.get("/", user.findAll);

  app.use("/api/user", router);
};
