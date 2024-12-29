const express = require('express')
const seddRouter = express.Router()
const { seedUser } = require('../controllers/seedControllers')

seddRouter.get('/users', seedUser)

module.exports = seddRouter
