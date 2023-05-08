const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const requestFormLabTest = require("../controllers/requestFormLabTest.controller");

  var router = require("express").Router();

  router.post("/", requestFormLabTest.create);

  app.use("/api/requestFormLabTest", router);
};
