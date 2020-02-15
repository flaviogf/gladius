import { makeInvoker } from 'awilix-express'
import { ensureLoggedIn, ensureLoggedOut } from 'connect-ensure-login'
import { Router } from 'express'
import passport from 'passport'
import JoinToTheRoomController from './app/controllers/JoinToTheRoomController'
import MessageController from './app/controllers/MessageController'
import RoomController from './app/controllers/RoomController'
import SignInController from './app/controllers/SignInController'
import SignUpController from './app/controllers/SignUpController'
import authConfig from './config/auth'

const routes = Router()

const joinToTheRoomController = makeInvoker(JoinToTheRoomController)
const messageController = makeInvoker(MessageController)
const roomController = makeInvoker(RoomController)
const signInController = makeInvoker(SignInController)
const signUpController = makeInvoker(SignUpController)

/**
 * ensure logged out
 */

routes.post('/', signUpController('store'))

routes.get('/', ensureLoggedOut('/room'), signUpController('create'))

routes.post('/sign-in', passport.authenticate('local', authConfig))

routes.get('/sign-in', ensureLoggedOut('/room'), signInController('create'))

routes.use(ensureLoggedIn('/sign-in'))

/**
 * ensure logged in
 */

routes.get('/room', roomController('index'))

routes.get('/room/create', roomController('create'))

routes.post('/room', roomController('store'))

routes.get('/room/join/create', joinToTheRoomController('create'))

routes.post('/room/join', joinToTheRoomController('store'))

routes.get('/room/:id', roomController('show'))

routes.post('/room/:id/message', messageController('store'))

export default routes
