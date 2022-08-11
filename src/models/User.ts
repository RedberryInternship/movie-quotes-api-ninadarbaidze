import mongoose from 'mongoose'

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,

  },
  profileImage: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
})

const User = mongoose.model('User', signupSchema)

export default User