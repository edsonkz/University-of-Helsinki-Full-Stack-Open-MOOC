import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import "./style.css";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState("");
	const [errorNotification, setErrorNotification] = useState(false);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogsService.setToken(user.token);
			blogsService.getAll().then((blogs) => {
				const filteredBlogs = blogs.filter(
					(blog) => blog.user.username === user.username
				);
				setBlogs(filteredBlogs);
			});
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setNotification("");
			setErrorNotification(false);
		}, 4000);
	}, [notification]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const userInfo = await loginService.login(username, password);
			window.localStorage.setItem("loggedUser", JSON.stringify(userInfo));
			blogsService.setToken(userInfo.token);
			const filteredBlogs = blogs.filter(
				(blog) => blog.user.username === userInfo.username
			);
			setBlogs(filteredBlogs);
			setUser(userInfo);
		} catch (error) {
			setNotification("Wrong username or password.");
			setErrorNotification(true);
		}
	};

	const handleCreateBlog = async (e) => {
		e.preventDefault();

		const newBlog = await blogsService.create(title, author, url);
		setBlogs(blogs.concat(newBlog));
		setNotification(`A new blog ${title} by ${author} was added`);
		setAuthor("");
		setTitle("");
		setUrl("");
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser(null);
	};

	const notificationPop = () => {
		return (
			<>
				{notification.length > 0 ? (
					!errorNotification ? (
						<h3 className="notification">{notification}</h3>
					) : (
						<h3 className="notificationError">{notification}</h3>
					)
				) : (
					<></>
				)}
			</>
		);
	};

	const userForm = () => {
		return (
			<div>
				<h2>blogs</h2>
				{notificationPop()}
				<p>
					{user.name} logged-in{" "}
					<button onClick={handleLogout}>logout</button>
				</p>
				<div>
					<h2>create new</h2>
					<form onSubmit={handleCreateBlog}>
						<div>
							<label htmlFor="title">title:</label>
							<input
								type="text"
								name="title"
								className="title"
								onChange={({ target }) =>
									setTitle(target.value)
								}
							/>
						</div>
						<div>
							<label htmlFor="author">author:</label>
							<input
								type="text"
								name="author"
								className="author"
								onChange={({ target }) =>
									setAuthor(target.value)
								}
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
						<button>create</button>
					</form>
				</div>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		);
	};

	const loginForm = () => {
		return (
			<div>
				<h2>log in to application</h2>
				{notificationPop()}
				<form onSubmit={handleLogin}>
					<div>
						<label htmlFor="username">username</label>
						<input
							type="text"
							name="username"
							className="username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">password</label>
						<input
							type="password"
							name="password"
							className="password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button>login</button>
				</form>
			</div>
		);
	};

	return <div>{user === null ? loginForm() : userForm()}</div>;
};

export default App;
