const connection = require('../databaseConfig')

const authorizationSchema = connection.model(
  'Users',
  require('../Models/authenticationModel')
)

module.exports = authorizationSchema
