import env from '@configs/enviroments/config.env'
import { type NextFunction, type Request, type Response } from 'express'
import { body } from 'express-validator'
import { sign } from 'jsonwebtoken'
import { UserController } from './controller'

const userController = new UserController()

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = await userController.getUserIdByEmail(req.body.email)
    const token = sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN
    })
    res.status(200).json({
      data: {
        token
      },
      ok: true
    })
  } catch (error: unknown) {
    next(error)
  }
}

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body
    const user = await userController.register({
      firstName,
      lastName,
      email,
      password
    })
    res.status(201).json({
      data: user,
      ok: true
    })
  } catch (error: unknown) {
    next(error)
  }
}

const reqSchemaRegister = [
  body('firstName')
    .isString()
    .withMessage('First Name mus be a string')
    .notEmpty()
    .withMessage("First name can't be empty"),
  body('lastName')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage("Last name can't be empty"),
  body('email').isEmail().withMessage("Email isn't valid"),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage("Password can't be empty")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/)
    .withMessage(
      'Password must contain at least 1 lowercase, 1 uppercase, 1 number and minimum 8 characters'
    ),
  body('repeatPassword')
    .isString()
    .notEmpty()
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage("Passwords don't match")
]

const reqSchemaLogin = [
  body('email').isEmail().withMessage("Email isn't valid"),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage("Password can't be empty")
]

export { login, register, reqSchemaLogin, reqSchemaRegister }
