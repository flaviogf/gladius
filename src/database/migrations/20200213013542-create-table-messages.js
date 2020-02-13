module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('messages')
  },
}
