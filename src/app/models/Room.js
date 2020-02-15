import { Model, DataTypes } from 'sequelize'

class Room extends Model {
  static init({ sequelize }) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
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
    this.belongsToMany(models.User, {
      through: 'user_rooms',
      as: 'users',
    })

    this.hasMany(models.Message, {
      foreignKey: 'room_id',
      as: 'messages',
    })

    return this
  }
}

export default Room
