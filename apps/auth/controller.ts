import { AppError } from '@middlewares/app-error'
import { comparePassword, hashPassword } from '@services/bcrypt'
import { User } from './model'
import { type RegisterResponse } from './responses'

export class UserController {
  async register({
    firstName,
    lastName,
    email,
    password
  }: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<RegisterResponse> {
    const hashedPassword = await hashPassword(password)
    const user = await User.create(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword
      },
      { fields: ['firstName', 'lastName', 'email', 'password'] }
    )
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await User.findOne({
      where: { email }
    })
    if (user == null) {
      throw new AppError({ status: 404, message: 'User not found' })
    }
    return user
  }

  async getUserIdByEmail(email: string): Promise<string> {
    const user = await this.getUserByEmail(email)
    return user.id
  }

  async checkCredentials({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    const match = await comparePassword(password, user.password)
    if (!match) {
      throw new AppError({ status: 400, message: 'Invalid credentials' })
    }
    return match
  }

  async cleanUpDatabase(): Promise<void> {
    await User.destroy({
      where: {}
    })
  }
}
