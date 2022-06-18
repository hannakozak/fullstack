import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/postsSlice";
import notificationSlice from "../features/notificationSlice";

export default configureStore({
  reducer: {
    notification: notificationSlice,
    posts: postsSlice,
  },
});
