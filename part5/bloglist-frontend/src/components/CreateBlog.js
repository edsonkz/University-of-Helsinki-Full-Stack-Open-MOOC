import { useState } from "react";

const CreateBlog = ({ handleCreateBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const createNewBlog = (e) => {
		e.preventDefault();
		console.log(title);
		handleCreateBlog(title, author, url);

		setAuthor("");
		setTitle("");
		setUrl("");
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createNewBlog}>
				<div>
					<label htmlFor="title">title:</label>
					<input
						type="text"
						name="title"
						className="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="author">author:</label>
					<input
						type="text"
						name="author"
						className="author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="url">url:</label>
					<input
						type="text"
						name="url"
						className="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button className="create">create</button>
			</form>
		</div>
	);
};

export default CreateBlog;
