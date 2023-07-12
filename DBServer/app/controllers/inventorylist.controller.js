const db = require("../models");
const InventoryLists = db.inventoryLists;

// Create and Save a new Inventory Entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Save Inventory Entry in the database
  InventoryLists.create(req.body)
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

// Find a single Inventory Entry with an id
exports.findOne = (req, res) => {
  const user_id = req.params.userId;
  const item_id = req.params.itemId

  InventoryLists.findAll({ where: { user_id: user_id, item_id: item_id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving specific inventory."
      });
    });
};

// Update a Inventory Entry by the id in the request
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

// Delete an Inventory entry with the specified id in the request
exports.delete = (req, res) => {
  const user_id = req.params.user;
  const item_id = req.params.item;

  InventoryLists.destroy({
    where: { item_id: item_id, user_id: user_id }
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
          err.message || "Some error occurred while retrieving User Inventory."
      });
    });
};