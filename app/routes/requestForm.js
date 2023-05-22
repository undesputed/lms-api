const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const requestForm = require("../controllers/requestForm.controller");
  var router = require("express").Router();

  router.get("/:id", requestForm.getPendingUserRequest);
  router.get("/getAllUserRequest/:id", requestForm.getAllUserRequests);

  router.post("/", requestForm.create);

  app.use("/api/requestForm", router);
};
