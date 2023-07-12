module.exports = app => {
    const shopping = require("../controllers/shoppinglist.controller.js");
  
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
  
    app.use('/api/shopping', router);
  };