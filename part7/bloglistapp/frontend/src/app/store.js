import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import postsSlice from "../features/postsSlice";
import notificationSlice from "../features/notificationSlice";
import userSlice from "../features/userSlice";

const reducers = combineReducers({
  notification: notificationSlice,
  posts: postsSlice,
  user: userSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["notification", "posts"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
