const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  app.use('/api/user', router);
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
};