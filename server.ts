import helmet from 'helmet'
import compress from 'compression'
import express, { type Application } from 'express'

import { ConfigEnv, logger } from '@configs/index'
import { homeRouter } from '@apps/home/router'
import sequelize from '@services/sequelize'

export class Server {
  readonly app!: Application
  readonly routePrefix!: string

  private port!: string | number

  private static _instance: Server

  constructor() {
    if (Server._instance instanceof Server) {
      return Server._instance
    }
    this.app = express()
    this.routePrefix = '/api/v1'
    this.config()
    this.middlewares()
    this.routes()
    this.initializeDatabase()
    Server._instance = this
  }

  private config(): void {
    this.port = ConfigEnv.PORT
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.frameguard({ action: 'deny' }))
    this.app.use(compress())
    this.app.use(logger.express)
  }

  private routes(): void {
    this.app.use(`${this.routePrefix}/ping`, homeRouter)
  }

  private initializeDatabase(): void {
    sequelize
      .authenticate()
      .then(() => {
        logger.access.info('[*] Connection has been established successfully.')
      })
      .catch((err) => {
        logger.debug.error('[*] Unable to connect to the database:', err)
      })
  }

  start(): void {
    if (ConfigEnv.NODE_ENV !== 'test') {
      this.app.listen(this.port, () => {
        logger.access.info(`[*] Server is running on port ${this.port}...`)
      })
    }
  }
}
