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
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: 1,
    references: {
      model: "mock_group",
      key: "id",
    },
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  remark: {
    type: DataTypes.STRING,
    unique: false,
  },
  code: {
    type: DataTypes.TEXT,
    unique: false,
  },
};

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("mock_list", tableStructure, { freezeTableName: true});
};
