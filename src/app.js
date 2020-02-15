import 'dotenv/config'

import { createContainer, asClass, asValue } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import bcrypt from 'bcryptjs'
import chalk from 'chalk'
import debug from 'debug'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import { createServer } from 'http'
import morgan from 'morgan'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { resolve } from 'path'
import { Sequelize } from 'sequelize'
import socket from 'socket.io'
import appConfig from './config/app'
import databaseConfig from './config/database'
import sessionConfig from './config/session'
import Database from './database'
import routes from './routes'

class App {
  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.io = socket(this.server)
    this.container = createContainer()

    this.configureServices()

    this.configure()
  }

  configureServices() {
    this.app.set('views', resolve(__dirname, 'views'))
    this.app.set('view engine', 'pug')

    this.container.register({
      connection: asValue(new Sequelize(databaseConfig)),
      database: asClass(Database),
      io: asValue(this.io),
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
    this.app.use(session(sessionConfig))
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(flash())
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(scopePerRequest(this.container))
    this.app.use(express.static(resolve(__dirname, 'public')))
    this.app.use(routes)
    this.io.on('connection', (socket) => {
      const { id } = socket.handshake.query

      debug('gladius')(
        `The socket ${chalk.green(socket.id)} has been connected.`
      )

      socket.join(id)

      debug('gladius')(
        `The socket ${chalk.green(socket.id)} has been joined to the room ${id}`
      )

      socket.on('disconnect', () => {
        debug('gladius')(
          `The socket ${chalk.green(socket.id)} has been disconnect.`
        )

        socket.leave(id)

        debug('gladius')(
          `The socket ${chalk.green(socket.id)} has leave the room ${id}`
        )
      })
    })
  }

  listen() {
    this.server.listen(appConfig.port, () =>
      debug('gladius')(`Listening port ${chalk.gray(appConfig.port)}.`)
    )
  }
}

export default new App()
