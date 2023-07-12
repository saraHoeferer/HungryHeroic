module.exports = app => {
    const shopping = require("../controllers/shoppinglist.controller.js");

    const tutorials = require("../controllers/shoppinglist.controller.js");

    var router = require("express").Router();

    // Create a new Shoppinglist entry
    router.post("/", shopping.create);

    // Retrieve all Shoppinglist entries of a specific user
    router.get("/user/:id", shopping.findUserShoppingList);

    // Retrieve a single Shoppinglist entry with id
    router.get("/:itemId/:userId", shopping.findOne);

    // Update a Shoppinglist entry with id
    router.put("/:itemId/:userId", shopping.update);

    // Delete a Shoppinglist entry with id
    router.delete("/one/:item/:user", shopping.delete);


    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    router.get("/count/:userId", tutorials.count);

    // Retrieve all published Tutorials
    router.get("/user/:id", tutorials.findUserShoppingList);

    // Retrieve a single Tutorial with id
    router.get("/:itemId/:userId", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:itemId/:userId", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/one/:item/:user", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/shopping', router);
  };
