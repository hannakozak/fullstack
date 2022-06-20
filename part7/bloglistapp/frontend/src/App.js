import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import loginService from "./services/login";
import userService from "./services/user";

import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  removeNotification,
} from "./features/notificationSlice";
import {
  getPosts,
  deletePost,
  likePost,
  postsSelector,
} from "./features/postsSlice";

import { v4 as uuidv4 } from "uuid";

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const { posts, loading, isError } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const blogFormRef = useRef();
  // const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

  //useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs.sort(byLikes)));
  // }, []);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user);
        userService.setUser(user);
        notify(`${user.name} logged in!`);
      })
      .catch(() => {
        notify("wrong username/password", "alert");
      });
  };

  const logout = () => {
    setUser(null);
    userService.clearUser();
    notify("good bye!");
  };

  const likeBlog = (id) => {
    const postToLike = posts.find((b) => b.id === id);

    const likedPost = {
      ...postToLike,
      likes: (postToLike.likes || 0) + 1,
      user: postToLike.user.id,
    };

    dispatch(likePost({ id, likedPost }));
    notify(`you liked '${likedPost.title}' by ${likedPost.author}`);
  };

  const removePost = async (id) => {
    const postToRemove = posts.find((post) => post.id === id);
    const confirmWindow = window.confirm(
      `remove '${postToRemove.title}' by ${postToRemove.author}?`,
    );
    if (!confirmWindow) {
      return;
    }
    await dispatch(deletePost(id));
    dispatch(getPosts());
  };

  const notify = (message, type = "info") => {
    const id = uuidv4();
    dispatch(addNotification({ message, type, id }));
    setTimeout(() => dispatch(removeNotification(id)), 3000);
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (isError) return <p>Unable to display posts.</p>;

    return posts.map((post) => (
      <Blog
        key={post.id}
        post={post}
        likeBlog={likeBlog}
        removePost={removePost}
        user={user}
      />
    ));
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm notify={notify} />
      </Togglable>

      <div>{renderPosts()}</div>
    </div>
  );
};

export default App;
