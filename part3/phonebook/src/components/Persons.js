import React from "react";
import Person from "./Person";

const Persons = (props) => {
	return (
		<div>
			{props.persons.length > 0 ? (
				props.persons.map((person) => (
					<div key={person.id}>
						<Person person={person} />{" "}
						<button
							onClick={() => {
								props.handleDelete(person);
							}}
						>
							delete
						</button>
					</div>
				))
			) : (
				<p> Nenhuma pessoa carregada...</p>
			)}
		</div>
	);
};

export default Persons;
