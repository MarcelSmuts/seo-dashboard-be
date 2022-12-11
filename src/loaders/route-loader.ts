import { Application } from 'express'
import V1Routes from '../routes/v1'

export default {
  init (app: Application) {
    V1Routes.init(app)
  }
}
