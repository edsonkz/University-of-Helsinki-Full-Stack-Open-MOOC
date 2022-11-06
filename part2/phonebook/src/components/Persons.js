import React from "react";
import Person from "./Person";

const Persons = (props) => {
	return (
		<div>
			{props.persons.length > 0 ? (
				props.persons.map((person) => (
					<Person key={person.id} person={person} />
				))
			) : (
				<p> Nenhuma pessoa carregada...</p>
			)}
		</div>
	);
};

export default Persons;
