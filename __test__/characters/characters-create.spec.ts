import { appServer, routePrefix } from '@root/bin/www'
import path from 'path'
import request from 'supertest'

describe('POST /characters', () => {
  test('should return 201 when create character', async () => {
    const character = {
      name: 'Mickey Mouse',
      age: 93,
      weight: 23,
      story:
        'Icono de la compañía Disney, conocido por sus aventuras en cortometrajes y cómics.'
    }
    const response = await request(appServer)
      .post(`${routePrefix}/characters`)
      .attach('image', path.join(__dirname, './resources/mickey.png'), {
        contentType: 'image/png'
      })
      .field('name', character.name)
      .field('age', character.age)
      .field('weight', character.weight)
      .field('story', character.story)

    expect(response.statusCode).toBe(201)
    expect(response.body.data).toMatchObject({
      image: 'http://localhost:3000/api/v1/characters/images/mickey.png',
      name: character.name,
      age: character.age,
      weight: character.weight,
      story: character.story
    })
  })
})
