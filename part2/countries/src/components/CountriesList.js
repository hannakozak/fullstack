import React from 'react'
import Country from './Country'
import ShowCountry from './ShowCountry'

const CountriesList = ({ searchResults, showDetails, handleClick}) => {

	const show = () => {
		if (showDetails !== undefined) {
          return (
           <Country searchResults={ showDetails }/>
          );
        }
        if (searchResults.length<10 && searchResults.length>1) {
 	      return (
		    <ul>{ searchResults.map(country => 
			  <ShowCountry key={ country.name } name={ country.name } country={ country } handleClick={ handleClick }/>)}</ul>)
        }
        else if (searchResults.length===1) {
	      return (
		    <Country searchResults={ searchResults }/>)
        }
        else if  (searchResults.length>10) {
	      return (
		    <div>Too many matches, specify another filter</div>)
        }
	}
	
  return (
    <div>{show()} 
    </div>
  )
}

export default CountriesList