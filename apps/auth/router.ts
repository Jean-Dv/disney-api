import { validateReqSchema } from '@middlewares/express-validator'
import { type Request, type Response, Router, type NextFunction } from 'express'
import { login, register, reqSchemaLogin, reqSchemaRegister } from './http'

export const authRouter = Router()

authRouter.post(
  '/login',
  reqSchemaLogin,
  validateReqSchema,
  (req: Request, res: Response, next: NextFunction) => {
    void login(req, res, next)
  }
)
authRouter.put(
  '/register',
  reqSchemaRegister,
  validateReqSchema,
  (req: Request, res: Response, next: NextFunction) => {
    void register(req, res, next)
  }
)
