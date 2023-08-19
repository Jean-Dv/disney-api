import {
  type CreationOptional,
  Model,
  type Optional,
  DataTypes
} from 'sequelize'
import { v4 as generateUuid } from 'uuid'
import sequelize from '@services/sequelize'

interface CharacterAttributes {
  id: string
  image: string
  name: string
  age: number
  weight: number
  story: string
}

type CharacterCreationAttributes = Optional<CharacterAttributes, 'id'>

class Character extends Model<
  CharacterAttributes,
  CharacterCreationAttributes
> {
  declare id: string
  declare image: string
  declare name: string
  declare age: number
  declare weight: number
  declare story: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>
}

Character.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => generateUuid()
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    story: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    tableName: 'characters',
    sequelize,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true
  }
)

export { Character }
