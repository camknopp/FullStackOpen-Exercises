import React from 'react'
import axios from 'axios'
  
const DisplayFilteredItems = ({countries, filter, setNewFilter}) => {
    let n = []
    var weather

    const getWeather = (query) => {
        return axios.get(query)
        .then(response => {
        console.log(response.data.current)
        weather = response.data.current
       // return response.data.current.temperature
        })
    }

    for (let i = 0; i < countries.length; i++) {
    if ((countries[i].name.toLowerCase())
        .includes(filter.toLowerCase())) {
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
                <button onClick={() => setNewFilter(country.name)}>show</button>
            
                </div>)
            )
    } else if (n.length === 1) {
        let country = n[0]
        console.log(country)
        let capital = ""
        let query = ""
        let languages = country.languages
        let imageAltText = "flag of " + country.name
        // let ACCESS_KEY = process.env.REACT_APP_API_KEY
        let ACCESS_KEY = '2c3213f52cbfd44e6cac39475e85edd4'

        if (country.capital === '') {
            capital = 'DNE'
            query = "http://api.weatherstack.com/current?access_key=" 
            + ACCESS_KEY + "&query=" + country.latlng
        } else {
            capital = country.capital
            query = "http://api.weatherstack.com/current?access_key=" 
            + ACCESS_KEY + "&query=" + country.capital + ", " + country.name
        }

        //let weather = getWeather(query)
        getWeather(query)
        console.log(weather)

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