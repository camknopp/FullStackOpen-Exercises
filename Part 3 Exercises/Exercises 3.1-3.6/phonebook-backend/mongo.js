const mongoose = require("mongoose")

const password = process.argv[2]

const url = `mongodb+srv://camlk10:${password}@cluster0.khj58.mongodb.net/entries?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})

const entrySchema = new mongoose.Schema({
	name: String,
	number: Number
})

const Entry = mongoose.model("Entry", entrySchema)

if (process.argv.length < 4) {
	console.log("phonebook:")
	Entry.find({}).then(result => {
		result.forEach(entry => {
			console.log(`${entry.name} ${entry.number}`)
		})
		mongoose.connection.close()
	})
} else {
	const name = process.argv[3]
	const number = process.argv[4]

	const entry = new Entry({
		name: name,
		number: number
	})

	entry.save().then(result => {
		console.log(`Added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
}
