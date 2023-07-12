const db = require("../models");
const ShoppingLists = db.shoppingLists;

// Create and Save a new Shoppinglist entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Save Item in the database
  ShoppingLists.create(req.body)
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

// Find a single Shoppinglist entry with an id
exports.findOne = (req, res) => {
  const user_id = req.params.userId;
  const item_id = req.params.itemId

  ShoppingLists.findAll({ where: { user_id: user_id, item_id: item_id } })
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

// Update a Shoppinglist entry by the id in the request
exports.count = (req,res) => {
  const user_id = req.params.userId;
  ShoppingLists.count({
    where: {user_id: user_id},
  })
    .then(data => {
      res.send(data.toString());
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while couting items."
      });
    })
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const user_id = req.params.userId;
  const item_id = req.params.itemId

  ShoppingLists.update(req.body, {
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

// Delete a Shoppinglist entry with the specified id in the request
exports.delete = (req, res) => {
  const user_id = req.params.user;
  const item_id = req.params.item;

  ShoppingLists.destroy({
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

// Find the Shoppinglist of one specific user
exports.findUserShoppingList = (req, res) => {
  const id = req.params.id;

  ShoppingLists.findAll({ where: { user_id: id } })
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
