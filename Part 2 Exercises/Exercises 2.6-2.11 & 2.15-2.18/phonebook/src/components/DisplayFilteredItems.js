import React from 'react'
import personService from "./../services/persons"
  
const DisplayFilteredItems = ({persons, setPersons, filter}) => {
    // display the phonebook entries according to specified filter

    let n = []
    
    // handler for when the 'delete' button is clicked
    // deletes the corresponding entry in the database
    const deleteClicked = (id, name) => {
        if(window.confirm(`Delete ${name}?`)) {
            console.log("button pressed for ", id)

            personService.remove(id)
            .then(response => {
                console.log("removing ", id)
                personService.getAll()
                .then(response => {
                    setPersons(response.data)
                    console.log("persons:", persons)
                })
            })
        } else {
            return
        }
    }
    
    // filters out entries according to specified filter
    for (let i = 0; i < persons.length; i++) {
        if ((persons[i].name.toLowerCase()).includes(filter.toLowerCase())) {
            n.push(persons[i])
        }
    }

    // return a formatted list of <name> <number> with a delete button for each entry
    return (
    n.map(person => 
    <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deleteClicked(person.id, person.name)}>delete</button>
    </div>)
    )
}

export default DisplayFilteredItems