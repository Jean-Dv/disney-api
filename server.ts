import helmet from 'helmet'
import compress from 'compression'
import express, { type Application } from 'express'

import { ConfigEnv, logger } from '@configs/index'
import { homeRouter } from '@apps/home/router'
import sequelize from '@services/sequelize'
import { authRouter } from '@apps/auth/router'
import { characterRouter } from '@apps/characters/router'

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
    this.app.use(`${this.routePrefix}/auth`, authRouter)
    this.app.use(`${this.routePrefix}/characters`, characterRouter)
  }

  private async initializeDatabase(): Promise<void> {
    await sequelize.authenticate()
    await sequelize.sync()
  }

  start(): void {
    if (ConfigEnv.NODE_ENV !== 'test') {
      this.app.listen(this.port, () => {
        logger.access.info(`[*] Server is running on port ${this.port}...`)
      })
      this.initializeDatabase()
        .then(() => {
          logger.access.info('[*] Database is connected')
        })
        .catch((err) => {
          logger.debug.error('Error connecting to database: ', err)
        })
    }
  }
}
