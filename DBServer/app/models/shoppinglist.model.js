module.exports = (sequelize, Sequelize) => {
    const ShoppingLists = sequelize.define("shoppinglists", {
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
      category_id: {
        type: Sequelize.INTEGER
      },
    },{
      timestamps: false
  });
  
    return ShoppingLists;
  };