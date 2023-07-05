const db = require("../models");
const InventoryLists = db.inventoryLists;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
   // Validate request
   if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create Item
  const inventory = {
    user_id: req.body.user_id,
    item_id: req.body.item_id,
    quantity: req.body.quantity,
    expiration_date: req.body.expiration_date,
    category_id: req.body.category_id,
    storage_loc_id: req.body.storage_loc_id
  };
  // Save Item in the database
  InventoryLists.create(inventory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  InventoryLists.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const user_id = req.params.userId;
  const item_id = req.params.itemId


  InventoryLists.update(req.body, {
    where: { item_id: item_id, user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${item_id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + item_id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const user_id= req.params.user;
  const item_id= req.params.item;

  InventoryLists.destroy({
    where: { item_id: item_id, user_id: user_id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Item with id=${item_id}. Maybe Item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item with id=" + item_id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find the inventory of one specific user
exports.findUserInventory = (req, res) => {
  const id = req.params.id;
  InventoryLists.findAll({ where: { user_id: id } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};