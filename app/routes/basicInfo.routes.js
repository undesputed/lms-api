module.exports = (app) => {
  const basicInfo = require("../controllers/basicInfo.controllers");

  var router = require("express").Router();

  router.post("/", basicInfo.create);

  router.get("/", basicInfo.findAll);

  app.use("/api/basicInfo", router);
};
