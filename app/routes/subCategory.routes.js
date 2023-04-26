const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const subCategory = require("../controllers/subCategory.controller");

  var router = require("express").Router();

  //Create

  //Retrieve
  router.get("/", authMiddleware, subCategory.findByCategory);
  //Update

  //Delete

  app.use("/api/subCategory", router);
};
