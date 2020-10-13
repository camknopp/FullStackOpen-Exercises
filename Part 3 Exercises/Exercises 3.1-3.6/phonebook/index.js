const express = require('express')
const app = express()

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

app.get('/api/entries', (request, response) => {
    response.json(entries)
})

app.get('/info', (request, response) => {
    const date = new Date()
    const msg = `Phonebook has info for ${entries.length} people <br/></br>${date}`
    response.send(msg)
})

app.get('/api/entries/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = entries.find(entry => entry.id === id)

    if (entry) {
        response.json(entry)
    } else {
        response.status(204).end()
    }
})

app.delete('/api/entries/:id', (request, response) => {
    const id = Number(request.params.id)
    entries = entries.filter(entry => entry.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})