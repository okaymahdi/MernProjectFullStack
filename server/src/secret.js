require('dotenv').config()

const serverPort = process.env.SERVER_PORT || 3001
const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017'

const defaultImagePath =
  process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.svg'

module.exports = { serverPort, mongodbURL, defaultImagePath }
