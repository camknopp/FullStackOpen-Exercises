import React from 'react'
  
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
            n.map(country => <div key={country.name}>{country.name}</div>)
            )
    } else if (n.length === 1) {
        console.log(n)
        let country = n[0]
        let languages = country.languages
        let capital = country.capital
        if (country.capital == '') {
            capital = 'DNE'
        }

        return (
            <div>
                <h2>{country.name}</h2>

                <p>capital {capital}</p>
                <p>population {country.population}</p>

                <h3>languages</h3>
                <ul>
                    {languages.map((l, i)=> <li>{l.name}</li>)}
                </ul>
                <img src={country.flag} width="150" height="150"></img>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

    
}

export default DisplayFilteredItems