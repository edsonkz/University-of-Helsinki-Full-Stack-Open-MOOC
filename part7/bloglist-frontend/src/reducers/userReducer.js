import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { initializeBlogs } from "./blogReducer";
import { setNotification } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const savedUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const userInfo = await loginService.login(username, password);
      window.localStorage.setItem("loggedUser", JSON.stringify(userInfo));
      blogService.setToken(userInfo.token);
      dispatch(setUser(userInfo));
      dispatch(initializeBlogs(userInfo));
    } catch (error) {
      dispatch(setNotification("Wrong username or password.", 5, true));
    }
  };
};

export const logoutUser = (user) => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(removeUser(user));
  };
};
export default userSlice.reducer;
