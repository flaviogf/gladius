import { createContainer, asClass, asValue } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import bcrypt from 'bcryptjs'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { resolve } from 'path'
import { Sequelize } from 'sequelize'
import appConfig from './config/app'
import databaseConfig from './config/database'
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
    this.server.set('view engine', 'pug')
    this.server.set('views', resolve(__dirname, 'views'))

    this.container.register({
      connection: asValue(new Sequelize(databaseConfig)),
      database: asClass(Database),
    })

    passport.use(
      new LocalStrategy(async (username, password, done) => {
        const database = this.container.resolve('database')

        const user = await database.users.findOne({
          where: {
            username,
          },
        })

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
          return done(null, false)
        }

        return done(null, user)
      })
    )

    passport.serializeUser((user, done) => {
      return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
      const database = this.container.resolve('database')

      const user = await database.users.findByPk(id)

      return done(null, user)
    })
  }

  configure() {
    this.server.use(session(sessionConfig))
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(flash())
    this.server.use(passport.initialize())
    this.server.use(passport.session())
    this.server.use(scopePerRequest(this.container))
    this.server.use(routes)
  }

  listen() {
    const { port } = appConfig
    this.server.listen(port, () => console.log(`Listening port ${port}! :)`))
  }
}

export default new App()
