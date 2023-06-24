const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const category = require("../controllers/category.controller");

  var router = require("express").Router();

  //Create
  router.post("/", category.create);
  //Retrieve
  router.get("/", category.findAll);
  //Update
  router.put("/:id", category.update);
  //Delete

  app.use("/api/category", router);
};
