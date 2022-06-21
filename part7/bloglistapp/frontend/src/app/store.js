import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/postsSlice";
import notificationSlice from "../features/notificationSlice";
import userSlice from "../features/userSlice";
import usersSlice from "../features/usersSlice";

export default configureStore({
  reducer: {
    notification: notificationSlice,
    posts: postsSlice,
    user: userSlice,
    users: usersSlice,
  },
});
