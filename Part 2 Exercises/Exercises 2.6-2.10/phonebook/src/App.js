import React, { useState } from 'react'

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

  const displayFilteredItems = () => {
    let n = []
    
    for (let i = 0; i < persons.length; i++) {
      if ((persons[i].name.toLowerCase()).includes(newFilter.toLowerCase())) {
          n.push(persons[i])
      }
    }
  
    return (
      n.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{displayFilteredItems()}</div>
      {/* {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)} */}
    </div>
  )
}

export default App