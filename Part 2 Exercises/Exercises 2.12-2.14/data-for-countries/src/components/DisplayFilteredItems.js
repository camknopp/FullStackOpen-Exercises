import React from "react"
import axios from "axios"

const DisplayFilteredItems = ({ countries, filter, setNewFilter }) => {
    let n = []

	// only show countries that match the chosen filter
	for (let i = 0; i < countries.length; i++) {
		if (countries[i].name.toLowerCase().includes(filter.toLowerCase())) {
			n.push(countries[i])
		}
	}

	if (n.length > 10) {
		return <div>Too many matches, specify another filter</div>
	} else if (n.length > 1) {
		// display the list of countries if there are less than 10 but more than 1
		return n.map(country => (
			<div key={country.name}>
				{country.name}
				<button onClick={() => setNewFilter(country.name)}>show</button>
			</div>
		))
	} else if (n.length === 1) {
		// if only one country remains, display its info
	} else if (n.length == 0) {
		// if no countries match the specified filte
		return <div>No matching countries, specify another filter</div>
	}

	let country = n[0]
	let capital = ""
	let query = ""
	let languages = country.languages
	let imageAltText = "flag of " + country.name
	let ACCESS_KEY = process.env.REACT_APP_API_KEY

	// if the capital doesn't exist, then we request the weather for the country as a whole
	if (country.capital === "") {
		capital = "DNE"
		query =
			"http://api.weatherstack.com/current?access_key=" +
			ACCESS_KEY +
			"&query=" +
			country.latlng
	} else {
		capital = country.capital
		query =
			"http://api.weatherstack.com/current?access_key=" +
			ACCESS_KEY +
			"&query=" +
			country.capital +
			", " +
			country.name
	}

	// // get the weather from the weatherstack api and store in weather variable
	// axios.get(query).then(response => {
	// 	weather = response.data.current
    // })
    
    // waitForWeather()

	// console.log(weather)

	// display the country's information
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {capital}</p>
			<p>Population: {country.population}</p>

			<h3>Spoken languages</h3>
			<ul>
				{languages.map((l, i) => (
					<li key={l.name}>{l.name}</li>
				))}
			</ul>

			<img alt={imageAltText} src={country.flag} width="150" height="150"></img>

			<h3>Weather in {capital === "DNE" ? country.name : capital}</h3>
			<p>Temperature: </p>
			<p>Wind: </p>
		</div>
	)
}

export default DisplayFilteredItems
