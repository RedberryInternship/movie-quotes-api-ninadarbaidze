import mongoose from 'mongoose'
const { Schema } = mongoose



const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  emails: [

      {
        email: Schema.Types.String,
        verified: {
          type: Schema.Types.Boolean,
        },
        primary: {
          type: Schema.Types.Boolean,
          default: false,
        },
        
      }
  ],
  password: {
    type: String,

  },

  activated: {
    type: Schema.Types.Boolean,
    default: false
  },

  profileImage: {
    type: String,
  },

  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movies',
  }]
})

const User = mongoose.model('User', signupSchema)

export default User