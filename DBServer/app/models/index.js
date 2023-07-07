const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.items = require("./items.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.storageLocation = require("./storagelocation.model.js")(sequelize, Sequelize);
db.inventoryLists = require("./inventorylist.model.js")(sequelize, Sequelize);
db.shoppingLists = require("./shoppinglist.model.js")(sequelize, Sequelize);

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);

db.roles.belongsToMany(db.users, {
  through: "user_roles"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles"
});

db.roles = ["user", "admin", "moderator"];

module.exports = db;