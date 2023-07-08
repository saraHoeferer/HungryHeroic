module.exports = app => {
    const tutorials = require("../controllers/inventorylist.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/user/:id", tutorials.findUserInventory);
  
    // Retrieve a single Tutorial with id
    router.get("/:itemId/:userId", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:itemId/:userId", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/one/:item/:user", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/inventory', router);
  };