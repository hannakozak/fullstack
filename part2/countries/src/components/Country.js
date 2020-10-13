import React from 'react'
import Weather from './Weather'

const Country = ({ searchResults }) => {
	const {name, capital, population, languages, flag} = searchResults[0]
  return (
    <div>
	    <h2>{ name }</h2>
	    <p>capital - { capital }</p>
	    <p>population - { population }</p>
	    <h3>Spoken languages</h3>
        <ul>{ languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={ flag } alt={`${name}'s flag`} height="170" width="170"/>
		<h2>Weather in { name }</h2>
		<Weather capital={ capital }/>
	</div>
  )
}

export default Country