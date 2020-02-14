import User from '../app/models/User'

class Database {
  constructor({ connection }) {
    this.users = User.init({ sequelize: connection })
    this.users = User.associate({ models: connection.models })
  }
}

export default Database
