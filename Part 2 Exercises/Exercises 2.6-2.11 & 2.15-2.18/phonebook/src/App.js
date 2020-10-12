import React, { useState, useEffect } from 'react'
import DisplayFilteredItems from './components/DisplayFilteredItems'
import PersonForm from "./components/PersonForm"
import FilterBox from "./components/FilterBox"
import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService.getAll()
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

      personService.create(personObject)
      .then(response => {
        personService.getAll()
        .then(r => {
          setPersons(r)
        })
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

      <DisplayFilteredItems persons={persons} setPersons={setPersons} filter={newFilter} />
    </div>
  )
}

export default App