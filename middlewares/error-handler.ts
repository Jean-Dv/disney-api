import { type Request, type Response, type NextFunction } from 'express'
import { AppError } from '@middlewares/app-error'

function handleError(
  err: TypeError | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  let appError = err
  if (!(err instanceof AppError)) {
    appError = new AppError({ message: err.message, status: 500 })
  }

  return res.status((appError as AppError).status).json(appError.message)
}

export default handleError
