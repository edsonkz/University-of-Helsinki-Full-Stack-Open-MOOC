import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

export default function App() {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");
	const [filterOn, setFilterOn] = useState(false);

	useEffect(() => {
		axios.get("https://restcountries.com/v2/all").then((response) => {
			console.log(response.data);
			setCountries(response.data);
		});
	}, []);

	const countriesToShow = !filterOn
		? countries
		: countries.filter((country) =>
				country.name.toLowerCase().includes(filter.toLowerCase())
		  );

	const handleFilter = (e) => {
		setFilter(e.target.value);
		setFilterOn(true);
	};

	return (
		<div>
			<p>
				find countries <input onChange={handleFilter} value={filter} />
			</p>
			{!countriesToShow.length ? (
				<p>Countries are loading...</p>
			) : (
				<Countries countries={countriesToShow} />
			)}
		</div>
	);
}
