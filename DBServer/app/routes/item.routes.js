module.exports = app => {
  const items = require("../controllers/item.controller.js");

  var router = require("express").Router();

  // Create a new Item
  router.post("/", items.create);

  // Find a specific Item by Name
  router.get("/specific/:name", items.findByName);

  // Find a Item with a simliar Name to what the query is
  router.get("/similiar/:name", items.findSimilarByName);

  // Retrieve a single Item with id
  router.get("/:id", items.findOne);

  app.use('/api/items', router);
};
