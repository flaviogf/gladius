import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import SignInController from './app/controllers/SignInController'

const routes = Router()

const signInController = makeInvoker(SignInController)

routes.get('/', signInController('create'))

export default routes
