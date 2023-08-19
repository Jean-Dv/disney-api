import request from 'supertest'

import { appServer, routePrefix } from '@root/bin/www'
import { UserController } from '@apps/auth/controller'
import { sign } from 'jsonwebtoken'
import env from '@configs/enviroments/config.env'
import sequelize from '@services/sequelize'

let controller: UserController

describe(`POST ${routePrefix}/auth/login`, () => {
  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync()
  })

  beforeEach(() => {
    controller = new UserController()
  })

  afterEach(async () => {
    await controller.cleanUpDatabase()
  })

  test('should return 200 and token jwt valid', async () => {
    const user = {
      firstName: 'jhon',
      lastName: 'doe',
      email: 'jhondoe@gmail.com',
      password: '123456890',
      repeatPassword: '123456890'
    }
    await controller.register(user)
    const userId = await controller.getUserIdByEmail(user.email)
    const response = await request(appServer)
      .post(`${routePrefix}/auth/login`)
      .send({
        email: user.email,
        password: user.password
      })
    const token = sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toMatchObject({
      token
    })
  })
})

describe(`PUT ${routePrefix}/auth/register`, () => {
  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync()
  })

  beforeEach(() => {
    controller = new UserController()
  })

  afterEach(async () => {
    await controller.cleanUpDatabase()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should return 201 and user created', async () => {
    const user = {
      firstName: 'jhon',
      lastName: 'doe',
      email: 'jhondoe@gmail.com',
      password: '5N&&i86n$$SG8o',
      repeatPassword: '5N&&i86n$$SG8o'
    }
    const response = await request(appServer)
      .put(`${routePrefix}/auth/register`)
      .send(user)

    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject({
      data: {
        firstName: 'jhon',
        lastName: 'doe',
        email: 'jhondoe@gmail.com'
      },
      ok: true
    })
  })
  test('should return 400 and error message when email is invalid', async () => {
    const user = {
      firstName: 'jhon',
      lastName: 'doe',
      email: 'jhondoe',
      password: '%L2#&9X2hg@z82',
      repeatPassword: '%L2#&9X2hg@z82'
    }
    const response = await request(appServer)
      .put(`${routePrefix}/auth/register`)
      .send(user)
    expect(response.statusCode).toBe(422)
    expect(response.body).toMatchObject({
      errors: {
        email: {
          type: 'field',
          value: 'jhondoe',
          msg: "Email isn't valid",
          path: 'email',
          location: 'body'
        }
      }
    })
  })
})
