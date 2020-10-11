import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayFilteredItems from './components/DisplayFilteredItems'
import FilterBox from "./components/FilterBox"

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div> 
      <FilterBox filterValue={newFilter} handleFilterChange={handleFilterChange} />
      <br></br>
      <DisplayFilteredItems countries={countries} filter={newFilter} setNewFilter={setNewFilter}/>
    </div>
  )
}

export default App