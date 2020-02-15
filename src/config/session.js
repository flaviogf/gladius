import connect from 'connect-redis'
import session from 'express-session'
import { createClient } from 'redis'
import redisConfig from './redis'

const RedisStore = connect(session)
const client = createClient(redisConfig)

export default {
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: process.env.SESSION_RESAVE,
  saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED,
}
