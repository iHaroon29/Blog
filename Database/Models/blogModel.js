const { Schema } = require('mongoose')

const blogSchema = new Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
)

blogSchema.statics.saveBlog = async function (data) {
  try {
    const { bBody, bTitle, username } = data
    const result = await this.create({
      username,
      title: bTitle,
      body: bBody,
    })
    return result
  } catch (e) {
    console.log(e.message)
  }
}

blogSchema.statics.fetchBlog = async function (data) {
  try {
    const { bTitle, page, username } = data
    let pageNumber = parseInt(page),
      query = {},
      skip,
      limit = 10
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    skip = pageNumber * 10 - 10
    if (username) query.username = username
    if (bTitle) query.title = bTitle
    const result = await this.find(query).limit(limit).skip(skip)
    return result
  } catch (e) {
    console.log(e.message)
  }
}

blogSchema.statics.deleteBlog = async function (data) {
  try {
    const { bTitle, username } = data
    const query = {}
    if (bTitle && username) {
      query.title = bTitle
      query.username = username
    }
    const result = await this.findOneAndDelete(query)
    return result
  } catch (e) {
    console.log(e)
  }
}

module.exports = blogSchema
