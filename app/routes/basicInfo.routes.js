module.exports = (app) => {
  const basicInfo = require("../controllers/basicInfo.controllers");

  var router = require("express").Router();

  router.post("/", basicInfo.create);

  router.get("/", basicInfo.findAll);

  router.put("/:id", basicInfo.updateBasicInfo);

  app.use("/api/basicInfo", router);
};
