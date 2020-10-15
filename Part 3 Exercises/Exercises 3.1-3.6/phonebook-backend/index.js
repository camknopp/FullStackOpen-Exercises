require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.static("build"))
app.use(express.json())
const Entry = require("./models/entry")

const morgan = require("morgan")
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

const errorHandler = (error, request, response, next) => {
	console.log(error.message)

	if (error.name == "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	}

	next(error)
}

app.get("/api/entries", (request, response) => {
	Entry.find({}).then(entries => {
		response.json(entries)
	})
})

app.get("/info", (request, response) => {
	Entry.find({}).then(entries => {
		const date = new Date()
		const msg = `Phonebook has info for ${entries.length} people <br/></br>${date}`
		response.send(msg)
	})
})

app.get("/api/entries/:id", (request, response, next) => {
	Entry.findById(request.params.id)
		.then(result => {
			response.json(result)
		})
		.catch(error => next(error))
})

app.delete("/api/entries/:id", (request, response, next) => {
	Entry.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put("/api/entries/:id", (request, response, next) => {
	body = request.body
	const entry = {
		name: body.name,
		number: body.number
	}

	Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
		.then(updatedEntry => {
			response.json(updatedEntry)
		})
		.catch(error => next(error))
})

app.use(errorHandler)

app.post("/api/entries", (request, response) => {
	const body = request.body

	if (body.name === undefined) {
		return response.status(400).json({ error: "name missing" })
	} else if (body.number === undefined) {
		return response.status(400).json({ error: "number missing" })
	}

	const entry = new Entry({
		name: body.name,
		number: body.number
	})

	entry.save().then(savedEntry => {
		response.json(entry)
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
