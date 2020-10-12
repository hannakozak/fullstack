import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
 
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
        setCountries(response.data);
      }
    );
  }, []);
  
 const handleSearch = (event) => {
	setSearchTerm(event.target.value)
	countriesFiltered()
  }
  
  const countriesFiltered = () => {
	const results = countries.filter(country =>
	country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }
  
  let show;
  
    if (searchResults.length<10 && searchResults.length>1) {
 	  show = <ul>{ searchResults.map(country => <li key={ country.name }>{ country.name } </li>)}</ul>
    }
    else if (searchResults.length===1) {
	  show = <div>
	    <h2>{searchResults[0].name}</h2>
	    <p>capital - {searchResults[0].capital}</p>
	    <p>population - { searchResults[0].population }</p>
	    <h3>languages</h3>
        <ul>{ searchResults[0].languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={searchResults[0].flag} alt={`${searchResults[0].name}'s flag`} height="170" width="170"/>
	  </div>
    }
    else if  (searchResults.length>10) {
	  show = <div>Too many matches, specify another filter</div>
    }
  
  return (
    <div>
    <div>find countries<input value={ searchTerm } onChange= { handleSearch }/></div>
	<div> { show } </div>
    </div>
  )
}

export default App;
