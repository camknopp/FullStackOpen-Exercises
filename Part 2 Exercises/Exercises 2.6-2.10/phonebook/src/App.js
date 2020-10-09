import React, { useState } from 'react'
import DisplayFilteredItems from './components/DisplayFilteredItems'
import PersonForm from "./components/PersonForm"
import FilterBox from "./components/FilterBox"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


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
      setPersons(persons.concat({name: newName, number: newNumber}))
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