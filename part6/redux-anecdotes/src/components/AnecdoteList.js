import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOn, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector((state) => state.anecdote);
	const filter = useSelector((state) => state.filter);

	useEffect(() => {
		dispatch(initializeAnecdotes());
	}, [dispatch]);

	const filteredAnecdotes =
		filter.length === 0
			? anecdotes
			: anecdotes.filter((anecdote) =>
					anecdote.content
						.toLowerCase()
						.includes(filter.toLowerCase())
			  );

	const vote = (id) => {
		let anecdote = anecdotes.filter((anecdote) => anecdote.id === id);
		let { content } = anecdote[0];
		dispatch(voteOn(anecdote[0]));
		dispatch(setNotification(`Voted on "${content}".`, 5));
	};

	return (
		<div>
			{filteredAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
