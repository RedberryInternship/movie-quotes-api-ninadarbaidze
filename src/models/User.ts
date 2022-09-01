import mongoose from 'mongoose'
const { Schema } = mongoose



const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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