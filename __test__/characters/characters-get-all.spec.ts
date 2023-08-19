import { CharacterController } from '@apps/characters/controller'
import { Character } from '@apps/characters/model'
import { appServer, routePrefix } from '@root/bin/www'
import sequelize from '@services/sequelize'
import httpStatus from 'http-status'
import request from 'supertest'

let controller: CharacterController

beforeAll(async () => {
  await sequelize.authenticate()
  await sequelize.sync()
  await Character.bulkCreate([
    {
      image: 'imagen1.jpg',
      name: 'Mickey Mouse',
      age: 93,
      weight: 23,
      story:
        'Icono de la compañía Disney, conocido por sus aventuras en cortometrajes y cómics.'
    },
    {
      image: 'imagen2.jpg',
      name: 'Donald Duck',
      age: 87,
      weight: 34,
      story:
        'Amigo de Mickey Mouse, famoso por su temperamento y sus travesuras.'
    },
    {
      image: 'imagen3.jpg',
      name: 'Cinderella',
      age: 19,
      weight: 52,
      story:
        'Protagonista de la película de Disney, vive una transformadora historia de hadas madrinas y zapatillas de cristal.'
    }
  ])
})

beforeEach(() => {
  controller = new CharacterController()
})

afterEach(async () => {
  await controller.cleanUpDatabase()
})

describe('GET /characters', () => {
  it('should return 200 OK and all characters', async () => {
    const response = await request(appServer).get(`${routePrefix}/characters`)
    expect(response.statusCode).toBe(httpStatus.OK)
    expect(response.body.data.length).toBe(3)
  })
})
