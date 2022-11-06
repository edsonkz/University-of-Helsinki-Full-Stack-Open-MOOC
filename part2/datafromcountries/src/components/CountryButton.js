import React, { useState } from "react";
import Country from "./Country";

const CountryButton = ({ country }) => {
	const [fullCountry, setFullCountry] = useState({});
	const [show, setShow] = useState(false);

	const handleCurrentCountry = () => {
		setFullCountry(country);
		setShow(!show);
	};

	return (
		<div>
			{country.name}{" "}
			<button onClick={(e) => handleCurrentCountry(e, country)}>
				{!show ? "show" : "close"}
			</button>
			{show ? (
				<div>
					<Country country={fullCountry} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default CountryButton;
