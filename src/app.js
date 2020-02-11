import 'dotenv/config'

import { resolve } from 'path'
import express from 'express'
import mongoose from 'mongoose'
import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import mongoConfig from './config/mongo'
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

    this.server.use(scopePerRequest(this.container))

    this.server.use(routes)
  }

  listen() {
    this.server.listen(3333, () =>
      console.log('It started running on port 3333!')
    )
  }
}

export default new App()
