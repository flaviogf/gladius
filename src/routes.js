import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import passport from 'passport'
import { ensureLoggedIn } from 'connect-ensure-login'
import HomeController from './app/controllers/HomeController'
import SignInController from './app/controllers/SignInController'

const routes = Router()

const homeController = makeInvoker(HomeController)
const signInController = makeInvoker(SignInController)

routes.get('/', signInController('create'))

routes.get('/sign-in-with-github', passport.authenticate('github'))

routes.get(
  '/sign-in-with-github-callback',
  passport.authenticate('github', { successRedirect: '/home' })
)

routes.get('/home', ensureLoggedIn('/'), homeController('index'))

export default routes
