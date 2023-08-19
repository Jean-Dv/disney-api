import { Character } from './model'
import { type CharacterAllResponse } from './responses'

class CharacterController {
  async getAll(): Promise<CharacterAllResponse[]> {
    const characters = await Character.findAll()
    return characters.map(function (character) {
      return {
        image: character.image,
        name: character.name
      }
    })
  }

  async create({
    image,
    name,
    age,
    weight,
    story
  }: {
    image: string
    name: string
    age: number
    weight: number
    story: string
  }): Promise<void> {
    await Character.create(
      {
        image,
        name,
        age,
        weight,
        story
      },
      { fields: ['image', 'name', 'age', 'weight', 'story'] }
    )
  }

  async cleanUpDatabase(): Promise<void> {
    await Character.destroy({ where: {} })
  }
}

export { CharacterController }
