import React, { useEffect, useState } from "react";
import Country from "./Country";
import CountryButton from "./CountryButton";

const Countries = ({ countries, filter }) => {
	if (countries.length > 10)
		return (
			<div>
				<p>Too many countries</p>
			</div>
		);
	else if (countries.length === 1)
		return (
			<div>
				<Country country={countries[0]} />
			</div>
		);
	else if (countries.length > 1 && countries.length <= 10)
		return (
			<div>
				{countries.map((country) => (
					<CountryButton key={country.name} country={country} />
				))}
			</div>
		);
};

export default Countries;
