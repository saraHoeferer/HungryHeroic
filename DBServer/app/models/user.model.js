module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true // Define user_id as the primary key
    },
    user_name: {
      type: Sequelize.STRING // Define user_name as a string field
    },
    user_mail: {
      type: Sequelize.STRING // Define user_mail as a string field
    },
    user_password: {
      type: Sequelize.STRING // Define user_password as a string field
    }
  },{
    timestamps: false // Disable automatic creation of createdAt and updatedAt fields
  }
  );

  return User;
};
