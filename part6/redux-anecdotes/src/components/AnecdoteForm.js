import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const addAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";
		props.createAnecdote(content);
		props.setNotification(`Anecdote "${content}" was created.`, 5);
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

const connectedAnecdoteForm = connect(null, {
	createAnecdote,
	setNotification,
})(AnecdoteForm);

export default connectedAnecdoteForm;
