const blogSchema = require('../Database/Schema/blogSchema')

module.exports = {
  async saveBlog(req, res, next) {
    try {
      const { bTitle, bBody } = req.body
      if (!bTitle) throw new Error('Title Needed!')
      if (!bBody) throw new Error('Body Missing!')
      const newBlog = await blogSchema.saveBlog({
        bTitle,
        bBody,
        username: res.locals.username,
      })
      res.status(200).send({ message: 'Blog saved!!', redirect: '/Blog' })
    } catch (e) {
      res.status(400).send({ message: e.message })
    }
  },
  async fetchBlog(req, res, next) {
    try {
      const { bTitle, page } = req.query
      const blogs = await blogSchema.fetchBlog({
        bTitle,
        page,
        username: res.locals.username,
      })
      res.status(200).send({ blogs })
    } catch (e) {
      console.log(e.stack)
      res.status(400).send({ message: e.message })
    }
  },
  async deleteBlog(req, res, next) {
    try {
      const { bTitle } = req.query
      const deletedBlog = await blogSchema.deleteBlog({
        bTitle,
        username: res.locals.username,
      })
      res.status(200).send({ message: `${bTitle} is deleted!` })
    } catch (e) {
      res.status(400).send({ message: e.message })
    }
  },
}
