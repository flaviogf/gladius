import bcrypt from 'bcryptjs'
import { Model, DataTypes } from 'sequelize'

class User extends Model {
  static init({ sequelize }) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: DataTypes.VIRTUAL,
        password_hash: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        avatar_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', async (user, options) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  static associate({ models }) {
    this.belongsToMany(models.Room, {
      through: 'user_rooms',
      as: 'rooms',
    })

    return this
  }
}

export default User
