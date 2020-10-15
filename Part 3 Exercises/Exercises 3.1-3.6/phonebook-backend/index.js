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
	// handles incorrect id

	console.log(error.message)

	if (error.name == "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	}

	next(error)
}

app.get("/api/entries", (request, response) => {
	// retrieve a json object with all of the entries

	Entry.find({}).then(entries => {
		response.json(entries)
	})
})

app.get("/info", (request, response) => {
	// retrieve info about the phonebook

	Entry.find({}).then(entries => {
		const date = new Date()
		const msg = `Phonebook has info for ${entries.length} people <br/></br>${date}`
		response.send(msg)
	})
})

app.get("/api/entries/:id", (request, response, next) => {
	// retrieve the entry with the specified id

	Entry.findById(request.params.id)
		.then(result => {
			response.json(result)
		})
		.catch(error => next(error))
})

app.delete("/api/entries/:id", (request, response, next) => {
	// delete the entry with the specified id

	Entry.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put("/api/entries/:id", (request, response, next) => {
	// update the entry with the specified id

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

app.post("/api/entries", (request, response, next) => {
	// add new name and number to phonebook

	const body = request.body

	if (body.name === undefined) {
		return response.status(400).json({ error: "name missing" })
	} else if (body.number === undefined) {
		return response.status(400).json({ error: "number missing" })
	}

	// Entry.find({}).then(entries => {
	// 	// check whether name already exists in phonebook
	// 	// if so, then update the existing entry with the new number

	// 	entries.forEach(entry => {
	// 		console.log("inside forEach")
	// 		console.log("entry", entry.name)
	// 		console.log("typeof entry ", typeof entry.name)
	// 		console.log("body", body)
	// 		console.log("typeof body ", typeof body)

	// 		if (entry.name === body.name) {
	// 			console.log(`${entry.name} matches ${body.name}`)
	// 			let newEntry = {
	// 				name: body.name,
	// 				number: body.number
	// 			}

	// 			Entry.findByIdAndUpdate(entry._id.toString(), newEntry, { new: true })
	// 				.then(updatedEntry => {
	// 					console.log("inside findbyIdAndUpdate")
	// 					return response.json(updatedEntry)
	// 					//return
	// 					console.log("created json response")
	// 				})
	// 				.catch(error => next(error))
	// 		}
	// 	})
	// 	console.log("outside forEach")
	// })
	
	const entry = new Entry({
		name: body.name,
		number: body.number
	})

	entry.save().then(savedEntry => {
		response.json(entry)
	})
	console.log("saved new entry")
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
