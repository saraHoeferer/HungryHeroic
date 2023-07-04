module.exports = (sequelize, Sequelize) => {
    const InventoryList = sequelize.define("inventorylists", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      quantity:{
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
    },{
      timestamps: false
  });
  
    return InventoryList;
  };