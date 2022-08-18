import mongoose from 'mongoose'
const { Schema } = mongoose



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
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movies',
  }]
})

const User = mongoose.model('User', signupSchema)

export default User