import { NextFunction, Request, Response } from 'express'

function hasPermission (requiredPermissions?: Array<number>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return next()
    }

    if (!req.user) {
      return res.Forbidden()
    }

    // User permissions
    // const userPermissions = []

    // const hasAllRequiredPermissions = requiredPermissions.every(
    //   requiredPermission => userPermissions.includes(requiredPermission)
    // )

    // if (!hasAllRequiredPermissions) {
    //   return res.Forbidden()
    // }

    return next()
  }
}

export default hasPermission
