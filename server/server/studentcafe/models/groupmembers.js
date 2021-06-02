'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define('GroupMembers', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    user_role:DataTypes.STRING
  }, {});
  GroupMembers.associate = function(models) {
    GroupMembers.belongsTo(models.Group, { as: 'group', foreignKey: 'group_id', sourceKey: 'id' });
		GroupMembers.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', targetKey: 'id' });
  };
  return GroupMembers;
};