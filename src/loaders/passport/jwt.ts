import { Jwt } from 'jsonwebtoken'
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallbackWithRequest,
  VerifiedCallback
} from 'passport-jwt'
import * as express from 'express'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  audience: process.env.SITE_URL,
  passReqToCallback: true
}

const callback: VerifyCallbackWithRequest = (
  req: express.Request,
  jwtPayload: any,
  done: VerifiedCallback
) => {
  if (!jwtPayload || !jwtPayload.email) {
    return done(null, false)
  }

  // TODO: Check if the user is in redis already
  // If they are in redis - just return them
  // TODO: Updating a users roles needs to refresh that user in redis
  // If not - go fetch the user from the database
  // Generate a token for the user
  // Add them to redis
  // users/token

  // A separate in memory list of roles and their permissions

  // Find the user
  // const user = await Member.findByEmail(username, true)
  const user: Express.User = {
    id: 1
  }

  // Remove any sensitive information
  // delete user.passwordHash
  // delete user.passwordSalt

  if (!user) {
    return done(null, false)
  }

  return done(null, user)
}

export default new JwtStrategy(options, callback)
