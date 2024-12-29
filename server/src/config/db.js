const mongoose = require('mongoose')
const { mongodbURL } = require('../secret')
const connectDatabse = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options)
    console.log('mongodb connected')

    mongoose.connection.on('error', (err) => {
      console.error('mongodb connection error: ', err)
    })
  } catch (error) {
    console.error('could not connect to mongodb: ', error.toString())
  }
}

module.exports = connectDatabse
