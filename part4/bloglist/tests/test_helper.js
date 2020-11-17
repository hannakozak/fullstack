const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
	author: 'Hanna',
    url: 'http://localhost:3003/api/blogs/1',
    likes: 34
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Hanna',
    url: 'http://localhost:3003/api/blogs/2',
	likes: 3
  }
 
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb, usersInDb
}