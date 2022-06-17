import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../features/notificationSlice";

export default configureStore({
  reducer: {
    notification: notificationSlice,
  },
});
