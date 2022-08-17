import mongoose from 'mongoose'
const { Schema } = mongoose

const genreSchema = new mongoose.Schema(
  {
    label: Schema.Types.String,
    value: Schema.Types.String,
  },
  { versionKey: false }
)

const Genre = mongoose.model('Genre', genreSchema)

export default Genre
