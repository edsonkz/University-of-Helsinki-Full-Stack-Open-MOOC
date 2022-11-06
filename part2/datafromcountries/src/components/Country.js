import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
	const [weather, setWeather] = useState({});
	const [noWeather, setNoWeather] = useState(false);

	useEffect(() => {
		if (!country.latlng) {
			setNoWeather(true);
		} else {
			axios
				.get("https://api.openweathermap.org/data/2.5/weather", {
					params: {
						lat: country.latlng[0],
						lon: country.latlng[1],
						appid: process.env.REACT_APP_API_KEY,
					},
				})
				.then((response) => {
					console.log(response.data);
					setWeather(response.data);
					setNoWeather(false);
				});
		}
	}, []);

	return (
		<div>
			<h1>{country.name}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<b>languages:</b>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img style={{ height: 200, weight: 200 }} src={country.flags.svg} />
			{!noWeather ? (
				<>
					<h2>Weather in {country.name}</h2>
					{Object.keys(weather).length > 0 ? (
						<div>
							<p>
								temperature{" "}
								{(weather.main.temp - 273).toFixed(2)} Celcius
							</p>
							<img
								src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
							/>
							<p>wind {weather.wind.speed.toFixed(2)} m/s</p>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</>
			) : (
				<h2>No weather information</h2>
			)}
		</div>
	);
};

export default Country;
