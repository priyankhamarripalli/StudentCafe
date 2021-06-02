'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    salt: DataTypes.STRING,
    college_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password:DataTypes.STRING,
    yearofstudent:DataTypes.STRING,
    location: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    user_type: DataTypes.STRING,
    user_image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.GroupMembers, { as: 'groupMembers', foreignKey: 'user_id', sourceKey: 'id' });
    User.hasMany(models.GroupPost, { as: 'groupposts', foreignKey: 'user_id', sourceKey: 'id' });
  };
  return User;
};