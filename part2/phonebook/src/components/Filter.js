import React from 'react'

const Filter = ({ searchTerm, handleSearch, searchResults }) => {
  return (
    <div>
     <p>filter shown with <input value={ searchTerm } onChange={ handleSearch }/></p>
		{ searchTerm ? 
		    <ul>{ searchResults.map(person => <li key={ person.name }>{ person.name } {person.number }</li>)}</ul> :
		  <div></div> }
    </div>
  )
}

export default Filter