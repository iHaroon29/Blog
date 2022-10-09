const bcrypt = require('bcrypt')
const { jwtVerification, jwtDecode } = require('./jwtUtils')
module.exports = {
  async dataHashing(data) {
    try {
      const hashedData = await bcrypt.hash(data, await bcrypt.genSalt(10))
      return hashedData
    } catch (e) {
      console.log(e.message)
    }
  },
  async dataVerifying({ normalData, hashedData }) {
    try {
      const result = await bcrypt.compare(normalData, hashedData)
      return result
    } catch (e) {
      console.log(e.message)
    }
  },
  async isAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers
      if (!authorization) throw new Error('Invalid Token!!')
      if (!/Bearer /.test(authorization))
        throw new Error('Invalid Token Format!!')
      const token = authorization.split(' ')[1].trim()
      const tokenVerification = await jwtVerification(token)
      if (!tokenVerification) throw new Error('Token Expired!!')
      const decodedData = await jwtDecode(token)
      res.locals.username = decodedData.username
      next()
    } catch (e) {
      res.status(400).send({ message: e.message, auth: false, redirect: '/' })
    }
  },
}
