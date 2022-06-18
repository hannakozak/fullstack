import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const initialState = {
  posts: [],
  loading: false,
  isError: false,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await blogsService.getAll();
      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost, { rejectWithValue }) => {
    try {
      const data = await blogsService.create(newPost);
      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  },
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
    [getPosts.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.posts = payload;
      state.error = error;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts.concat(payload);
      state.loading = false;
    },
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.posts = payload;
      state.error = error;
    },
  },
});

export const postsSelector = (state) => state.posts;

export default postsSlice.reducer;
