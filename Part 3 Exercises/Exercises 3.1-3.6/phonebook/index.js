const express = require("express")
const app = express()
app.use(express.json())

var morgan = require('morgan')
app.use(morgan('tiny'))

let entries = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "14235245"
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "23423423243"
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "4524523"
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "13423413414"
	}
]

app.get("/api/entries", (request, response) => {
	response.json(entries)
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
	const id = Number(request.params.id)
	entries = entries.filter(entry => entry.id !== id)

	response.status(204).end()
})

app.post("/api/entries", (request, response) => {
	const id = Math.floor(Math.random() * 1000)
	const entry = request.body
	if (!entry.name) {
		return response.status(400).json({
			error: "name missing"
		})
	} else if (!entry.number) {
		return response.status(400).json({
			error: "number missing"
		})
    } else if (entries.find(e => e.name === entry.name)) {
        return response.status(400).json({
            error: "name already exists in phonebook"
        })
    }
    

	entry.id = id
	entries = entries.concat(entry)
	response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
