import React from "react";

export const User = ({ user }) => {
  return (
    <>
      <div>
        {user.name} {user.blogs.length}
      </div>
    </>
  );
};
