export interface ENV {
  NODE_ENV: string | undefined
  PORT: number | undefined
  MYSQL_DATABASE: string | undefined
  MYSQL_HOST: string | undefined
  MYSQL_USERNAME: string | undefined
  MYSQL_PASSWORD: string | undefined
  SALT_ROUNDS: number | undefined
  JWT_SECRET: string | undefined
  JWT_EXPIRES_IN: string | undefined
}

export interface SanitizedEnv {
  NODE_ENV: string
  PORT: number
  MYSQL_DATABASE: string
  MYSQL_HOST: string
  MYSQL_USERNAME: string
  MYSQL_PASSWORD: string
  SALT_ROUNDS: number
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
}
