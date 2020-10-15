require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.static("build"))
app.use(express.json())
const Entry = require("./models/entry")

var morgan = require("morgan")
morgan.token("showRequest", (request, response) => {
	name = request.body.name
	number = request.body.number

	return JSON.stringify({ name: name, number: number })
})

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :showRequest"
	)
)

const cors = require("cors")
app.use(cors())

let entries = []

app.get("/api/entries", (request, response) => {
	Entry.find({}).then(entries => {
		response.json(entries)
	})
})

app.get("/info", (request, response) => {
	const date = new Date()
	const msg = `Phonebook has info for ${entries.length} people <br/></br>${date}`
	response.send(msg)
})

app.get("/api/entries/:id", (request, response) => {
	const id = Number(request.params.id)
	const entry = entries.find(entry => entry.id === id)

	if (entry) {
		response.json(entry)
	} else {
		response.status(204).end()
	}
})

app.delete("/api/entries/:id", (request, response) => {
	// const id = Number(request.params.id)
	// entries = entries.filter(entry => entry.id !== id)
	Entry.findByIdAndRemove(request.params.id)
	.then(result => {
		response.status(204).end()
	})
})

app.post("/api/entries", (request, response) => {
	// const id = Math.floor(Math.random() * 1000)
	const body = request.body
	if (body.name === undefined) {
		return response.status(400).json({ error: 'name missing'})
	} else if (body.number === undefined) {
		return response.status(400).json({ error: 'number missing'})
	}

	const entry = new Entry({
		name: body.name,
		number: body.number
	})
	// if (!entry.name) {
	// 	return response.status(400).json({
	// 		error: "name missing"
	// 	})
	// } else if (!entry.number) {
	// 	return response.status(400).json({
	// 		error: "number missing"
	// 	})
	// } else if (entries.find(e => e.name === entry.name)) {
	// 	return response.status(400).json({
	// 		error: "name already exists in phonebook"
	// 	})
	// }
	// entry.id = id
	// entries = entries.concat(entry)
	entry.save().then(savedEntry => {
		response.json(entry)
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
