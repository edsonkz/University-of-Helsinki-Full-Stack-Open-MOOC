import { useDispatch, useSelector } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import {
	createNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector((state) => state.anecdote);
	const filter = useSelector((state) => state.filter);

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
		dispatch(voteOn(id));
		dispatch(createNotification(`Voted on "${content}".`));

		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
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
