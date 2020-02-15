import { makeInvoker } from 'awilix-express'
import { ensureLoggedIn, ensureLoggedOut } from 'connect-ensure-login'
import { Router } from 'express'
import passport from 'passport'
import MessageController from './app/controllers/MessageController'
import RoomController from './app/controllers/RoomController'
import SignInController from './app/controllers/SignInController'
import SignUpController from './app/controllers/SignUpController'
import authConfig from './config/auth'

const routes = Router()

const messageController = makeInvoker(MessageController)
const roomController = makeInvoker(RoomController)
const signInController = makeInvoker(SignInController)
const signUpController = makeInvoker(SignUpController)

/**
 * room
 */

routes.get('/room', ensureLoggedIn('/sign-in'), roomController('index'))

routes.get('/room/create', ensureLoggedIn('/sign-in'), roomController('create'))

routes.post('/room/store', roomController('store'))

routes.get('/room/:id', ensureLoggedIn('/sign-in'), roomController('show'))

routes.post('/room/:id/message', messageController('store'))

/**
 * sign-up
 */

routes.get('/', ensureLoggedOut('/room'), signUpController('create'))

routes.post('/', signUpController('store'))

/**
 * sign-in
 */

routes.get('/sign-in', ensureLoggedOut('/room'), signInController('create'))

routes.post('/sign-in', passport.authenticate('local', authConfig))

export default routes
