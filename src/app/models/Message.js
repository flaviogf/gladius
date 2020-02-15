import { Model, DataTypes } from 'sequelize'

class Message extends Model {
  static init({ sequelize }) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate({ models }) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })

    this.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room',
    })

    return this
  }
}

export default Message
