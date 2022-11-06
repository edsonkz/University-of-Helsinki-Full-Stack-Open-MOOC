import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filter, setFilter] = useState("");
	const [filterOn, setFilterOn] = useState(false);

	const personsToShow = !filterOn
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase())
		  );

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log(response.data);
			setPersons(response.data);
		});
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		let newPerson = {
			name: newName,
			number: newPhone,
			id: persons.length + 1,
		};
		if (persons.filter((person) => person.name === newName).length > 0) {
			alert(`${newName} is already added to phonebook`);
		}
		if (persons.filter((person) => person.number === newPhone).length > 0) {
			alert(`Number ${newPhone} is already added to phonebook`);
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewPhone("");
		}
	};

	const handleNewName = (e) => {
		setNewName(e.target.value);
	};

	const handleNewPhone = (e) => {
		setNewPhone(e.target.value);
	};

	const handleFilter = (e) => {
		setFilter(e.target.value);
		setFilterOn(true);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} handleFilter={handleFilter} />
			<h2>Add a New</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNewName={handleNewName}
				newPhone={newPhone}
				handleNewPhone={handleNewPhone}
			/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
