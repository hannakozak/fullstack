import { useState } from "react";
import PropTypes from "prop-types";

const BlogDetails = ({ post, visible, likeBlog, removePost, own }) => {
  if (!visible) return null;

  const addedBy = post.user && post.user.name ? post.user.name : "anonymous";

  return (
    <div>
      <div>
        <a href={post.url}>{post.url}</a>
      </div>
      <div>
        {post.likes} likes{" "}
        <button onClick={() => likeBlog(post.id)}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={() => removePost(post.id)}>remove</button>}
    </div>
  );
};

const Blog = ({ post, likeBlog, removePost, authUser }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <div style={style} className="blog">
      {post.title} {post.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <BlogDetails
        post={post}
        visible={visible}
        likeBlog={likeBlog}
        removePost={removePost}
        own={post.user && authUser.username === post.user.username}
      />
    </div>
  );
};

Blog.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;
