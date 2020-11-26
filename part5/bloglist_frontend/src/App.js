import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState([''])
  const [author, setAuthor] = useState([''])
  const [url, setUrl] = useState([''])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [likes, setLikes] = useState(0)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser")
    if(loggedBlogUser){
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try{
      const response = await blogService.createBlog({title, author, url, likes })
      setBlogs(blogs.concat(response))
      setTitle("")
      setLikes("")
      setAuthor("")
      setUrl("")
    }
    catch (exception) {
      setErrorMessage('Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage('Logout unsuccessful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      </form>
  )

  const BlogForm = () => (
    <div>
      <h2> {user.name} is logged in</h2>
      <button onClick={handleLogout}>
         log out
      </button>
      <h2>Create new blog post</h2>
      <form onSubmit={createBlog}>
      <div>Title:<input value={title} onChange={handleTitleChange}/></div>
      <div>Author:<input value={author} onChange={handleAuthorChange}/></div>
      <div>Url:<input value={url} onChange={handleUrlChange}/></div>
      <div>Likes:<input value={likes} onChange={handleLikesChange}/></div>
      <div><button type="submit">create</button></div>
    </form>  
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  return (
    <div>
      <h2>blogs</h2>
      {user === null && loginForm()}
      {user !== null && BlogForm()}
    </div>
  )
}

export default App