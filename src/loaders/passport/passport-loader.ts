import passport from 'passport'
import localStrategy from './local'
import jwtStrategy from './jwt'
import { Application } from 'express'

export default {
  init (app: Application) {
    passport.use('login', localStrategy)
    passport.use('jwt', jwtStrategy)

    passport.serializeUser((user, done) => {
      done(null, user.id)
    })

    passport.deserializeUser(async (id: string, done: Function) => {
      // Find the user
      // const user = await Member.findById(parseInt(id))
      const user = {
        id: 1
      }

      if (!user) {
        done('User does not exist', null)
      }

      done(null, user)
    })

    app.use(passport.initialize())
  }
}
