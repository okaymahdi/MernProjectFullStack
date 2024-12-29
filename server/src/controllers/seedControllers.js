const data = require('../data')
const User = require('../modules/userModel')
const seedUser = async (req, res, next) => {
  try {
    // deleting all existing users
    await User.deleteMany({})

    // inserting new users
    const users = await User.insertMany(data.users)

    // Successfully inserted users
    return res.status(201).json(users)
  } catch (error) {
    next(error)
  }
}
module.exports = { seedUser }
