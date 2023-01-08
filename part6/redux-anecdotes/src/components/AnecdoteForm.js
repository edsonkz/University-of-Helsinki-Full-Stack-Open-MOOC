import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	createNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";
		dispatch(createAnecdote(content));
		dispatch(createNotification(`Anecdote "${content}" was created.`));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="content" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
