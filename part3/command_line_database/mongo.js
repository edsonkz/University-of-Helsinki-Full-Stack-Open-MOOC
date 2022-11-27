const mongoose = require("mongoose");

if (process.argv[2] < 3) {
	console.log(
		"Please provide  all arguments as follow: node mongo.js <password> <name> <number>"
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://adminEd:${password}@cluster0.86zxy.mongodb.net/test`;

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (!process.argv[3] && !process.argv[4]) {
	mongoose
		.connect(url)
		.then((result) => {
			console.log("connected.");
		})
		.then(() => {
			Person.find({}).then((result) => {
				result.forEach((person) => {
					console.log(person);
				});
				return mongoose.connection.close();
			});
		})
		.catch((err) => console.log(err));
} else {
	mongoose
		.connect(url)
		.then((result) => {
			console.log("connected.");
			const namePerson = process.argv[3];
			const number = process.argv[4];
			const person = new Person({
				name: namePerson,
				number,
			});

			return person.save();
		})
		.then(() => {
			console.log(
				`added ${process.argv[3]} number ${process.argv[4]} to the phonebook.`
			);
			return mongoose.connection.close();
		})
		.catch((err) => console.log(err));
}
