

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})