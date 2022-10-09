const { query } = require('express')
const { Schema } = require('mongoose')
const { dataHashing } = require('../../Utils/authUtils')

const userAuthorizationModel = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    typeOfUser: {
      type: String,
      default: 'user',
    },

    //un-comment them when you want to include these services

    // phonenumber: {
    //   type: String,
    // },
    // loginOTP: {
    //   type: String,
    //   default: '',
    // },
    // emailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // emailVerifiedOn: {
    //   type: String,
    //   default: '',
    // },
    // lastTimeLoggedIn: {
    //   type: String,
    //   default: '',
    // },
    // lastTimeLoggedOff: {
    //   type: String,
    //   default: '',
    // },
  },
  {
    timestamps: true,
  }
)

userAuthorizationModel.statics.createUser = async function (data) {
  try {
    const { username, email, password } = data
    const hashedPassword = await dataHashing(password)
    const newUser = await this.create({
      username,
      email,
      password: hashedPassword,
    })
    return newUser
  } catch (e) {
    console.log(e.message)
  }
}

userAuthorizationModel.statics.fetchUser = async function (data) {
  try {
    const { username } = data
    const result = await this.findOne({ username })
    if (!result) return { isExists: false }
    return { result, isExists: true }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = userAuthorizationModel
