import dotenv from 'dotenv'
dotenv.config()
import express from './loaders/express-loader'
import routes from './loaders/route-loader'
import loggers from './middleware/loggers'
import passport from './loaders/passport/passport-loader'
import {
  initDatabaseConnection,
  assertDatabaseConnection
} from './database/connection-manager'
import redisService from './services/redis-service'

// App
const init = () => {
  const app = express.init()

  passport.init(app)
  initDatabaseConnection()
  loggers.initRequestLogger(app)
  routes.init(app)

  app.get('/healthcheck', async (req, res) => {
    await assertDatabaseConnection()
    await redisService._getClient().ping()
    return res.OK()
  })

  express.listen(app)

  return app
}

init()

export default { init }
