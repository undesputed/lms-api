const authMiddleware = require('../middleware/auth.middleware');

module.exports = app => {
    const department = require("../controllers/department.controller");

    var router = require("express").Router();

    //Create
    router.post("/", authMiddleware, department.create);

    //Retrieve
    router.get("/", authMiddleware, department.findAll);
    router.get("/:id", authMiddleware, department.findOne);

    //Update
    router.put("/:id", authMiddleware, department.update);

    //Delete 
    router.delete("/:id", authMiddleware, department.delete);
    router.delete("/", authMiddleware, department.deleteAll);

    app.use('/api/department', router);
}