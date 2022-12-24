import { Application } from 'express'
import LocalAuthentication from './auth/local'

export default function initAuthenticationRoutes (app: Application) {
  new LocalAuthentication(app).initRoutes()
}
