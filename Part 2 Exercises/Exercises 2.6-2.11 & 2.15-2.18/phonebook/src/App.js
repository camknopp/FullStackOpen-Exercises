import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayFilteredItems from './components/DisplayFilteredItems'
import PersonForm from "./components/PersonForm"
import FilterBox from "./components/FilterBox"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let n = []
    if (persons.length > 0)
    {
    persons.forEach(person => n.push(person.name))
    }

    if (n.includes(newName)) {
      window.alert(newName + " is already added to phonebook")
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <FilterBox filterValue={newFilter} handleFilterChange={handleFilterChange} />
      
      <h2>add a new</h2>

      <PersonForm handleSubmit={handleSubmit} nameValue={newName}
      nameOnChange={handleNameChange} numberValue={newNumber} 
      numberOnChange={handleNumberChange} />

      <h2>Numbers</h2>

      <DisplayFilteredItems persons={persons} filter={newFilter} />
    </div>
  )
}

export default App