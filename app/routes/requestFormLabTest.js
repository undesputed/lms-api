const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const requestFormLabTest = require("../controllers/requestFormLabTest.controller");

  var router = require("express").Router();

  router.get("/fetchLabTestByForm/:id", requestFormLabTest.getLabTestByFormId);
  router.get("/", requestFormLabTest.getAllRequestFormLabTest);
  router.get("/labTest/:id", requestFormLabTest.getAllMaxTestRequestFormById);
  router.get("/:id", requestFormLabTest.getFormByRequestForm);
  router.get("/tests/:id", requestFormLabTest.getLabTestByRequestId);

  router.post("/", requestFormLabTest.create);

  router.delete("/", requestFormLabTest.deleteLabTestByFormIdSubId);

  app.use("/api/requestFormLabTest", router);
};
