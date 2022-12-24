import { Express, Request as ExpressRequest } from 'express'

declare global {
  namespace Express {
    interface Response {
      OK: Function
      BadRequest: Function
      Forbidden: Function
      Unauthorized: Function
      Error: Function
      NotFound: Function
    }

    interface Request {
      user?: User
      id: string
    }

    interface User {
      id: number
    }
  }
}
