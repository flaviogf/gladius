module.exports = {
  username: 'postgres',
  password: 'postgres',
  database: 'gladius',
  host: '192.168.99.103',
  dialect: 'postgres',
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
}
