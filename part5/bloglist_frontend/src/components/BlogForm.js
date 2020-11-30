import React from 'react'

const BlogForm = ({ user,  handlecreateBlog, 
    handleTitleChange, title, author, handleAuthorChange, url, handleUrlChange,
    likes, handleLikesChange }) => {
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