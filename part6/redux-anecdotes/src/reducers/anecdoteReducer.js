import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdotes";

const sortAnecdotes = (anecdotes) => {
	return anecdotes.sort((a, b) =>
		a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0
	);
};

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		updateAnecdote(state, action) {
			const votedAnecdote = action.payload;
			const addedState = state.map((a) =>
				a.id === votedAnecdote.id ? votedAnecdote : a
			);
			return sortAnecdotes(addedState);
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteServices.getAll();
		const sortedAnecdotes = sortAnecdotes(anecdotes);
		dispatch(setAnecdotes(sortedAnecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteServices.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const voteOn = (anecdote) => {
	return async (dispatch) => {
		const votedAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1,
		};
		await anecdoteServices.addVote(votedAnecdote.id, votedAnecdote);
		dispatch(updateAnecdote(votedAnecdote));
	};
};

export default anecdoteSlice.reducer;
