import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const Stats = () => {
	const all = () => {
		return (
			store.getState().good + store.getState().ok + store.getState().bad
		);
	};

	const average = () => {
		let good = store.getState().good;
		let bad = store.getState().bad;
		let ok = store.getState().ok;

		if (!good && !bad && !ok) return 0;
		else return ((good * 1 + bad * -1) / (good + bad + ok)).toFixed(1);
	};

	const positive = () => {
		let good = store.getState().good;
		let bad = store.getState().bad;
		let ok = store.getState().ok;

		if (!good && !bad && !ok) return 0;
		else return ((100 * good) / (good + bad + ok)).toFixed(1);
	};

	return (
		<div>
			<h1>Statistics</h1>

			<table>
				<tr>
					<td>good</td> <td>{store.getState().good}</td>
				</tr>
				<tr>
					<td>ok</td> <td>{store.getState().ok}</td>
				</tr>
				<tr>
					<td>bad</td> <td>{store.getState().bad}</td>
				</tr>
				<tr>
					<td>all</td> <td>{all()}</td>
				</tr>
				<tr>
					<td>average</td> <td>{average()}</td>
				</tr>
				<tr>
					<td>positive</td> <td>{positive()} %</td>
				</tr>
			</table>
		</div>
	);
};

const App = () => {
	const good = () => {
		store.dispatch({
			type: "GOOD",
		});
	};

	const ok = () => {
		store.dispatch({
			type: "OK",
		});
	};

	const bad = () => {
		store.dispatch({
			type: "BAD",
		});
	};

	const reset = () => {
		store.dispatch({
			type: "ZERO",
		});
	};

	return (
		<div>
			<h1>give feedback</h1>
			<button onClick={good}>good</button>
			<button onClick={ok}>ok</button>
			<button onClick={bad}>bad</button>
			<button onClick={reset}>reset stats</button>
			<Stats />
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
	root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
