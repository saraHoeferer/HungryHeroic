module.exports = app => {
    const shopping = require("../controllers/shoppinglist.controller.js");
    var router = require("express").Router();

    // Create a new ShoppingList entry
    router.post("/", shopping.create);

    // Retrieve all ShoppingList entries of a specific user
    router.get("/user/:id", shopping.findUserShoppingList);

    // Retrieve a single ShoppingList entry with id
    router.get("/:itemId/:userId", shopping.findOne);

    // Update a ShoppingList entry with id
    router.put("/:itemId/:userId", shopping.update);

    // Delete a ShoppingList entry with id
    router.delete("/one/:item/:user", shopping.delete);

    // Count the Items in ShoppingList with id
    router.get("/count/:userId", shopping.count);

    app.use('/api/shopping', router);
  };
