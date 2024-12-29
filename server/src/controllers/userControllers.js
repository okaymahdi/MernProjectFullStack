const httpErrors = require('http-errors')

const getUsers = (req, res, next) => {
  try {
    res.status(200).send({
      message: 'user ware returned',
    })
  } catch (error) {
    // next(error)
  }
}

module.exports = { getUsers }
