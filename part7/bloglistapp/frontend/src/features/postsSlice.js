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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await blogsService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue([], err);
    }
  },
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ id, likedPost }, { rejectWithValue }) => {
    try {
      return await blogsService.update(id, likedPost);
    } catch (err) {
      return rejectWithValue([], err);
    }
  },
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost(state, action) {
      const { id, likes } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.likes = likes + 1;
      }
    },
  },
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
    [deletePost.fulfilled]: (state, { payload }) => {
      const posts = state.posts.filter((post) => post.id !== payload.id);
      state.posts = posts;
      state.loading = false;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [likePost.fulfilled]: (state, { payload }) => {
      const post = state.posts.find((post) => post.id === payload.id);
      post.likes = payload.likes;
      state.loading = false;
    },
    [likePost.pending]: (state) => {
      state.loading = true;
    },
    [likePost.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const postsSelector = (state) => state.posts;

export default postsSlice.reducer;
