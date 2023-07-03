module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("items", {
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    item_name: {
      type: Sequelize.STRING
    },
    item_quantity: {
      type: Sequelize.INTEGER
    },
    item_expiration_date: {
      type: Sequelize.DATE
    },
    item_category_id: {
      type: Sequelize.INTEGER
    },
    item_storage_loc_id: {
      type: Sequelize.INTEGER
    },
    progress: {
      type: Sequelize.STRING
    },
    progressString: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
});

  return Item;
};
