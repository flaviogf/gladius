module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('user_rooms', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          ref: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      room_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'rooms',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_rooms')
  },
}
