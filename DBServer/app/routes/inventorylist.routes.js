module.exports = app => {
    const inventory = require("../controllers/inventorylist.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Inventory entry
    router.post("/", inventory.create);
  
    // Retrieve a specific users Inventory
    router.get("/user/:id", inventory.findUserInventory);
  
    // Retrieve a single Inventory entry with id
    router.get("/:itemId/:userId", inventory.findOne);
  
    // Update a Inventory entry with id
    router.put("/:itemId/:userId", inventory.update);
  
    // Delete a Inventory entry with id
    router.delete("/one/:item/:user", inventory.delete);
  
    app.use('/api/inventory', router);
  };