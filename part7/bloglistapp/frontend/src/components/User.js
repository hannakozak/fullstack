import React from "react";

export const User = ({ user }) => {
  return (
    <>
      <td>{user.name}</td>
      <td> {user.blogs.length}</td>
    </>
  );
};
