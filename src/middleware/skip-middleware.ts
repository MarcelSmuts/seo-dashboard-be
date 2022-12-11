import { NextFunction, Request, Response } from 'express'

export default function skipMiddleware (
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  return next()
}
