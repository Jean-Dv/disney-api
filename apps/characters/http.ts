import { AppError } from '@middlewares/app-error'
import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { CharacterController } from './controller'

const characterController = new CharacterController()

const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const characters = await characterController.getAll()
    res.status(200).json({
      data: characters,
      ok: true
    })
  } catch (error: unknown) {
    next(error)
  }
}

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.file === null || req.file === undefined) {
      throw new AppError({
        status: httpStatus.UNPROCESSABLE_ENTITY,
        message: 'Image is required'
      })
    }
    const name = req.get('name') as string
    const age = req.get('age') as string
    const weight = req.get('weight') as string
    const story = req.get('story') as string
    const protocol = req.protocol
    const hostname = req.hostname
    const image = req.file.path
    await characterController.create({
      image: `${protocol}://${hostname}/${image}`,
      name,
      age: Number(age),
      weight: Number(weight),
      story
    })
    res.status(201).json({
      data: {
        message: "Character's created successfully"
      },
      ok: true
    })
  } catch (error: unknown) {
    next(error)
  }
}

export { getAll, create }
