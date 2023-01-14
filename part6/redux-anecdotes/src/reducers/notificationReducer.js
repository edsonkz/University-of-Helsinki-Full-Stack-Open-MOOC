import { createSlice } from "@reduxjs/toolkit";

let timer;

const initialState = "";

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		createNotification(state, action) {
			const notification = action.payload;

			return notification;
		},
		removeNotification(state, action) {
			return "";
		},
	},
});

export const { createNotification, removeNotification } =
	notificationSlice.actions;

export const setNotification = (notification, time) => {
	return async (dispatch) => {
		dispatch(createNotification(notification));
		clearTimeout(timer);
		timer = setTimeout(() => {
			dispatch(removeNotification());
		}, time * 1000);
		//return () => clearTimeout(runTimer);
	};
};

export default notificationSlice.reducer;
