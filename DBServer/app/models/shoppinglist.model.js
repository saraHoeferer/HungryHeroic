module.exports = (sequelize, Sequelize) => {
    const ShoppingLists = sequelize.define("shoppinglists", {
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
  
    return ShoppingLists;
  };