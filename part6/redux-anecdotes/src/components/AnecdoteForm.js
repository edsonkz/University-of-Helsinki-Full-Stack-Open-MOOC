import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";
		dispatch(createAnecdote(content));
		dispatch(setNotification(`Anecdote "${content}" was created.`, 5));
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
