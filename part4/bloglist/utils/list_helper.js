const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? 
    {
      title: a.title,
      author: a.author,
      likes: a.likes
    }
    : b)) 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}