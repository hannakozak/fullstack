import React from "react";
import { Link } from "react-router-dom";

export const BlogList = ({ blog }) => {
  return (
    <div>
      <Link to={`/posts/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};
