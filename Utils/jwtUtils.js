const jwt = require('jsonwebtoken')

module.exports = {
  async jwtGeneration(data) {
    try {
      const token = jwt.sign(data, process.env.secret, {
        expiresIn: 4 * 60 * 60,
      })
      return token
    } catch (e) {
      console.log(e.message)
    }
  },
  async jwtVerification(data) {
    try {
      const result = jwt.verify(data, process.env.secret)
      return result
    } catch (e) {
      console.log(e.message)
    }
  },
  async jwtDecode(data) {
    try {
      const decodedData = jwt.decode(data)
      return decodedData
    } catch (e) {
      console.log(e.message)
    }
  },
}
