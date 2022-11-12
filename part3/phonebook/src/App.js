import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import "./app.css";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filter, setFilter] = useState("");
	const [filterOn, setFilterOn] = useState(false);
	const [notification, setNotification] = useState("");
	const [errorNotification, setErrorNotification] = useState(false);

	const personsToShow = !filterOn
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase())
		  );

	useEffect(() => {
		personsService.getAll().then((response) => {
			console.log(response.data);
			setPersons(response.data);
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setNotification("");
			setErrorNotification(false);
		}, 2000);
	}, [notification]);

	const addPerson = (e) => {
		e.preventDefault();
		let newPerson = {
			name: newName,
			number: newPhone,
			id: persons.length + 1,
		};
		let oldPerson = persons.filter((person) => person.name === newName);
		if (oldPerson.length > 0) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			)
				personsService
					.update(oldPerson[0].id, newPerson)
					.then(() => {
						let id = oldPerson[0].id;
						let personsCopy = [...persons];
						personsCopy[persons.findIndex((x) => x.id === id)] = {
							...newPerson,
							id,
						};
						console.log(personsCopy);
						setPersons(personsCopy);
						setNotification(
							`The phone number of ${newPerson.name} was updated.`
						);
						setNewName("");
						setNewPhone("");
					})
					.catch(() => {
						setNotification(
							`Information about ${newPerson.name} has already been removed from server.`
						);
						setErrorNotification(true);
						setNewName("");
						setNewPhone("");
					});
		} else {
			personsService
				.create(newPerson)
				.then(() => {
					setPersons(persons.concat(newPerson));
					setNotification(
						`${newPerson.name} was added to the phone book.`
					);
					setNewName("");
					setNewPhone("");
				})
				.catch(() => {
					setNotification(
						`Information about ${newPerson.name} has already been added to the server.`
					);
					setErrorNotification(true);
					setNewName("");
					setNewPhone("");
				});
		}
	};

	const deletePerson = (toDeletePerson) => {
		if (window.confirm(`Do you want to delete ${toDeletePerson.name}?`)) {
			personsService
				.remove(toDeletePerson.id)
				.then(() => {
					let newPersons = persons.filter(
						(person) => person.id !== toDeletePerson.id
					);
					setNotification(
						`The phone number of ${toDeletePerson.name} was deleted.`
					);
					setPersons(newPersons);
				})
				.catch(() => {
					setNotification(
						`Information about ${toDeletePerson.name} has already been deleted from the server.`
					);
					setErrorNotification(true);
					setNewName("");
					setNewPhone("");
				});
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
			{notification.length > 0 ? (
				!errorNotification ? (
					<h3 className="notification">{notification}</h3>
				) : (
					<h3 className="notificationError">{notification}</h3>
				)
			) : (
				<></>
			)}

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
			<Persons persons={personsToShow} handleDelete={deletePerson} />
		</div>
	);
};

export default App;
