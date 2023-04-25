const {
  googleLogin,
  googleCallback,
  login,
  register,
  googleRegister,
} = require("../controllers/google.controller");

module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  router.post("/login", auth.login);
  router.post("/register", auth.register);

  router.get("/user/:email", user.findOne);

  router.get("/google/googleLogin", googleLogin);
  router.get("/google/callback", googleCallback);
  router.post("/google/login", login);
  router.post("/google/register", register);
  router.post("/google/googleRegister", googleRegister);

  app.use("/api/auth", router);
};
