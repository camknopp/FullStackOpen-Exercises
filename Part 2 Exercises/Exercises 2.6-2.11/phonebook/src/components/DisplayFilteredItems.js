import React from 'react'
  
const DisplayFilteredItems = ({persons, filter}) => {
    let n = []
    
    for (let i = 0; i < persons.length; i++) {
    if ((persons[i].name.toLowerCase()).includes(filter.toLowerCase())) {
        n.push(persons[i])
    }
    }

    return (
    n.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    )
}

export default DisplayFilteredItems