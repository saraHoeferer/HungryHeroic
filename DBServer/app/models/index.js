const dbConfig = require("../config/db.config.js");

//create sequelize db
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, // Database name
  dbConfig.USER, // Database username
  dbConfig.PASSWORD, { // Database password
  host: dbConfig.HOST, // Database host
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize; // Sequelize library
db.sequelize = sequelize; // Sequelize database connection object

// Add models to the database
db.items = require("./items.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.storageLocation = require("./storagelocation.model.js")(sequelize, Sequelize);
db.inventoryLists = require("./inventorylist.model.js")(sequelize, Sequelize);
db.shoppingLists = require("./shoppinglist.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;