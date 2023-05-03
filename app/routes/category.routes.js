const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const category = require("../controllers/category.controller");

  var router = require("express").Router();

  //Create

  //Retrieve
  router.get("/", category.findAll);
  //Update

  //Delete

  app.use("/api/category", router);
};
