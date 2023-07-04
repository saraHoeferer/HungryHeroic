module.exports = (sequelize, Sequelize) => {
    const InventoryList = sequelize.define("inventorylists", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },{
      timestamps: false
  });
  
    return InventoryList;
  };