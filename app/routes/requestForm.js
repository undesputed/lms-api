const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const requestForm = require("../controllers/requestForm.controller");
  var router = require("express").Router();

  router.post("/", requestForm.create);

  app.use("/api/requestForm", router);
};
