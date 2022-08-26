import mongoose from 'mongoose'
const { Schema } = mongoose

const quoteSchema = new mongoose.Schema(
  {
    quoteEN: Schema.Types.String,
    quoteGE: Schema.Types.String,
    image: Schema.Types.String,
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User',

      }
    ],
    comments: [
      {
        comment: Schema.Types.String,
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        }

      }
    ]
    
  },
  { versionKey: false, timestamps: true },
)



const Quote = mongoose.model('Quote', quoteSchema)

export default Quote
