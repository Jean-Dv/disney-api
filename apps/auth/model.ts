import {
  type CreationOptional,
  DataTypes,
  Model,
  type Optional
} from 'sequelize'
import { v4 as generateUuid } from 'uuid'
import sequelize from '@services/sequelize'

interface UserAttributes {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string
  declare firstName: string
  declare lastName: string
  declare email: string
  declare password: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => generateUuid()
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
      }
    }
  },
  {
    tableName: 'users',
    sequelize
  }
)

export { User, type UserAttributes }
