const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const { defaultImagePath } = require('../secret')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'user name is required'],
      trim: true,
      minlength: [3, 'the length of user name must be more than 3 characters'],
      maxlength: [
        20,
        'the length of user name must be less than 20 characters',
      ],
    },
    email: {
      type: String,
      required: [true, 'user email is required'],
      trim: true,
      unique: true,
      lowercase: true,

      validate: {
        validator: function (value) {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(String(value).toLowerCase())
        },
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'user password is required'],
      minlength: [6, 'the length of password must be more than 6 characters'],
      set: function (value) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(value, salt)
        return hash
      },
    },
    image: {
      type: String,
      default: defaultImagePath,
    },

    address: {
      type: String,
      required: [true, 'user address is required'],
      trim: true,
      minlength: [
        3,
        'the length of user address must be more than 3 characters',
      ],
      maxlength: [
        42,
        'the length of user address must be less than 42 characters',
      ],
    },

    phone: {
      type: String,
      required: [true, 'user phone is required'],
      trim: true,
      minlength: [3, 'the length of user phone must be more than 3 characters'],
      maxlength: [
        20,
        'the length of user phone must be less than 20 characters',
      ],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const User = model('User', userSchema)
module.exports = User
