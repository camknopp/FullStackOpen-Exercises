import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    {}
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let n = []
    if (persons.length > 0)
    {
    persons.forEach(person => n.push(person.name))
    console.log(n);
    }

    if (n.includes(newName)) {
      window.alert(newName + " is already added to phonebook")
    } else {
      setPersons(persons.concat({name: newName}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App