'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupPost = sequelize.define('GroupPost', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    post_text: DataTypes.STRING,
    attachment_id: DataTypes.STRING,
    content_type: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_image:DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  GroupPost.associate = function(models) {
    GroupPost.belongsTo(models.Group, { as: 'group', foreignKey: 'group_id', sourceKey: 'id' });
		GroupPost.belongsTo(models.User, { as: 'group_post', foreignKey: 'user_id', targetKey: 'id' });
  };
  return GroupPost;
};