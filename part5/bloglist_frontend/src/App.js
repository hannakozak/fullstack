import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState([''])
  const [author, setAuthor] = useState([''])
  const [url, setUrl] = useState([''])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [likes, setLikes] = useState(0)
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState(null)
  
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

  const handlecreateBlog = async (event) => {
    event.preventDefault()
    try{
      const response = await blogService.createBlog({title, author, url, likes })
      setBlogs(blogs.concat(response))
      setNotify({message: `a new blog ${response.title} by ${response.author} added`, type: "success"})
      setTimeout(() => {
        setNotify(null)
      },5000)
      setTitle("")
      setLikes("")
      setAuthor("")
      setUrl("")
    }
    catch(exception){
      setNotify({message: exception.response.data.error, type:"error"})
      setTimeout(() => {
        setNotify(null)
      },5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem("loggedBlogUser")
      setUser(null)
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
    } catch(exception){
      setNotify({message: exception.response.data.error, type:"error"})
      setTimeout(() => {
        setNotify(null)
      },5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm
        handleCreateBlog = {handlecreateBlog}
        handleLogout = {handleLogout}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        handleLikesChange={handleLikesChange}
      />
    </Togglable>
  )

 

  return (
    <div>
      <h2>Blogs</h2>
      {notify !== null && <Notification notify={notify}/>}
      
      {user === null ? loginForm() : 
      <div>
        <h2> {user.name} is logged in</h2>
         <button onClick={handleLogout}> log out </button>
        {blogForm()}
        </div>}

     
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
  )
}

export default App