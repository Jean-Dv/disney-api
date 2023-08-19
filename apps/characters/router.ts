import { upload } from '@middlewares/upload-image'
import { type NextFunction, type Request, type Response, Router } from 'express'
import { create, getAll } from './http'

export const characterRouter = Router()

characterRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  void getAll(req, res, next)
})

characterRouter.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    void create(req, res, next)
  }
)
