const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
	author: 'HK',
    url: 'http://localhost:3003/api/blogs/1',
    likes: 34
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'HK',
    url: 'http://localhost:3003/api/blogs/2',
	likes: 3
  }
 
]

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogInDb
}