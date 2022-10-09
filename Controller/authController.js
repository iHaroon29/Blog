const authorizationSchema = require('../Database/Schema/authorizationSchema')
const { dataVerifying } = require('../Utils/authUtils')
const { jwtGeneration } = require('../Utils/jwtUtils')

module.exports = {
  async userSignUp(req, res, next) {
    try {
      const { username, email, password } = req.body
      const existingUser = await authorizationSchema.fetchUser({ username })
      if (existingUser.isExists) throw new Error(`${username} already exists!!`)
      const newUser = await authorizationSchema.createUser({
        username,
        email,
        password,
      })
      const token = await jwtGeneration({ username })
      res.status(200).send({
        message: 'User Succesfully joined!!',
        token,
        auth: true,
      })
    } catch (e) {
      res.status(400).send({ message: e.message, auth: false })
    }
  },
  async userLogin(req, res, next) {
    try {
      const { username, email, password } = req.body
      const existingUser = await authorizationSchema.fetchUser({ username })
      if (!existingUser.isExists)
        throw new Error(`${username} doesn't exist! Please signup`)
      const passwordVerification = await dataVerifying({
        normalData: password,
        hashedData: existingUser.result.password,
      })
      if (!passwordVerification) throw new Error('Invalid Credentials!!')
      const token = await jwtGeneration({ username })
      res
        .status(200)
        .send({ message: 'User authenticated!', auth: true, token })
    } catch (e) {
      res.status(400).send({ message: e.message, auth: false })
    }
  },
  async userLogout(req, res, next) {
    try {
      req.logout()
      res.status(200).status({ message: 'Logout successful!' })
    } catch (e) {
      res.status(400).send({ message: e.message })
    }
  },
}
