import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) =>
    a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
  );
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const votedBlog = action.payload;
      const addedState = state.map((a) =>
        a.id === votedBlog.id ? votedBlog : a
      );
      return sortBlogs(addedState);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, updateBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = (user) => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    const filteredBlogs = blogs.filter(
      (blog) => blog.user.username === user.username
    );
    const sortedBlogs = sortBlogs(filteredBlogs);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(title, author, url);
    dispatch(appendBlog(newBlog));
  };
};

export const voteOn = (blog) => {
  return async (dispatch) => {
    const votedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogServices.addLike(votedBlog.id, votedBlog);
    dispatch(updateBlog(votedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    await blogServices.remove(id);
    const blogs = getState().blogs;
    let oldBlogs = blogs.filter((blog) => blog.id !== id);
    dispatch(setBlogs(oldBlogs));
  };
};

export default blogSlice.reducer;
