import { createSlice } from "@reduxjs/toolkit";

let timer;

const initialState = ["", false];

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload;

      return notification;
    },
    removeNotification(state, action) {
      return ["", false];
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification, time, error) => {
  return async (dispatch) => {
    dispatch(createNotification([notification, error]));
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
