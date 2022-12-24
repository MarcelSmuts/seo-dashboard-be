import { Request, Response, NextFunction } from 'express'
import { authenticate as passportAuthenticate } from 'passport'

function auth (req: Request, res: Response, next: NextFunction) {
  const authenticate = passportAuthenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.Unauthorized()
      }

      return next()
    }
  )

  authenticate(req, res, next)
}

export { auth }
