import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  const [ showDetails, setShowDetails ] = useState()
 
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
        setCountries(response.data);
      }
    );
  }, []);
  
  const handleClick = (event) => {
	const details = countries.filter(country =>
      country.name.includes(event.target.value)
      )
	  setShowDetails(details)
	}
	
   const handleSearch = (event) => {
	  setSearchTerm(event.target.value)
	  countriesFiltered()
	  setShowDetails()
    }
  
    const countriesFiltered = () => {
	  const results = countries.filter(country =>
	  country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    }

  return (
    <div>
      <Filter searchTerm={ searchTerm } handleSearch= { handleSearch }/>
	  <CountriesList searchResults={ searchResults } showDetails={ showDetails } handleClick={ handleClick }/>
    </div>
  )
}

export default App;
