const {
  userLogin,
  userSignUp,
  userLogout,
} = require('../Controller/authController')
const {
  saveBlog,
  fetchBlog,
  deleteBlog,
} = require('../Controller/blogController')
const { isAuthenticated } = require('../Utils/authUtils')
const Router = require('express').Router()

Router.use(require('helmet')())
Router.use(require('express').json())
Router.use(require('express').urlencoded({ extended: true }))

// Invalid JSON format
Router.use((err, req, res, next) => {
  if (err.status === 400) {
    return res
      .status(err.status)
      .send({ status: err.status, message: 'Invalid JSON format' })
  }
  return next(err)
})

//Authorization Routes
Router.route('/auth/signup').post(userSignUp)
Router.route('/auth/login').post(userLogin)
Router.route('/auth/logout').get([isAuthenticated, userLogout])

// Blog related Routes
Router.route('/blogs/new').post([isAuthenticated, saveBlog])
Router.route('/blogs?').get([isAuthenticated, fetchBlog])
Router.route('/blogs/delete?').delete([isAuthenticated, deleteBlog])

// Invalid request / Invalid routes
Router.use((req, res, next) => {
  res.status(404).json({
    name: 'Error',
    status: 404,
    message: 'Invalid Request',
    statusCode: 404,
  })
})

module.exports = Router
