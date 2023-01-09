function applyExtraSetup(sequelize) {
	const { mock_group, mock_list } = sequelize.models;

	mock_group.hasMany(mock_list, {
    foreignKey: 'group_id'
  });
	mock_list.belongsTo(mock_group, {
    foreignKey: 'group_id'
  });
}

module.exports = { applyExtraSetup };
