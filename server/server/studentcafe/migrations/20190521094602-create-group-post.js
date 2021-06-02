'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      post_text: {
        type: Sequelize.STRING
      },
      attachment_id: {
        type: Sequelize.STRING
      },
      content_type: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_image: {
        type: Sequelize.STRING
      },      
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroupPosts');
  }
};