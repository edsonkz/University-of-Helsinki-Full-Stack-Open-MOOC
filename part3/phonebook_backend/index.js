const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const generateId = () => {
	const maxId =
		persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body"
	)
);

app.get("/api/persons", (request, response) => {
	response.send(persons);
});

app.get("/info", (request, response) => {
	response.send(`<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	let person = persons.find((person) => person.id === Number(id));

	if (!person) {
		response.status(404).send({ error: "Person not found with that id." });
	}

	response.send(person);
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number)
		response.status(400).send({
			error: "Name and number are required. Check if you request define those attributes.",
		});
	else if (persons.find((person) => person.name === body.name))
		response.status(400).send({ error: "Name must be unique." });

	let { name, number } = body;
	let newPerson = {
		id: generateId(),
		name,
		number,
	};

	persons = persons.concat(newPerson);

	response.status(201).send(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	persons = persons.filter((person) => person.id !== Number(id));

	response.send("Person was succefully deleted");
});

const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
