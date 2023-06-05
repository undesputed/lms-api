const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const requestForm = require("../controllers/requestForm.controller");
  var router = require("express").Router();

  router.get("/pending/", requestForm.getAllPendingRequests);
  // router.get("/:id", requestForm.getPendingUserRequest);
  router.get("/retrieveById/:id", requestForm.getFormById);
  router.get("/getAllUserRequest/:id", requestForm.getAllUserRequests);
  router.get("/basicInfo/", requestForm.getAllBasicInfo);
  router.get("/basicInfo/:id", requestForm.getBasicInfoByForm);

  router.put("/updateStatus", requestForm.updateFormById);

  router.post("/", requestForm.create);

  app.use("/api/requestForm", router);
};
