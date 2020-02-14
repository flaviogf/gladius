module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '0606b8d4-90f1-432a-9cc6-be9f708a01d3',
        username: 'frank',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      id: '0606b8d4-90f1-432a-9cc6-be9f708a01d3',
    })
  },
}
