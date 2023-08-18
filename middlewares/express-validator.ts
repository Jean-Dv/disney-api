import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import http from 'http-status'

export const validateReqSchema = (
  req: Request,
  res: Response,
  next: NextFunction
): undefined => {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    next()
    return
  }
  const errors = validationErrors.mapped()
  res.status(http.UNPROCESSABLE_ENTITY).json({ errors })
}
