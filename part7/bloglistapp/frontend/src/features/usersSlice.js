import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = {
  users: [],
  loading: false,
  isError: false,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await usersService.getAll();
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  },
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
    },
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.users = payload;
      state.error = error;
    },
  },
});

//export const { logout } = userSlice.actions;

export const usersSelector = (state) => state.users;

export default usersSlice.reducer;
