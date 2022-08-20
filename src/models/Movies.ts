import mongoose from 'mongoose'
const { Schema } = mongoose

const movieSchema = new mongoose.Schema(
  {
    en: {
      movieName: Schema.Types.String,
      director: Schema.Types.String,
      description: Schema.Types.String,
    },
    ge: {
      movieName: Schema.Types.String,
      director: Schema.Types.String,
      description: Schema.Types.String,
    },
    image: Schema.Types.String,
    budget: Schema.Types.Number,
    year: Schema.Types.Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    genres: [
      {
        type: Schema.Types.String,
      },
    ],
    quotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quote',
      },
    ]
  },
  { versionKey: false, timestamps: true },
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
