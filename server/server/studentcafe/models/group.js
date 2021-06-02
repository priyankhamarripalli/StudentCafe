'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_code:DataTypes.STRING,
    group_name:DataTypes.STRING,
    group_image:DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
   Group.associate = function(models) {
   Group.hasMany(models.GroupMembers, { as: 'groups', foreignKey: 'group_id', sourceKey: 'id' });
   Group.hasMany(models.GroupPost,  { as: 'group_post ', foreignKey: 'group_id', sourceKey: 'id' });
  };
  return Group;
};