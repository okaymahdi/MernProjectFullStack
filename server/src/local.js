/** --------------- IMPORT --------------- */
/** Create Express Server */
const express = require('express')

/** Import http errors */
const httpErrors = require('http-errors')

/** Morgan for Show Reauest */
const morgan = require('morgan')

/** Reauire body parser */
const bodyParser = require('body-parser')

/** Import xss-clean */
const xssClean = require('xss-clean')

/** Import Rate Limit */
const rateLimit = require('express-rate-limit')

/** --------------- MIDDLEWARE --------------- */
/** Create Express Server */
const app = express()

/** Create Rate Limit Middleware */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again in 15 minutes',
})
/** Use Rate Limit Middleware */
app.use(limiter)

/** Third Party Middleware */
app.use(morgan('dev'))

/** Express body parser Middleware */
// app.use(express.json())

/** Third Party Middleware */
app.use(bodyParser.json())

/** Express form related Middleware */
// app.use(express.urlencoded({ extended: true }))

/** Third Party Middleware */
app.use(bodyParser.urlencoded({ extended: true }))

/** use xss-clean */
app.use(xssClean())

/** Login Middleware */
const isLoggedIn = (req, res, next) => {
  /** check if user is logged in */
  const login = true
  if (login) {
    /** Change request body
     * before pass to express.json in app.use(express.json())
     */
    req.body.id = 101
    /** call next */
    next()
  } else {
    return res.status(401).json({ message: 'You are not logged in' })
  }
}

/** --------------- Use Middleware all api --------------- */
// app.use(isLoggedIn)

/** HTTP Reauest & Respns */
/** Create a GET route */
app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.status(200).send({
    message: 'Welcome to the product API',
  })
})

/** --------------- Use Middleware ---------------
 * app.get('/api/user', isLoggedIn, (req, res){}
 *
 * এভাবে শুধু একটা api তে কাজ করবে।
 * যদি সব api তে কাজ করা তে হয় তাহলে app.use() এর মধ্যে middleware কে কল করে দিবে। কারন app.use() টা সব api তে কল হচ্ছে।
 * app.use(isLoggedIn)
 */

app.get('/api/user', isLoggedIn, (req, res) => {
  console.log(req.body.id)
  res.status(200).send({
    message: 'user profile is returned',
  })
})

/** Client Error Handling */
app.use((req, res, next) => {
  //   res.status(404).send({
  //     message: 'Route not found',
  //   })

  /**
   * ? Use http errors
   */
  next(httpErrors(404, 'Route not found'))
})

/** Server Error Handling -> All The Errors */
app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    success: false,
    message: err.message,
  })
})
