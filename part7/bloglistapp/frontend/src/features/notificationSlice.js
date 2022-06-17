import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      return state.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
