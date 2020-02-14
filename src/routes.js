import { makeInvoker } from 'awilix-express'
import { ensureLoggedIn } from 'connect-ensure-login'
import { Router } from 'express'
import passport from 'passport'
import RoomController from './app/controllers/RoomController'
import SignInController from './app/controllers/SignInController'
import SignUpController from './app/controllers/SignUpController'
import authConfig from './config/auth'

const routes = Router()

const roomController = makeInvoker(RoomController)
const signInController = makeInvoker(SignInController)
const signUpController = makeInvoker(SignUpController)

/**
 * room
 */

routes.get('/room', ensureLoggedIn('/sign-in'), roomController('index'))

/**
 * sign-up
 */

routes.get('/', signUpController('create'))

routes.post('/', signUpController('store'))

/**
 * sign-in
 */

routes.get('/sign-in', signInController('create'))

routes.post('/sign-in', passport.authenticate('local', authConfig))

export default routes
