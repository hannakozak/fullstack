import React from "react";
import { Header } from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector, likePost, deletePost } from "../features/postsSlice";
import {
  addNotification,
  removeNotification,
} from "../features/notificationSlice";
import { userSelector } from "../features/userSlice";
import { v4 as uuidv4 } from "uuid";

export const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector(postsSelector);
  const { authUser } = useSelector(userSelector);
  const post = posts.find((post) => post.id === id);

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
    navigate("/");
  };

  const notify = (message, type = "info") => {
    const id = uuidv4();
    dispatch(addNotification({ message, type, id }));
    setTimeout(() => dispatch(removeNotification(id)), 3000);
  };

  const addedBy = post.user && post.user.name ? post.user.name : "anonymous";
  const own = post.user && authUser.username === post.user.username;

  return (
    <>
      <Header />
      <div>
        <h1>{post.title}</h1>
        <div>
          <a href={post.url}>{post.url}</a>
        </div>
        <div>
          {post.likes} likes{" "}
          <button onClick={() => likeBlog(post.id)}>like</button>
        </div>
        added by {addedBy}
        {own && <button onClick={() => removePost(post.id)}>remove</button>}
      </div>
    </>
  );
};
