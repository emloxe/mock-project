const { DataTypes } = require("sequelize");

const tableStructure = {
  // uuid: {
  //   type: DataTypes.UUID,
  //   searchable: true,
  //   unique: true,
  //   defaultValue: DataTypes.UUIDV4,
  //   allowNull: false,
  // },
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  }
};

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("mock_group", tableStructure, { freezeTableName: true});
};
