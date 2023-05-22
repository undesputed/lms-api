const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const requestFormLabTest = require("../controllers/requestFormLabTest.controller");

  var router = require("express").Router();

  router.get("/", requestFormLabTest.getAllRequestFormLabTest);
  router.get("/labTest/:id", requestFormLabTest.getAllMaxTestRequestFormById);
  router.get("/:id", requestFormLabTest.getFormByRequestForm);

  router.post("/", requestFormLabTest.create);

  app.use("/api/requestFormLabTest", router);
};
