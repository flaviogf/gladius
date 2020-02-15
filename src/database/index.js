import Message from '../app/models/Message'
import Room from '../app/models/Room'
import User from '../app/models/User'

class Database {
  constructor({ connection }) {
    this.messages = Message.init({ sequelize: connection })
    this.users = User.init({ sequelize: connection })
    this.rooms = Room.init({ sequelize: connection })
    this.messages = Message.associate({ models: connection.models })
    this.users = User.associate({ models: connection.models })
    this.rooms = Room.associate({ models: connection.models })
  }
}

export default Database
