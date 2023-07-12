module.exports = app => {
  const storage = require("../controllers/storagelocation.controller.js");

  var router = require("express").Router();

  // Retrieve all Storage Locations
  router.get("/", storage.findAll);

  app.use('/api/storage', router);
};