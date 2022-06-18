import { useState, useRef } from "react";
import { createPost } from "../features/postsSlice";
import { useDispatch } from "react-redux";

const NewBlogForm = ({ notify }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const createBlog = async (newPost) => {
    await dispatch(createPost(newPost));
    notify(`a new blog '${newPost.title}' by ${newPost.author} added`);

    blogFormRef.current.toggleVisibility();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url, likes: 0 });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <button id="create-butto" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
