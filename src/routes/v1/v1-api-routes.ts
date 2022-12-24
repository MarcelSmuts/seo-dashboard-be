import axios, { AxiosError } from 'axios'
import {
  Request,
  Response,
  Application,
  NextFunction,
  RequestHandler
} from 'express'
import hasPermission from '../../middleware/has-permission'
import { auth } from '../../middleware/user-auth'
import skipMiddleware from '../../middleware/skip-middleware'
import { ValidationChain, validationResult } from 'express-validator'

enum RouteMethod {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

interface IV1Route {
  method: RouteMethod
  route: string
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>
  permissions?: Array<any>
  middleware?: Array<RequestHandler>
  skipAuth?: boolean
  validations?: Array<ValidationChain>
}

class V1Routes {
  private app: Application
  routes: IV1Route[]

  constructor (app: Application) {
    this.app = app
    this.routes = []
  }

  private V1APIRoute (route: string) {
    return `/v1/${route}`
  }

  private isUnauthorizedError (error: Error | AxiosError) {
    if (!axios.isAxiosError(error)) {
      return null
    }

    return (error as AxiosError).response?.status === 401
  }

  defaultErrorHandler (req: Request, res: Response, err: Error | AxiosError) {
    if (this.isUnauthorizedError(err)) {
      return res.Unauthorized()
    }

    throw err
  }

  initRoutes () {
    this.routes.forEach(route => {
      const middlewares = [
        route.skipAuth ? skipMiddleware : auth,
        ...(route.validations || [])
      ]

      const handler = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
            return res.BadRequest()
          }

          return route.handler(req, res, next)
        } catch (error) {
          console.error(error)
          return res.Error(error)
        }
      }

      return this.app[route.method](
        this.V1APIRoute(route.route),
        ...middlewares,
        handler
      )
    })
  }
}

export { RouteMethod, IV1Route, V1Routes }
