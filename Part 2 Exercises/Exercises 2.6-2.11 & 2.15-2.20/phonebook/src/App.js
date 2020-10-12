import React, { useState, useEffect } from "react"
import DisplayFilteredItems from "./components/DisplayFilteredItems"
import PersonForm from "./components/PersonForm"
import FilterBox from "./components/FilterBox"
import personService from "./services/persons"
import Notification from "./components/Notification"
import ErrorMessage from "./components/ErrorMessage"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		personService.getAll().then(response => {
			setPersons(response.data)
		})
	}, [])

	// finds the corresponding id for a given name in the database
	const findPersonID = name => {
		for (let i = 0; i < persons.length; i++) {
			if (persons[i].name === name) {
				return persons[i].id
			}
		}
	}

	const handleNameChange = event => {
		setNewName(event.target.value)
	}

	const handleNumberChange = event => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = event => {
		setNewFilter(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		let n = []
		if (persons.length > 0) {
			persons.forEach(person => n.push(person.name))
		}

		const personObject = {
			name: newName,
			number: newNumber
		}

		// check if the name already exists in the phonebook
		if (n.includes(newName)) {
			let msg = `Replace ${newName}'s old number with a new one?`
			if (window.confirm(msg)) {
				// update the old entry with the new number
				let personID = findPersonID(newName)
				personService.update(personObject, personID).then(response => {
					personService.getAll().then(r => {
						setMessage(`Changed ${newName}'s number`)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
						setPersons(r.data)
					})
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          personService.getAll().then(response => {
            setPersons(response.data)
          })

        })
			}
		} else {
			// name does not already exist in phonebook, so create new entry
			personService.create(personObject).then(response => {
				personService.getAll().then(r => {
					setMessage(`Added ${newName}`)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
					setPersons(r.data)
				})
			})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
      <ErrorMessage message={errorMessage} />

			<FilterBox
				filterValue={newFilter}
				handleFilterChange={handleFilterChange}
			/>

			<h2>add a new</h2>

			<PersonForm
				handleSubmit={handleSubmit}
				nameValue={newName}
				nameOnChange={handleNameChange}
				numberValue={newNumber}
				numberOnChange={handleNumberChange}
			/>

			<h2>Numbers</h2>

			<DisplayFilteredItems
				persons={persons}
				setPersons={setPersons}
				filter={newFilter}
			/>
		</div>
	)
}

export default App
