import { Sequelize } from 'sequelize'
import env from '@configs/enviroments/config.env'

const sequelize = new Sequelize(
  env.MYSQL_DATABASE,
  env.MYSQL_USERNAME,
  env.MYSQL_PASSWORD,
  {
    host: env.MYSQL_HOST,
    dialect: 'mysql'
  }
)

export default sequelize
