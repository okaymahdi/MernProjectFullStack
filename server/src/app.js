/** --------------- IMPORT --------------- */

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const userRouter = require('./routers/userRouter')
const seedRouter = require('./routers/seedRouter')

/** --------------- MIDDLEWARE --------------- */
const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again in 15 minutes',
})
app.use(limiter)
app.use(morgan('dev'))
// app.use(express.json())
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(xssClean())
app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)

// const isLoggedIn = (req, res, next) => {
//   /** check if user is logged in */
//   const login = true
//   if (login) {
//     req.body.id = 101

//     next()
//   } else {
//     return res.status(401).json({ message: 'You are not logged in' })
//   }
// }

/** --------------- Use Middleware all api --------------- */
// app.use(isLoggedIn)

/** HTTP Reauest & Respns */
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the product API',
  })
})

/** Client Error Handling */
app.use((req, res, next) => {
  next(httpErrors(404, 'Route not found'))
})

/** Server Error Handling -> All The Errors */
app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    success: false,
    message: err.message,
  })
})

module.exports = app
