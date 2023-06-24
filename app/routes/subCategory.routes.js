const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const subCategory = require("../controllers/subCategory.controller");

  var router = require("express").Router();

  //Create
  router.post("/", subCategory.create);
  //Retrieve
  router.get("/", subCategory.findByCategory);
  //Update
  router.put("/:id", subCategory.updateSubCategory);
  //Delete
  router.delete("/:id", subCategory.deleteSubCategory);

  app.use("/api/subCategory", router);
};
