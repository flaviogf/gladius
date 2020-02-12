import 'dotenv/config'

import { resolve } from 'path'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import passport from 'passport'
import { Strategy } from 'passport-github'
import githubConfig from './config/github'
import mongoConfig from './config/mongo'
import sessionConfig from './config/session'
import Database from './database'
import routes from './routes'

class App {
  constructor() {
    this.server = express()
    this.container = createContainer()

    this.configureServices()

    this.configure()
  }

  configureServices() {
    mongoose.connect(mongoConfig.url, mongoConfig.options)

    this.container.register({
      database: asClass(Database),
    })

    this.server.set('view engine', 'pug')
    this.server.set('views', resolve(__dirname, 'views'))
  }

  configure() {
    this.server.use('/static', express.static(resolve(__dirname, 'static')))

    this.server.use(express.urlencoded({ extended: true }))

    this.server.use(session(sessionConfig))

    this.server.use(scopePerRequest(this.container))

    passport.use(
      new Strategy(
        githubConfig,
        async (accessToken, refreshToken, profile, done) => {
          const database = this.container.resolve('database')

          database.users.findOrCreate(
            { username: profile.username },
            {
              avatar_url: profile._json.avatar_url,
              name: profile._json.name,
              bio: profile._json.bio,
            },
            (err, user) => {
              if (err) {
                return done(err, null)
              }

              return done(null, user)
            }
          )
        }
      )
    )

    passport.serializeUser((user, done) => {
      return done(null, user)
    })

    passport.deserializeUser((obj, done) => {
      return done(null, obj)
    })

    this.server.use(passport.initialize())

    this.server.use(passport.session())

    this.server.use(routes)
  }

  listen() {
    this.server.listen(3333, () =>
      console.log('It started running on port 3333!')
    )
  }
}

export default new App()
