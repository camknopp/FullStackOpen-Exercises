import React from 'react'
import axios from 'axios'
  
const DisplayFilteredItems = ({countries, filter}) => {
    let n = []
    
    for (let i = 0; i < countries.length; i++) {
    if ((countries[i].name.toLowerCase()).includes(filter.toLowerCase())) {
        n.push(countries[i])
    }

    }
    if (n.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (n.length > 1) {
        return (
            n.map(country => <div key={country.name}>
                
                {country.name}
                
                </div>)
            )
    } else if (n.length === 1) {
        let country = n[0]
        let capital = ""
        let languages = country.languages
        let weather
        let imageAltText = "flag of " + country.name
        let ACCESS_KEY = process.env.REACT_APP_API_KEY
        console.log(ACCESS_KEY)

        if (country.capital === '') {
            capital = 'DNE'
            axios.get('https://api.weatherstack.com/current', {
                access_key: ACCESS_KEY,
                query: country.name
            })
            .then(response => {
            weather = response.data
            console.log(weather)
            })
        } else {
            capital = country.capital
            axios.get('https://api.weatherstack.com/current', {
                access_key: ACCESS_KEY,
                query: country.capital
            })
            .then(response => {
            weather = response
            console.log(weather)
            })
        }

        return (
            <div>
                <h2>{country.name}</h2>
                <p>Capital: {capital}</p>
                <p>Population: {country.population}</p>

                <h3>Spoken languages</h3>
                <ul>
                    {languages.map((l, i)=> <li key={l.name}>{l.name}</li>)}
                </ul>

                <img alt={imageAltText} src={country.flag} width="150" height="150"></img>
                
                <h3>Weather in {capital === "DNE" ? country.name : capital}</h3>
                <p>Temperature: </p>
                <p>Wind: </p>
            </div>
        )
    } else {
        return (
            <div>No matching countries, specify another filter</div>
        )
    }

    
}

export default DisplayFilteredItems