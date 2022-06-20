import { useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

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

import { logout, userSelector } from "./features/userSlice";

import { v4 as uuidv4 } from "uuid";

const App = () => {
  const dispatch = useDispatch();
  const { posts, loading, isError } = useSelector(postsSelector);
  const { authUser } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const blogFormRef = useRef();
  // const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

  //useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs.sort(byLikes)));
  // }, []);

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

  if (!authUser.name) {
    return (
      <>
        <Notification />
        <LoginForm notify={notify} />
      </>
    );
  }

  const logoutHandle = () => {
    dispatch(logout());
    notify("good bye!");
  };
  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (isError) return <p>Unable to display posts.</p>;

    return posts.map((post) => (
      <Blog
        key={post.id}
        post={post}
        likeBlog={likeBlog}
        removePost={removePost}
        authUser={authUser}
      />
    ));
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {authUser.name} logged in
        <button onClick={logoutHandle}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm notify={notify} />
      </Togglable>

      <div>{renderPosts()}</div>
    </div>
  );
};

export default App;
