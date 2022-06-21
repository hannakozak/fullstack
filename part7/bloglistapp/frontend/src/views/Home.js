import { useEffect, useRef } from "react";

import LoginForm from "../components/LoginForm";
import NewBlogForm from "../components/NewBlogForm";
import Notification from "../components/Notification";
import Togglable from "../components/Togglable";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  removeNotification,
} from "../features/notificationSlice";
import { getPosts, postsSelector } from "../features/postsSlice";

import { userSelector } from "../features/userSlice";

import { v4 as uuidv4 } from "uuid";

export const Home = () => {
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

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (isError) return <p>Unable to display posts.</p>;

    return posts.map((post) => (
      <div key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm notify={notify} />
      </Togglable>

      <div>{renderPosts()}</div>
    </div>
  );
};
