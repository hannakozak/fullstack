import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </nav>
  );
};
