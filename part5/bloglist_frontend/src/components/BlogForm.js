import React,  { useState } from 'react'

const BlogForm = ({ handlecreateBlog }) => {
    const [title, setTitle] = useState([''])
    const [author, setAuthor] = useState([''])
    const [url, setUrl] = useState([''])
    const [likes, setLikes] = useState(0)

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
    return (
        <div>
            <h2>Create new blog post</h2>
            <form onSubmit={handlecreateBlog}>
                <div>Title:<input value={title} onChange={handleTitleChange}/></div>
                <div>Author:<input value={author} onChange={handleAuthorChange}/></div>
                <div>Url:<input value={url} onChange={handleUrlChange}/></div>
                <div>Likes:<input value={likes} onChange={handleLikesChange}/></div>
                <div><button type="submit">create</button></div>
            </form>
        </div>
    )
}

export default BlogForm