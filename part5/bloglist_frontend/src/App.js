import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notify, setNotify] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
        if(loggedBlogUser){
            const user = JSON.parse(loggedBlogUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    },[])

    const addBlog = async (blogObject) => {
        try{
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create( blogObject )
            const updatedBlogs = await blogService.getAll()
            setBlogs(blogs.concat(updatedBlogs))
            setNotify({ message: `a new blog ${response.title} by ${response.author} added`, type: 'success' })
            setTimeout(() => {
                setNotify(null)
            },5000)
        } catch(exception){
            setNotify({ message: exception.response.data.error, type:'error' })
            setTimeout(() => {
                setNotify(null)
            },5000)
        }
    }

    const likeBlog = async (id) => {
        try {
            const foundBlog = blogs.find(b => b.id === id)
            const updatedBlog = { ...foundBlog, likes: foundBlog.likes + 1 }
            const response = await blogService.update(id, updatedBlog)
            setBlogs(blogs.map(b => b.id !== id ? b : response))
        } catch(exception){
            setNotify({ message: exception.response.data.error, type:'error' })
            setTimeout(() => {
                setNotify(null)
            },5000)
        }
    }

    function handleLogout(event) {
        window.localStorage.removeItem('loggedBlogUser')
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
            setNotify({ message: exception.response.data.error, type:'error' })
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

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
                createBlog = {addBlog}
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
                    <Blog key={blog.id} blog={blog} handleLikeBlog={likeBlog} />
                )}
            </div>
        </div>
    )
}

export default App