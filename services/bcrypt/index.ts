import env from '@configs/enviroments/config.env'
import { compare, hash } from 'bcrypt'

export const hashPassword = async (
  plainTextPassword: string
): Promise<string> => {
  return await hash(plainTextPassword, env.SALT_ROUNDS)
}

export const comparePassword = async (
  plainTextPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return await compare(plainTextPassword, hashPassword)
}
