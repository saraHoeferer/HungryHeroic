const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  router.get("/:id", users.findOne); // Handle GET request for finding a user by ID
  router.put("/:id", users.update); // Handle PUT request for updating a user by ID
  router.delete("/:id", users.delete); // Handle DELETE request for deleting a user by ID
  app.use('/api/user', router);
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    ); // Set the allowed headers for CORS
    next();
  });

 //app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );
};