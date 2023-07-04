module.exports = (sequelize, Sequelize) => {
  const StorageLocation = sequelize.define("storagelocations", {
    storage_loc_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    storage_loc_name: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
});

  return StorageLocation;
};