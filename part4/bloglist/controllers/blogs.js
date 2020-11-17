const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user');

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate("user", {username:1, name:1, })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    } 
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
	title: body.title,
	author: body.author,
	url: body.url,
	likes: body.likes
  })
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})
   


module.exports = blogsRouter


