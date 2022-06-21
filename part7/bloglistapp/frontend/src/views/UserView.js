import React from "react";
import { BlogList } from "../components/BlogList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/usersSlice";

export const UserView = () => {
  const { users } = useSelector(usersSelector);
  const { id } = useParams();

  const user = users.find((user) => user.id === id);
  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      {user.blogs.map((blog) => (
        <BlogList key={blog.id} blog={blog} />
      ))}
      {console.log(user)}
    </>
  );
};
