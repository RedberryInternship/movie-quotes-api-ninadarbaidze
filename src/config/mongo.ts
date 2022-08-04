import mongoose from 'mongoose'

const isConnectedToLocalDatabase = () =>
  process.env.MONGO_PROTOCOL === 'mongodb'

const useLocalMongoDbUrl = () => {
  const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env
  return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
}

const useAtlasMongoDbUrl = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
  } = process.env

  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
}

const connect = async () => {
  try {
    const mongooseURL = isConnectedToLocalDatabase()
      ? useLocalMongoDbUrl()
      : useAtlasMongoDbUrl()

    return mongoose.connect(mongooseURL)
  } catch (err:any) {
    throw new Error(err.message)
  }
}

export default connect
