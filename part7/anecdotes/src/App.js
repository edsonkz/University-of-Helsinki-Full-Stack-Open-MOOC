import { useState } from "react";
import {
	Routes,
	Route,
	Link,
	Navigate,
	useParams,
	useNavigate,
	useMatch,
} from "react-router-dom";

import { useField } from "./hooks";

const Menu = () => {
	const padding = {
		paddingRight: 5,
	};
	return (
		<div>
			<Link to="/" style={padding}>
				anecdotes
			</Link>
			<Link to="/create" style={padding}>
				create new
			</Link>
			<Link to="/about" style={padding}>
				about
			</Link>
		</div>
	);
};

const Notification = ({ notification }) => {
	if (notification === "") {
		return <div></div>;
	} else {
		return <div>{notification}</div>;
	}
};

const Anecdote = ({ anecdote }) => (
	<div>
		<h2>
			{anecdote.content} by {anecdote.author}
		</h2>
		<p>has {anecdote.votes} votes</p>
		<p>
			for more info see <a href={anecdote.info}>{anecdote.info}</a>
		</p>
	</div>
);

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map((anecdote) => (
				<Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
					<li>{anecdote.content}</li>
				</Link>
			))}
		</ul>
	</div>
);

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or
			an incident. Occasionally humorous, anecdotes differ from jokes
			because their primary purpose is not simply to provoke laughter but
			to reveal a truth more general than the brief tale itself, such as
			to characterize a person by delineating a specific quirk or trait,
			to communicate an abstract idea about a person, place, or thing
			through the concrete details of a short narrative. An anecdote is "a
			story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you
			can find the best and add more.
		</p>
	</div>
);

const Footer = () => (
	<div>
		Anecdote app for{" "}
		<a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
		<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
			https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
		</a>{" "}
		for the source code.
	</div>
);

const CreateNew = (props) => {
	const [content, contentReset] = useField("text");
	const [author, authorReset] = useField("text");
	const [info, infoReset] = useField("text");

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
	};

	const reset = (e) => {
		e.preventDefault();
		contentReset();
		authorReset();
		infoReset();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input name="content" {...content} />
				</div>
				<div>
					author
					<input name="author" {...author} />
				</div>
				<div>
					url for more info
					<input name="info" {...info} />
				</div>
				<button>create</button>
				<button onClick={reset}>reset</button>
			</form>
		</div>
	);
};

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: 1,
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: 2,
		},
	]);

	const anecdoteById = (id) => anecdotes.find((a) => a.id === Number(id));
	const [notification, setNotification] = useState("");
	const navigate = useNavigate();

	const match = useMatch("/anecdotes/:id");
	const anecdote = match ? anecdoteById(match.params.id) : null;

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setNotification(`${anecdote.content} added.`);
		setTimeout(() => {
			setNotification("");
		}, 5000);
		setAnecdotes(anecdotes.concat(anecdote));
		navigate("/");
	};

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<Notification notification={notification} />
			<Routes>
				<Route
					path="/anecdotes/:id"
					element={<Anecdote anecdote={anecdote} />}
				/>
				<Route
					path="/"
					element={<AnecdoteList anecdotes={anecdotes} />}
				/>
				<Route path="/about" element={<About />} />
				<Route path="/create" element={<CreateNew addNew={addNew} />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;