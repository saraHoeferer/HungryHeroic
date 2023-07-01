module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    category_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    category_name: {
      type: Sequelize.STRING
    },
    category_expiryDays: {
      type: Sequelize.INTEGER
    },
    category_icon: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
});

  return Category;
};