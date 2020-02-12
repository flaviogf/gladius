import mongoose from 'mongoose'
import findOrCreate from 'mongoose-find-or-create'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
})

UserSchema.plugin(findOrCreate)

export default mongoose.model('User', UserSchema)
