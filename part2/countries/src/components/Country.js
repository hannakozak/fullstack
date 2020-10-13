import React from 'react'

const Country = ({ searchResults }) => {
  return (
    <div>
	    <h2>{searchResults[0].name}</h2>
	    <p>capital - {searchResults[0].capital}</p>
	    <p>population - { searchResults[0].population }</p>
	    <h3>languages</h3>
        <ul>{ searchResults[0].languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={searchResults[0].flag} alt={`${searchResults[0].name}'s flag`} height="170" width="170"/>
	</div>
  )
}

export default Country