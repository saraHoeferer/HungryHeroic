module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    user_name: {
      type: Sequelize.STRING
    },
    user_mail: {
      type: Sequelize.STRING
    },
    user_password: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
  }
  );

  return User;
};
