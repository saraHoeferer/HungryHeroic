module.exports = async (sequelize, Sequelize) => {
  const InventoryList = sequelize.define("inventorylists", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    expiration_date: {
      type: Sequelize.DATE
    },
    category_id: {
      type: Sequelize.INTEGER
    },
    storage_loc_id: {
      type: Sequelize.INTEGER
    },
  }, {
    timestamps: false
  });

  const count = await InventoryList.count({
    where: {user_id: "1"},
  });

  return InventoryList;
};

/*
module.exports = async () => {
  const count = sequelize.define("inventorylistsCount", await InventoryList.count({
    where: {user_id: "1"},
  }));
  console.log(count + " Items with user 1");
  return count
};
 */
