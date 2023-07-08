const db = require("../models");
const ShoppingLists = db.shoppingLists;
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
  const shopping = {
    user_id: req.body.user_id,
    item_id: req.body.item_id,
    quantity: req.body.quantity,
    category_id: req.body.category_id,
  };
  // Save Item in the database
  ShoppingLists.create(shopping)
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

  ShoppingLists.findAll({ where: condition })
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
  const user_id = req.params.userId;
  const item_id = req.params.itemId

  console.log(user_id)
  console.log(item_id)

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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const user_id = req.params.user;
  const item_id= req.params.item;

  ShoppingLists.destroy({
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