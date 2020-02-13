module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('user_rooms', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_rooms')
  },
}
