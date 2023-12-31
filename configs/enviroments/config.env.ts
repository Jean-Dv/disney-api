import dotenv from 'dotenv'

import { type ENV, type SanitizedEnv } from '@configs/types'

dotenv.config()

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT !== undefined ? Number(process.env.PORT) : 8080,
    MYSQL_DATABASE:
      process.env.MYSQL_DATABASE !== undefined
        ? process.env.MYSQL_DATABASE
        : 'test',
    MYSQL_HOST:
      process.env.MYSQL_HOST !== undefined
        ? process.env.MYSQL_HOST
        : 'localhost',
    MYSQL_USERNAME:
      process.env.MYSQL_USERNAME !== undefined
        ? process.env.MYSQL_USERNAME
        : 'root',
    MYSQL_PASSWORD:
      process.env.MYSQL_PASSWORD !== undefined
        ? process.env.MYSQL_PASSWORD
        : '',
    SALT_ROUNDS:
      process.env.SALT_ROUNDS !== undefined
        ? Number(process.env.SALT_ROUNDS)
        : 10,
    JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d'
  }
}

const getSanitizedConfig = (config: ENV): SanitizedEnv => {
  return config as SanitizedEnv
}

const config = getConfig()

const ConfigEnv = getSanitizedConfig(config)

export default ConfigEnv
