const connection = require('../databaseConfig')

const blogModel = connection.model('Blogs', require('../Models/blogModel'))

module.exports = blogModel
