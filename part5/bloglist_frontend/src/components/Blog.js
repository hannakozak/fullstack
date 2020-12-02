import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const [showFullBlog, setShowFullBlog] = useState(false)

    const showBlog = { display: showFullBlog ? '' : 'none' }

    const bloglist = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setShowFullBlog(!showFullBlog)
    }

    return (
        <div style={bloglist}>
            <div className="blog">
                <div>
                    {blog.title}
                    <button onClick={toggleVisibility}>{showFullBlog? 'hide' : 'show'}</button>
                </div>
                <div>{blog.author}</div>
            </div>
            <div className="blog" style={showBlog}>
                <div> {blog.url}</div>
                <div>
                    {blog.likes}
                    <button>like</button>
                </div>
            </div>
        </div>

    )
}

export default Blog
