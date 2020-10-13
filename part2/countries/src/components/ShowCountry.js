import React from 'react'

const ShowCountry = ({ country, handleClick}) => {
	 
  return (
    <li key={country.name}>
      {country.name}
      <button value={ country.name } onClick={ handleClick }>
        Show
      </button>
    </li>
    
  )
}

export default ShowCountry